import { lazy } from "react";

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
const EmployerDashboard = lazy(() => import("../pages/EmployerDashboard"));
const MiniERPSimulator = lazy(() => import("../pages/MiniERPSimulator"));

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
  { path: "/employer-dashboard", element: EmployerDashboard },
  { path: "/erp-simulator", element: MiniERPSimulator },
];

export const dashboardNavLinks = [
  { label: "Employer Dashboard", path: "/employer-dashboard" },
  { label: "ERP Simulator", path: "/erp-simulator" },
];
