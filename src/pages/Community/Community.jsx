import { useRef } from "react";
import Container from "../../components/UI/Container";
import GlassCard from "../../components/UI/GlassCard";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import { contributors, discussions } from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const guidelines = [
  "Ask specific questions with your background and target role.",
  "Share resources only when they are useful, legal, and relevant.",
  "Respect beginners and explain ERP terms clearly.",
  "Avoid job guarantees, fake certificates, and misleading salary claims.",
];

const qna = [
  {
    question: "Can I start ERP without a paid SAP server?",
    answer:
      "Yes. Start with process understanding, documentation, videos, case studies, and screenshots. Paid system access becomes more useful after fundamentals are clear.",
  },
  {
    question: "Should I choose SAP, Odoo, Oracle, or Dynamics first?",
    answer:
      "Choose based on your background. Accounting students can start with FICO, IT students can explore technical or Odoo, and business students can compare SD, MM, Oracle, or Dynamics.",
  },
];

const Community = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);
  usePageTitle("Community", "Join ERP Pathway community discussions, Q&A, guidelines, and contributor highlights.");

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="Community"
        title="Learn ERP with students, mentors, and early-career professionals."
        description="Use the community to ask questions, compare modules, share learning resources, and stay accountable."
      />

      <section className="pb-20">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Discussions"
              title="Active ERP conversations"
              description="Discussion cards model the kind of helpful questions students can ask."
            />
            <div className="mt-8 grid gap-5" data-card-reveal>
              {discussions.map((discussion) => (
                <GlassCard key={discussion.title} className="p-6" data-card>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="rounded-lg border border-blue-400/30 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                        {discussion.tag}
                      </span>
                      <h2 className="mt-4 text-xl font-black text-[#0F172A]">{discussion.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{discussion.summary}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4 text-sm">
                      <p className="font-bold text-[#0F172A]">{discussion.replies}</p>
                      <p className="text-[#64748B]">Replies</p>
                    </div>
                  </div>
                  <p className="mt-5 border-t border-slate-200 pt-4 text-sm text-[#64748B]">
                    Started by <span className="font-semibold text-slate-600">{discussion.author}</span>
                  </p>
                </GlassCard>
              ))}
            </div>

            <div className="mt-12">
              <SectionHeader
                align="left"
                eyebrow="Q and A"
                title="Common community answers"
                description="These answers help beginners avoid the most common ERP learning mistakes."
              />
              <div className="mt-8 grid gap-5" data-card-reveal>
                {qna.map((item) => (
                  <GlassCard key={item.question} className="p-6" data-card>
                    <h2 className="text-lg font-black text-[#0F172A]">{item.question}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <GlassCard className="p-6" data-reveal>
              <h2 className="text-xl font-black text-[#0F172A]">Community Guidelines</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600">
                {guidelines.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-6" data-reveal>
              <h2 className="text-xl font-black text-[#0F172A]">Top Contributors</h2>
              <div className="mt-5 grid gap-4">
                {contributors.map((person, index) => (
                  <div key={person.name} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/90 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-sm font-black text-blue-700">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-[#0F172A]">{person.name}</p>
                      <p className="text-xs text-[#64748B]">{person.expertise} - {person.points} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </aside>
        </Container>
      </section>
    </div>
  );
};

export default Community;

