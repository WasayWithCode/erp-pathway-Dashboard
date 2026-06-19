import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaArrowUp,
  FaBolt,
  FaCubes,
  FaUserTie,
} from "react-icons/fa";
import { quickActions } from "../../components/Dashboard/dashboardData";
import KPIGrid from "../../components/Dashboard/KPIGrid";
import GlassPanel from "../../components/Widgets/GlassPanel";
import RecentActivityTimeline from "../../components/Widgets/RecentActivityTimeline";
import PageShell from "../DashboardPages/PageShell";

const Dashboard = () => (
  <PageShell
    eyebrow="ERP SaaS Overview"
    title="Dashboard"
    description="Your executive overview for ERP readiness, recent activity, and the fastest next actions."
  >
    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]" data-page-enter>
      <GlassPanel className="overflow-hidden p-6 sm:p-8" tone="strong">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
            Enterprise ERP Learning
          </span>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 dark:bg-violet-400/15 dark:text-violet-300">
            Multi-page SaaS
          </span>
        </div>
        <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Overview only, with every ERP workflow split into its own focused workspace.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Jump into employer operations, simulator practice, ERP modules, progress analytics, or certifications from the sidebar.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            to="/erp-simulator"
          >
            <FaCubes />
            Launch simulator
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
            to="/employer-dashboard"
          >
            <FaUserTie />
            Employer dashboard
          </Link>
        </div>
      </GlassPanel>

      <GlassPanel className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          ERP readiness score
        </p>
        <div className="mt-6 grid place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white dark:from-cyan-500/20 dark:to-violet-500/20">
          <div className="relative grid h-48 w-48 place-items-center rounded-full border-[18px] border-cyan-400/25">
            <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-r-emerald-400 border-t-cyan-400" />
            <div className="text-center">
              <p className="text-5xl font-semibold">84%</p>
              <p className="mt-2 text-sm text-slate-300">career readiness</p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-100 p-4 dark:bg-white/[0.08]">
            <p className="text-2xl font-semibold text-slate-950 dark:text-white">
              25
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              ERP tracks
            </p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4 dark:bg-white/[0.08]">
            <p className="flex items-center gap-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
              <FaArrowUp /> 18%
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              monthly growth
            </p>
          </div>
        </div>
      </GlassPanel>
    </section>

    <div data-page-enter>
      <KPIGrid />
    </div>

    <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]" data-page-enter>
      <GlassPanel className="p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <FaBolt />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              Quick actions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Jump to high-value ERP workflows.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                className="group flex items-center justify-between rounded-xl bg-slate-100/80 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-cyan-100 hover:text-cyan-700 dark:bg-white/[0.08] dark:text-slate-200 dark:hover:bg-cyan-400/15 dark:hover:text-cyan-300"
                to={action.path}
              >
                <span className="flex items-center gap-3">
                  <Icon />
                  {action.label}
                </span>
                <FaArrowRight className="transition group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </GlassPanel>

      <div>
        <RecentActivityTimeline />
      </div>
    </section>
  </PageShell>
);

export default Dashboard;
