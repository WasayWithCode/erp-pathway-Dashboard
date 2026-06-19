import { kpis } from "./dashboardData";
import KPICard from "./KPICard";

const KPIGrid = () => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
    {kpis.map((item) => (
      <KPICard key={item.label} item={item} />
    ))}
  </div>
);

export default KPIGrid;
