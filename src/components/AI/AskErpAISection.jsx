import gsap from "gsap";
import { ArrowRight, Bot, BrainCircuit, GraduationCap, Search, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Container from "../UI/Container";
import GlassCard from "../UI/GlassCard";
import SectionHeader from "../UI/SectionHeader";
import { useChat } from "./useChat";

const homePrompts = [
  "What is ERP?",
  "Explain Finance Module",
  "ERP Career Roadmap",
  "SAP vs Oracle",
  "ERP Interview Questions",
  "Learn Inventory Management",
];

const AskErpAISection = () => {
  const { sendMessage, openChat } = useChat();
  const [prompt, setPrompt] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.to("[data-ai-card-float]", {
        y: -10,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.18,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const ask = (value) => {
    const nextPrompt = value.trim();
    if (!nextPrompt) return;
    setPrompt("");
    openChat();
    sendMessage(nextPrompt);
  };

  return (
    <section className="bg-white/55 py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div data-reveal>
          <SectionHeader
            align="left"
            eyebrow="Ask ERP AI"
            title="Learn ERP concepts with a tutor that understands your pathway."
            description="Ask practical questions about modules, platforms, careers, certifications, interview prep, and real business processes."
          />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(prompt);
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="home-erp-ai-search">Ask ERP AI</label>
            <div className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)] focus-within:border-blue-300">
              <Search className="h-5 w-5 shrink-0 text-blue-600" />
              <input
                id="home-erp-ai-search"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask about SAP, finance, inventory, ERP careers..."
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#0F172A] px-5 text-sm font-bold text-white shadow-[0_18px_44px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Ask AI
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-5 flex flex-wrap gap-2">
            {homePrompts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => ask(item)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <GlassCard ref={cardRef} className="p-6 sm:p-8" data-reveal>
          <div className="grid gap-4 sm:grid-cols-[0.82fr_1.18fr] sm:items-center">
            <div className="relative min-h-56">
              <div data-ai-card-float className="absolute left-3 top-3 grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-[0_24px_60px_rgba(37,99,235,0.3)]">
                <Bot className="h-12 w-12" />
              </div>
              <div data-ai-card-float className="absolute bottom-8 right-6 grid h-20 w-20 place-items-center rounded-3xl border border-slate-200 bg-white text-blue-700 shadow-[0_18px_48px_rgba(15,23,42,0.1)]">
                <BrainCircuit className="h-9 w-9" />
              </div>
              <div className="absolute bottom-2 left-10 inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Context-aware
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
                <GraduationCap className="h-4 w-4" />
                AI Learning Assistant
              </div>
              <h3 className="mt-5 text-2xl font-black text-[#0F172A] sm:text-3xl">From beginner question to career-ready answer.</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                The assistant explains ERP in student-friendly language, suggests next questions, and adapts prompts around finance, HR, inventory, procurement, and career pages.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Module tutor", "Interview prep", "Platform comparison", "Career roadmap"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-bold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
};

export default AskErpAISection;
