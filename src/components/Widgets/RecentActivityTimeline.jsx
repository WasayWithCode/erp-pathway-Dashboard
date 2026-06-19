import { recentActivity } from "../Dashboard/dashboardData";
import GlassPanel from "./GlassPanel";

const RecentActivityTimeline = () => (
  <GlassPanel className="p-5" data-reveal-item>
    <div className="space-y-5">
      {recentActivity.map((item, index) => {
        const Icon = item.icon;

        return (
          <div key={item.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                <Icon />
              </span>
              {index < recentActivity.length - 1 ? (
                <span className="mt-2 h-full w-px bg-slate-200 dark:bg-white/10" />
              ) : null}
            </div>
            <div className="pb-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {item.time}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </GlassPanel>
);

export default RecentActivityTimeline;
