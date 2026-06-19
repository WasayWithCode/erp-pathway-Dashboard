const toneClasses = {
  default:
    "border-white/70 bg-white/78 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
  strong:
    "border-white/80 bg-white/88 shadow-[0_24px_90px_rgba(15,23,42,0.10)] dark:border-white/[0.12] dark:bg-white/[0.10] dark:shadow-[0_28px_90px_rgba(0,0,0,0.34)]",
};

const GlassPanel = ({ as: Component = "div", className = "", tone = "default", children }) => (
  <Component
    className={`rounded-2xl border backdrop-blur-2xl ${toneClasses[tone]} ${className}`}
  >
    {children}
  </Component>
);

export default GlassPanel;
