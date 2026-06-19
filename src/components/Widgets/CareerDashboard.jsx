import { careerRoadmap, jobRoles, skillGaps } from "../Dashboard/dashboardData";
import GlassPanel from "./GlassPanel";

const CareerDashboard = () => (
  <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
    <GlassPanel className="p-5" data-reveal-item>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        ERP Career Roadmap
      </h3>
      <div className="mt-6 space-y-4">
        {careerRoadmap.map((item, index) => (
          <div key={item.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                {index + 1}
              </span>
              {index < careerRoadmap.length - 1 ? (
                <span className="h-full w-px bg-slate-200 dark:bg-white/10" />
              ) : null}
            </div>
            <div className="pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                {item.phase} - {item.status}
              </p>
              <h4 className="mt-2 font-semibold text-slate-950 dark:text-white">
                {item.title}
              </h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>

    <GlassPanel className="p-5" data-reveal-item>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        Job Roles and Salary Insights
      </h3>
      <div className="mt-5 space-y-3">
        {jobRoles.map((item) => (
          <div key={item.role} className="rounded-xl bg-slate-100/80 p-4 dark:bg-white/[0.08]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-slate-950 dark:text-white">
                  {item.role}
                </h4>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.salary}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                {item.match}% match
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>

    <GlassPanel className="p-5 xl:col-span-2" data-reveal-item>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        Skills Gap Analysis
      </h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {skillGaps.map((item) => (
          <div key={item.skill}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {item.skill}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {item.gap}% gap
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                style={{ width: `${item.gap}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  </div>
);

export default CareerDashboard;
