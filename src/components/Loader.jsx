import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ ready = false, onExitComplete, compact = false }) => {
  const rootRef = useRef(null);
  const markRef = useRef(null);
  const ringRef = useRef(null);
  const progressRef = useRef(null);
  const progressTweenRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(rootRef.current, { autoAlpha: 1 });
      gsap.set(progressRef.current, { scaleX: 0.88, transformOrigin: "left center" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(progressRef.current, { scaleX: 0.08, transformOrigin: "left center" });
      gsap.set("[data-loader-node]", { transformOrigin: "center center" });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .fromTo("[data-loader-shell]", { autoAlpha: 0, y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 })
        .fromTo(markRef.current, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7 }, "-=0.25")
        .fromTo("[data-loader-copy]", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, "-=0.35");

      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 7,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-loader-node]", {
        scale: 1.18,
        opacity: 0.92,
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      });

      progressTweenRef.current = gsap.to(progressRef.current, {
        scaleX: 0.82,
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        ease: "power3.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!ready || !rootRef.current) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(rootRef.current, { autoAlpha: 0 });
      onExitComplete?.();
      return undefined;
    }

    progressTweenRef.current?.kill();

    const exit = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: onExitComplete,
    });

    exit
      .to(progressRef.current, { scaleX: 1, duration: 0.32 })
      .to("[data-loader-shell]", { y: -14, scale: 0.985, autoAlpha: 0, duration: 0.45 }, "+=0.12")
      .to(rootRef.current, { autoAlpha: 0, duration: 0.55 }, "-=0.28");

    return () => exit.kill();
  }, [ready, onExitComplete]);

  const wrapperClass = compact
    ? "grid min-h-[62vh] place-items-center px-4"
    : "fixed inset-0 z-[100] grid place-items-center overflow-hidden px-4";

  return (
    <div
      ref={rootRef}
      className={`${wrapperClass} bg-[#F8FAFC] text-[#0F172A]`}
      aria-live="polite"
      aria-busy={!ready}
      role="status"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.055)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

      <div
        data-loader-shell
        className="relative w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-white/85 bg-white/82 p-7 text-center shadow-[0_34px_120px_rgba(15,23,42,0.16)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),transparent_36%,rgba(6,182,212,0.10),transparent_64%,rgba(139,92,246,0.12))]" />
        <div className="relative mx-auto h-24 w-24">
          <div ref={ringRef} className="absolute inset-0 rounded-[1.75rem] border border-blue-200/80">
            <span data-loader-node className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-600 shadow-[0_0_24px_rgba(37,99,235,0.45)]" />
            <span data-loader-node className="absolute bottom-4 -left-1 h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_24px_rgba(6,182,212,0.45)]" />
            <span data-loader-node className="absolute -right-1 bottom-4 h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_24px_rgba(139,92,246,0.42)]" />
          </div>
          <div className="absolute inset-3 rounded-[1.35rem] border border-white bg-slate-50/90 shadow-inner" />
          <div
            ref={markRef}
            className="absolute inset-5 grid place-items-center rounded-[1rem] bg-gradient-to-br from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] text-lg font-black tracking-tight text-white shadow-[0_20px_46px_rgba(37,99,235,0.28)]"
          >
            EP
          </div>
        </div>

        <div className="relative mt-6">
          <p data-loader-copy className="text-sm font-semibold uppercase tracking-[0.26em] text-[#64748B]">
            ERP Pathway
          </p>
          <p data-loader-copy className="mt-2 text-sm leading-6 text-slate-500">
            Preparing your learning cockpit
          </p>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              ref={progressRef}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
