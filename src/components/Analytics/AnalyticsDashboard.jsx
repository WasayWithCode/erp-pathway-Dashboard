import {
  growthMetrics,
  learningProgress,
  skillRadar,
  weeklyActivity,
} from "../Dashboard/dashboardData";
import GlassPanel from "../Widgets/GlassPanel";

const maxHours = Math.max(...weeklyActivity.map((item) => item.hours));

const AnalyticsDashboard = () => (
  <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
    <GlassPanel className="p-5" data-reveal-item>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        Learning Progress
      </h3>
      <div className="mt-5 space-y-4">
        {learningProgress.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {item.label}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {item.value}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>

    <GlassPanel className="p-5" data-reveal-item>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        Weekly Activity
      </h3>
      <div className="mt-6 flex h-56 items-end gap-3">
        {weeklyActivity.map((item) => (
          <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-44 w-full items-end rounded-full bg-slate-100 p-1 dark:bg-white/[0.08]">
              <div
                className="w-full rounded-full bg-gradient-to-t from-blue-600 via-cyan-500 to-emerald-400"
                style={{ height: `${(item.hours / maxHours) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </GlassPanel>

    <GlassPanel className="p-5" data-reveal-item>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        Skill Radar
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {skillRadar.map((item) => (
          <div key={item.skill} className="rounded-xl bg-slate-100/80 p-4 dark:bg-white/[0.08]">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {item.skill}
              </span>
              <span className="font-semibold text-cyan-700 dark:text-cyan-300">
                {item.value}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white dark:bg-black/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>

    <GlassPanel className="p-5" data-reveal-item>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        Growth Metrics
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {growthMetrics.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.08]">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
              {item.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              {item.change}
            </p>
          </div>
        ))}
      </div>
    </GlassPanel>
  </div>
);

export default AnalyticsDashboard;
