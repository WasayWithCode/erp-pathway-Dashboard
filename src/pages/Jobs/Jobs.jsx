import { useMemo, useRef, useState } from "react";
import JobCard from "../../components/Cards/JobCard";
import Badge from "../../components/UI/Badge";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import GlassCard from "../../components/UI/GlassCard";
import PageHero from "../../components/UI/PageHero";
import SectionHeader from "../../components/UI/SectionHeader";
import Timeline from "../../components/UI/Timeline";
import { erpModules, jobRoles, roadmapLevels } from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const Jobs = () => {
  const pageRef = useRef(null);
  const [activeRole, setActiveRole] = useState(jobRoles[0].title);
  useGsapReveal(pageRef);
  usePageTitle("ERP Job Roles", "Explore ERP consultant, functional consultant, technical consultant, business analyst, and support roles.");

  const selectedRole = useMemo(
    () => jobRoles.find((role) => role.title === activeRole) || jobRoles[0],
    [activeRole],
  );

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="Careers"
        title="Explore ERP careers with salary bands, skills, and growth paths."
        description="Compare consulting, technical, business analysis, support, finance, and implementation paths in one premium career workspace."
      />

      <section className="pb-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-3" data-card-reveal>
            {[
              ["PKR 50k+", "Beginner salary floor"],
              ["PKR 350k", "Technical growth ceiling"],
              ["6 paths", "Role families mapped"],
            ].map(([value, label]) => (
              <GlassCard key={label} className="p-5" data-card>
                <p className="text-3xl font-semibold text-[#0F172A]">{value}</p>
                <p className="mt-2 text-sm font-semibold text-[#64748B]">{label}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Role Explorer"
              title="Choose a role and inspect the day-to-day work."
              description="This explorer turns generic job titles into responsibilities, skills, salary, and growth direction."
            />
            <div className="mt-8 grid gap-2" data-card-reveal>
              {jobRoles.map((role) => (
                <button
                  key={role.title}
                  type="button"
                  onClick={() => setActiveRole(role.title)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    activeRole === role.title
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-[#64748B] hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  {role.title}
                </button>
              ))}
            </div>
          </div>

          <JobCard job={selectedRole} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Skills Roadmap"
            title="Module skills that turn into career options."
            description="Each ERP module builds a different professional profile. Pick based on the work you want to do every day."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-card-reveal>
            {erpModules.map((module) => (
              <GlassCard key={module.name} className="p-5" data-card>
                <Badge tone="cyan">{module.tagline}</Badge>
                <h3 className="mt-4 text-xl font-semibold text-[#0F172A]">{module.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-5 border-t border-slate-200 pt-4 text-sm text-[#64748B]">
                  Salary: <span className="font-semibold text-[#0F172A]">{module.salary}</span>
                </p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-20">
        <Container>
          <SectionHeader
            eyebrow="Learning Pathway"
            title="From beginner concepts to job preparation."
            description="A practical career path keeps learners focused on outcomes instead of collecting random tutorials."
          />
          <div className="mx-auto mt-12 max-w-5xl">
            <Timeline items={roadmapLevels} />
          </div>
          <div className="mt-12 flex justify-center">
            <Button to="/quiz">Take the ERP career quiz</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Jobs;
