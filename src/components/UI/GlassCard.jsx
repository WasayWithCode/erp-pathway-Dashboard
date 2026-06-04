const GlassCard = ({ children, className = "", as: Component = "div", ...props }) => (
  <Component
    className={`relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/80 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_28px_90px_rgba(37,99,235,0.14)] ${className}`}
    {...props}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),transparent_38%,rgba(6,182,212,0.06),transparent_70%,rgba(139,92,246,0.08))]" />
    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
    <div className="relative">{children}</div>
  </Component>
);

export default GlassCard;
