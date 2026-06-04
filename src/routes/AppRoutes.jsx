import { Suspense, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import LoadingScreen from "../components/UI/LoadingScreen";
import { dashboardRoutes, publicRoutes } from "./appRouteConfig";

const NotFound = () => (
  <section className="grid min-h-[70vh] place-items-center px-4 pt-28 text-center">
    <div>
      <p className="text-sm font-bold uppercase tracking-wider text-blue-700">404</p>
      <h1 className="mt-3 text-4xl font-black text-[#0F172A]">Page not found</h1>
      <p className="mt-3 text-[#64748B]">The ERP Pathway page you requested does not exist.</p>
    </div>
  </section>
);

const AppRoutes = () => {
  const location = useLocation();
  const routeRef = useRef(null);

  useEffect(() => {
    if (!routeRef.current) return;
    gsap.fromTo(
      routeRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
  }, [location.pathname]);

  return (
    <main ref={routeRef}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location}>
          {publicRoutes.map((route) => {
            const Element = route.element;
            return <Route key={route.path} path={route.path} element={<Element />} />;
          })}
          {dashboardRoutes.map((route) => {
            const Element = route.element;
            return <Route key={route.path} path={route.path} element={<Element />} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default AppRoutes;
