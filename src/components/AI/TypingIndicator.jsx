import { Bot } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const TypingIndicator = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(rootRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power3.out" });
      gsap.to("[data-ai-typing-dot]", {
        y: -5,
        autoAlpha: 0.55,
        duration: 0.42,
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex items-end gap-2 px-1 py-2.5" aria-label="ERP AI is typing">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[1rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)]">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex min-h-11 items-center gap-2 rounded-[1.25rem] rounded-bl-md border border-white/85 bg-white/92 px-4 text-xs font-black text-slate-500 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <span>ERP AI is typing</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((index) => (
            <span key={index} data-ai-typing-dot className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          ))}
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;
