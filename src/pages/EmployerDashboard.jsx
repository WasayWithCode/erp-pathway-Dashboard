import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { dashboardNavLinks } from "../routes/appRouteConfig";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Badge,
  Button,
  DashboardCard,
  Modal,
  ProgressBar,
  SectionHeader,
  StatCard,
} from "../components/dashboard";
import Icon from "../components/UI/Icon";
import GlassCard from "../components/dashboard/GlassCard";
import { useGsapReveal } from "../hooks/useGsapReveal";

const SKILLS = [
  "SAP FICO",
  "SAP MM",
  "SAP SD",
  "SAP HCM",
  "Oracle ERP",
  "Dynamics 365",
  "Odoo ERP",
  "Power BI",
  "SQL",
  "Excel Advanced",
  "ERP Implementation",
  "Business Analysis",
];

const INITIAL_JOBS = [
  {
    id: "J-2401",
    company: "Engro Corporation",
    title: "SAP FICO Consultant",
    location: "Karachi",
    type: "Full-time",
    experience: "1-2 Years",
    salary: "PKR 180k - 260k",
    status: "Active",
    applications: 24,
    skills: ["SAP FICO", "Excel Advanced", "Power BI", "Business Analysis"],
    posted: "2026-05-28",
  },
  {
    id: "J-2402",
    company: "HBL Pakistan",
    title: "ERP Support Analyst",
    location: "Lahore",
    type: "Full-time",
    experience: "Fresh Graduate",
    salary: "PKR 95k - 140k",
    status: "Active",
    applications: 18,
    skills: ["Oracle ERP", "SQL", "Excel Advanced"],
    posted: "2026-05-30",
  },
  {
    id: "J-2403",
    company: "Unilever Pakistan",
    title: "Dynamics 365 Functional Lead",
    location: "Karachi",
    type: "Contract",
    experience: "3-5 Years",
    salary: "PKR 240k - 360k",
    status: "Paused",
    applications: 11,
    skills: ["Dynamics 365", "Power BI", "Business Analysis", "ERP Implementation"],
    posted: "2026-05-24",
  },
];

const STUDENTS = [
  {
    id: "S-1001",
    name: "Ayesha Khan",
    education: "BCom",
    city: "Karachi",
    level: "Fresh Graduate",
    skills: ["SAP FICO", "Excel Advanced", "SQL"],
    experience: "Accounting internships",
  },
  {
    id: "S-1002",
    name: "Bilal Ahmed",
    education: "BBA",
    city: "Lahore",
    level: "1-2 Years",
    skills: ["SAP MM", "Power BI", "Business Analysis"],
    experience: "Supply chain trainee",
  },
  {
    id: "S-1003",
    name: "Sara Malik",
    education: "MBA Finance",
    city: "Karachi",
    level: "1-2 Years",
    skills: ["SAP FICO", "Oracle ERP", "Excel Advanced"],
    experience: "Finance support associate",
  },
  {
    id: "S-1004",
    name: "Usman Tariq",
    education: "BS IT",
    city: "Islamabad",
    level: "Fresh Graduate",
    skills: ["Dynamics 365", "SQL", "ERP Implementation"],
    experience: "System configuration projects",
  },
  {
    id: "S-1005",
    name: "Fatima Noor",
    education: "MCom",
    city: "Karachi",
    level: "Fresh Graduate",
    skills: ["SAP FICO", "Power BI", "Business Analysis"],
    experience: "Final year ERP project",
  },
];

const personaProfile = {
  name: "Ayesha Khan",
  city: "Karachi",
  level: "Fresh Graduate",
  headline: "Finance-minded ERP learner",
  skills: ["SAP FICO", "Excel Advanced", "SQL"],
};

const createJobId = () => `J-${Math.floor(2000 + Math.random() * 7000)}`;
const fmtPercent = (value) => `${Math.max(0, Math.min(100, Math.round(value)))}%`;

