import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimationReady } from "./useAnimationReady";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = ({ enabled = true } = {}) => {
  const { isReady, prefersReducedMotion } = useAnimationReady();

  useEffect(() => {
    if (!enabled || !isReady || prefersReducedMotion) return undefined;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      autoRaf: false,
      duration: isTouch ? 0.82 : 1.08,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.88,
      touchMultiplier: 1,
      infinite: false,
    });

    window.__erpLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      if (window.__erpLenis === lenis) {
        window.__erpLenis = undefined;
      }
    };
  }, [enabled, isReady, prefersReducedMotion]);
};
