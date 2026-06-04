import { useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== DATA (Module-level constants) =====
const PROBLEM_CARDS = [
  {
    icon: "😕",
    title: "ERP Ka Naam Suna Hai...",
    desc: "Lekin samajh nahi aata ke ERP actually karta kya hai? Simple words mein koi explain nahi karta.",
    border: "border-red-500/30",
    hoverBorder: "hover:border-red-500/50",
  },
  {
    icon: "🤷",
    title: "Kaunse Module Se Start Karein?",
    desc: "SAP FICO, MM, SD, Oracle – itne options, konsa best hai mere background ke liye?",
    border: "border-yellow-500/30",
    hoverBorder: "hover:border-yellow-500/50",
  },
  {
    icon: "😰",
    title: "Jobs Aur Salary Ka Pata Nahi",
    desc: "ERP seekhne ke baad freshers ko kitni salary milti hai? Kaunsi jobs available hain?",
    border: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/50",
  },
];

const SOLUTION_CARDS = [
  {
    icon: "📖",
    title: "ERP Kya Hai?",
    desc: "Simple Urdu mein ERP ki basic samajh. Real-life examples se seekhein.",
    link: "/what-is-erp",
  },
  {
    icon: "🗺️",
    title: "Career Roadmap",
    desc: "Step-by-step guide: Basic se le kar job tak ka complete safar.",
    link: "/roadmap",
  },
  {
    icon: "🧠",
    title: "Career Quiz",
    desc: "10 sawaal dein aur jaanien aapke liye best ERP module konsa hai.",
    link: "/quiz",
  },
  {
    icon: "📚",
    title: "Free Resources",
    desc: "YouTube, PDFs, Notes – sab organized ek jagah.",
    link: "/resources",
  },
  {
    icon: "💼",
    title: "Job Roles Guide",
    desc: "Consultant, Analyst – kaunsi job kis ke liye perfect hai.",
    link: "/jobs",
  },
  {
    icon: "👥",
    title: "Community",
    desc: "Experts se sawaal karein, network banayein, grow karein.",
    link: "/community",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Quiz Dein",
    desc: "10 quick questions ke through jaanien ke aapke liye best ERP module konsa hai.",
    icon: "🧠",
  },
  {
    step: "02",
    title: "Roadmap Dekhein",
    desc: "Personalized step-by-step learning path – kya seekhna hai aur kab.",
    icon: "🗺️",
  },
  {
    step: "03",
    title: "Resources Se Seekhein",
    desc: "YouTube playlists, PDFs, practice questions – sab organized.",
    icon: "📚",
  },
  {
    step: "04",
    title: "Job Ke Liye Apply Karein",
    desc: "Ready hone par job roles explore karein aur interview prep karein.",
    icon: "💼",
  },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Raza",
    role: "B.Com Graduate",
    text: "Mujhe pata nahi tha ke B.Com ke baad SAP FICO mein itni jobs hain. Quiz diya aur pura roadmap mil gaya!",
    avatar: "👨‍💼",
    stars: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Fatima Khan",
    role: "IT Student",
    text: "Odoo ERP ke baare mein yahi se seekha. Ab freelance projects kar rahi hoon. Bohat helpful platform hai!",
    avatar: "👩‍💻",
    stars: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Usman Ali",
    role: "Accountant → SAP Consultant",
    text: "Job switch karna chahta tha. ERP Pathway ne SAP FICO ka complete path bataya. Ab 3x salary pe job hai!",
    avatar: "🧑‍💼",
    stars: "⭐⭐⭐⭐⭐",
  },
];

const MODULES = [
  { icon: "📊", title: "Finance Module", desc: "Accounting & Reports" },
  { icon: "📦", title: "Inventory", desc: "Stock & Supply Chain" },
  { icon: "👨‍💼", title: "HR Module", desc: "Employee Management" },
  { icon: "🏭", title: "Operations", desc: "Business Workflow" },
];

// ===== SKIP LINK COMPONENT =====
const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-500 focus:text-[#0F172A] focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    Skip to main content
  </a>
);

// ===== CUSTOM HOOK: useScrollTo =====
const useScrollTo = () => {
  return useCallback((id) => {
    try {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`Element #${id} not found`);
        return;
      }
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error("Scroll error:", error);
    }
  }, []);
};

