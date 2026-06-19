import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBrain,
  FaCheckCircle,
  FaEraser,
  FaMagic,
  FaPaperPlane,
  FaRobot,
  FaRoute,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import AIMessage from "../../components/AI/AIMessage";
import TypingIndicator from "../../components/AI/TypingIndicator";
import { useChat } from "../../components/AI/useChat";
import GlassPanel from "../../components/Widgets/GlassPanel";
import PageShell from "../DashboardPages/PageShell";
import { assistantSuggestions } from "../../components/Dashboard/dashboardData";

const stats = [
  { label: "Tutor mode", value: "On", tone: "cyan", icon: FaRobot, detail: "A practical assistant for ERP questions." },
  { label: "Prompt depth", value: "Wide", tone: "emerald", icon: FaBrain, detail: "Covers modules, careers, and practice flow." },
  { label: "Next best step", value: "Ask", tone: "violet", icon: FaMagic, detail: "Use prompts to move from learning to action." },
  { label: "Suggested route", value: "Guided", tone: "amber", icon: FaRoute, detail: "Pair answers with the relevant ERP page." },
];

const AIAssistant = () => {
  const { messages, isTyping, pageContext, suggestedPrompts, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const conversationRef = useRef(null);
  const conversation = messages.filter((message) => !message.isWelcome);
  const hasConversation = conversation.length > 0;

  useEffect(() => {
    const scroller = conversationRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const pageStats = useMemo(
    () => [
      { label: "Conversation", value: hasConversation ? `${conversation.length} turns` : "Fresh", icon: FaCheckCircle, tone: "cyan", detail: "Recent ERP guidance is stored locally." },
      { label: "Suggestions", value: suggestedPrompts.length, icon: FaStar, tone: "emerald", detail: "Shortcuts update with the current page context." },
      { label: "Focus", value: pageContext.label, icon: FaRoute, tone: "violet", detail: "The assistant adapts to the route you are on." },
    ],
    [conversation.length, hasConversation, pageContext.label, suggestedPrompts.length],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;
    setInput("");
    sendMessage(prompt);
  };

  return (
    <PageShell
      eyebrow="System"
      title="AI Assistant"
      description="A dedicated chat workspace for ERP explanations, practice prompts, and career guidance."
    >
      <section className="grid gap-4 md:grid-cols-3" data-page-enter>
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <GlassPanel key={item.label} className="p-5">
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${item.tone === "cyan" ? "from-cyan-500 to-blue-600" : item.tone === "emerald" ? "from-emerald-500 to-teal-600" : item.tone === "violet" ? "from-violet-500 to-fuchsia-600" : "from-amber-500 to-orange-500"} text-white shadow-lg`}>
                <Icon />
              </span>
              <p className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.detail}</p>
            </GlassPanel>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr_0.85fr]" data-page-enter>
        <GlassPanel className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Suggested prompts</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Start with a route-aware ERP question.</p>
            </div>
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
            >
              <FaEraser />
              Clear
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-cyan-300/30 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300"
              >
                <span className="flex items-center gap-3">
                  <FaSearch className="text-cyan-500" />
                  {prompt}
                </span>
                <FaPaperPlane className="text-xs opacity-70" />
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <h4 className="text-sm font-semibold text-slate-950 dark:text-white">Current context</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{pageContext.label}</p>
          </div>
        </GlassPanel>

        <GlassPanel className="overflow-hidden p-0">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-white/10">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Conversation</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Messages stay local to this browser session.</p>
            </div>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
              {isTyping ? "Thinking" : "Ready"}
            </span>
          </div>

          <div ref={conversationRef} className="max-h-[72vh] space-y-1 overflow-y-auto px-4 py-4">
            {hasConversation ? (
              conversation.map((message) => <AIMessage key={message.id} message={message} />)
            ) : (
              <div className="flex min-h-[32rem] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg">
                  <FaBrain className="text-2xl" />
                </div>
                <h4 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Ask a practical ERP question</h4>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Use the assistant for module explanations, career direction, interview prep, and workflow guidance.
                </p>
              </div>
            )}
            {isTyping ? <TypingIndicator /> : null}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 dark:border-white/10">
            <label className="sr-only" htmlFor="assistant-message">
              Ask ERP AI
            </label>
            <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 dark:border-white/10 dark:bg-white/[0.06]">
              <textarea
                id="assistant-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={2}
                placeholder="Ask about ERP, SAP, finance, careers, or practice scenarios..."
                className="min-h-14 flex-1 resize-none bg-transparent px-1 py-1 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950"
              >
                <FaPaperPlane />
                Send
              </button>
            </div>
          </form>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Chat history</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A quick summary of what we have already covered.</p>

          <div className="mt-5 space-y-3">
            {pageStats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${item.tone === "cyan" ? "from-cyan-500 to-blue-600" : item.tone === "emerald" ? "from-emerald-500 to-teal-600" : "from-violet-500 to-fuchsia-600"} text-white`}>
                      <Icon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.label}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.value}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <h4 className="text-sm font-semibold text-slate-950 dark:text-white">Prompt bank</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {assistantSuggestions.map((prompt) => (
                <span
                  key={prompt}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                >
                  {prompt}
                </span>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>
    </PageShell>
  );
};

export default AIAssistant;
