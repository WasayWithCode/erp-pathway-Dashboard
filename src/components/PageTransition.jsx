import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useAnimationReady } from "../hooks/useAnimationReady";
import { animationPresets } from "../hooks/usePageAnimation";

const getLocationKey = (location) => `${location.pathname}${location.search}${location.hash}`;

const PageTransition = ({ children, className = "" }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const containerRef = useRef(null);
  const firstPaintRef = useRef(true);
  const { isReady, prefersReducedMotion } = useAnimationReady();

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    if (!isReady || prefersReducedMotion) {
      gsap.set(containerRef.current, { autoAlpha: 1, y: 0, clearProps: prefersReducedMotion ? "transform,filter" : "" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: firstPaintRef.current ? 0 : 0.96, y: firstPaintRef.current ? 18 : 8, filter: "blur(7px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: firstPaintRef.current ? 0.72 : 0.48,
          ease: animationPresets.easings.enter,
          onComplete: () => {
            firstPaintRef.current = false;
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [displayLocation, isReady, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (getLocationKey(location) === getLocationKey(displayLocation)) return undefined;

    if (!containerRef.current || prefersReducedMotion) {
      setDisplayLocation(location);
      return undefined;
    }

    const tween = gsap.to(containerRef.current, {
      autoAlpha: 0,
      y: -10,
      filter: "blur(5px)",
      duration: 0.22,
      ease: animationPresets.easings.exit,
      onComplete: () => setDisplayLocation(location),
    });

    return () => tween.kill();
  }, [location, displayLocation, prefersReducedMotion]);

  return (
    <main ref={containerRef} className={`page-transition min-h-screen ${className}`}>
      {typeof children === "function" ? children(displayLocation) : children}
    </main>
  );
};

export default PageTransition;
