const Input = ({
  id,
  label,
  error,
  as: Component = "input",
  className = "",
  ...props
}) => (
  <label htmlFor={id} className="group relative block">
    <Component
      id={id}
      className={`h-14 w-full rounded-2xl border bg-slate-50/90 px-4 pt-3 text-[#0F172A] outline-none transition placeholder:text-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
        error ? "border-rose-300" : "border-slate-200"
      } ${Component === "textarea" ? "min-h-40 py-6" : ""} ${className}`}
      placeholder={label}
      {...props}
    />
    <span className="pointer-events-none absolute left-4 top-3 origin-left -translate-y-6 scale-90 rounded-full bg-white px-2 text-xs font-semibold text-[#64748B] transition-all group-focus-within:text-blue-700">
      {label}
    </span>
    {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
  </label>
);

export default Input;
