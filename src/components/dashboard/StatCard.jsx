import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "./GlassCard";
import { cn } from "./utils";

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ icon, label, value, suffix = "", detail = "", className = "" }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    const target = { value: 0 };
    const tween = gsap.to(target, {
      value,
      duration: 1.7,
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
    <GlassCard className={cn("p-5", className)} data-card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#64748B]">{label}</p>
          <div ref={numberRef} className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">
            0{suffix}
          </div>
          {detail ? <p className="mt-2 text-sm leading-6 text-[#64748B]">{detail}</p> : null}
        </div>
        {icon ? (
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-lg shadow-inner">
            {icon}
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
};

export default StatCard;
