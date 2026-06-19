import { useMemo, useState } from "react";
import { FaCertificate, FaCheckCircle, FaRoute } from "react-icons/fa";
import ERPModuleGrid from "../../components/ERPModules/ERPModuleGrid";
import GlassPanel from "../../components/Widgets/GlassPanel";
import RecentActivityTimeline from "../../components/Widgets/RecentActivityTimeline";
import PageShell from "../DashboardPages/PageShell";
import mockData from "../../data/erpSaasMockData.json";

const statusTone = {
  Complete: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  "In progress": "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  Next: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300",
};

const LearningPath = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [completed, setCompleted] = useState(["ERP concepts"]);
  const currentModule = mockData.learning.modules[activePhase];

  const roadmap = useMemo(
    () =>
      mockData.learning.roadmap.map((item, index) => ({
        ...item,
        done: index < activePhase || item.status === "Complete",
      })),
    [activePhase],
  );

  const progress = Math.round((completed.length / (mockData.learning.modules.length || 1)) * 100);

  const markCurrentComplete = () => {
    if (!currentModule) return;
    setCompleted((current) => [...new Set([...current, currentModule.name])]);
  };

  return (
    <PageShell
      eyebrow="Learning"
      title="Learning Path"
      description="Track progress across the ERP journey and move through each step with a visible roadmap."
    >
      <section className="grid gap-4 md:grid-cols-3" data-page-enter>
        {[
          { label: "Modules completed", value: completed.length, icon: FaCheckCircle, tone: "from-emerald-500 to-teal-600" },
          { label: "Path progress", value: `${progress}%`, icon: FaRoute, tone: "from-cyan-500 to-blue-600" },
          { label: "Unlock next", value: "Certificates", icon: FaCertificate, tone: "from-violet-500 to-fuchsia-600" },
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

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" data-page-enter>
        <GlassPanel className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Step-by-step roadmap</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Click a stage to advance the path.</p>
            </div>
            <button
              type="button"
              onClick={markCurrentComplete}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            >
              Mark current complete
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {roadmap.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActivePhase(index)}
                className={`w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                  index === activePhase
                    ? "border-cyan-300 bg-cyan-50/70 dark:border-cyan-300/30 dark:bg-cyan-400/10"
                    : "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.06]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.phase}</p>
                    <h4 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h4>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[item.status] || statusTone.Next}`}>
                    {item.status}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Focus", "Track", "Review"].map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Completed vs remaining</h3>
          <div className="mt-4 space-y-3">
            {mockData.learning.modules.map((module) => {
              const done = completed.includes(module.name);
              return (
                <button
                  key={module.name}
                  type="button"
                  onClick={() =>
                    setCompleted((current) =>
                      current.includes(module.name)
                        ? current.filter((item) => item !== module.name)
                        : [...current, module.name],
                    )
                  }
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5 ${
                    done
                      ? "border-emerald-300 bg-emerald-50/70 dark:border-emerald-300/30 dark:bg-emerald-400/10"
                      : "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.06]"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">{module.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{module.track}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${done ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"}`}>
                    {done ? "Completed" : module.status}
                  </span>
                </button>
              );
            })}
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]" data-page-enter>
        <ERPModuleGrid />
        <RecentActivityTimeline />
      </section>
    </PageShell>
  );
};

export default LearningPath;
