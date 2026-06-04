import { cn } from "./utils";

const tones = {
  slate: "border-slate-200 bg-slate-50 text-[#64748B]",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
  indigo: "border-violet-200 bg-violet-50 text-violet-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
};

const Badge = ({ children, tone = "slate", className = "" }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide shadow-[0_8px_20px_rgba(15,23,42,0.04)] backdrop-blur-sm",
      tones[tone] || tones.slate,
      className,
    )}
  >
    {children}
  </span>
);

export default Badge;
