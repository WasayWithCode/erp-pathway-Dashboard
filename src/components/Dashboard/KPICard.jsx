import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import GlassPanel from "../Widgets/GlassPanel";

const toneMap = {
  cyan: "from-cyan-500 to-blue-600 text-cyan-700 dark:text-cyan-300",
  emerald: "from-emerald-500 to-teal-600 text-emerald-700 dark:text-emerald-300",
  amber: "from-amber-500 to-orange-500 text-amber-700 dark:text-amber-300",
  blue: "from-blue-500 to-indigo-600 text-blue-700 dark:text-blue-300",
  violet: "from-violet-500 to-fuchsia-600 text-violet-700 dark:text-violet-300",
  rose: "from-rose-500 to-pink-600 text-rose-700 dark:text-rose-300",
};

const KPICard = ({ item }) => {
  const Icon = item.icon;
  const counter = useRef({ value: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const tween = gsap.to(counter.current, {
      value: item.value,
      duration: 1.2,
      ease: "power3.out",
      onUpdate: () => setDisplayValue(Math.round(counter.current.value)),
    });

    return () => tween.kill();
  }, [item.value]);

  return (
    <GlassPanel
      className="group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/70 dark:hover:border-cyan-300/30"
      data-reveal-item
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${toneMap[item.tone]}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {item.label}
          </p>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {item.prefix}
              {displayValue}
            </span>
            {item.suffix ? (
              <span className="pb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {item.suffix}
              </span>
            ) : null}
          </div>
        </div>
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${toneMap[item.tone]}`}
        >
          <Icon />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        {item.detail}
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">
        {item.trend}
      </p>
    </GlassPanel>
  );
};

export default KPICard;
