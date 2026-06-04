import { Link } from "react-router-dom";
import { cn } from "./utils";

const variants = {
  primary:
    "border border-blue-500/20 bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] text-white shadow-[0_16px_42px_rgba(37,99,235,0.24)] hover:shadow-[0_22px_54px_rgba(37,99,235,0.30)]",
  secondary:
    "border border-slate-200 bg-white text-[#0F172A] shadow-[0_10px_28px_rgba(15,23,42,0.06)] hover:border-blue-200 hover:bg-blue-50/60",
  ghost: "border border-transparent bg-transparent text-[#64748B] hover:bg-white hover:text-[#0F172A] hover:shadow-[0_10px_28px_rgba(15,23,42,0.06)]",
  dark:
    "border border-slate-200 bg-[#0F172A] text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)] hover:bg-slate-800",
};

const Button = ({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const base =
    "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60";
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />
      {icon && iconPosition === "left" ? icon : null}
      <span className="relative">{children}</span>
      {icon && iconPosition === "right" ? icon : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
