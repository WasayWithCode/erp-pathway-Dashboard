import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/Navbar/DashboardNavbar";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";

const THEME_EVENT = "erp-theme-change";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = window.localStorage.getItem("erp-dashboard-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    window.localStorage.setItem("erp-dashboard-theme", darkMode ? "dark" : "light");

    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "";
    };
  }, [darkMode]);

  useEffect(() => {
    const handleThemeChange = (event) => {
      const nextTheme = event.detail?.theme;
      if (nextTheme === "dark" || nextTheme === "light") {
        setDarkMode(nextTheme === "dark");
      }
    };

    window.addEventListener(THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_EVENT, handleThemeChange);
  }, []);

  const handleNavigate = useCallback(
    (path) => {
      if (!path) return;
      navigate(path);
      setMobileOpen(false);
    },
    [navigate],
  );

  const sidebarOffset = collapsed ? "lg:pl-[5.5rem]" : "lg:pl-[18rem]";

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950 antialiased dark:bg-[#0b1120] dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]" />
        <div className="absolute left-[-12rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/18 blur-[130px]" />
        <div className="absolute right-[-10rem] top-24 h-[26rem] w-[26rem] rounded-full bg-violet-500/16 blur-[120px]" />
        <div className="absolute bottom-[-12rem] left-[35%] h-[28rem] w-[28rem] rounded-full bg-emerald-400/14 blur-[130px]" />
      </div>

      <DashboardSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleCollapsed={() => setCollapsed((current) => !current)}
      />

      <div className={`relative min-h-screen transition-[padding] duration-300 ${sidebarOffset}`}>
        <DashboardNavbar
          darkMode={darkMode}
          onOpenMobile={() => setMobileOpen(true)}
          onQuickAction={handleNavigate}
          onToggleTheme={() => setDarkMode((current) => !current)}
        />

        <main className="mx-auto w-full max-w-[1660px] px-4 pb-28 pt-6 sm:px-6 lg:px-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
