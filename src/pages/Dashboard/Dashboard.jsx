import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import ActivityFeed from "../../components/ActivityFeed";
import ProgressCard from "../../components/ProgressCard";
import RoadmapCard from "../../components/RoadmapCard";
import StatCard from "../../components/StatCard";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Badge, Button, GlassCard } from "../../components/dashboard";
import DashboardContent from "../../components/dashboard/DashboardContent";
import ModuleCard from "../../components/dashboard/ModuleCard";
import AnalyticsCard from "../../components/dashboard/AnalyticsCard";
import { useAnimationReady } from "../../hooks/useAnimationReady";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import ErrorBoundary from "../../components/ErrorBoundary";
import ErpSimulatorModule from "./modules/ErpSimulatorModule";
import EmployerPortalModule from "./modules/EmployerPortalModule";
import CareerDashboardModule from "./modules/CareerDashboardModule";

const stats = [
  {
    label: "Total Courses",
    value: 42,
    detail: "Across finance, supply chain, HR, and CRM",
  },
  {
    label: "Completed Courses",
    value: 18,
    detail: "4 completions added this month",
  },
  {
    label: "Modules Learned",
    value: 7,
    detail: "SAP FICO, MM, Oracle, Dynamics",
  },
  { label: "Certificates Earned", value: 4, detail: "2 more ready to unlock" },
];

const cards = [
  {
    title: "ERP Simulator",
    description:
      "Practice invoices, employees, inventory and operational workflows.",
    icon: "dashboard",
    section: "erp-dashboard",
  },
  {
    title: "Employer Portal",
    description:
      "Analyze hiring, shortlist candidates, and manage roles in one place.",
    icon: "analytics",
    section: "employer-analytics",
  },
  {
    title: "Learning Progress",
    description:
      "Track your training streak, certifications and learning milestones.",
    icon: "book-open",
    section: "learning-progress",
  },
  {
    title: "Certificates",
    description: "Review earned credentials and unlock portfolio-grade badges.",
    icon: "award",
    section: "certificates",
  },
  {
    title: "Career Dashboard",
    description: "Explore career paths, job opportunities, and skill development roadmaps.",
    icon: "briefcase",
    section: "career",
  },
];

const activityLog = [
  { title: "Completed SAP FICO: GL Posting", detail: "12 minutes ago" },
  { title: "Earned ERP Fundamentals Certificate", detail: "Yesterday" },
  { title: "Started Oracle Procure-to-Pay sprint", detail: "2 days ago" },
  { title: "Mentor session scheduled", detail: "Tomorrow at 5:30 PM" },
];

const sectionHashMap = {
  "erp-dashboard": "erp-dashboard",
  invoices: "erp-invoices",
  employees: "erp-employees",
  inventory: "erp-inventory",
  analytics: "employer-analytics",
  "job-posts": "employer-job-posts",
  candidates: "employer-candidates",
  "talent-matching": "employer-talent",
  "learning-progress": "learning-progress",
  career: "career",
  certificates: "certificates",
  settings: "settings",
  overview: "overview",
};

const sectionTitles = {
  overview: "Overview",
  "erp-dashboard": "ERP Simulator",
  "erp-invoices": "Invoices",
  "erp-employees": "Employees",
  "erp-inventory": "Inventory",
  "employer-analytics": "Employer Analytics",
  "employer-job-posts": "Job Posts",
  "employer-candidates": "Candidates",
  "employer-talent": "Talent Matching",
  "learning-progress": "Learning Progress",
  career: "Career Dashboard",
  certificates: "Certificates",
  settings: "Settings",
};

