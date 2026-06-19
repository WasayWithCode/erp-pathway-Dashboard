import gsap from "gsap";
import {
  ArrowDown,
  BrainCircuit,
  MessageSquareText,
  Mic,
  Minimize2,
  Paperclip,
  RotateCcw,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AIMessage from "./AIMessage";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "./useChat";
import { useAnimationReady } from "../../hooks/useAnimationReady";

const AIChatWindow = () => {
  const { messages, isOpen, isTyping, error, suggestedPrompts, pageContext, closeChat, sendMessage, clearChat } = useChat();
  const { prefersReducedMotion } = useAnimationReady();
  const [input, setInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const welcomeRef = useRef(null);
  const conversationMessages = messages.filter((message) => !message.isWelcome);
  const hasConversation = conversationMessages.length > 0;

  useEffect(() => {
    if (!panelRef.current) return undefined;

    if (isOpen) {
      if (!prefersReducedMotion) {
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 34, scale: 0.94, rotateX: 5, filter: "blur(14px)" },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)", duration: 0.48, ease: "power4.out" },
        );
      } else {
        gsap.set(panelRef.current, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" });
      }
    } else {
      if (!prefersReducedMotion) {
        gsap.to(panelRef.current, {
          autoAlpha: 0,
          y: 22,
          scale: 0.97,
          filter: "blur(10px)",
          duration: 0.22,
          ease: "power2.in",
        });
      } else {
        gsap.set(panelRef.current, { autoAlpha: 0, y: 22, scale: 0.97 });
      }
    }
  }, [isOpen, prefersReducedMotion]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const latest = scrollRef.current?.querySelector("[data-ai-message]:last-of-type");
    if (!latest) return;
    if (!prefersReducedMotion) {
      gsap.fromTo(
        latest,
        { autoAlpha: 0, y: 16, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, ease: "power3.out" },
      );
    } else {
      gsap.set(latest, { autoAlpha: 1, y: 0, scale: 1 });
    }
  }, [messages.length, prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen || hasConversation || !welcomeRef.current) return undefined;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.fromTo(
          "[data-ai-welcome-item]",
          { autoAlpha: 0, y: 18, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.06, ease: "power3.out" },
        );
      } else {
        gsap.set("[data-ai-welcome-item]", { autoAlpha: 1, y: 0, scale: 1 });
      }
    }, welcomeRef);

    return () => ctx.revert();
  }, [hasConversation, isOpen, prefersReducedMotion]);

  const handleScroll = () => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const distanceFromBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    setShowScrollButton(distanceFromBottom > 140);
  };

  const scrollToBottom = () => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;
    setInput("");
    sendMessage(prompt);
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <section
      ref={panelRef}
      className={`fixed bottom-24 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-[420px] origin-bottom-right flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white/72 shadow-[0_28px_90px_rgba(15,23,42,0.2),0_0_0_1px_rgba(37,99,235,0.08)] backdrop-blur-2xl transition-[height] duration-300 max-[480px]:bottom-24 max-[480px]:right-4 max-[480px]:w-[calc(100vw-2rem)] max-[480px]:max-w-none sm:right-6 sm:w-[420px] ${
        "h-[min(720px,calc(100vh-7.5rem))] max-[480px]:h-[calc(100dvh-12rem)]"
      } ${
        isOpen ? "pointer-events-auto" : "pointer-events-none invisible"
      }`}
      aria-label="ERP AI chat window"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.58)),linear-gradient(135deg,rgba(37,99,235,0.22),rgba(6,182,212,0.14),rgba(139,92,246,0.18))]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[23px] bg-[#F8FAFC]/52" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/18 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-14 left-8 h-36 w-36 rounded-full bg-violet-300/14 blur-3xl" />

      <div className="relative border-b border-white/70 px-4 py-4">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.13),rgba(6,182,212,0.08),rgba(139,92,246,0.12))]" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)]">
              <span className="absolute inset-0 rounded-2xl border border-white/40" />
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-base font-black text-[#0F172A]">ERP AI Assistant</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />
                  Online
                </span>
              </div>
              <p className="mt-1 truncate text-xs font-bold text-slate-500">Your ERP Learning Guide</p>
              <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-400">{pageContext.label}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={closeChat}
              className="ai-icon-button"
              title="Minimize"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button type="button" onClick={clearChat} className="ai-icon-button" title="Clear chat">
              <Trash2 className="h-4 w-4" />
            </button>
            <button type="button" onClick={closeChat} className="ai-icon-button" title="Close ERP AI">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <>
        <div className="relative min-h-0 flex-1">
            <div ref={scrollRef} onScroll={handleScroll} className="ai-chat-scrollbar relative z-10 h-full overflow-y-auto px-3.5 py-4">
              {error ? (
                <div className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800 shadow-sm">
                  {error}
                </div>
              ) : null}

              {!hasConversation ? (
                <div ref={welcomeRef} className="flex min-h-full flex-col justify-center px-1 py-4">
                  <div data-ai-welcome-item className="mx-auto grid h-20 w-20 place-items-center rounded-[1.45rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-[0_24px_60px_rgba(37,99,235,0.28)]">
                    <BrainCircuit className="h-9 w-9" />
                  </div>
                  <div data-ai-welcome-item className="mx-auto mt-5 max-w-[21rem] text-center">
                    <h3 className="text-xl font-black text-[#0F172A]">ERP AI Assistant</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                      Ask anything about ERP, SAP, Oracle, careers, modules, certifications and interviews.
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        data-ai-welcome-item
                        onClick={() => handlePromptClick(prompt)}
                        className="group min-h-[4.25rem] rounded-[1.1rem] border border-white/80 bg-white/82 px-3 py-3 text-left text-xs font-black leading-5 text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.07)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-[0_18px_44px_rgba(37,99,235,0.13)]"
                      >
                        <span className="mb-2 grid h-7 w-7 place-items-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                          <MessageSquareText className="h-3.5 w-3.5" />
                        </span>
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {conversationMessages.map((message) => (
                    <AIMessage key={message.id} message={message} />
                  ))}
                  {isTyping ? <TypingIndicator /> : null}
                </div>
              )}
            </div>

            {showScrollButton ? (
              <button
                type="button"
                onClick={scrollToBottom}
                className="absolute bottom-4 left-1/2 z-20 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-white/80 bg-white/92 text-blue-700 shadow-[0_14px_36px_rgba(15,23,42,0.16)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
                title="Scroll to bottom"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            ) : null}
        </div>

        <div className="relative z-10 border-t border-white/70 bg-white/68 p-3 backdrop-blur-2xl">
            {hasConversation ? (
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {suggestedPrompts.slice(0, 4).map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handlePromptClick(prompt)}
                    className="shrink-0 rounded-full border border-slate-200/80 bg-white/84 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <button type="button" className="ai-input-tool-button" title="Attach file">
                <Paperclip className="h-4 w-4" />
              </button>
              <label className="sr-only" htmlFor="erp-ai-message">Ask ERP AI</label>
              <div className="flex min-h-[3.25rem] flex-1 items-center gap-2 rounded-[1.25rem] border border-white/80 bg-white/86 px-3 shadow-[0_12px_34px_rgba(15,23,42,0.07)] backdrop-blur-xl focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-500/10">
                <Sparkles className="h-4 w-4 shrink-0 text-blue-600" />
                <textarea
                  id="erp-ai-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      handleSubmit(event);
                    }
                  }}
                  rows={1}
                  placeholder="Ask ERP AI anything..."
                  className="max-h-24 min-h-12 flex-1 resize-none bg-transparent py-3.5 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
              <button type="button" className="ai-input-tool-button" title="Voice input">
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[1.15rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-[0_16px_34px_rgba(37,99,235,0.26)] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                title="Send message"
              >
                {isTyping ? <RotateCcw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
        </div>
      </>
    </section>
  );
};

export default AIChatWindow;
