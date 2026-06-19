import { useMemo, useState } from "react";
import { FaChartLine, FaLayerGroup, FaRoute, FaTasks } from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import PageShell from "../DashboardPages/PageShell";
import mockData from "../../data/erpSaasMockData.json";

const statusTone = {
  Locked: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300",
  Unlocked: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
};

const ERPModules = () => {
  const [expanded, setExpanded] = useState(mockData.learning.modules[0].name);
  const [statuses, setStatuses] = useState(
    Object.fromEntries(mockData.learning.modules.map((module) => [module.name, module.status])),
  );

  const completion = useMemo(() => {
    const completed = Object.values(statuses).filter((status) => status === "Completed").length;
    return Math.round((completed / mockData.learning.modules.length) * 100);
  }, [statuses]);

  const cycleStatus = (name) => {
    setStatuses((current) => {
      const next = current[name] === "Locked" ? "Unlocked" : current[name] === "Unlocked" ? "Completed" : "Locked";
      return { ...current, [name]: next };
    });
  };

  return (
    <PageShell
      eyebrow="Learning"
      title="ERP Modules"
      description="Browse the ERP module stack and manage unlock status as you move through the curriculum."
    >
      <section className="grid gap-4 md:grid-cols-4" data-page-enter>
        {[
          { label: "Module completion", value: `${completion}%`, tone: "from-cyan-500 to-blue-600", icon: FaChartLine },
          { label: "Core tracks", value: 5, tone: "from-emerald-500 to-teal-600", icon: FaLayerGroup },
          { label: "Practice labs", value: 25, tone: "from-violet-500 to-fuchsia-600", icon: FaTasks },
          { label: "Next route", value: "Labs", tone: "from-amber-500 to-orange-500", icon: FaRoute },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <GlassPanel key={item.label} className="p-5">
              <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${item.tone} text-white shadow-lg`}>
                <Icon />
              </span>
              <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            </GlassPanel>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-2" data-page-enter>
        {mockData.learning.modules.map((module) => {
          const open = expanded === module.name;
          return (
            <GlassPanel key={module.name} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setExpanded(open ? "" : module.name)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    ERP Module
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                    {module.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {module.track}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[statuses[module.name]]}`}>
                  {statuses[module.name]}
                </span>
              </button>
              {open ? (
                <div className="border-t border-slate-200 p-5 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {module.progress}%
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Locked", "Unlocked", "Completed"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatuses((current) => ({ ...current, [module.name]: status }))}
                        className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                          statuses[module.name] === status
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => cycleStatus(module.name)}
                      className="rounded-full bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-500"
                    >
                      Cycle status
                    </button>
                  </div>
                </div>
              ) : null}
            </GlassPanel>
          );
        })}
      </section>

      <GlassPanel className="p-5" data-page-enter>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
            Module strategy
          </span>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 dark:bg-violet-400/15 dark:text-violet-300">
            Interactive
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Expand a module, switch its status, and use the completion bar to understand where the path is strong or still locked.
        </p>
      </GlassPanel>
    </PageShell>
  );
};

export default ERPModules;
