import { useMemo, useState } from "react";
import { erpModules, quizQuestions } from "../../data/siteData";
import { calculateQuizResult, resultMessages } from "../../utils/quiz";
import Button from "../UI/Button";
import GlassCard from "../UI/GlassCard";

const CareerQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState("");
  const [completed, setCompleted] = useState(false);

  const progress = Math.round(((current + (completed ? 1 : 0)) / quizQuestions.length) * 100);
  const result = useMemo(() => calculateQuizResult(answers), [answers]);
  const resultModule = erpModules.find((module) => module.name === result.moduleName) || erpModules[0];

  const handleNext = () => {
    if (!selected) return;

    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    setSelected("");

    if (current === quizQuestions.length - 1) {
      setCompleted(true);
      return;
    }

    setCurrent((value) => value + 1);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected("");
    setCompleted(false);
  };

  if (completed) {
    return (
      <GlassCard className="mx-auto max-w-3xl p-6 sm:p-8" data-reveal>
        <div className={`h-1.5 w-28 rounded-full bg-gradient-to-r ${resultModule.accent}`} />
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-blue-700">
          Recommended ERP Module
        </p>
        <h2 className="mt-2 text-3xl font-black text-[#0F172A]">{result.moduleName}</h2>
        <p className="mt-4 text-slate-600 leading-7">
          {resultMessages[result.moduleName]}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4">
            <p className="text-xs text-[#64748B]">Match Confidence</p>
            <p className="mt-1 text-2xl font-black text-[#0F172A]">{result.confidence}%</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4">
            <p className="text-xs text-[#64748B]">Salary Range</p>
            <p className="mt-1 text-sm font-bold text-[#0F172A]">{resultModule.salary}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4">
            <p className="text-xs text-[#64748B]">Best Role</p>
            <p className="mt-1 text-sm font-bold text-[#0F172A]">{resultModule.careers[0]}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-[#0F172A]">Recommended skills to start:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {resultModule.skills.slice(0, 5).map((skill) => (
              <span key={skill} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/roadmap">View Roadmap</Button>
          <Button type="button" variant="secondary" onClick={restart}>
            Restart Quiz
          </Button>
        </div>
      </GlassCard>
    );
  }

  const question = quizQuestions[current];

  return (
    <GlassCard className="mx-auto max-w-3xl p-6 sm:p-8" data-reveal>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
          Question {current + 1} of {quizQuestions.length}
        </p>
        <p className="text-sm text-[#64748B]">{progress}% completed</p>
      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <h2 className="mt-8 text-2xl font-black leading-tight text-[#0F172A]">{question.question}</h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => setSelected(option.module)}
            className={`rounded-xl border p-4 text-left transition ${
              selected === option.module
                ? "border-blue-300 bg-blue-50 text-[#0F172A] shadow-[0_12px_30px_rgba(37,99,235,0.12)]"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0F172A]"
            }`}
          >
            <span className="font-semibold">{option.label}</span>
            <span className="mt-1 block text-xs text-[#64748B]">Maps toward {option.module}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (current > 0) {
              setCurrent((value) => value - 1);
              setAnswers((value) => value.slice(0, -1));
              setSelected("");
            }
          }}
          disabled={current === 0}
          className={current === 0 ? "pointer-events-none opacity-45" : ""}
        >
          Back
        </Button>
        <Button type="button" onClick={handleNext} disabled={!selected} className={!selected ? "pointer-events-none opacity-45" : ""}>
          {current === quizQuestions.length - 1 ? "Show Result" : "Next Question"}
        </Button>
      </div>
    </GlassCard>
  );
};

export default CareerQuiz;

