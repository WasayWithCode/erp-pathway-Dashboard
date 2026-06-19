import { FaDatabase, FaBriefcase, FaPlayCircle, FaRoute } from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "Finance depth", value: "Strong", tone: "cyan", icon: FaDatabase, detail: "Great for financials, supply chain, and reporting." },
  { label: "Enterprise usage", value: "Broad", tone: "emerald", icon: FaBriefcase, detail: "Used in complex finance and operations environments." },
  { label: "Implementation style", value: "Structured", tone: "violet", icon: FaRoute, detail: "Good fit for process-heavy rollouts." },
  { label: "Practice action", value: "Open", tone: "amber", icon: FaPlayCircle, detail: "Pair learning with simulator drills." },
];

const OracleERP = () => (
  <FeaturePage
    eyebrow="Learning"
    title="Oracle ERP"
    description="A practical view of Oracle ERP with emphasis on finance, procurement, and process-driven reporting."
    primaryAction={{ label: "Learning Path", to: "/learning-path", icon: FaRoute }}
    secondaryAction={{ label: "ERP Simulator", to: "/erp-simulator", icon: FaPlayCircle }}
    accent="violet"
    score={84}
    scoreLabel="Oracle readiness"
    summaryTitle="Oracle focus"
    summaryPoints={[
      "Useful for organisations that want tightly controlled process flows.",
      "Strong finance and reporting coverage across enterprise teams.",
      "Best learned alongside the ERP modules and practice labs.",
    ]}
    stats={stats}
  >
    <div className="grid gap-4 md:grid-cols-3" data-page-enter>
      {[
        "Procure-to-pay and vendor controls",
        "Financial close and reporting discipline",
        "Enterprise reporting and data flows",
      ].map((item) => (
        <GlassPanel key={item} className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {item}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Map the process, then use the simulator to rehearse the workflow.
          </p>
        </GlassPanel>
      ))}
    </div>
  </FeaturePage>
);

export default OracleERP;
