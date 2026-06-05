import { useEffect, useState } from "react";
import gsap from "gsap";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.to(".scroll-top-button", {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 16,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [visible]);

  return (
    <button
      className="scroll-top-button fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-2xl border border-blue-500/20 bg-blue-600 text-white opacity-0 shadow-[0_18px_40px_rgba(37,99,235,0.24)] transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-[#F8FAFC]"
      onClick={() => {
        if (window.__erpLenis) {
          window.__erpLenis.scrollTo(0, { duration: 0.9, force: true });
          return;
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 19V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
