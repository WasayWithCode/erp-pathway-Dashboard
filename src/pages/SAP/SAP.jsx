import { FaBriefcase, FaIndustry, FaPlayCircle, FaUsers } from "react-icons/fa";
import FeaturePage from "../PageTemplates/FeaturePage";
import GlassPanel from "../../components/Widgets/GlassPanel";

const stats = [
  { label: "Core focus", value: "FICO", tone: "cyan", icon: FaIndustry, detail: "Finance, controlling, and enterprise finance flows." },
  { label: "Supported areas", value: 3, tone: "emerald", icon: FaUsers, detail: "FI, MM, and SD aligned to ERP fundamentals." },
  { label: "Implementation depth", value: "High", tone: "violet", icon: FaBriefcase, detail: "Good for enterprise consulting and rollout work." },
  { label: "Practice action", value: "Start", tone: "amber", icon: FaPlayCircle, detail: "Move from concepts to lab execution quickly." },
];

const SAP = () => (
  <FeaturePage
    eyebrow="Learning"
    title="SAP"
    description="Explore SAP foundations with a practical focus on finance, materials, and sales workflows."
    primaryAction={{ label: "ERP Modules", to: "/erp-modules", icon: FaIndustry }}
    secondaryAction={{ label: "Practice Labs", to: "/practice-labs", icon: FaPlayCircle }}
    accent="cyan"
    score={88}
    scoreLabel="SAP readiness"
    summaryTitle="SAP focus"
    summaryPoints={[
      "SAP is the most common enterprise platform in the path.",
      "Finance and operations roles depend on its core business objects.",
      "Start here if you want the strongest enterprise consulting signal.",
    ]}
    stats={stats}
  >
    <div className="grid gap-4 md:grid-cols-3" data-page-enter>
      {[
        "Financial accounting and controlling",
        "Materials management and procurement",
        "Sales distribution and order flow",
      ].map((item) => (
        <GlassPanel key={item} className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {item}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Understand the process flow, then practice with the simulator and module hub.
          </p>
        </GlassPanel>
      ))}
    </div>
  </FeaturePage>
);

export default SAP;
