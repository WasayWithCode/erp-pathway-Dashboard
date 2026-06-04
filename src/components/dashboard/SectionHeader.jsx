import Badge from "./Badge";
import { cn } from "./utils";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  actions,
}) => {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={cn("flex flex-col gap-4", alignment, className)} data-reveal>
      {eyebrow ? <Badge tone="cyan">{eyebrow}</Badge> : null}
      <div className="max-w-4xl space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
};

export default SectionHeader;
