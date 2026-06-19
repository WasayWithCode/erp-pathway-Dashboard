import { useMemo, useState } from "react";
import { FaAward, FaCertificate, FaChartLine, FaDownload, FaLock, FaRoute } from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import PageShell from "../DashboardPages/PageShell";
import mockData from "../../data/erpSaasMockData.json";

const statusTone = {
  Earned: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  "In progress": "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  Milestone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
  Locked: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300",
};

const Certificates = () => {
  const [uploaded, setUploaded] = useState([]);

  const items = useMemo(
    () =>
      mockData.certificates.items.map((item) => ({
        ...item,
        unlocked: item.progress >= 60 || item.status === "Earned",
      })),
    [],
  );

  const unlockCount = items.filter((item) => item.unlocked).length;
  const progress = Math.round((unlockCount / items.length) * 100);

  const toggleDownload = (title) => {
    setUploaded((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  };

  return (
    <PageShell
      eyebrow="Career"
      title="Certificates"
      description="Track progress-based unlocking and keep your ERP credentials ready for sharing."
    >
      <section className="grid gap-4 md:grid-cols-4" data-page-enter>
        {[
          { label: "Unlocked", value: unlockCount, tone: "from-emerald-500 to-teal-600", icon: FaAward },
          { label: "Certificates", value: items.length, tone: "from-cyan-500 to-blue-600", icon: FaCertificate },
          { label: "Unlock rate", value: `${progress}%`, tone: "from-violet-500 to-fuchsia-600", icon: FaChartLine },
          { label: "Next milestone", value: "Roadmap", tone: "from-amber-500 to-orange-500", icon: FaRoute },
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

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]" data-page-enter>
        <GlassPanel className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Earned certificates</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Downloadable cards unlock as your progress grows.</p>
            </div>
            <button
              type="button"
              className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200"
              onClick={() => toggleDownload("bulk")}
            >
              Bulk download
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {items.map((item) => {
              const unlocked = item.unlocked;
              const saved = uploaded.includes(item.title) || uploaded.includes("bulk");
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-950 dark:text-white">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Progress {item.progress}%</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[item.status] || statusTone.Locked}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleDownload(item.title)}
                      disabled={!unlocked}
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        unlocked
                          ? "bg-slate-950 text-white hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                          : "cursor-not-allowed bg-slate-100 text-slate-400 opacity-60 dark:bg-white/10 dark:text-slate-500"
                      }`}
                    >
                      {unlocked ? <FaDownload /> : <FaLock />}
                      {saved ? "Downloaded" : unlocked ? "Download" : "Locked"}
                    </button>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {unlocked ? "Ready to share" : "Complete more modules"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Unlock system</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
              Certificates unlock when the path passes the progress threshold.
            </div>
            <div className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
              Download buttons simulate file creation and mark the card as saved.
            </div>
            <div className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
              Use the roadmap and progress pages to raise the unlock rate.
            </div>
          </div>
        </GlassPanel>
      </section>
    </PageShell>
  );
};

export default Certificates;
