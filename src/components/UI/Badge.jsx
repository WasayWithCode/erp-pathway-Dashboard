const Badge = ({ children, tone = "blue", className = "" }) => {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    slate: "border-slate-200 bg-slate-50 text-[#64748B]",
    purple: "border-violet-200 bg-violet-50 text-violet-700",
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide shadow-[0_8px_22px_rgba(15,23,42,0.05)] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
