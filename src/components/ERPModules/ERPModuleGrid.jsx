import { FaPlayCircle } from "react-icons/fa";
import { learningModules } from "../Dashboard/dashboardData";
import GlassPanel from "../Widgets/GlassPanel";

const ERPModuleGrid = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
    {learningModules.map((module) => {
      const Icon = module.icon;

      return (
        <GlassPanel
          key={module.name}
          className="group flex min-h-[230px] flex-col justify-between overflow-hidden p-5 transition duration-300 hover:-translate-y-1"
          data-reveal-item
        >
          <div>
            <div
              className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${module.color} text-white shadow-lg`}
            >
              <Icon />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">
              {module.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {module.track}
            </p>
          </div>
          <div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {module.progress}% ready
              </span>
              <button
                className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white transition hover:scale-105 dark:bg-white dark:text-slate-950"
                type="button"
                aria-label={`Start ${module.name}`}
              >
                <FaPlayCircle />
              </button>
            </div>
          </div>
        </GlassPanel>
      );
    })}
  </div>
);

export default ERPModuleGrid;
