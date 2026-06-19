import gsap from "gsap";
import { Bot, MessageCircle, Sparkles, X, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import AIChatWindow from "./AIChatWindow";
import { useChat } from "./useChat";
import { useAnimationReady } from "../../hooks/useAnimationReady";

const AIChatbot = () => {
  const { isOpen, toggleChat, pageContext } = useChat();
  const { prefersReducedMotion } = useAnimationReady();
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return undefined;

    const ctx = gsap.context(() => {
      const hoverScale = gsap.quickTo(buttonRef.current, "scale", { duration: 0.28, ease: "power3.out" });
      const hoverY = gsap.quickTo(buttonRef.current, "y", { duration: 0.28, ease: "power3.out" });

      if (!prefersReducedMotion) {
        gsap.to(buttonRef.current, {
          y: -8,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-ai-pulse]", {
          scale: 1.36,
          autoAlpha: 0,
          duration: 1.8,
          repeat: -1,
          ease: "power2.out",
        });
      } else {
        // Set static final state when reduced motion is preferred
        gsap.set(buttonRef.current, { y: 0, autoAlpha: 1 });
        gsap.set("[data-ai-pulse]", { scale: 1, autoAlpha: 1 });
      }

      const handleEnter = () => {
        if (!prefersReducedMotion) {
          hoverScale(1.07);
          hoverY(-10);
          gsap.to(tooltipRef.current, { autoAlpha: 1, x: -6, duration: 0.22, ease: "power3.out" });
        } else {
          gsap.set(tooltipRef.current, { autoAlpha: 1, x: -6 });
        }
      };

      const handleLeave = () => {
        if (!prefersReducedMotion) {
          hoverScale(1);
          hoverY(0);
          gsap.to(tooltipRef.current, { autoAlpha: 0, x: 0, duration: 0.18, ease: "power2.in" });
        } else {
          gsap.set(tooltipRef.current, { autoAlpha: 0, x: 0 });
        }
      };

      buttonRef.current.addEventListener("mouseenter", handleEnter);
      buttonRef.current.addEventListener("mouseleave", handleLeave);

      return () => {
        buttonRef.current?.removeEventListener("mouseenter", handleEnter);
        buttonRef.current?.removeEventListener("mouseleave", handleLeave);
      };
    }, buttonRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <AIChatWindow />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleChat}
        className="group fixed bottom-4 right-4 z-[60] flex h-[4.35rem] w-[4.35rem] items-center justify-center rounded-[1.55rem] border border-white/75 bg-white/55 text-white shadow-[0_22px_70px_rgba(37,99,235,0.3)] backdrop-blur-2xl sm:bottom-6 sm:right-6"
        aria-label={isOpen ? "Close ERP AI assistant" : "Open ERP AI assistant"}
        title={pageContext.label}
      >
        <span
          ref={tooltipRef}
          className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-2xl border border-slate-200/80 bg-white/90 px-3.5 py-2 text-xs font-black text-slate-800 opacity-0 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl"
        >
          Ask ERP AI
        </span>
        <span data-ai-pulse className="absolute inset-[-7px] rounded-[1.85rem] bg-blue-500/25" />
        <span className="absolute inset-[-10px] rounded-[2rem] bg-gradient-to-br from-blue-500/18 via-cyan-400/16 to-violet-500/18 blur-xl" />
        <span className="absolute inset-0 rounded-[1.55rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 floating-gradient" />
        <span className="absolute inset-[3px] rounded-[1.36rem] border border-white/45 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]" />
        <span className="relative grid h-11 w-11 place-items-center rounded-[1.1rem] bg-white/16 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </span>
        <span className="absolute -left-2 -top-2 grid h-8 w-8 place-items-center rounded-full border border-white/85 bg-white text-blue-700 shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
          {isOpen ? <MessageCircle className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
        </span>
        <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border border-white/85 bg-cyan-400 text-white shadow-[0_10px_22px_rgba(6,182,212,0.3)]">
          <Zap className="h-3 w-3" />
        </span>
      </button>
    </>
  );
};

export default AIChatbot;
