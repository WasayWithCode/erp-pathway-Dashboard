import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import { useAnimationReady } from "../../hooks/useAnimationReady";
import { dashboardNavLinks } from "../../routes/appRouteConfig";
import { navLinks } from "../../data/siteData";
import Container from "../UI/Container";
import Button from "../UI/Button";
import Icon from "../UI/Icon";

const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-3"
    aria-label="ERP Pathway home"
  >
    <span className="grid h-10 w-10 place-items-center rounded-2xl border border-blue-200 bg-blue-50 text-sm font-black text-blue-700 shadow-[0_18px_40px_rgba(37,99,235,0.12)]">
      EP
    </span>
    <span className="leading-tight">
      <span className="block text-sm font-semibold tracking-tight text-[#0F172A]">
        ERP Pathway
      </span>
      <span className="block text-[11px] font-medium text-slate-500">
        Modern ERP learning and practice
      </span>
    </span>
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const drawerRef = useRef(null);
  const { isReady, prefersReducedMotion } = useAnimationReady();

  const publicLinks = useMemo(() => navLinks, []);

  useLayoutEffect(() => {
    if (!navRef.current) return undefined;

    if (prefersReducedMotion) {
      gsap.set(navRef.current, { autoAlpha: 1, y: 0, clearProps: "transform" });
      return undefined;
    }

    if (!isReady) {
      gsap.set(navRef.current, { y: -20, autoAlpha: 0 });
      return undefined;
    }

    const tween = gsap.fromTo(
      navRef.current,
      { y: -20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out" },
    );

    return () => tween.kill();
  }, [isReady, prefersReducedMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerRef.current) return undefined;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        drawerRef.current,
        { xPercent: 100, opacity: 0.6 },
        { xPercent: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
      );
      gsap.fromTo(
        drawerRef.current.querySelectorAll("[data-mobile-link]"),
        { x: 18, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.28,
          stagger: 0.05,
          delay: 0.08,
          ease: "power2.out",
        },
      );
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navItemClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
    }`;

  return (
    <header
      ref={navRef}
      className="sticky inset-x-0 top-0 z-[70] px-3 pt-3 transition duration-300 sm:px-6"
    >
      <Container
        className={`flex h-16 items-center justify-between gap-4 rounded-[1.35rem] border border-white/80 bg-white/78 px-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition duration-300 ${
          scrolled ? "shadow-[0_22px_70px_rgba(15,23,42,0.12)]" : ""
        }`}
      >
        <Logo />

        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Primary navigation"
        >
          {publicLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navItemClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {dashboardNavLinks.map((link) => (
            <Button
              key={link.path}
              to={link.path}
              variant="secondary"
              className="px-3 py-2 text-xs"
            >
              {link.label}
            </Button>
          ))}
          <Button to="/quiz" className="px-4 py-2.5">
            Start Quiz
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 xl:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
      </Container>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm xl:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            ref={drawerRef}
            className="absolute right-0 top-0 h-dvh w-[88%] max-w-sm border-l border-slate-200 bg-white px-5 py-5 shadow-[0_20px_100px_rgba(15,23,42,0.18)]"
            onClick={(event) => event.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between gap-4">
              <Logo />
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Explore
                </p>
                <nav className="mt-3 grid gap-2">
                  {publicLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      data-mobile-link
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                          isActive
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Dashboards
                </p>
                <div className="mt-3 grid gap-2">
                  {dashboardNavLinks.map((link) => (
                    <Button
                      key={link.path}
                      to={link.path}
                      variant="secondary"
                      className="justify-start"
                      data-mobile-link
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-cyan-200 bg-cyan-50 p-4">
              <p className="text-sm font-semibold text-[#0F172A]">
                Ready to practice?
              </p>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Use the ERP simulator to test invoice, employee, and inventory
                workflows in a clean sandbox.
              </p>
              <Button
                to="/erp-simulator"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                Open simulator
              </Button>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
