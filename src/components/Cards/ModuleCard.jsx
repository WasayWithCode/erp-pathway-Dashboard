import Button from "../UI/Button";
import GlassCard from "../UI/GlassCard";
import Icon from "../UI/Icon";

const ModuleCard = ({ module }) => (
  <GlassCard className="group flex h-full flex-col overflow-hidden p-5" data-card>
    <div className={`h-1 w-full rounded-full bg-gradient-to-r ${module.accent}`} />
    <div className="mt-6 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-[#0F172A]">{module.name}</h3>
        <p className="mt-1 text-sm font-semibold text-blue-700">{module.tagline}</p>
      </div>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-inner transition group-hover:scale-105 group-hover:text-violet-600">
        <Icon name={module.icon || "dashboard"} />
      </span>
    </div>

    <p className="mt-4 flex-1 text-sm leading-7 text-[#64748B]">{module.description}</p>

    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#64748B]">
        <span>Track readiness</span>
        <span className="text-blue-700">{module.progress || 70}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full bg-gradient-to-r ${module.accent}`} style={{ width: `${module.progress || 70}%` }} />
      </div>
    </div>

    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Core skills</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {module.skills.map((skill) => (
          <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-5 grid gap-3 border-t border-slate-200/80 pt-5">
      <div>
        <p className="text-xs text-[#64748B]">Salary range</p>
        <p className="font-semibold text-[#0F172A]">{module.salary}</p>
      </div>
      <div>
        <p className="text-xs text-[#64748B]">Career opportunities</p>
        <p className="text-sm text-slate-600">{module.careers.join(", ")}</p>
      </div>
    </div>

    <Button to="/roadmap" variant="secondary" className="mt-6 w-full" icon={<Icon name="arrow" className="h-4 w-4" />}>
      Learn module
    </Button>
  </GlassCard>
);

export default ModuleCard;
