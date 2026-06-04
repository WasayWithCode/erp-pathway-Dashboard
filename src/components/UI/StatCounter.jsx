import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "./GlassCard";

gsap.registerPlugin(ScrollTrigger);

const StatCounter = ({ value, suffix = "", label, detail = "" }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    const target = { value: 0 };
    const tween = gsap.to(target, {
      value,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = `${Math.round(target.value).toLocaleString()}${suffix}`;
        }
      },
    });

    return () => tween.kill();
  }, [value, suffix]);

  return (
    <GlassCard className="p-5" data-card>
      <div ref={numberRef} className="text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
        0{suffix}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">{label}</p>
      {detail && <p className="mt-1 text-xs leading-5 text-[#64748B]">{detail}</p>}
    </GlassCard>
  );
};

export default StatCounter;
