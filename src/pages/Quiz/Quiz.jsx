import { useRef } from "react";
import CareerQuiz from "../../components/Quiz/CareerQuiz";
import PageHero from "../../components/UI/PageHero";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const Quiz = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);
  usePageTitle("Career Quiz", "Take a 10-question ERP career quiz and get a recommended ERP module.");

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="Career Quiz"
        title="Find your best ERP module in 10 questions."
        description="Answer practical questions about your interests, strengths, and work style. The result recommends an ERP module and next learning steps."
      />
      <section className="pb-20">
        <CareerQuiz />
      </section>
    </div>
  );
};

export default Quiz;

