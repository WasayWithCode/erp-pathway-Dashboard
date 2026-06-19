import { FaChartLine, FaChartPie, FaRoute, FaUsers } from "react-icons/fa";
import AnalyticsDashboard from "../../components/Analytics/AnalyticsDashboard";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "Readiness trend", value: "Up", tone: "cyan", icon: FaChartLine, detail: "Movement across learning progress and activity." },
  { label: "Skill density", value: "High", tone: "emerald", icon: FaChartPie, detail: "Signals across modules, practice, and career pages." },
  { label: "Active learners", value: 312, tone: "violet", icon: FaUsers, detail: "Students currently moving through the ERP path." },
  { label: "Next analysis", value: "Route", tone: "amber", icon: FaRoute, detail: "Review the route that needs attention next." },
];

const Analytics = () => (
  <FeaturePage
    eyebrow="Insights"
    title="Analytics"
    description="Performance snapshots for learning progress, skill trends, and ERP readiness signals."
    primaryAction={{ label: "Progress Tracking", to: "/progress", icon: FaChartLine }}
    secondaryAction={{ label: "Dashboard", to: "/dashboard", icon: FaRoute }}
    accent="cyan"
    score={91}
    scoreLabel="insight score"
    summaryTitle="Analytics focus"
    summaryPoints={[
      "This page should answer what is working and what needs more attention.",
      "Use it to compare progress, skills, and readiness patterns.",
      "Pair the charts with the dashboard overview for a quick executive read.",
    ]}
    stats={stats}
  >
    <div data-page-enter>
      <AnalyticsDashboard />
    </div>
  </FeaturePage>
);

export default Analytics;
