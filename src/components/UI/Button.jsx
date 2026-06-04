import { Link } from "react-router-dom";

const variants = {
  primary:
    "border border-blue-500/20 bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] text-white shadow-[0_18px_44px_rgba(37,99,235,0.24)] hover:shadow-[0_24px_60px_rgba(37,99,235,0.30)]",
  secondary:
    "border border-slate-200 bg-white text-[#0F172A] shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:border-blue-200 hover:bg-blue-50/60",
  ghost: "border border-transparent text-[#64748B] hover:bg-white hover:text-[#0F172A] hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]",
  dark: "border border-slate-200 bg-[#0F172A] text-white shadow-[0_16px_38px_rgba(15,23,42,0.2)] hover:bg-slate-800",
};

const Button = ({ children, to, type = "button", variant = "primary", className = "", icon, ...props }) => {
  const base =
    "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60";
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />
      {icon}
      <span className="relative">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
