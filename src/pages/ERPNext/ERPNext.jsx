import { FaBriefcase, FaPlayCircle, FaShieldAlt, FaTasks } from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "Open source", value: "Yes", tone: "cyan", icon: FaShieldAlt, detail: "Ideal for teams that want flexibility and ownership." },
  { label: "Manufacturing", value: "Strong", tone: "emerald", icon: FaTasks, detail: "Good support for production and warehouse flows." },
  { label: "Customization", value: "High", tone: "violet", icon: FaBriefcase, detail: "Useful when business processes change often." },
  { label: "Practice action", value: "Open", tone: "amber", icon: FaPlayCircle, detail: "Transition into hands-on work when ready." },
];

const ERPNext = () => (
  <FeaturePage
    eyebrow="Learning"
    title="ERPNext"
    description="Explore ERPNext as a modern open-source ERP option for teams that value customization and ownership."
    primaryAction={{ label: "ERP Modules", to: "/erp-modules", icon: FaTasks }}
    secondaryAction={{ label: "Practice Labs", to: "/practice-labs", icon: FaPlayCircle }}
    accent="violet"
    score={79}
    scoreLabel="ERPNext readiness"
    summaryTitle="ERPNext focus"
    summaryPoints={[
      "Great choice for businesses that want a flexible open-source stack.",
      "Manufacturing and service operations both fit well in this route.",
      "Use the simulator to reinforce the process-first approach.",
    ]}
    stats={stats}
  >
    <div className="grid gap-4 md:grid-cols-3" data-page-enter>
      {[
        "Open-source ownership and control",
        "Manufacturing and operations flows",
        "Adaptable configuration strategy",
      ].map((item) => (
        <GlassPanel key={item} className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {item}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            A good route for learners who want a practical and flexible ERP stack.
          </p>
        </GlassPanel>
      ))}
    </div>
  </FeaturePage>
);

export default ERPNext;
