import { useRef } from "react";
import Container from "../../components/UI/Container";
import FeatureCard from "../../components/UI/FeatureCard";
import GlassCard from "../../components/UI/GlassCard";
import Icon from "../../components/UI/Icon";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import Timeline from "../../components/UI/Timeline";
import { erpBenefits, erpExamples, erpIndustries, learningJourney } from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const pillars = [
  {
    icon: "dashboard",
    title: "Mission",
    description: "Make ERP understandable for students who know business or technology but have never seen enterprise workflows clearly.",
  },
  {
    icon: "roadmap",
    title: "Vision",
    description: "Become the most practical ERP career launchpad for learners who want structured guidance before investing time or money.",
  },
  {
    icon: "operations",
    title: "Why ERP matters",
    description: "ERP connects departments, reduces duplicate work, improves reporting, and gives professionals a systems view of companies.",
  },
];

const processVisual = ["Lead", "Order", "Stock", "Invoice", "Report"];

const WhatIsERP = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);
  usePageTitle("What is ERP", "Learn what ERP means, how ERP systems evolved, and why companies use ERP software.");

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="ERP Fundamentals"
        title="Understand ERP as the operating system of a modern company."
        description="Enterprise Resource Planning connects finance, sales, inventory, procurement, HR, operations, and reporting into one controlled business workflow."
      />

      <section className="pb-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-3" data-card-reveal>
            {pillars.map((pillar) => (
              <FeatureCard key={pillar.title} {...pillar} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <SectionHeader
            align="left"
            eyebrow="ERP Visual"
            title="One workflow, many connected departments."
            description="The easiest way to understand ERP is to watch a business event move through the company without losing data."
          />
          <GlassCard className="p-5" data-reveal>
            <div className="grid gap-3 sm:grid-cols-5">
              {processVisual.map((item, index) => (
                <div key={item} className="relative rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon name={index === 0 ? "people" : index === 1 ? "operations" : index === 2 ? "inventory" : index === 3 ? "finance" : "chart"} className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-[#0F172A]">{item}</p>
                  <p className="mt-1 text-xs text-[#64748B]">Synced data</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="ERP Benefits"
            title="ERP gives companies control over daily business operations."
            description="The real value appears when departments stop working in isolated spreadsheets and start using connected workflows."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-card-reveal>
            {erpBenefits.map((benefit) => (
              <GlassCard key={benefit} className="p-5" data-card>
                <p className="font-semibold leading-7 text-[#0F172A]">{benefit}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow="ERP Examples"
              title="Real business situations where ERP matters."
              description="These examples show ERP moving beyond theory into daily operations."
            />
            <div className="mt-8 grid gap-4" data-card-reveal>
              {erpExamples.map((example) => (
                <GlassCard key={example} className="p-5" data-card>
                  <p className="text-sm leading-7 text-slate-600">{example}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Industries"
              title="ERP is used across Pakistani and global industries."
              description="Any company with repeatable processes, stock, invoices, people, or reporting can benefit from ERP."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2" data-card-reveal>
              {erpIndustries.map((industry) => (
                <GlassCard key={industry} className="p-4" data-card>
                  <p className="font-semibold text-[#0F172A]">{industry}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Learning Path"
            title="How ERP understanding compounds over time."
            description="Students do not need to learn everything at once. The journey becomes clear when each phase has a purpose."
          />
          <div className="mx-auto mt-12 max-w-5xl">
            <Timeline items={learningJourney} />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default WhatIsERP;
