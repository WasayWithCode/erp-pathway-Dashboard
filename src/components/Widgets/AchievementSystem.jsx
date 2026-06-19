import { achievements } from "../Dashboard/dashboardData";
import GlassPanel from "./GlassPanel";

const AchievementSystem = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {achievements.map((item) => {
      const Icon = item.icon;

      return (
        <GlassPanel key={item.title} className="p-5" data-reveal-item>
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow-lg">
              <Icon />
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
              {item.status}
            </span>
          </div>
          <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
            {item.title}
          </h3>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {item.progress}% milestone progress
          </p>
        </GlassPanel>
      );
    })}
  </div>
);

export default AchievementSystem;
