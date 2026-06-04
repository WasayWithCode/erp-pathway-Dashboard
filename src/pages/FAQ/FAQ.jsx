import { useRef } from "react";
import FaqList from "../../components/FAQ/FaqList";
import Container from "../../components/UI/Container";
import PageHero from "../../components/UI/PageHero";
import { faqItems } from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const FAQ = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);
  usePageTitle("FAQ", "Read 20 ERP-related FAQs for students choosing ERP modules and careers.");

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="FAQ"
        title="20 ERP questions answered for beginners."
        description="Clear answers about ERP, SAP, Oracle, Odoo, Dynamics, careers, salaries, certifications, and learning paths."
      />
      <section className="pb-20">
        <Container className="max-w-4xl">
          <FaqList items={faqItems} />
        </Container>
      </section>
    </div>
  );
};

export default FAQ;

