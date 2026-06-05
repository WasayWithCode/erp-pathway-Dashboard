import { cn } from "./utils";

const GlassCard = ({ as: Component = "div", className = "", children, onPointerMove, ...props }) => {
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  };

  return (
    <Component
      className={cn(
        "premium-card-surface relative overflow-hidden rounded-[1.35rem] border border-white/85 bg-white/82 backdrop-blur-2xl transition duration-300 hover:border-blue-200",
        className,
      )}
      onPointerMove={handlePointerMove}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),transparent_36%,rgba(6,182,212,0.07),transparent_68%,rgba(139,92,246,0.08))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/80 to-transparent" />
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default GlassCard;
