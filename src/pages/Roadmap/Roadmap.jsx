import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../../components/UI/Container";
import GlassCard from "../../components/UI/GlassCard";
import PageHero from "../../components/UI/PageHero";
import { roadmapLevels } from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
  const pageRef = useRef(null);
  const timelineRef = useRef(null);
  useGsapReveal(pageRef);
  usePageTitle("ERP Career Roadmap", "Follow a beginner to certification ERP career roadmap with an animated timeline.");

  useEffect(() => {
    if (!timelineRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-timeline-line]",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        "[data-timeline-item]",
        { x: -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="Career Roadmap"
        title="A step-by-step ERP career roadmap."
        description="Use this timeline to move from ERP basics to module learning, projects, interview preparation, and certification planning."
      />
      <section className="pb-20">
        <Container>
          <div ref={timelineRef} className="relative mx-auto max-w-4xl">
            <div data-timeline-line className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400 sm:left-1/2" />
            <div className="grid gap-8">
              {roadmapLevels.map((level, index) => (
                <div
                  key={level.level}
                  data-timeline-item
                  className={`relative grid gap-4 sm:grid-cols-2 ${index % 2 ? "sm:[&>*:first-child]:col-start-2" : ""}`}
                >
                  <span className="absolute left-2 top-6 z-10 h-5 w-5 rounded-full border-4 border-[#F8FAFC] bg-blue-500 sm:left-[calc(50%-10px)]" />
                  <GlassCard className="ml-12 p-6 sm:ml-0" data-card>
                    <p className="text-sm font-bold text-blue-700">{level.duration}</p>
                    <h2 className="mt-2 text-2xl font-black text-[#0F172A]">{level.level}</h2>
                    <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-600">
                      {level.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Roadmap;

