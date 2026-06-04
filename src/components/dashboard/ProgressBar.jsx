import { cn, progressWidthClass } from "./utils";

const ProgressBar = ({ value = 0, label, tone = "cyan", className = "" }) => {
  const fillTone = {
    cyan: "from-cyan-400 via-sky-400 to-indigo-500",
    indigo: "from-indigo-400 via-violet-400 to-fuchsia-500",
    emerald: "from-emerald-400 via-teal-400 to-cyan-400",
    amber: "from-amber-300 via-orange-400 to-rose-400",
    rose: "from-rose-400 via-pink-400 to-fuchsia-500",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <div className="flex items-center justify-between text-xs text-[#64748B]">{label}</div>}
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
            fillTone[tone] || fillTone.cyan,
            progressWidthClass(value),
          )}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
