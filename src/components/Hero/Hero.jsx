import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useAnimationReady } from "../../hooks/useAnimationReady";
import Badge from "../UI/Badge";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Icon from "../UI/Icon";

const previewRows = [
  { label: "Finance close", value: "86%", tone: "from-blue-500 to-cyan-400" },
  {
    label: "Inventory health",
    value: "74%",
    tone: "from-emerald-500 to-teal-400",
  },
  {
    label: "Hiring match",
    value: "91%",
    tone: "from-violet-500 to-fuchsia-400",
  },
];

const trustItems = [
  "SAP basics",
  "Oracle paths",
  "Odoo practice",
  "Dynamics careers",
];

const Hero = () => {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const { isReady, prefersReducedMotion } = useAnimationReady();

  useLayoutEffect(() => {
    if (!sectionRef.current) return undefined;

    const heroItems = sectionRef.current.querySelectorAll("[data-hero-item]");
    const preview = sectionRef.current.querySelector("[data-preview]");
    const floats = sectionRef.current.querySelectorAll("[data-float]");

    if (prefersReducedMotion) {
      gsap.set([...heroItems, preview, ...floats], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        clearProps: "transform,filter",
      });
      return undefined;
    }

    if (!isReady) {
      gsap.set(heroItems, { autoAlpha: 0, y: 34, filter: "blur(8px)" });
      gsap.set(preview, {
        autoAlpha: 0,
        y: 42,
        scale: 0.965,
        filter: "blur(8px)",
      });
      gsap.set(floats, { autoAlpha: 0, y: 12 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-hero-item]",
        { y: 34, autoAlpha: 0, filter: "blur(8px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.08,
        },
      )
        .fromTo(
          "[data-preview]",
          { y: 42, autoAlpha: 0, scale: 0.965, filter: "blur(8px)" },
          { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.95 },
          "-=0.58",
        )
        .fromTo(
          "[data-float]",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.08 },
          "-=0.35",
        );

      gsap.to("[data-float]", {
        y: -14,
        rotate: 1.5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReady, prefersReducedMotion]);

  const handleMouseMove = (event) => {
    if (!spotlightRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    spotlightRef.current.style.setProperty(
      "--spotlight-x",
      `${event.clientX - rect.left}px`,
    );
    spotlightRef.current.style.setProperty(
      "--spotlight-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="premium-light-shell relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div
        ref={spotlightRef}
        style={{ "--spotlight-x": "50%", "--spotlight-y": "25%" }}
        className="pointer-events-none absolute inset-0 z-0 opacity-90 [background:radial-gradient(720px_circle_at_var(--spotlight-x)_var(--spotlight-y),rgba(37,99,235,0.13),transparent_46%)]"
      />

      <Container className="relative z-10 grid items-center gap-12 pb-20 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-7">
          <div data-hero-item className="flex flex-wrap items-center gap-3">
            <Badge>ERP Learning Platform</Badge>
            <Badge tone="cyan">Career-ready pathways</Badge>
          </div>

          <div className="space-y-5">
            <h1
              data-hero-item
              className="max-w-5xl bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#8B5CF6] bg-clip-text text-5xl font-semibold leading-[1.02] tracking-tight text-transparent sm:text-6xl lg:text-7xl"
            >
              Master ERP systems through a product-grade learning cockpit.
            </h1>
            <p
              data-hero-item
              className="max-w-2xl text-lg leading-8 text-[#64748B]"
            >
              ERP Pathway helps students understand enterprise workflows, choose
              modules, practice in dashboards, and move toward real consulting
              careers with confidence.
            </p>
          </div>

          <div data-hero-item className="flex flex-col gap-3 sm:flex-row">
            <Button to="/quiz" icon={<Icon name="spark" className="h-4 w-4" />}>
              Find your ERP path
            </Button>
            <Button
              to="/erp-simulator"
              variant="secondary"
              icon={<Icon name="dashboard" className="h-4 w-4" />}
            >
              Open simulator
            </Button>
          </div>

          <div data-hero-item className="grid max-w-xl grid-cols-3 gap-3">
            {[
              ["500+", "Assets"],
              ["4", "Core paths"],
              ["16wk", "Launch plan"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
              >
                <p className="text-2xl font-semibold text-[#0F172A]">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div data-preview className="relative">
          <div
            data-float
            className="absolute -left-4 top-10 z-20 hidden rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_24px_60px_rgba(37,99,235,0.16)] backdrop-blur-xl sm:block"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Match score
            </p>
            <p className="mt-1 text-3xl font-semibold text-[#0F172A]">92%</p>
          </div>
          <div
            data-float
            className="absolute -right-2 bottom-16 z-20 hidden rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_24px_60px_rgba(6,182,212,0.16)] backdrop-blur-xl sm:block"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Live modules
            </p>
            <p className="mt-1 text-3xl font-semibold text-[#0F172A]">06</p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.14)] backdrop-blur-2xl">
            <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                    ERP command center
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-[#0F172A]">
                    Learning operations
                  </h2>
                </div>
                <Badge tone="green">Live</Badge>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Finance", "Inventory", "People"].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <Icon
                      name={
                        index === 0
                          ? "finance"
                          : index === 1
                            ? "inventory"
                            : "people"
                      }
                      className="h-5 w-5 text-blue-600"
                    />
                    <p className="mt-3 text-sm font-semibold text-[#0F172A]">
                      {item}
                    </p>
                    <p className="mt-1 text-xs text-[#64748B]">
                      Workflow ready
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#0F172A]">
                    ERP readiness
                  </p>
                  <p className="text-sm text-[#64748B]">This week</p>
                </div>
                <div className="mt-4 space-y-4">
                  {previewRows.map((row) => (
                    <div key={row.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">{row.label}</span>
                        <span className="font-semibold text-[#0F172A]">
                          {row.value}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${row.tone}`}
                          style={{ width: row.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            data-hero-item
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#64748B]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