const scoreMatch = (student, job) => {
  const skillHits = job.skills.filter((skill) => student.skills.includes(skill)).length;
  const skillScore = (skillHits / job.skills.length) * 70;
  const cityScore = student.city === job.location ? 15 : 5;
  const levelScore =
    job.experience === student.level ? 12 : job.experience === "Fresh Graduate" && student.level === "1-2 Years"
      ? 8
      : 4;
  return Math.min(99, Math.round(skillScore + cityScore + levelScore));
};

const jobMatchColor = (score) => {
  if (score >= 85) return "emerald";
  if (score >= 70) return "cyan";
  if (score >= 55) return "amber";
  return "rose";
};

const initialForm = {
  company: "",
  title: "",
  location: "Karachi",
  type: "Full-time",
  experience: "Fresh Graduate",
  salary: "",
  skills: [],
  description: "",
};

const EmployerDashboard = () => {
  const rootRef = useRef(null);
  const [mode, setMode] = useState("employer");
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const [shortlisted, setShortlisted] = useState([]);
  const [form, setForm] = useState(initialForm);

  useGsapReveal(rootRef);

  useEffect(() => {
    if (!rootRef.current) return;
    const tween = gsap.fromTo(
      rootRef.current.querySelectorAll("[data-hero]"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
    );
    return () => tween.kill();
  }, []);

  const summary = useMemo(() => {
    const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0);
    const activeJobs = jobs.filter((job) => job.status === "Active").length;
    const avgMatch = Math.round(
      jobs.reduce((sum, job) => sum + scoreMatch(personaProfile, job), 0) / jobs.length,
    );
    const openRoles = jobs.filter((job) => job.status === "Active").length;
    return { totalApplications, activeJobs, avgMatch, openRoles };
  }, [jobs]);

  const matchedJobs = useMemo(
    () =>
      [...jobs]
        .map((job) => ({ ...job, score: scoreMatch(personaProfile, job) }))
        .sort((a, b) => b.score - a.score),
    [jobs],
  );

  const skillDemand = useMemo(() => {
    const counts = SKILLS.map((skill) => ({
      skill,
      count: jobs.reduce((sum, job) => sum + (job.skills.includes(skill) ? 1 : 0), 0),
    }));
    return counts
      .sort((a, b) => b.count - a.count)
      .filter((item) => item.count > 0)
      .slice(0, 6);
  }, [jobs]);

  const applicationStack = useMemo(
    () =>
      jobs
        .map((job) => ({
          ...job,
          intensity: Math.min(100, Math.max(24, Math.round((job.applications / 30) * 100))),
        }))
        .sort((a, b) => b.applications - a.applications)
        .slice(0, 5),
    [jobs],
  );

  const addSkill = (skill) => {
    setForm((current) => ({
      ...current,
      skills: current.skills.includes(skill)
        ? current.skills.filter((item) => item !== skill)
        : [...current.skills, skill],
    }));
  };

  const submitJob = (event) => {
    event.preventDefault();
    if (!form.company.trim() || !form.title.trim() || form.skills.length === 0) return;

    setJobs((current) => [
      {
        id: createJobId(),
        company: form.company.trim(),
        title: form.title.trim(),
        location: form.location,
        type: form.type,
        experience: form.experience,
        salary: form.salary ? `PKR ${form.salary}` : "Confidential",
        status: "Active",
        applications: 0,
        skills: form.skills,
        posted: new Date().toISOString().slice(0, 10),
        description: form.description,
      },
      ...current,
    ]);
    setForm(initialForm);
    setPostOpen(false);
  };

  const toggleJobStatus = (jobId) => {
    setJobs((current) =>
      current.map((job) =>
        job.id === jobId ? { ...job, status: job.status === "Active" ? "Paused" : "Active" } : job,
      ),
    );
  };

  const shortlistStudent = (studentId) => {
    setShortlisted((current) => (current.includes(studentId) ? current : [...current, studentId]));
  };

  const jobFormReady = form.company.trim() && form.title.trim() && form.skills.length > 0;

  return (
    <DashboardLayout>
      <div ref={rootRef} className="space-y-10">
        <section className="grid gap-8 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-7" data-hero>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="cyan">ERP Job Portal</Badge>
              <Badge tone="indigo">Employer Dashboard</Badge>
              <Badge tone="emerald">Talent Matching</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#8B5CF6] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                Hire ERP talent with a dashboard that feels like a premium product, not a spreadsheet.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
                Post roles, inspect match quality, and compare applicants in a glass-first interface designed
                for modern SaaS polish.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setPostOpen(true)}
                icon={<Icon name="spark" className="h-4 w-4" />}
              >
                Post a job
              </Button>
              <Button
                variant="secondary"
                onClick={() => setMode((current) => (current === "employer" ? "student" : "employer"))}
                icon={<Icon name="dashboard" className="h-4 w-4" />}
              >
                Switch to {mode === "employer" ? "student" : "employer"} view
              </Button>
              {dashboardNavLinks.map((link) => (
                <Button key={link.path} to={link.path} variant="ghost" className="px-2">
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          <GlassCard className="p-5" data-hero>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#64748B]">Live cockpit</p>
                <h2 className="mt-2 text-xl font-semibold text-[#0F172A]">Employer workbench</h2>
              </div>
              <Badge tone={mode === "employer" ? "emerald" : "cyan"}>
                {mode === "employer" ? "Hiring mode" : "Student preview"}
              </Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Open roles</p>
                <p className="mt-3 text-3xl font-semibold text-[#0F172A]">{summary.activeJobs}</p>
                <p className="mt-2 text-sm text-[#64748B]">High-intent positions currently live.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Applications</p>
                <p className="mt-3 text-3xl font-semibold text-[#0F172A]">{summary.totalApplications}</p>
                <p className="mt-2 text-sm text-[#64748B]">Incoming talent across all active roles.</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Average match</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">{fmtPercent(summary.avgMatch)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Shortlisted</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">{shortlisted.length}</p>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar value={summary.avgMatch} tone="indigo" label="Talent fit across current pipeline" />
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Icon name="dashboard" className="h-5 w-5 text-cyan-600" />}
            label="Active Jobs"
            value={summary.activeJobs}
            detail="Positions that are visible to students."
          />
          <StatCard
            icon={<Icon name="people" className="h-5 w-5 text-emerald-600" />}
            label="Applications"
            value={summary.totalApplications}
            detail="Combined interest across all roles."
          />
          <StatCard
            icon={<Icon name="spark" className="h-5 w-5 text-violet-600" />}
            label="Avg Match"
            value={summary.avgMatch}
            suffix="%"
            detail="Candidate-job fit score."
          />
          <StatCard
            icon={<Icon name="roadmap" className="h-5 w-5 text-amber-600" />}
            label="Shortlisted"
            value={shortlisted.length}
            detail="Students pushed into shortlists."
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <DashboardCard
            title="Application intensity"
            subtitle="A quick visual of where the demand is concentrating."
            action={<Badge tone="slate">This week</Badge>}
          >
            <div className="space-y-4">
              {applicationStack.map((job) => (
                <div key={job.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-[#0F172A]">{job.title}</span>
                    <span className="text-[#64748B]">{job.applications} applications</span>
                  </div>
                  <ProgressBar value={job.intensity} tone="cyan" />
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Skill demand map"
            subtitle="The strongest keywords inside your current hiring mix."
            action={<Badge tone="indigo">Skills</Badge>}
          >
            <div className="space-y-4">
              {skillDemand.map((item) => {
                const percent = Math.max(26, Math.round((item.count / jobs.length) * 100));
                return (
                  <div key={item.skill} className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-700">{item.skill}</span>
                      <span className="text-[#64748B]">{item.count} roles</span>
                    </div>
                    <ProgressBar value={percent} tone="emerald" />
                  </div>
                );
              })}
            </div>
          </DashboardCard>
        </section>

        <section className="space-y-5" data-reveal>
          <SectionHeader
            eyebrow="Job posting system"
            title="Professional job cards with match-aware actions."
            description="Use the same board to post, pause, and inspect roles, then open a premium modal to see who fits each job best."
            actions={
              <Button onClick={() => setPostOpen(true)} icon={<Icon name="arrow" className="h-4 w-4" />}>
                New posting
              </Button>
            }
          />

          <div className="grid gap-4 xl:grid-cols-2" data-card-reveal>
            {jobs.map((job) => {
              const topScore = Math.max(...STUDENTS.map((student) => scoreMatch(student, job)));
              return (
                <GlassCard
                  key={job.id}
                  className="group p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200"
                  data-card
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-[#0F172A]">{job.title}</h3>
                        <Badge tone={job.status === "Active" ? "emerald" : "amber"}>{job.status}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-[#64748B]">
                        {job.company} - {job.location} - {job.type}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-3 text-right">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B]">Top match</p>
                      <p className="mt-2 text-2xl font-semibold text-[#0F172A]">{fmtPercent(topScore)}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} tone="slate">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#64748B]">Salary</p>
                      <p className="mt-2 text-sm font-medium text-[#0F172A]">{job.salary}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#64748B]">Applications</p>
                      <p className="mt-2 text-sm font-medium text-[#0F172A]">{job.applications}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-3">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#64748B]">Posted</p>
                      <p className="mt-2 text-sm font-medium text-[#0F172A]">{job.posted}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedJob(job)}
                      icon={<Icon name="search" className="h-4 w-4" />}
                    >
                      View matches
                    </Button>
                    <Button
                      variant="dark"
                      onClick={() => toggleJobStatus(job.id)}
                      icon={<Icon name="support" className="h-4 w-4" />}
                    >
                      {job.status === "Active" ? "Pause" : "Activate"}
                    </Button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <DashboardCard
            title="Talent pool"
            subtitle="A compact list of the strongest student profiles."
            action={<Badge tone="cyan">Students</Badge>}
          >
            <div className="space-y-4">
              {STUDENTS.map((student, index) => {
                const topScore = Math.max(...jobs.map((job) => scoreMatch(student, job)));
                return (
                  <div
                    key={student.id}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 transition hover:border-cyan-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-[#0F172A]">{student.name}</h4>
                          {index === 0 ? <Badge tone="emerald">Top candidate</Badge> : null}
                        </div>
                        <p className="mt-2 text-sm text-[#64748B]">
                          {student.education} - {student.city} - {student.level}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-3 py-2 text-right">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B]">Best fit</p>
                        <p className="mt-1 text-xl font-semibold text-[#0F172A]">{fmtPercent(topScore)}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {student.skills.map((skill) => (
                        <Badge key={skill} tone="slate">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Student view"
            subtitle="How a learner would experience the same dashboard."
            action={
              <Button
                variant={mode === "student" ? "primary" : "secondary"}
                onClick={() => setMode((current) => (current === "student" ? "employer" : "student"))}
              >
                {mode === "student" ? "Lock student mode" : "Preview student mode"}
              </Button>
            }
          >
            <GlassCard className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge tone="indigo">Persona</Badge>
                  <h3 className="mt-3 text-xl font-semibold text-[#0F172A]">{personaProfile.name}</h3>
                  <p className="mt-2 text-sm text-[#64748B]">
                    {personaProfile.headline} - {personaProfile.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Best match</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">{fmtPercent(matchedJobs[0]?.score || 0)}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {personaProfile.skills.map((skill) => (
                  <Badge key={skill} tone="cyan">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {matchedJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">{job.title}</h4>
                        <p className="mt-2 text-sm text-[#64748B]">
                          {job.company} - {job.location}
                        </p>
                      </div>
                      <Badge tone={jobMatchColor(job.score)}>{fmtPercent(job.score)}</Badge>
                    </div>
                    <div className="mt-4">
                      <ProgressBar value={job.score} tone={jobMatchColor(job.score)} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </DashboardCard>
        </section>
      </div>

      <Modal
        open={postOpen}
        title="Post a new ERP role"
        subtitle="Create a premium, high-conversion job card in a few quick steps."
        onClose={() => setPostOpen(false)}
      >
        <form className="grid gap-4" onSubmit={submitJob}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Company</span>
              <input
                value={form.company}
                onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="Engro Corporation"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Title</span>
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="SAP FICO Consultant"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Location</span>
              <select
                value={form.location}
                onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              >
                {["Karachi", "Lahore", "Islamabad", "Remote"].map((option) => (
                  <option key={option} value={option} className="bg-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Type</span>
              <select
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              >
                {["Full-time", "Part-time", "Contract", "Internship", "Freelance"].map((option) => (
                  <option key={option} value={option} className="bg-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Experience</span>
              <select
                value={form.experience}
                onChange={(event) => setForm((current) => ({ ...current, experience: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              >
                {["Fresh Graduate", "1-2 Years", "3-5 Years", "5+ Years"].map((option) => (
                  <option key={option} value={option} className="bg-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm">
            <span className="text-[#64748B]">Salary range</span>
            <input
              value={form.salary}
              onChange={(event) => setForm((current) => ({ ...current, salary: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
              placeholder="180000 - 260000"
            />
          </label>

          <div className="space-y-3">
            <p className="text-sm text-[#64748B]">Required skills</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                    form.skills.includes(skill)
                      ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                    : "border-slate-200 bg-slate-50/90 text-slate-600 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <label className="grid gap-2 text-sm">
            <span className="text-[#64748B]">Description</span>
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
              placeholder="Describe the role, ownership, and what success looks like."
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-sm text-[#64748B]">
              {jobFormReady ? "Ready to publish with smart matching enabled." : "Select a company, title, and at least one skill."}
            </p>
            <Button type="submit" disabled={!jobFormReady} icon={<Icon name="spark" className="h-4 w-4" />}>
              Publish role
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(selectedJob)}
        title={selectedJob ? `${selectedJob.title} matches` : "Talent matches"}
        subtitle={selectedJob ? `${selectedJob.company} - ${selectedJob.location}` : ""}
        onClose={() => setSelectedJob(null)}
        className="max-w-5xl"
      >
        {selectedJob ? (
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <GlassCard className="p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Role summary</p>
              <h4 className="mt-3 text-2xl font-semibold text-[#0F172A]">{selectedJob.title}</h4>
              <p className="mt-2 text-sm text-[#64748B]">
                {selectedJob.company} - {selectedJob.location} - {selectedJob.type}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B]">Applications</p>
                  <p className="mt-2 text-2xl font-semibold text-[#0F172A]">{selectedJob.applications}</p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B]">Salary</p>
                  <p className="mt-2 text-lg font-semibold text-[#0F172A]">{selectedJob.salary}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-sm text-[#64748B]">Core skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <Badge key={skill} tone="slate">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <ProgressBar
                  value={Math.max(...STUDENTS.map((student) => scoreMatch(student, selectedJob)))}
                  tone="indigo"
                  label="Highest talent match"
                />
              </div>
            </GlassCard>

            <div className="space-y-4">
              {STUDENTS.map((student) => {
                const score = scoreMatch(student, selectedJob);
                const isShortlisted = shortlisted.includes(student.id);
                return (
                  <GlassCard key={student.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-semibold text-[#0F172A]">{student.name}</h5>
                          {isShortlisted ? <Badge tone="emerald">Shortlisted</Badge> : null}
                        </div>
                        <p className="mt-2 text-sm text-[#64748B]">
                          {student.education} - {student.city} - {student.level}
                        </p>
                      </div>
                      <Badge tone={jobMatchColor(score)}>{fmtPercent(score)}</Badge>
                    </div>
                    <div className="mt-4">
                      <ProgressBar value={score} tone={jobMatchColor(score)} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {student.skills.map((skill) => (
                        <Badge key={skill} tone={selectedJob.skills.includes(skill) ? "emerald" : "slate"}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-[#64748B]">{student.experience}</p>
                      <Button
                        variant={isShortlisted ? "secondary" : "primary"}
                        onClick={() => shortlistStudent(student.id)}
                      >
                        {isShortlisted ? "Added" : "Shortlist"}
                      </Button>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        ) : null}
      </Modal>
    </DashboardLayout>
  );
};

export default EmployerDashboard;

