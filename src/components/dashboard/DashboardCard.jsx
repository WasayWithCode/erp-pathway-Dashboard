import GlassCard from "./GlassCard";
import { cn } from "./utils";

const DashboardCard = ({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName = "",
}) => (
  <GlassCard className={cn("h-full", className)} data-card>
    <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 px-5 py-4">
      <div>
        {title ? <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3> : null}
        {subtitle ? <p className="mt-1 text-xs leading-5 text-[#64748B]">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
    <div className={cn("p-5", bodyClassName)}>{children}</div>
  </GlassCard>
);

export default DashboardCard;
