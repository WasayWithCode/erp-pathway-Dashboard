import { useState } from "react";
import {
  FaBars,
  FaBell,
  FaMoon,
  FaPlus,
  FaSearch,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";
import { notifications, quickActions } from "../Dashboard/dashboardData";

const DashboardNavbar = ({
  darkMode,
  onOpenMobile,
  onQuickAction,
  onToggleTheme,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/72 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0f172a]/72">
      <div className="flex min-h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white lg:hidden"
          type="button"
          aria-label="Open dashboard menu"
          onClick={onOpenMobile}
        >
          <FaBars />
        </button>

        <div className="relative hidden min-w-0 flex-1 sm:block">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/78 pl-11 pr-4 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/10 dark:text-white"
            placeholder="Search modules, labs, roles, certificates..."
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              type="button"
              onClick={() => setShowActions((current) => !current)}
            >
              <FaPlus />
              <span className="hidden md:inline">Quick Actions</span>
            </button>
            {showActions ? (
              <div className="absolute right-0 top-14 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-slate-900">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.label}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                      type="button"
                      onClick={() => {
                        onQuickAction(action.path);
                        setShowActions(false);
                      }}
                    >
                      <Icon className="text-cyan-600 dark:text-cyan-300" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            type="button"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <div className="relative">
            <button
              className="relative grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              type="button"
              aria-label="Open notifications"
              onClick={() => setShowNotifications((current) => !current)}
            >
              <FaBell />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            {showNotifications ? (
              <div className="absolute right-0 top-14 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-slate-900">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Notifications
                </p>
                <div className="space-y-2">
                  {notifications.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="flex gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.08]">
                        <span className="mt-1 text-cyan-600 dark:text-cyan-300">
                          <Icon />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-950 dark:text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <button
            className="hidden h-11 items-center gap-3 rounded-xl bg-slate-100 px-3 text-left transition hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 md:flex"
            type="button"
          >
            <FaUserCircle className="text-xl text-slate-600 dark:text-slate-300" />
            <span>
              <span className="block text-sm font-semibold text-slate-950 dark:text-white">
                Ayesha Khan
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                ERP Learner
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
