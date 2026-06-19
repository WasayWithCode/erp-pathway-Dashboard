import {
  FaArrowRight,
  FaCheckCircle,
  FaFileUpload,
  FaPaperPlane,
  FaPlus,
  FaSearch,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import {
  achievements,
  candidates,
  careerRoadmap,
  employees,
  glossaryTerms,
  jobRoles,
  learningModules,
  learningProgress,
  pageByKey,
  simulatorLabs,
} from "../../data/erpPlatformData";
import GlassPanel from "../../components/Widgets/GlassPanel";
import PageShell from "./PageShell";

const toneMap = {
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
  slate: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300",
};

const Badge = ({ children, tone = "cyan" }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
      toneMap[tone] || toneMap.cyan
    }`}
  >
    {children}
  </span>
);

const ProgressRows = ({ items = learningProgress }) => (
  <div className="space-y-4">
    {items.map((item) => (
      <div key={item.label || item.name}>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {item.label || item.name}
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {item.value || item.progress}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
            style={{ width: `${item.value || item.progress}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

const MetricCards = ({ page }) => (
  <section className="grid gap-4 md:grid-cols-3" data-page-enter>
    {page.metrics.map(([label, value]) => (
      <GlassPanel
        key={label}
        className="p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/70 dark:hover:border-cyan-300/30"
      >
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {value}
        </p>
      </GlassPanel>
    ))}
  </section>
);

const StandardWorkspace = ({ page }) => {
  const Icon = page.icon;

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]" data-page-enter>
        <GlassPanel className="p-6 sm:p-8" tone="strong">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={page.tone}>{page.eyebrow}</Badge>
            <Badge tone="emerald">ERP Pathway</Badge>
          </div>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-slate-950 text-2xl text-white shadow-lg dark:bg-white dark:text-slate-950">
              <Icon />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                {page.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {page.description}
              </p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
              type="button"
            >
              <FaArrowRight />
              Continue
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
              type="button"
            >
              <FaPlus />
              Add to plan
            </button>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            Focus areas
          </h3>
          <div className="mt-5 space-y-3">
            {page.highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-slate-100/80 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-white/[0.08] dark:text-slate-200"
              >
                <FaCheckCircle className="text-emerald-600 dark:text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <MetricCards page={page} />
    </>
  );
};

const SimulatorWorkspace = ({ page }) => (
  <>
    <StandardWorkspace page={page} />
    <section className="grid gap-6 lg:grid-cols-2" data-page-enter>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          Lab queue
        </h3>
        <div className="mt-5 space-y-4">
          <ProgressRows items={simulatorLabs.slice(0, 5)} />
        </div>
      </GlassPanel>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          Transaction flow
        </h3>
        <div className="mt-5 space-y-3">
          {page.highlights.map((item, index) => (
            <div
              key={item}
              className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Step {index + 1}
              </p>
              <p className="mt-2 font-semibold text-slate-950 dark:text-white">
                {item}
              </p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </section>
  </>
);

const AiWorkspace = ({ page }) => (
  <>
    <StandardWorkspace page={page} />
    <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]" data-page-enter>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          AI workspace
        </h3>
        {page.id === "ai-resume-analyzer" ? (
          <div className="mt-5 grid min-h-56 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center dark:border-white/15 dark:bg-white/[0.06]">
            <div>
              <FaFileUpload className="mx-auto text-3xl text-cyan-600 dark:text-cyan-300" />
              <p className="mt-4 font-semibold text-slate-950 dark:text-white">
                Upload resume for ERP readiness analysis
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                PDF, DOCX, and LinkedIn export formats are supported in the product flow.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="max-w-[82%] rounded-2xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-white/[0.08] dark:text-slate-200">
              How should I improve my ERP readiness this week?
            </div>
            <div className="ml-auto max-w-[86%] rounded-2xl bg-slate-950 p-4 text-sm text-white dark:bg-white dark:text-slate-950">
              Focus on one finance lab, one procurement process map, and one interview proof story.
            </div>
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white/75 p-2 dark:border-white/10 dark:bg-white/[0.08]">
              <input
                className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none dark:text-white"
                placeholder="Ask ERP Pathway AI..."
              />
              <button
                className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                type="button"
                aria-label="Send"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
      </GlassPanel>

      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          Recommendations
        </h3>
        <div className="mt-5 space-y-3">
          {page.highlights.map((item) => (
            <div
              key={item}
              className="rounded-xl bg-slate-100/80 p-4 text-sm font-medium text-slate-700 dark:bg-white/[0.08] dark:text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </GlassPanel>
    </section>
  </>
);

const AnalyticsWorkspace = ({ page }) => (
  <>
    <StandardWorkspace page={page} />
    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]" data-page-enter>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          Capability progress
        </h3>
        <div className="mt-5">
          <ProgressRows />
        </div>
      </GlassPanel>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          Weekly activity
        </h3>
        <div className="mt-6 flex h-64 items-end gap-3 rounded-2xl bg-slate-100/70 p-4 dark:bg-white/[0.06]">
          {[64, 78, 56, 84, 72, 54, 68].map((height, index) => (
            <div key={height + index} className="flex flex-1 flex-col items-center gap-3">
              <div
                className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {"MTWTFSS"[index]}
              </span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </section>
  </>
);

const CareerWorkspace = ({ page }) => (
  <>
    <StandardWorkspace page={page} />
    <section className="grid gap-6 xl:grid-cols-2" data-page-enter>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          Roadmap
        </h3>
        <div className="mt-5 space-y-3">
          {careerRoadmap.map((item) => (
            <div key={item.phase} className="rounded-xl bg-slate-100/80 p-4 dark:bg-white/[0.08]">
              <p className="font-semibold text-slate-950 dark:text-white">{item.phase}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          Role matches
        </h3>
        <div className="mt-5 space-y-3">
          {jobRoles.map((job) => (
            <div key={job.role} className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-950 dark:text-white">{job.role}</p>
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">{job.match}%</span>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{job.salary}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </section>
  </>
);

const EmployerWorkspace = ({ page }) => (
  <>
    <StandardWorkspace page={page} />
    <GlassPanel className="overflow-hidden p-6" data-page-enter>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        {page.id === "employer-dashboard" ? "Employee table" : "Candidate table"}
      </h3>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-[0.16em] text-slate-500 dark:bg-white/[0.08] dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/10">
            {(page.id === "employer-dashboard" ? employees : candidates).map((person) => (
              <tr key={person.name} className="bg-white/50 dark:bg-white/[0.03]">
                <td className="px-4 py-4 font-semibold text-slate-950 dark:text-white">{person.name}</td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{person.role}</td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{person.dept}</td>
                <td className="px-4 py-4 text-emerald-700 dark:text-emerald-300">{person.readiness || person.score}%</td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{person.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  </>
);

const AchievementWorkspace = ({ page }) => (
  <>
    <StandardWorkspace page={page} />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-page-enter>
      {achievements.map((item) => {
        const Icon = item.icon;
        return (
          <GlassPanel key={item.title} className="p-5">
            <Icon className="text-2xl text-cyan-700 dark:text-cyan-300" />
            <p className="mt-4 font-semibold text-slate-950 dark:text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.status}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" style={{ width: `${item.progress}%` }} />
            </div>
          </GlassPanel>
        );
      })}
    </section>
    {page.id === "leaderboard" ? (
      <GlassPanel className="p-6" data-page-enter>
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Rankings</h3>
        <div className="mt-5 space-y-3">
          {["Mina Shah", "Ayesha Khan", "Daniel Ortiz", "Nora Lee"].map((name, index) => (
            <div key={name} className="flex items-center justify-between rounded-xl bg-slate-100/80 p-4 dark:bg-white/[0.08]">
              <span className="flex items-center gap-3 font-semibold text-slate-950 dark:text-white">
                <FaStar className="text-amber-500" /> #{index + 1} {name}
              </span>
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">{25810 - index * 1480} XP</span>
            </div>
          ))}
        </div>
      </GlassPanel>
    ) : null}
  </>
);

const CommunityWorkspace = ({ page }) => (
  <>
    <StandardWorkspace page={page} />
    <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]" data-page-enter>
      <GlassPanel className="p-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/78 pl-11 pr-4 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/10 dark:text-white"
            placeholder="Search community..."
          />
        </div>
        <div className="mt-5 space-y-3">
          {page.highlights.map((item) => (
            <div key={item} className="rounded-xl bg-slate-100/80 p-4 font-semibold text-slate-800 dark:bg-white/[0.08] dark:text-slate-100">
              {item}
            </div>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Recent discussions</h3>
        {["How do I explain purchase variance?", "Looking for a SAP FICO study partner", "Portfolio review: reorder scenario"].map((post) => (
          <div key={post} className="mt-4 flex gap-3 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
            <FaUserCircle className="mt-1 text-2xl text-slate-400" />
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">{post}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Updated recently</p>
            </div>
          </div>
        ))}
      </GlassPanel>
    </section>
  </>
);

const LearningWorkspace = ({ page }) => {
  const rows =
    page.id === "erp-glossary"
      ? glossaryTerms.map(([title, detail]) => ({ title, detail }))
      : learningModules.map((item) => ({ title: item.name, detail: item.track }));

  return (
    <>
      <StandardWorkspace page={page} />
      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]" data-page-enter>
        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            Progress
          </h3>
          <div className="mt-5">
            <ProgressRows />
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            Workspace content
          </h3>
          <div className="mt-5 space-y-3">
            {rows.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>
    </>
  );
};

const renderWorkspace = (page) => {
  if (page.section === "LEARNING" || page.section === "ERP SYSTEMS") return <LearningWorkspace page={page} />;
  if (page.section === "SIMULATORS") return <SimulatorWorkspace page={page} />;
  if (page.section === "AI CENTER") return <AiWorkspace page={page} />;
  if (page.section === "ANALYTICS") return <AnalyticsWorkspace page={page} />;
  if (page.section === "CAREER") return <CareerWorkspace page={page} />;
  if (page.section === "ACHIEVEMENTS") return <AchievementWorkspace page={page} />;
  if (page.section === "COMMUNITY") return <CommunityWorkspace page={page} />;
  if (page.section === "EMPLOYER") return <EmployerWorkspace page={page} />;
  return <StandardWorkspace page={page} />;
};

const FeatureWorkspace = ({ pageKey }) => {
  const page = pageByKey[pageKey];

  if (!page) {
    return (
      <PageShell
        eyebrow="Dashboard"
        title="Workspace unavailable"
        description="This workspace is not registered in the ERP Pathway navigation."
      />
    );
  }

  return (
    <PageShell eyebrow={page.eyebrow} title={page.title} description={page.description}>
      {renderWorkspace(page)}
    </PageShell>
  );
};

export default FeatureWorkspace;
