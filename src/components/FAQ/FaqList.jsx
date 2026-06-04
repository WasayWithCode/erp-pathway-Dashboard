import { useState } from "react";
import GlassCard from "../UI/GlassCard";

const FaqList = ({ items }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-3" data-card-reveal>
      {items.map((item, index) => {
        const isOpen = active === index;
        return (
          <GlassCard key={item.question} className="overflow-hidden" data-card>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setActive(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span className="font-bold text-[#0F172A]">{item.question}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-600">
                {isOpen ? "-" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-200 px-5 py-4">
                <p className="text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            )}
          </GlassCard>
        );
      })}
    </div>
  );
};

export default FaqList;