// ===== CUSTOM HOOK: useHomeAnimations =====
const useHomeAnimations = (refs) => {
  useEffect(() => {
    if (!refs.titleRef.current) return;

    const animations = [];
    const scrollTriggers = [];

    // Hero Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    animations.push(tl);

    tl.from(refs.titleRef.current, { y: 60, opacity: 0, duration: 1 })
      .from(refs.subRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(
        refs.btnRef.current ? [...refs.btnRef.current.children] : [],
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      )
      .from(
        refs.cardRef.current,
        { x: 80, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .from(
        refs.cardItemRefs.current.filter(Boolean),
        { x: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.6",
      )
      .from(
        refs.badgeRef.current,
        { scale: 0, duration: 0.5, ease: "back.out(2)" },
        "-=0.3",
      )
      .from(
        refs.statsRef.current,
        { y: 20, opacity: 0, duration: 0.5 },
        "-=0.2",
      );

    // Floating Card
    if (refs.cardRef.current) {
      const float = gsap.to(refs.cardRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
      animations.push(float);
    }

    // Badge Pulse
    if (refs.badgeRef.current) {
      const pulse = gsap.to(refs.badgeRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
      animations.push(pulse);
    }

    // Helper to create ScrollTrigger
    const createScrollAnimation = (trigger, animation, start = "top 80%") => {
      if (!trigger?.current) return;
      const st = ScrollTrigger.create({
        trigger: trigger.current,
        start,
        once: true,
        animation,
      });
      scrollTriggers.push(st);
    };

    // Problem Section
    createScrollAnimation(
      refs.problemSectionRef,
      gsap.from(refs.problemSectionRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1.4)",
        paused: true,
      }),
    );

    // Solution Section
    createScrollAnimation(
      refs.solutionSectionRef,
      gsap.from(refs.solutionSectionRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        paused: true,
      }),
      "top 75%",
    );

    // Steps
    createScrollAnimation(
      refs.stepsSectionRef,
      gsap.from(refs.stepsSectionRef.current?.children || [], {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.25,
        ease: "power2.out",
        paused: true,
      }),
      "top 75%",
    );

    // Testimonials
    createScrollAnimation(
      refs.testimonialSectionRef,
      gsap.from(refs.testimonialSectionRef.current?.children || [], {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1.4)",
        paused: true,
      }),
    );

    // CTA
    if (refs.ctaSectionRef.current) {
      const st = ScrollTrigger.create({
        trigger: refs.ctaSectionRef.current,
        start: "top 85%",
        once: true,
        animation: gsap.from(refs.ctaSectionRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          paused: true,
        }),
      });
      scrollTriggers.push(st);
    }

    return () => {
      animations.forEach((anim) => anim.kill());
      scrollTriggers.forEach((st) => st.kill());
    };
  }, [refs]);
};

// ===== MAIN COMPONENT =====
const Home = () => {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const cardItemRefs = useRef([]);
  const statsRef = useRef(null);
  const problemSectionRef = useRef(null);
  const solutionSectionRef = useRef(null);
  const stepsSectionRef = useRef(null);
  const testimonialSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  const scrollTo = useScrollTo();

  const refs = useMemo(
    () => ({
      titleRef,
      subRef,
      btnRef,
      cardRef,
      badgeRef,
      cardItemRefs,
      statsRef,
      problemSectionRef,
      solutionSectionRef,
      stepsSectionRef,
      testimonialSectionRef,
      ctaSectionRef,
    }),
    [],
  );

  useHomeAnimations(refs);

  return (
    <>
      <Helmet>
        <title>ERP Pathway - Learn ERP Systems the Smart Way | Pakistan</title>
        <meta
          name="description"
          content="ERP Pathway helps Pakistani students learn ERP systems like SAP, Oracle, Odoo. Free career quiz, roadmap, and job guidance."
        />
        <meta
          property="og:title"
          content="ERP Pathway - Learn ERP Systems the Smart Way"
        />
        <meta
          property="og:description"
          content="Pakistan ka pehla free ERP learning & career guidance platform."
        />
      </Helmet>

      <SkipLink />

      <main id="main-content" className="bg-gray-950 text-[#0F172A]">
        {/* ==================== HERO ==================== */}
        <section
          id="home"
          className="min-h-screen flex items-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 px-4 sm:px-6 pt-20"
          aria-label="Hero section"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div>
              <div
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs text-blue-400 mb-6"
                role="status"
                aria-label="Platform status: Live"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                🇵🇰 Pakistan Ka ERP Learning Platform
              </div>

              <h1
                ref={titleRef}
                className="text-4xl md:text-6xl font-bold leading-tight"
                tabIndex={-1}
              >
                Learn ERP Systems{" "}
                <span className="text-blue-400">the Smart Way</span>
              </h1>

              <p
                ref={subRef}
                className="mt-6 text-gray-300 text-lg leading-relaxed max-w-lg"
              >
                ERP Pathway helps students understand real-world ERP concepts
                using visual learning, modules, and career-focused guidance. No
                prior IT experience required.
              </p>

              <div ref={btnRef} className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/quiz"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                  aria-label="Take free career quiz"
                >
                  🎯 Free Career Quiz
                </Link>
                <button
                  onClick={() => scrollTo("modules")}
                  className="px-6 py-3 border border-gray-600 hover:border-blue-200 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                  aria-label="Scroll to modules section"
                >
                  📚 Explore Modules
                </button>
              </div>

              <div
                ref={statsRef}
                className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400"
                aria-label="Platform statistics"
              >
                <div>
                  <span
                    className="text-blue-400 font-bold text-base sm:text-lg"
                    aria-hidden="true"
                  >
                    6+
                  </span>{" "}
                  ERP Modules
                </div>
                <div
                  className="hidden sm:block w-px h-4 bg-gray-700"
                  aria-hidden="true"
                />
                <div>
                  <span
                    className="text-blue-400 font-bold text-base sm:text-lg"
                    aria-hidden="true"
                  >
                    500+
                  </span>{" "}
                  Students
                </div>
                <div
                  className="hidden sm:block w-px h-4 bg-gray-700"
                  aria-hidden="true"
                />
                <div>
                  <span className="text-green-400" aria-hidden="true">
                    ●
                  </span>{" "}
                  Free Forever
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div
              ref={cardRef}
              className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl"
              role="complementary"
              aria-label="ERP modules overview"
            >
              <h2 className="text-blue-400 text-lg font-semibold mb-4">
                🧠 ERP Overview
              </h2>

              <div className="space-y-3">
                {MODULES.map((item, i) => (
                  <div
                    key={item.title}
                    ref={(el) => (cardItemRefs.current[i] = el)}
                    className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors cursor-default border border-transparent hover:border-gray-700"
                    role="listitem"
                  >
                    <span aria-hidden="true" className="mr-2">
                      {item.icon}
                    </span>
                    <span className="font-medium text-[#0F172A]">{item.title}</span>
                    <span className="text-gray-400 text-sm ml-2">
                      — {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                <span>📚 500+ Free Resources</span>
                <span>💼 Jobs: 50K – 3Lakh</span>
              </div>

              <div
                ref={badgeRef}
                className="absolute -top-3 -right-3 bg-blue-500 text-xs px-3 py-1 rounded-full shadow-lg"
                aria-label="Platform is live"
              >
                Live Learning
              </div>
            </div>
          </div>
        </section>

        {/* ==================== PROBLEM SECTION ==================== */}
        <section
          id="problem"
          className="py-20 px-4 sm:px-6 bg-gray-900/50"
          aria-labelledby="problem-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
                The Problem
              </span>
              <h2
                id="problem-heading"
                className="text-3xl md:text-4xl font-bold mt-3 mb-4"
              >
                Kya Aap Bhi Yeh Soch Rahe Hain? 🤔
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Pakistan ke 90% students ke man mein yehi sawaal hain...
              </p>
            </div>

            <div
              ref={problemSectionRef}
              className="grid md:grid-cols-3 gap-6"
              role="list"
            >
              {PROBLEM_CARDS.map((item, i) => (
                <div
                  key={i}
                  className={`bg-gray-900/60 backdrop-blur-xl border ${item.border} ${item.hoverBorder} rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                  role="listitem"
                >
                  <div className="text-5xl mb-4" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg text-[#0F172A] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <span
                className="text-3xl animate-bounce inline-block"
                aria-hidden="true"
              >
                👇
              </span>
              <p className="text-blue-400 font-semibold mt-2">
                ERP Pathway In Sab Ka Solution Hai!
              </p>
            </div>
          </div>
        </section>

        {/* ==================== SOLUTION SECTION ==================== */}
        <section
          id="modules"
          className="py-20 px-4 sm:px-6 bg-gray-950"
          aria-labelledby="solution-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
                The Solution
              </span>
              <h2
                id="solution-heading"
                className="text-3xl md:text-4xl font-bold mt-3 mb-4"
              >
                ERP Pathway Par Kya Milega? 🚀
              </h2>
              <p className="text-gray-400">
                Sab kuch ek platform par, bilkul free!
              </p>
            </div>

            <div
              ref={solutionSectionRef}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
            >
              {SOLUTION_CARDS.map((card, i) => (
                <Link
                  key={i}
                  to={card.link}
                  className="group bg-gray-900/60 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`${card.title} - ${card.desc}`}
                  role="listitem"
                >
                  <span
                    className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </span>
                  <h3 className="font-bold text-xl text-[#0F172A] mb-2 group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                  <span
                    className="inline-block mt-3 text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    Explore Karein →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== HOW IT WORKS ==================== */}
        <section
          id="how-it-works"
          className="py-20 px-4 sm:px-6 bg-gray-900/50"
          aria-labelledby="process-heading"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
                Process
              </span>
              <h2
                id="process-heading"
                className="text-3xl md:text-4xl font-bold mt-3 mb-4"
              >
                Kaise Kaam Karta Hai? 🛤️
              </h2>
            </div>

            <div ref={stepsSectionRef} className="space-y-6" role="list">
              {STEPS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 bg-gray-900/60 backdrop-blur-xl border border-gray-800 hover:border-gray-700 p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
                  role="listitem"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-xl font-bold border border-blue-500/30"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-blue-400 font-bold text-xs tracking-wider">
                      STEP {item.step}
                    </span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== TESTIMONIALS ==================== */}
        <section
          id="testimonials"
          className="py-20 px-4 sm:px-6 bg-gray-950"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
                Testimonials
              </span>
              <h2
                id="testimonials-heading"
                className="text-3xl md:text-4xl font-bold mt-3 mb-4"
              >
                Students Kya Kehte Hain? 💬
              </h2>
            </div>

            <div
              ref={testimonialSectionRef}
              className="grid md:grid-cols-3 gap-6"
              role="list"
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-gray-700 hover:shadow-xl"
                  role="listitem"
                >
                  <div
                    className="text-yellow-400 text-sm mb-3"
                    aria-label="5 out of 5 stars"
                  >
                    {t.stars}
                  </div>
                  <blockquote className="text-gray-300 italic mb-4 leading-relaxed">
                    "{t.text}"
                  </blockquote>
                  <div className="border-t border-gray-800 pt-4 flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-xl"
                      aria-hidden="true"
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <cite className="font-bold text-[#0F172A] text-sm not-italic">
                        {t.name}
                      </cite>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CTA ==================== */}
        <section
          id="cta"
          className="py-20 px-4 sm:px-6 bg-gray-900/50"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-4xl mx-auto">
            <div
              ref={ctaSectionRef}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <span className="inline-block bg-blue-50 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-blue-500/20">
                  🚀 Ready to Start?
                </span>

                <h2
                  id="cta-heading"
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Apna ERP Career <span className="text-blue-400">Aaj Se</span>{" "}
                  Shuru Karein!
                </h2>

                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  500+ students ne apna ERP career path discover kar liya hai.
                  Aap kab tak wait karenge?{" "}
                  <span className="text-[#0F172A] font-semibold">Bilkul free!</span>
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/quiz"
                    className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    🎯 Free Career Quiz Dein
                  </Link>
                  <Link
                    to="/modules"
                    className="px-8 py-4 border border-gray-600 hover:border-blue-200 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    📚 Modules Dekhein
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-500">
                  <span>🔒 No Signup Required</span>
                  <span
                    className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"
                    aria-hidden="true"
                  />
                  <span>✅ 100% Free</span>
                  <span
                    className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"
                    aria-hidden="true"
                  />
                  <span>🇵🇰 Made for Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

