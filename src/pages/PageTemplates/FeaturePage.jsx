import { Link } from "react-router-dom";
import GlassPanel from "../../components/Widgets/GlassPanel";
import PageShell from "../DashboardPages/PageShell";

const accentMap = {
  cyan: "from-cyan-500 to-blue-600",
  violet: "from-violet-500 to-fuchsia-600",
  emerald: "from-emerald-500 to-teal-600",
  amber: "from-amber-500 to-orange-500",
};

const badgeMap = {
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
};

const StatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <GlassPanel className="p-5">
      <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${accentMap[item.tone] || accentMap.cyan} text-white shadow-lg`}>
        <Icon />
      </span>
      <p className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">
        {item.value}
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
      {item.detail ? (
        <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {item.detail}
        </p>
      ) : null}
    </GlassPanel>
  );
};

const FeaturePage = ({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  accent = "cyan",
  score,
  scoreLabel,
  summaryTitle,
  summaryPoints = [],
  stats = [],
  children,
}) => (
  <PageShell eyebrow={eyebrow} title={title} description={description}>
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]" data-page-enter>
      <GlassPanel className="overflow-hidden p-6 sm:p-8" tone="strong">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
            {eyebrow}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${badgeMap[accent] || badgeMap.cyan}`}>
            Enterprise ERP
          </span>
        </div>
        <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          {primaryAction ? (
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
              to={primaryAction.to}
            >
              {primaryAction.icon ? <primaryAction.icon /> : null}
              {primaryAction.label}
            </Link>
          ) : null}
          {secondaryAction ? (
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
              to={secondaryAction.to}
            >
              {secondaryAction.icon ? <secondaryAction.icon /> : null}
              {secondaryAction.label}
            </Link>
          ) : null}
        </div>
      </GlassPanel>

      <GlassPanel className="p-6">
        {score != null ? (
          <div className="grid place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white dark:from-cyan-500/20 dark:to-violet-500/20">
            <div className="relative grid h-48 w-48 place-items-center rounded-full border-[18px] border-cyan-400/25">
              <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-r-emerald-400 border-t-cyan-400" />
              <div className="text-center">
                <p className="text-5xl font-semibold">{score}%</p>
                <p className="mt-2 text-sm text-slate-300">
                  {scoreLabel || "workspace health"}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        {summaryTitle ? (
          <div className={`${score != null ? "mt-5" : ""}`}>
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
              {summaryTitle}
            </h3>
            <div className="mt-4 space-y-3">
              {summaryPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-white/[0.08] dark:text-slate-200"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </GlassPanel>
    </section>

    {stats.length ? (
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-page-enter>
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>
    ) : null}

    {children}
  </PageShell>
);

export default FeaturePage;
