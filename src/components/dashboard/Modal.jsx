import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Modal = ({ open, title, subtitle, onClose, children, className = "" }) => {
  const [mounted, setMounted] = useState(open);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) {
      const frame = window.requestAnimationFrame(() => setMounted(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [open]);

  useEffect(() => {
    if (!mounted || !overlayRef.current || !panelRef.current) return undefined;

    if (open) {
      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: "power2.out" });
        gsap.fromTo(
          panelRef.current,
          { y: 24, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.34, ease: "power3.out" },
        );
      }, overlayRef);

      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      gsap.to(panelRef.current, {
        y: 18,
        opacity: 0,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => setMounted(false),
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [mounted, open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 px-4 py-6 opacity-0 backdrop-blur-md"
      onClick={(event) => event.target === event.currentTarget && onClose?.()}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        className={`max-h-[90vh] w-full overflow-auto rounded-[1.75rem] border border-white/80 bg-white/95 shadow-[0_35px_110px_rgba(15,23,42,0.18)] ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-6 py-5">
          <div>
            <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm leading-6 text-[#64748B]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-[#64748B] transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0F172A]"
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
