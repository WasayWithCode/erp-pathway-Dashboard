import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestoration = ({ enabled = true } = {}) => {
  const { pathname } = useLocation();
  const firstRunRef = useRef(true);

  useEffect(() => {
    if (!enabled) return undefined;

    const delay = firstRunRef.current ? 0 : 260;
    firstRunRef.current = false;

    const timer = window.setTimeout(() => {
      if (window.__erpLenis) {
        window.__erpLenis.scrollTo(0, { immediate: true, force: true });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [enabled, pathname]);
};
