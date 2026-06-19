import { FaBolt } from "react-icons/fa";
import { simulatorLabs } from "../Dashboard/dashboardData";
import GlassPanel from "../Widgets/GlassPanel";

const SimulatorHub = () => (
  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
    {simulatorLabs.map((lab) => {
      const Icon = lab.icon;

      return (
        <GlassPanel
          key={lab.name}
          className="p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/70 dark:hover:border-emerald-300/30"
          data-reveal-item
        >
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <Icon />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                {lab.name}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {lab.detail}
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"
                style={{ width: `${lab.progress}%` }}
              />
            </div>
            <span className="w-11 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">
              {lab.progress}%
            </span>
          </div>
          <button
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
            type="button"
          >
            <FaBolt />
            Launch lab
          </button>
        </GlassPanel>
      );
    })}
  </div>
);

export default SimulatorHub;
