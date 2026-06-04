import GlassCard from "./GlassCard";
import Icon from "./Icon";

const FeatureCard = ({ icon = "spark", title, description, meta, className = "" }) => (
  <GlassCard className={`group h-full p-5 ${className}`} data-card>
    <div className="flex items-start justify-between gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-105 group-hover:text-violet-600">
        <Icon name={icon} />
      </span>
      {meta && <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">{meta}</span>}
    </div>
    <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#0F172A]">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-[#64748B]">{description}</p>
  </GlassCard>
);

export default FeatureCard;
