import { createElement, lazy } from "react";
import { platformPages } from "../data/erpPlatformData";

const Home = lazy(() => import("../pages/Home/Home"));
const WhatIsERP = lazy(() => import("../pages/WhatIsERP/WhatIsERP"));
const Modules = lazy(() => import("../pages/Modules/Modules"));
const Quiz = lazy(() => import("../pages/Quiz/Quiz"));
const Roadmap = lazy(() => import("../pages/Roadmap/Roadmap"));
const Jobs = lazy(() => import("../pages/Jobs/Jobs"));
const Resources = lazy(() => import("../pages/Resources/Resources"));
const Community = lazy(() => import("../pages/Community/Community"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const Contact = lazy(() => import("../pages/Contact/Contact"));

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const EmployerDashboard = lazy(() =>
  import("../pages/EmployerDashboard/EmployerDashboard")
);
const MiniERPSimulator = lazy(() =>
  import("../pages/MiniERPSimulator/MiniERPSimulator")
);
const PracticeLabs = lazy(() => import("../pages/PracticeLabs/PracticeLabs"));
const LearningPath = lazy(() => import("../pages/LearningPath/LearningPath"));
const ERPModules = lazy(() => import("../pages/ERPModules/ERPModules"));
const SAP = lazy(() => import("../pages/SAP/SAP"));
const OracleERP = lazy(() => import("../pages/OracleERP/OracleERP"));
const Dynamics = lazy(() => import("../pages/Dynamics/Dynamics"));
const Odoo = lazy(() => import("../pages/Odoo/Odoo"));
const ERPNext = lazy(() => import("../pages/ERPNext/ERPNext"));
const CareerRoadmap = lazy(() =>
  import("../pages/CareerRoadmap/CareerRoadmap")
);
const Certificates = lazy(() => import("../pages/Certificates/Certificates"));
const Progress = lazy(() => import("../pages/Progress/Progress"));
const Analytics = lazy(() => import("../pages/Analytics/Analytics"));
const AIAssistant = lazy(() => import("../pages/AIAssistant/AIAssistant"));
const Settings = lazy(() => import("../pages/Settings/Settings"));

const featureWorkspace = (pageKey) =>
  lazy(() =>
    import("../pages/DashboardPages/FeatureWorkspace").then((module) => ({
      default: function RoutedFeatureWorkspace() {
        return createElement(module.default, { pageKey });
      },
    }))
  );

const existingDashboardPages = {
  dashboard: Dashboard,
  "employer-dashboard": EmployerDashboard,
  "erp-simulator": MiniERPSimulator,
  "learning-path": LearningPath,
  "erp-modules": ERPModules,
  sap: SAP,
  "oracle-erp": OracleERP,
  "dynamics-365": Dynamics,
  odoo: Odoo,
  erpnext: ERPNext,
  "career-roadmap": CareerRoadmap,
  certificates: Certificates,
  "progress-tracking": Progress,
  "analytics-dashboard": Analytics,
  "ai-assistant": AIAssistant,
  settings: Settings,
};

export const publicRoutes = [
  { path: "/", element: Home },
  { path: "/what-is-erp", element: WhatIsERP },
  { path: "/modules", element: Modules },
  { path: "/quiz", element: Quiz },
  { path: "/roadmap", element: Roadmap },
  { path: "/jobs", element: Jobs },
  { path: "/resources", element: Resources },
  { path: "/community", element: Community },
  { path: "/faq", element: FAQ },
  { path: "/contact", element: Contact },
];

export const dashboardRoutes = [
  ...platformPages.map((item) => ({
    path: item.path,
    element: existingDashboardPages[item.id] || featureWorkspace(item.id),
  })),
  { path: "/practice-labs", element: PracticeLabs },
  { path: "/oracle", element: OracleERP },
  { path: "/dynamics", element: Dynamics },
  { path: "/analytics", element: Analytics },
  { path: "/progress", element: Progress },
];

export const dashboardNavLinks = [{ label: "Dashboard", path: "/dashboard" }];