const Dashboard = () => {
  const rootRef = useRef(null);
  const location = useLocation();
  const { isReady, prefersReducedMotion } = useAnimationReady();
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const hash = (location.hash || "").replace("#", "") || "overview";
    setActiveSection(sectionHashMap[hash] ?? "overview");
  }, [location.hash]);

  useGsapReveal(rootRef);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;
    const heroItems = rootRef.current.querySelectorAll("[data-hero]");

    if (prefersReducedMotion) {
      gsap.set(heroItems, { autoAlpha: 1, y: 0, clearProps: "transform" });
      return undefined;
    }

    if (!isReady) {
      gsap.set(heroItems, { y: 18, autoAlpha: 0 });
      return undefined;
    }

    const tween = gsap.fromTo(
      heroItems,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
    );

    return () => tween.kill();
  }, [isReady, prefersReducedMotion]);

  const sectionHeading = sectionTitles[activeSection] ?? "Overview";

  const renderSection = () => {
    try {
      if (activeSection.startsWith("erp-")) {
        return <ErpSimulatorModule activeSection={activeSection} />;
      }

      if (activeSection.startsWith("employer-")) {
        return <EmployerPortalModule activeSection={activeSection} />;
      }

      if (activeSection === "learning-progress") {
        return (
          <DashboardContent
            title="Learning progress"
            subtitle="Track performance, completion, and next recommended training sprints."
            badge="Learning"
          >
            <div className="grid gap-5 xl:grid-cols-3">
              <AnalyticsCard
                label="Weekly focus"
                value="82%"
                trend="+8%"
                detail="Time spent in live ERP labs."
              />
              <AnalyticsCard
                label="Sprint completion"
                value="5/7"
                trend="+2"
                detail="Modules finished this month."
              />
              <AnalyticsCard
                label="Streak"
                value="21 days"
                trend="+4"
                detail="Daily learning streak maintained."
              />
            </div>

            <ProgressCard
              progress={78}
              timeline={[
                {
                  label: "Invoice reconciliation",
                  meta: "Completed",
                  done: true,
                },
                { label: "Payroll review", meta: "In progress", done: false },
                { label: "Talent matching workshop", meta: "Next", done: false },
              ]}
              activity={[
                { day: "M", height: 64 },
                { day: "T", height: 78 },
                { day: "W", height: 56 },
                { day: "T", height: 84 },
                { day: "F", height: 72 },
                { day: "S", height: 54 },
                { day: "S", height: 68 },
              ]}
            />
          </DashboardContent>
        );
      }

      if (activeSection === "career") {
        return <CareerDashboardModule />;
      }

      if (activeSection === "certificates") {
        return (
          <DashboardContent
            title="Certificates"
            subtitle="Your verified ERP achievements ready for sharing."
            badge="Vault"
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { title: "ERP Fundamentals", status: "Earned" },
                { title: "SAP FICO Specialist", status: "In progress" },
                { title: "Oracle Procurement", status: "Locked" },
              ].map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                        {item.title}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-slate-950">
                        {item.status}
                      </h3>
                    </div>
                    <Badge
                      tone={
                        item.status === "Earned"
                          ? "emerald"
                          : item.status === "In progress"
                            ? "cyan"
                            : "slate"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    Official credentials for ERP pathway success and employer
                    readiness.
                  </p>
                </GlassCard>
              ))}
            </div>
          </DashboardContent>
        );
      }

      if (activeSection === "settings") {
        return (
          <DashboardContent
            title="Settings"
            subtitle="Configure your ERP hub, notifications, and preferences."
            badge="Controls"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              {[
                {
                  label: "Email notifications",
                  description: "Receive coaching alerts and course reminders.",
                },
                {
                  label: "Dark mode",
                  description: "Maintain a light and premium workspace style.",
                },
                {
                  label: "Mobile alerts",
                  description: "Enable mobile updates for tasks and deadlines.",
                },
                {
                  label: "Data sync",
                  description:
                    "Keep progress synced across all ERP practice labs.",
                },
              ].map((item) => (
                <GlassCard key={item.label} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">
                        {item.label}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {item.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                      On
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </DashboardContent>
        );
      }

      return (
        <DashboardContent
          title="Overview"
          subtitle="A single command center for simulator, employer workflows, progress, and certification."
          badge="Launchpad"
        >
          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <StatCard key={item.label} {...item} />
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                {cards.map((item) => (
                  <ModuleCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    action={
                      <Button
                        variant="secondary"
                        onClick={() => setActiveSection(item.section)}
                      >
                        Open
                      </Button>
                    }
                  />
                ))}
              </div>
            </div>

            <GlassCard className="p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Activity snapshot
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                What’s happening now
              </h3>
              <div className="mt-6 space-y-4">
                {activityLog.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200/80 bg-slate-50/90 p-4"
                  >
                    <p className="font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </DashboardContent>
      );
    } catch (error) {
      console.error("Error rendering section:", error);
      return (
        <DashboardContent
          title="Content Error"
          subtitle="Unable to load this section right now. Please try again."
          badge="Error"
        >
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <p className="text-sm text-rose-800">
              {error?.message || "An unexpected error occurred"}
            </p>
          </div>
        </DashboardContent>
      );
    }
  };

  return (
    <ErrorBoundary>
      <DashboardLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      >
        {({ activeSection: currentSection, setActiveSection: setSection }) => (
          <div ref={rootRef} className="space-y-8">
            <section
              className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]"
              data-hero
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="cyan">ERP Hub</Badge>
                  <Badge tone="emerald">Integrated command center</Badge>
                </div>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    One dashboard for simulation, hiring, progress, and
                    certifications.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-500">
                    Move away from split pages and keep the ERP simulator and
                    employer portal inside a single premium workspace.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setSection("erp-dashboard")}>
                    Open ERP Simulator
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setSection("employer-analytics")}
                  >
                    Open Employer Portal
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                <GlassCard className="p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                    Workspace
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                    {sectionHeading}
                  </h2>
                  <p className="mt-3 text-sm text-slate-500">
                    {currentSection === "overview"
                      ? "Your current command center."
                      : "Module navigation loaded live."}
                  </p>
                </GlassCard>
                <GlassCard className="p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                    Module health
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">
                    Premium
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Ready with modern SaaS polish and internal module switching.
                  </p>
                </GlassCard>
                <GlassCard className="p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                    Ready to switch
                  </p>
                  <div className="mt-4 grid gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setSection("learning-progress")}
                    >
                      Learning progress
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setSection("certificates")}
                    >
                      Certificates
                    </Button>
                  </div>
                </GlassCard>
              </div>
            </section>

            <section>
              <DashboardContent
                title={sectionHeading}
                subtitle="A premium ERP platform experience for every workflow."
                badge={currentSection.replace(/-/g, " ")}
              >
                {renderSection()}
              </DashboardContent>
            </section>
          </div>
        )}
      </DashboardLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;
