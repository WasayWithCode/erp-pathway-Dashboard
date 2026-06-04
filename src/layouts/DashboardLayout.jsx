import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { dashboardNavLinks } from "../routes/appRouteConfig";
import Container from "../components/UI/Container";
import Icon from "../components/UI/Icon";

const navIcon = (label) => (label.toLowerCase().includes("simulator") ? "operations" : "dashboard");

const DashboardLayout = ({ children, className = "" }) => {
  const shellRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!shellRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.to("[data-dashboard-float]", {
        y: -16,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35,
      });
      gsap.to("[data-dashboard-glow]", {
        scale: 1.08,
        opacity: 0.78,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, shellRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (event) => {
    if (!spotlightRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    spotlightRef.current.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    spotlightRef.current.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={shellRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]"
    >
      <div
        ref={spotlightRef}
        style={{ "--spotlight-x": "50%", "--spotlight-y": "8%" }}
        className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(620px_circle_at_var(--spotlight-x)_var(--spotlight-y),rgba(37,99,235,0.12),transparent_44%)]"
      />
      <div data-dashboard-glow className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#06B6D4]/18 blur-3xl" />
      <div data-dashboard-glow className="pointer-events-none absolute right-[-7rem] top-48 h-80 w-80 rounded-full bg-[#8B5CF6]/16 blur-3xl" />
      <div data-dashboard-float className="pointer-events-none absolute left-[12%] top-40 h-16 w-16 rounded-[1.25rem] border border-white/70 bg-white/45 shadow-[0_24px_70px_rgba(37,99,235,0.14)] backdrop-blur-xl" />
      <div data-dashboard-float className="pointer-events-none absolute bottom-28 right-[10%] h-20 w-20 rounded-full border border-white/70 bg-cyan-100/45 shadow-[0_24px_70px_rgba(6,182,212,0.14)] backdrop-blur-xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_74%)]" />

      <Container size="wide" className={`relative pt-28 pb-16 ${className}`}>
        <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[1.75rem] border border-white/80 bg-white/75 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <div className="px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">Workspace</p>
                <h2 className="mt-2 text-lg font-semibold text-[#0F172A]">ERP Pathway</h2>
              </div>
              <nav className="mt-2 grid gap-2" aria-label="Dashboard navigation">
                {dashboardNavLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-300 ${
                        isActive
                          ? "bg-[#2563EB] text-white shadow-[0_18px_38px_rgba(37,99,235,0.26)]"
                          : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                      }`
                    }
                  >
                    <Icon name={navIcon(link.label)} className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-4 rounded-[1.35rem] border border-slate-200/80 bg-slate-50/90 p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Light dashboard</p>
                <p className="mt-2 text-xs leading-5 text-[#64748B]">
                  Clean KPI scanning, modern tables, and fast ERP practice workflows.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardLayout;
