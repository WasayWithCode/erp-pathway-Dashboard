import { useRef } from "react";
import Hero from "../../components/Hero/Hero";
import ModuleCard from "../../components/Cards/ModuleCard";
import FaqList from "../../components/FAQ/FaqList";
import Badge from "../../components/UI/Badge";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import FeatureCard from "../../components/UI/FeatureCard";
import GlassCard from "../../components/UI/GlassCard";
import SectionHeader from "../../components/UI/SectionHeader";
import StatCounter from "../../components/UI/StatCounter";
import Timeline from "../../components/UI/Timeline";
import {
  erpBenefits,
  erpModules,
  faqItems,
  howItWorks,
  learningJourney,
  platformFeatures,
  problems,
  solutions,
  stats,
  testimonials,
} from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const Home = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);
  usePageTitle(
    "Home",
    "ERP Pathway helps Pakistani students learn ERP concepts, choose modules, explore careers, and access free resources.",
  );

  return (
    <div ref={pageRef}>
      <Hero />

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Student Problem"
            title="ERP careers look powerful, but the starting point is unclear."
            description="ERP Pathway turns confusing enterprise software into a practical learning journey for Pakistani students."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3" data-card-reveal>
            {problems.map((item, index) => (
              <GlassCard key={item.title} className="p-6" data-card>
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-500/10 text-sm font-black text-red-200">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-black text-[#0F172A]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container>
          <SectionHeader
            eyebrow="The Solution"
            title="A complete ERP guidance system from basics to job preparation."
            description="Understand the field, compare modules, test your fit, and follow a roadmap made for real student decisions."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3" data-card-reveal>
            {solutions.map((item) => (
              <GlassCard key={item.title} className="p-6" data-card>
                <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                <h3 className="mt-5 text-xl font-black text-[#0F172A]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Platform Features"
            title="Everything feels connected because the product is built around the ERP journey."
            description="The experience combines module discovery, career intelligence, practice dashboards, and structured guidance."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-card-reveal>
            {platformFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
            <SectionHeader
              align="left"
              eyebrow="ERP Modules"
              title="Explore the modules that shape ERP careers."
              description="Each module connects to a business function, skill set, and career path."
              className="md:max-w-2xl"
            />
            <Button to="/modules" variant="secondary">View All Modules</Button>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3" data-card-reveal>
            {erpModules.slice(0, 3).map((module) => (
              <ModuleCard key={module.name} module={module} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            align="left"
            eyebrow="ERP Benefits"
            title="Why ERP skills create leverage across business and technology roles."
            description="ERP knowledge helps learners understand how companies actually run: money, stock, people, orders, approvals, and reports."
          />
          <div className="grid gap-3 sm:grid-cols-2" data-card-reveal>
            {erpBenefits.map((benefit) => (
              <GlassCard key={benefit} className="p-4" data-card>
                <p className="text-sm font-semibold leading-6 text-[#0F172A]">{benefit}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Learning Journey"
            title="A premium roadmap from discovery to career launch."
            description="Students can see the complete arc instead of bouncing between disconnected tutorials."
          />
          <div className="mx-auto mt-12 max-w-5xl">
            <Timeline items={learningJourney} />
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container>
          <SectionHeader
            eyebrow="How It Works"
            title="From first lesson to job-ready confidence."
            description="The platform keeps the path simple: learn the basics, choose a module, practice, and prepare for interviews."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4" data-card-reveal>
            {howItWorks.map((step) => (
              <GlassCard key={step.step} className="relative overflow-hidden p-6" data-card>
                <span className="text-sm font-black text-blue-700">{step.step}</span>
                <h3 className="mt-4 text-xl font-black text-[#0F172A]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50" />
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Student Results"
            title="Built around the questions Pakistani students actually ask."
            description="The content is practical, career-focused, and written for students starting from zero ERP exposure."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3" data-card-reveal>
            {testimonials.map((item) => (
              <GlassCard key={item.name} className="p-6" data-card>
                <blockquote className="text-sm leading-7 text-slate-600">
                  "{item.quote}"
                </blockquote>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="font-bold text-[#0F172A]">{item.name}</p>
                  <p className="text-sm text-[#64748B]">{item.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container>
          <SectionHeader
            eyebrow="Platform Statistics"
            title="A focused ERP launchpad for students and fresh graduates."
            description="Numbers represent the learning scope and career guidance built into this MVP."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-card-reveal>
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="FAQ"
            title="Quick answers before you choose your path."
            description="Start with the most common ERP questions, then visit the full FAQ page for deeper answers."
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <FaqList items={faqItems.slice(0, 6)} />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <GlassCard className="relative overflow-hidden p-8 text-center sm:p-12" data-reveal>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.22),transparent_42%)]" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <Badge>Start today</Badge>
              <h2 className="mt-5 text-3xl font-black text-[#0F172A] sm:text-5xl">
                Discover your ERP module and build a career roadmap.
              </h2>
              <p className="mt-5 text-slate-600">
                Take the free quiz, compare ERP modules, and follow a learning plan designed for Pakistani students.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button to="/quiz">Take Free Quiz</Button>
                <Button to="/resources" variant="secondary">Browse Resources</Button>
              </div>
            </div>
          </GlassCard>
        </Container>
      </section>
    </div>
  );
};

export default Home;

