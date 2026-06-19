import { FaBriefcase, FaChartLine, FaCertificate, FaRoute } from "react-icons/fa";
import CareerDashboard from "../../components/Widgets/CareerDashboard";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "Target role", value: "ERP Analyst", tone: "cyan", icon: FaBriefcase, detail: "Start with a practical enterprise entry role." },
  { label: "Match score", value: "84%", tone: "emerald", icon: FaChartLine, detail: "How closely your current path fits the market." },
  { label: "Next milestone", value: "Certs", tone: "violet", icon: FaCertificate, detail: "Use proof points to strengthen your profile." },
  { label: "Roadmap state", value: "Guided", tone: "amber", icon: FaRoute, detail: "Follow the recommended sequence." },
];

const CareerRoadmap = () => (
  <FeaturePage
    eyebrow="Career"
    title="Career Roadmap"
    description="A practical route from learning completion to role readiness and enterprise career growth."
    primaryAction={{ label: "Certificates", to: "/certificates", icon: FaCertificate }}
    secondaryAction={{ label: "Progress Tracking", to: "/progress", icon: FaChartLine }}
    accent="cyan"
    score={84}
    scoreLabel="career readiness"
    summaryTitle="Career focus"
    summaryPoints={[
      "Roadmap pages should feel like a clear progression, not a crowded dashboard.",
      "Use certifications and progress tracking to validate each step.",
      "Review target roles after each module milestone.",
    ]}
    stats={stats}
  >
    <div data-page-enter>
      <CareerDashboard />
    </div>
  </FeaturePage>
);

export default CareerRoadmap;
