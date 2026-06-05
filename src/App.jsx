import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AnimationProvider from "./components/AnimationProvider";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/UI/ScrollToTop";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollRestoration } from "./hooks/useScrollRestoration";
import AppRoutes from "./routes/AppRoutes";

const MIN_STARTUP_MS = 1450;
const ASSET_TIMEOUT_MS = 2400;

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

const nextFrame = () =>
  new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });

const withTimeout = (promise, timeout = ASSET_TIMEOUT_MS) =>
  Promise.race([
    promise.catch(() => undefined),
    wait(timeout),
  ]);

const waitForFonts = () => {
  if (!document.fonts?.ready) return Promise.resolve();
  return withTimeout(document.fonts.ready);
};

const waitForWindowLoad = () => {
  if (document.readyState === "complete") return Promise.resolve();

  return withTimeout(
    new Promise((resolve) => {
      window.addEventListener("load", resolve, { once: true });
    }),
  );
};

const waitForImages = () => {
  const images = Array.from(document.images);
  if (!images.length) return Promise.resolve();

  return withTimeout(
    Promise.allSettled(
      images.map((image) => {
        if (image.complete && image.naturalWidth > 0) return Promise.resolve();
        if (image.decode) return image.decode().catch(() => undefined);

        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }),
    ),
  );
};

const useStartupReady = (routeReadyKey) => {
  const startedAtRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready || !routeReadyKey) return undefined;

    let cancelled = false;

    const prepare = async () => {
      if (!startedAtRef.current) {
        startedAtRef.current = performance.now();
      }

      await nextFrame();
      const elapsed = performance.now() - startedAtRef.current;
      const minimumDelay = wait(Math.max(0, MIN_STARTUP_MS - elapsed));

      await Promise.allSettled([
        waitForFonts(),
        waitForWindowLoad(),
        waitForImages(),
        minimumDelay,
      ]);

      if (!cancelled) {
        setReady(true);
      }
    };

    prepare();

    return () => {
      cancelled = true;
    };
  }, [ready, routeReadyKey]);

  return ready;
};

const AppShell = ({ appReady, onRouteReady }) => {
  const location = useLocation();
  useSmoothScroll({ enabled: appReady });
  useScrollRestoration({ enabled: appReady });

  const isDashboardRoute =
    location.pathname.startsWith("/employer-dashboard") || location.pathname.startsWith("/erp-simulator");

  return (
    <div className="app-shell" data-ready={appReady}>
      <Navbar />
      <AppRoutes onRouteReady={onRouteReady} />
      {isDashboardRoute ? null : <Footer />}
      <ScrollToTop />
    </div>
  );
};

function App() {
  const [routeReadyKey, setRouteReadyKey] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const appReady = useStartupReady(routeReadyKey);

  const handleRouteReady = useCallback((key) => {
    setRouteReadyKey((current) => current || key);
  }, []);

  const handleLoaderExit = useCallback(() => {
    setShowLoader(false);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("erp-ready", appReady);
    document.documentElement.classList.toggle("erp-booting", !appReady);
  }, [appReady]);

  return (
    <BrowserRouter>
      <AnimationProvider ready={appReady}>
        <AppShell appReady={appReady} onRouteReady={handleRouteReady} />
        {showLoader ? <Loader ready={appReady} onExitComplete={handleLoaderExit} /> : null}
      </AnimationProvider>
    </BrowserRouter>
  );
}

export default App;
