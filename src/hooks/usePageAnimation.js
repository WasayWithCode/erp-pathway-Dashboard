import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimationReady } from "./useAnimationReady";

gsap.registerPlugin(ScrollTrigger);

export const animationPresets = {
  easings: {
    reveal: "power3.out",
    enter: "power4.out",
    exit: "power3.out",
    soft: "power2.out",
  },
  duration: {
    fast: 0.32,
    base: 0.68,
    slow: 0.92,
  },
  stagger: {
    cards: 0.075,
    rows: 0.045,
  },
};

const visibleState = { autoAlpha: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)", clearProps: "willChange" };

const getTopLevelReveals = (root) =>
  gsap
    .utils
    .toArray("[data-reveal]", root)
    .filter((item) => !item.parentElement?.closest("[data-reveal]"));

const setInitialStates = (root) => {
  const revealItems = getTopLevelReveals(root);
  const cardGroups = gsap.utils.toArray("[data-card-reveal]", root);
  const rowGroups = gsap.utils.toArray("[data-row-reveal]", root);

  gsap.set(revealItems, { autoAlpha: 0, y: 30, filter: "blur(8px)", willChange: "transform, opacity, filter" });
  cardGroups.forEach((group) => {
    gsap.set(group.querySelectorAll("[data-card]"), {
      autoAlpha: 0,
      y: 26,
      scale: 0.985,
      filter: "blur(6px)",
      willChange: "transform, opacity, filter",
    });
  });
  rowGroups.forEach((group) => {
    gsap.set(group.querySelectorAll("[data-row]"), {
      autoAlpha: 0,
      y: 14,
      willChange: "transform, opacity",
    });
  });
};

const clearInitialStates = (root) => {
  gsap.set(gsap.utils.toArray("[data-reveal], [data-card], [data-row]", root), visibleState);
};

const attachCardTilt = (root, cleanups) => {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  gsap.utils.toArray("[data-card]", root).forEach((card) => {
    const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.42, ease: animationPresets.easings.reveal });
    const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.42, ease: animationPresets.easings.reveal });
    const yTo = gsap.quickTo(card, "y", { duration: 0.42, ease: animationPresets.easings.reveal });

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      rotateYTo(((x / rect.width) - 0.5) * 5.5);
      rotateXTo(((y / rect.height) - 0.5) * -5.5);
      yTo(-5);
    };

    const onLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      yTo(0);
    };

    gsap.set(card, {
      transformPerspective: 900,
      transformOrigin: "center",
      transformStyle: "preserve-3d",
      willChange: "transform",
    });

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    });
  });
};

export const usePageAnimation = (scopeRef, options = {}) => {
  const { isReady, prefersReducedMotion } = useAnimationReady();
  const { enabled = true } = options;

  useLayoutEffect(() => {
    if (!scopeRef.current || !enabled) return undefined;

    if (prefersReducedMotion) {
      clearInitialStates(scopeRef.current);
      return undefined;
    }

    if (!isReady) {
      setInitialStates(scopeRef.current);
      return undefined;
    }

    const cleanups = [];
    const ctx = gsap.context(() => {
      getTopLevelReveals(scopeRef.current).forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 30, filter: "blur(8px)" },
          {
            ...visibleState,
            duration: animationPresets.duration.base,
            ease: animationPresets.easings.reveal,
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-card-reveal]", scopeRef.current).forEach((group) => {
        const cards = group.querySelectorAll("[data-card]");
        if (!cards.length) return;

        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 26, scale: 0.985, filter: "blur(6px)" },
          {
            ...visibleState,
            duration: animationPresets.duration.base,
            stagger: animationPresets.stagger.cards,
            ease: animationPresets.easings.reveal,
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-row-reveal]", scopeRef.current).forEach((group) => {
        const rows = group.querySelectorAll("[data-row]");
        if (!rows.length) return;

        gsap.fromTo(
          rows,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.46,
            stagger: animationPresets.stagger.rows,
            ease: animationPresets.easings.soft,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      attachCardTilt(scopeRef.current, cleanups);
      ScrollTrigger.refresh();
    }, scopeRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [scopeRef, enabled, isReady, prefersReducedMotion]);
};
