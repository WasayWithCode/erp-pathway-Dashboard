import { useLayoutEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationContext } from "../hooks/useAnimationReady";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });
gsap.defaults({ ease: "power3.out", duration: 0.6 });
ScrollTrigger.defaults({ markers: false });

const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AnimationProvider = ({ children, ready = false }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotion);

  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(query.matches);

    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;

    html.classList.toggle("erp-ready", ready);
    html.classList.toggle("erp-booting", !ready);

    if (ready) {
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [ready]);

  const value = useMemo(
    () => ({
      isReady: ready,
      prefersReducedMotion,
    }),
    [ready, prefersReducedMotion],
  );

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};

export default AnimationProvider;
