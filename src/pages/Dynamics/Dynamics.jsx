import { FaBriefcase, FaCubes, FaPlayCircle, FaTasks } from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "Process strength", value: "High", tone: "cyan", icon: FaCubes, detail: "Operations, CRM, and enterprise automation." },
  { label: "Reporting value", value: "Strong", tone: "emerald", icon: FaTasks, detail: "Well suited for analytics-heavy teams." },
  { label: "Business fit", value: "Wide", tone: "violet", icon: FaBriefcase, detail: "Works across operations and customer workflows." },
  { label: "Practice action", value: "Launch", tone: "amber", icon: FaPlayCircle, detail: "Jump into lab execution from here." },
];

const Dynamics = () => (
  <FeaturePage
    eyebrow="Learning"
    title="Microsoft Dynamics"
    description="Explore Dynamics through operations, CRM, and reporting scenarios that support enterprise automation."
    primaryAction={{ label: "ERP Modules", to: "/erp-modules", icon: FaCubes }}
    secondaryAction={{ label: "Practice Labs", to: "/practice-labs", icon: FaPlayCircle }}
    accent="emerald"
    score={81}
    scoreLabel="Dynamics readiness"
    summaryTitle="Dynamics focus"
    summaryPoints={[
      "Useful for organisations looking for connected business operations.",
      "Strong fit for process automation and reporting roles.",
      "Practice the workflows in labs after reviewing the module hub.",
    ]}
    stats={stats}
  >
    <div className="grid gap-4 md:grid-cols-3" data-page-enter>
      {[
        "Operations and customer management",
        "Reporting and business insight",
        "Workflow automation across teams",
      ].map((item) => (
        <GlassPanel key={item} className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {item}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Use the same SaaS flow to move from learning to practice quickly.
          </p>
        </GlassPanel>
      ))}
    </div>
  </FeaturePage>
);

export default Dynamics;
