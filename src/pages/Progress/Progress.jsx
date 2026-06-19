import { FaChartLine, FaClock, FaRoute, FaUsers } from "react-icons/fa";
import AnalyticsDashboard from "../../components/Analytics/AnalyticsDashboard";
import RecentActivityTimeline from "../../components/Widgets/RecentActivityTimeline";
import GlassPanel from "../../components/Widgets/GlassPanel";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "Learning hours", value: 124, tone: "cyan", icon: FaClock, detail: "Time invested in guided labs and review." },
  { label: "Skill uplift", value: "+18%", tone: "emerald", icon: FaChartLine, detail: "Progress compared with the last checkpoint." },
  { label: "Active cohorts", value: 5, tone: "violet", icon: FaUsers, detail: "Current learning groups and tracks." },
  { label: "Recommended route", value: "Guided", tone: "amber", icon: FaRoute, detail: "Follow the path that keeps momentum steady." },
];

const Progress = () => (
  <FeaturePage
    eyebrow="Career"
    title="Progress Tracking"
    description="Monitor momentum, learning consistency, and the next best step in your ERP path."
    primaryAction={{ label: "Certificates", to: "/certificates", icon: FaRoute }}
    secondaryAction={{ label: "Analytics", to: "/analytics", icon: FaChartLine }}
    accent="violet"
    score={86}
    scoreLabel="progress score"
    summaryTitle="Tracking focus"
    summaryPoints={[
      "Use the progress page to see whether learning is building steadily.",
      "Recent activity should connect back to visible milestones.",
      "Pair this with analytics for a complete readiness picture.",
    ]}
    stats={stats}
  >
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" data-page-enter>
      <AnalyticsDashboard />
      <div className="space-y-4">
        <GlassPanel className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            Progress markers
          </h3>
          <div className="mt-4 space-y-3">
            {[
              "Module completion score is above the baseline target.",
              "Consistency is strong enough to support career readiness gains.",
              "Keep the next session short and focused on the active module.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-white/[0.08] dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </GlassPanel>
        <RecentActivityTimeline />
      </div>
    </div>
  </FeaturePage>
);

export default Progress;
