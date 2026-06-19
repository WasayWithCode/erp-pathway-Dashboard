import { useEffect, useMemo, useState } from "react";
import { FaCog, FaMoon, FaShieldAlt, FaSun, FaUserTie } from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import FeaturePage from "../PageTemplates/FeaturePage";
import mockData from "../../data/erpSaasMockData.json";

const THEME_EVENT = "erp-theme-change";

const stats = [
  { label: "Theme", value: "Adaptive", tone: "cyan", icon: FaMoon, detail: "Enterprise-friendly visual mode." },
  { label: "Account", value: "Active", tone: "emerald", icon: FaUserTie, detail: "Profile and access state." },
  { label: "Security", value: "Enabled", tone: "violet", icon: FaShieldAlt, detail: "Core protections are on." },
  { label: "System", value: "Ready", tone: "amber", icon: FaCog, detail: "Platform settings are healthy." },
];

const preferenceLabels = {
  appearance: "Appearance",
  notifications: "Notifications",
  security: "Security",
  productivity: "Productivity",
};

const Settings = () => {
  const [theme, setTheme] = useState(() => window.localStorage.getItem("erp-dashboard-theme") || "dark");
  const [profile, setProfile] = useState(mockData.settings.profile);
  const [preferences, setPreferences] = useState(mockData.settings.preferences);
  const [saved, setSaved] = useState(false);

  const preferenceItems = useMemo(
    () => Object.entries(preferences).map(([key, value]) => ({ key, value, label: preferenceLabels[key] || key })),
    [preferences],
  );

  const applyTheme = (nextTheme) => {
    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { theme: nextTheme } }));
  };

  useEffect(() => {
    const handleThemeChange = (event) => {
      const nextTheme = event.detail?.theme;
      if (nextTheme === "dark" || nextTheme === "light") {
        setTheme(nextTheme);
      }
    };

    window.addEventListener(THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_EVENT, handleThemeChange);
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <FeaturePage
      eyebrow="System"
      title="Settings"
      description="Tune workspace preferences, security, and notification behaviour for the ERP platform."
      primaryAction={{ label: "AI Assistant", to: "/ai-assistant", icon: FaUserTie }}
      secondaryAction={{ label: "Dashboard", to: "/dashboard", icon: FaCog }}
      accent="violet"
      score={93}
      scoreLabel="system health"
      summaryTitle="Settings focus"
      summaryPoints={[
        "Keep the workspace visually calm and easy to scan.",
        "Maintain only the notifications and preferences that matter.",
        "Security and profile details should be easy to review.",
      ]}
      stats={stats}
    >
      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]" data-page-enter>
        <GlassPanel className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Profile settings</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Update the visible profile that appears across the workspace.</p>
            </div>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
              {saved ? "Saved" : "Unsaved changes"}
            </span>
          </div>

          <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSave}>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Display name</span>
              <input
                type="text"
                value={profile.name}
                onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Role title</span>
              <input
                type="text"
                value={profile.title}
                onChange={(event) => setProfile((current) => ({ ...current, title: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Career goal</span>
              <input
                type="text"
                value={profile.goal}
                onChange={(event) => setProfile((current) => ({ ...current, goal: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
            </label>

            <div className="md:col-span-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setProfile(mockData.settings.profile)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
              >
                Reset profile
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
              >
                Save profile
              </button>
            </div>
          </form>
        </GlassPanel>

        <GlassPanel className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Theme and preferences</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Control the platform look and practical workspace defaults.</p>
            </div>
            <button
              type="button"
              onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
              {theme === "dark" ? "Switch to light" : "Switch to dark"}
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold text-slate-950 dark:text-white">Current theme</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                The dashboard is currently using {theme === "dark" ? "dark" : "light"} mode.
              </p>
            </div>

            {preferenceItems.map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
              >
                <div>
                  <span className="block font-semibold text-slate-950 dark:text-white">{item.label}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {item.value ? "Enabled across the workspace" : "Disabled for now"}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={item.value}
                  onChange={() =>
                    setPreferences((current) => ({
                      ...current,
                      [item.key]: !current[item.key],
                    }))
                  }
                  className="h-5 w-5 accent-cyan-500"
                />
              </label>
            ))}
          </div>
        </GlassPanel>
      </section>
    </FeaturePage>
  );
};

export default Settings;
