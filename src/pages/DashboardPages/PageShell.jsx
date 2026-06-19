import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import DashboardLayout from "../../layouts/DashboardLayout";

const PageShell = ({ eyebrow, title, description, action, children }) => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return undefined;

    const items = pageRef.current.querySelectorAll("[data-page-enter]");
    const tween = gsap.fromTo(
      items,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
      },
    );

    return () => tween.kill();
  }, []);

  return (
    <DashboardLayout>
      <div ref={pageRef} className="space-y-6">
        <div
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          data-page-enter
        >
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        {children}
      </div>
    </DashboardLayout>
  );
};

export default PageShell;
