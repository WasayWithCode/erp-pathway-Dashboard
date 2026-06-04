import { useRef } from "react";
import ModuleCard from "../../components/Cards/ModuleCard";
import Container from "../../components/UI/Container";
import PageHero from "../../components/UI/PageHero";
import { erpModules } from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const Modules = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);
  usePageTitle("ERP Modules", "Compare SAP FICO, SAP MM, SAP SD, SAP HCM, Oracle ERP, Odoo ERP, and Microsoft Dynamics.");

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="ERP Modules"
        title="Choose the ERP module that matches your strengths."
        description="Compare each module by description, skills required, salary range, career opportunities, and learning direction."
      />
      <section className="pb-20">
        <Container className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3" data-card-reveal>
          {erpModules.map((module) => (
            <ModuleCard key={module.name} module={module} />
          ))}
        </Container>
      </section>
    </div>
  );
};

export default Modules;

