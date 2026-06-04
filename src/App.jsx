import { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import LoadingScreen from "./components/UI/LoadingScreen";
import ScrollToTop from "./components/UI/ScrollToTop";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollRestoration } from "./hooks/useScrollRestoration";
import AppRoutes from "./routes/AppRoutes";

const AppShell = () => {
  const location = useLocation();
  useSmoothScroll();
  useScrollRestoration();
  const isDashboardRoute =
    location.pathname.startsWith("/employer-dashboard") || location.pathname.startsWith("/erp-simulator");

  return (
    <>
      <Navbar />
      <AppRoutes />
      {isDashboardRoute ? null : <Footer />}
      <ScrollToTop />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
