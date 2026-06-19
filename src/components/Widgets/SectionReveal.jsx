import { useEffect, useRef } from "react";
import gsap from "gsap";

const SectionReveal = ({ id, eyebrow, title, action, children, className = "" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const items = section.querySelectorAll("[data-reveal-item]");
    gsap.set(items, { autoAlpha: 0, y: 22 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
        });
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`scroll-mt-28 ${className}`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div data-reveal-item>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        {action ? <div data-reveal-item>{action}</div> : null}
      </div>
      {children}
    </section>
  );
};

export default SectionReveal;
