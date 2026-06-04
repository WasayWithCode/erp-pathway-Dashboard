import Badge from "./Badge";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) => {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment} ${className}`} data-reveal>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
