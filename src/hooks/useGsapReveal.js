import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapReveal = (scopeRef) => {
  useEffect(() => {
    if (!scopeRef.current) return undefined;

    const cleanups = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-card-reveal]").forEach((group) => {
        const cards = group.querySelectorAll("[data-card]");
        if (!cards.length) return;

        gsap.fromTo(
          cards,
          { y: 28, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-row-reveal]").forEach((group) => {
        const rows = group.querySelectorAll("[data-row]");
        if (!rows.length) return;

        gsap.fromTo(
          rows,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.045,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-card]").forEach((card) => {
        const onMove = (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 5;
          const rotateX = ((y / rect.height) - 0.5) * -5;
          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 900,
            transformOrigin: "center",
            duration: 0.35,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: "power3.out" });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      gsap.utils.toArray("button, a").forEach((item) => {
        if (!item.matches(".group")) return;
        const onMove = (event) => {
          const rect = item.getBoundingClientRect();
          gsap.to(item, {
            x: (event.clientX - rect.left - rect.width / 2) * 0.08,
            y: (event.clientY - rect.top - rect.height / 2) * 0.08,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onLeave = () => gsap.to(item, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.45)" });
        item.addEventListener("mousemove", onMove);
        item.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          item.removeEventListener("mousemove", onMove);
          item.removeEventListener("mouseleave", onLeave);
        });
      });
    }, scopeRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [scopeRef]);
};
