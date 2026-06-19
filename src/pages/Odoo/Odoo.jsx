import { FaBriefcase, FaPlayCircle, FaTasks, FaUsers } from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "SMB fit", value: "Best", tone: "cyan", icon: FaUsers, detail: "Great for lean teams and lightweight operations." },
  { label: "App studio", value: "Flexible", tone: "emerald", icon: FaTasks, detail: "Useful for custom workflows and quick changes." },
  { label: "Rollout speed", value: "Fast", tone: "violet", icon: FaBriefcase, detail: "Ideal where agility matters more than heavy governance." },
  { label: "Practice action", value: "Run", tone: "amber", icon: FaPlayCircle, detail: "Move into labs for hands-on rehearsal." },
];

const Odoo = () => (
  <FeaturePage
    eyebrow="Learning"
    title="Odoo"
    description="A compact view of Odoo for SMB workflows, app configuration, and rapid operational change."
    primaryAction={{ label: "ERP Modules", to: "/erp-modules", icon: FaTasks }}
    secondaryAction={{ label: "Practice Labs", to: "/practice-labs", icon: FaPlayCircle }}
    accent="amber"
    score={76}
    scoreLabel="Odoo readiness"
    summaryTitle="Odoo focus"
    summaryPoints={[
      "Odoo is strong when a business wants flexibility and speed.",
      "The app-style model is a good fit for smaller teams.",
      "Use the learning path to keep the ERP context structured.",
    ]}
    stats={stats}
  >
    <div className="grid gap-4 md:grid-cols-3" data-page-enter>
      {[
        "SMB workflows and admin tasks",
        "App-driven business configuration",
        "Fast operational iteration",
      ].map((item) => (
        <GlassPanel key={item} className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {item}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Keep the experience practical, clean, and repeatable for small teams.
          </p>
        </GlassPanel>
      ))}
    </div>
  </FeaturePage>
);

export default Odoo;
