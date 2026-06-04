import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const indicatorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(
    () => ["home", "about", "modules", "careers", "contact"],
    [],
  );

  // 🔥 Intro Animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    }).from(
      ".nav-item",
      {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.6",
    );

    return () => tl.kill();
  }, []);

  // 🔥 Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Active Section Tracker (Simple & Reliable)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      const sections = links.map((id) => document.getElementById(id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActive(links[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  // 🔥 Indicator Movement
  useEffect(() => {
    const el = document.querySelector(`[data-id="${active}"]`);
    if (!el || !indicatorRef.current) return;

    const parentRect = el.parentElement.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    gsap.to(indicatorRef.current, {
      x: elRect.left - parentRect.left,
      width: elRect.width,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [active]);

  // 🔥 Mobile Drawer Animation
  useEffect(() => {
    if (open && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [open]);

  // 🔥 Close handlers
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
      document.addEventListener("mousedown", handleClick);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
      document.body.style.overflow = "";
    };
  }, [open]);

  // 🔥 Smooth scroll
  const scrollTo = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const top = element.offsetTop - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/80 backdrop-blur-xl py-2 shadow-lg shadow-slate-200/80"
            : "bg-gray-900 py-4"
        } text-[#0F172A]`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <a
              href="#home"
              className="text-blue-400 hover:text-blue-700 transition-colors"
            >
              ERP Pathway
            </a>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex relative items-center gap-8 text-sm font-medium">
            <span
              ref={indicatorRef}
              className="absolute -bottom-1 left-0 h-[2px] bg-blue-400 rounded-full"
              aria-hidden="true"
            />

            {links.map((item) => (
              <button
                key={item}
                data-id={item}
                onClick={() => scrollTo(item)}
                className={`nav-item relative capitalize transition-colors duration-200 hover:text-blue-400 ${
                  active === item ? "text-blue-400" : "text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-3xl hover:text-blue-400 transition-colors"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            ref={menuRef}
            className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-gray-950 p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-blue-400 font-bold text-lg">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-2xl hover:text-blue-400"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-2">
              {links.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`w-full text-left py-4 border-b border-gray-800 capitalize transition-colors ${
                    active === item
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

