import GlassCard from "../UI/GlassCard";
import Icon from "../UI/Icon";

const JobCard = ({ job }) => (
  <GlassCard className="p-5" data-card>
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-[#0F172A]">{job.title}</h3>
        <p className="mt-1 text-sm font-semibold text-blue-700">{job.salary}</p>
      </div>
      <span className="grid h-10 w-10 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
        <Icon name="chart" className="h-5 w-5" />
      </span>
    </div>

    <div className="mt-5 grid gap-5 md:grid-cols-2">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Responsibilities</h4>
        <ul className="mt-3 grid gap-2 text-sm text-slate-600">
          {job.responsibilities.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Skills</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>

    <p className="mt-5 border-t border-slate-200/80 pt-4 text-sm text-[#64748B]">
      Career growth: <span className="font-semibold text-slate-700">{job.growth}</span>
    </p>
  </GlassCard>
);

export default JobCard;
