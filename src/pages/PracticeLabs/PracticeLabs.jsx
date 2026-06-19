import { FaCubes, FaFlask, FaPlayCircle, FaRoute } from "react-icons/fa";
import SimulatorHub from "../../components/ERPModules/SimulatorHub";
import FeaturePage from "../PageTemplates/FeaturePage";

const stats = [
  { label: "Lab count", value: 6, tone: "cyan", icon: FaFlask, detail: "Finance, HR, inventory, sales, procurement, supply chain." },
  { label: "Practice mode", value: "Live", tone: "emerald", icon: FaCubes, detail: "Interactive lab cards and launch actions." },
  { label: "Recommended flow", value: "Guided", tone: "violet", icon: FaRoute, detail: "Move from simulator to topic-specific labs." },
  { label: "Primary action", value: "Launch", tone: "amber", icon: FaPlayCircle, detail: "Use the hub to open a focused exercise." },
];

const PracticeLabs = () => (
  <FeaturePage
    eyebrow="Practice"
    title="Practice Labs"
    description="A compact practice workspace for ERP tasks, lab launches, and scenario-based learning."
    primaryAction={{ label: "ERP Simulator", to: "/erp-simulator", icon: FaCubes }}
    secondaryAction={{ label: "Learning Path", to: "/learning-path", icon: FaRoute }}
    accent="emerald"
    score={82}
    scoreLabel="practice readiness"
    summaryTitle="Lab rhythm"
    summaryPoints={[
      "Use the labs to rehearse a concept immediately after learning it.",
      "Keep short practice cycles to improve retention and speed.",
      "Return here whenever you need focused ERP repetitions.",
    ]}
    stats={stats}
  >
    <div data-page-enter>
      <SimulatorHub />
    </div>
  </FeaturePage>
);

export default PracticeLabs;
