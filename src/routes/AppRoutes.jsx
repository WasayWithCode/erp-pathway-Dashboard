import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { dashboardRoutes, publicRoutes } from "./appRouteConfig";

const NotFound = () => (
  <section className="grid min-h-[70vh] place-items-center px-4 pt-28 text-center">
    <div>
      <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
        404
      </p>
      <h1 className="mt-3 text-4xl font-black text-[#0F172A]">
        Page not found
      </h1>
      <p className="mt-3 text-[#64748B]">
        The ERP Pathway page you requested does not exist.
      </p>
    </div>
  </section>
);

const RouteFallback = () => (
  <div className="grid min-h-[64vh] place-items-center px-4 pt-28">
    <div className="w-full max-w-xs rounded-[1.25rem] border border-white/80 bg-white/78 p-5 text-center shadow-[0_22px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
      <div className="mx-auto h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">
        Loading view
      </p>
    </div>
  </div>
);

const RouteReady = ({ children, routeKey, onReady }) => {
  useEffect(() => {
    onReady?.(routeKey);
  }, [onReady, routeKey]);

  return children;
};

const AppRoutes = ({ onRouteReady }) => (
  <PageTransition>
    {(displayLocation) => {
      const routeKey = `${displayLocation.pathname}${displayLocation.search}${displayLocation.hash}`;

      return (
        <Suspense fallback={<RouteFallback />}>
          <Routes location={displayLocation}>
            {publicRoutes.map((route) => {
              const Element = route.element;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <RouteReady routeKey={routeKey} onReady={onRouteReady}>
                      <Element />
                    </RouteReady>
                  }
                />
              );
            })}
            {dashboardRoutes.map((route) => {
              const Element = route.element;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <RouteReady routeKey={routeKey} onReady={onRouteReady}>
                      <Element />
                    </RouteReady>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <RouteReady routeKey={routeKey} onReady={onRouteReady}>
                  <NotFound />
                </RouteReady>
              }
            />
          </Routes>
        </Suspense>
      );
    }}
  </PageTransition>
);

export default AppRoutes;
