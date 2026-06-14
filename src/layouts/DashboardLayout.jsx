import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AIMentorWidget from "../components/AIMentorWidget";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const SECTION_LABELS = {
  overview: "Overview",
  "erp-dashboard": "ERP Dashboard",
  "erp-invoices": "Invoices",
  "erp-employees": "Employees",
  "erp-inventory": "Inventory",
  "employer-analytics": "Employer Analytics",
  "employer-job-posts": "Job Posts",
  "employer-candidates": "Candidates",
  "employer-talent": "Talent Matching",
  "learning-progress": "Learning Progress",
  certificates: "Certificates",
  settings: "Settings",
};

const DashboardLayout = ({
  children,
  activeSection: controlledSection,
  onSectionChange,
}) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [internalSection, setInternalSection] = useState("overview");
  const activeSection = controlledSection ?? internalSection;
  const setActiveSection = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    if (controlledSection === undefined) {
      setInternalSection(section);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";

    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "";
    };
  }, [darkMode]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((current) => !current);
  }, []);

  const breadcrumbs = useMemo(() => {
    const sectionLabel = SECTION_LABELS[activeSection] || "Dashboard";
    return `dashboard / ${sectionLabel.toLowerCase()}`;
  }, [activeSection]);

  const sidebarWidth = collapsed ? "lg:pl-[88px]" : "lg:pl-[280px]";

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950 antialiased dark:bg-[#050814] dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-10 h-[34rem] w-[34rem] rounded-full bg-violet-500/18 blur-[130px]" />
        <div className="absolute bottom-[-16rem] left-[34%] h-[34rem] w-[34rem] rounded-full bg-blue-500/16 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      </div>

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        activeSection={activeSection}
        onSelectSection={(section) => {
          setActiveSection(section);
          setMobileOpen(false);
        }}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleCollapsed={toggleCollapsed}
      />

      <div
        className={`relative min-h-screen w-full transition-[padding] duration-300 ${sidebarWidth}`}
      >
        <Header
          breadcrumbs={breadcrumbs}
          darkMode={darkMode}
          onOpenMobile={() => setMobileOpen(true)}
          onToggleDarkMode={() => setDarkMode((current) => !current)}
        />

        <main className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-5 sm:px-6 lg:px-8">
          {typeof children === "function"
            ? children({ activeSection, setActiveSection })
            : children || <Outlet />}
        </main>
      </div>

      <AIMentorWidget />
    </div>
  );
};

export default DashboardLayout;
