import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaGripLines,
  FaTimes,
} from "react-icons/fa";
import { sidebarSections } from "../Dashboard/dashboardData";

const displaySectionLabel = (label) => (label === "AI CENTER" ? "AI" : label);

const DashboardSidebar = ({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}) => {
  const sidebarRef = useRef(null);
  const location = useLocation();
  const displayedSections = useMemo(
    () =>
      sidebarSections.map((section) => {
        const seen = new Set();
        return {
          ...section,
          items: section.items.filter((item) => {
            if (seen.has(item.path)) return false;
            seen.add(item.path);
            return true;
          }),
        };
      }),
    [],
  );

  useEffect(() => {
    if (!sidebarRef.current) return undefined;

    const items = sidebarRef.current.querySelectorAll("[data-sidebar-item]");
    const tween = gsap.fromTo(
      items,
      { autoAlpha: 0, x: -12 },
      { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.04, ease: "power3.out" },
    );

    return () => tween.kill();
  }, [collapsed]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-sm transition duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
      />
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-[80] flex w-[18rem] flex-col border-r border-slate-200/80 bg-white/88 shadow-[18px_0_70px_rgba(15,23,42,0.09)] backdrop-blur-xl transition-[width,transform] duration-300 ease-out dark:border-white/10 dark:bg-[#111827]/88 dark:shadow-[18px_0_80px_rgba(0,0,0,0.35)] lg:translate-x-0 ${
          collapsed ? "lg:w-[5.5rem]" : "lg:w-[18rem]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between gap-3 border-b border-slate-200/70 px-4 dark:border-white/10">
          <div className={`flex min-w-0 items-center gap-3 ${collapsed ? "lg:justify-center" : ""}`}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)]">
              <FaGraduationCap />
            </span>
            {!collapsed ? (
              <span className="min-w-0">
                <span className="block truncate text-base font-semibold text-slate-950 dark:text-white">
                  ERP Pathway
                </span>
                <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                  Learning command center
                </span>
              </span>
            ) : null}
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
            type="button"
            aria-label="Close sidebar"
            onClick={onCloseMobile}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
          {displayedSections.map((section) => (
            <div
              key={section.label}
              className="border-b border-slate-200/60 pb-4 last:border-b-0 last:pb-0 dark:border-white/10"
              data-sidebar-item
            >
              {!collapsed ? (
                <p className="mb-2 px-3 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  {displaySectionLabel(section.label)}
                </p>
              ) : (
                <div className="mb-2 hidden justify-center lg:flex">
                  <FaGripLines className="text-[0.62rem] text-slate-300 dark:text-slate-600" />
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const to = item.path;
                  const active = location.pathname === item.path;

                  return (
                    <Link
                      key={item.id}
                      to={to}
                      onClick={onCloseMobile}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
                        active
                          ? "bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] dark:bg-white dark:text-slate-950"
                          : "text-slate-600 hover:bg-slate-100/85 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      {active ? (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.45)]" />
                      ) : null}
                      <Icon className={`shrink-0 text-[0.95rem] ${active ? "" : "text-slate-400 transition group-hover:text-slate-700 dark:group-hover:text-slate-100"}`} />
                      {!collapsed ? (
                        <span className="truncate">{item.label}</span>
                      ) : (
                        <span className="pointer-events-none absolute left-[calc(100%+0.7rem)] top-1/2 z-[90] hidden -translate-y-1/2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 opacity-0 shadow-[0_14px_34px_rgba(15,23,42,0.16)] transition duration-200 group-hover:translate-x-1 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 lg:block">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden border-t border-slate-200/70 p-3 dark:border-white/10 lg:block">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-700 outline-none transition duration-200 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15 dark:focus-visible:ring-offset-slate-900"
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            {!collapsed ? <span>Collapse</span> : null}
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
