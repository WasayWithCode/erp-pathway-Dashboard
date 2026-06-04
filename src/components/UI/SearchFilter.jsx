const SearchFilter = ({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  placeholder = "Search resources",
}) => (
  <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/80 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
    <label className="relative flex-1">
      <span className="sr-only">{placeholder}</span>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" fill="none" aria-hidden="true">
        <path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-12 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15"
        placeholder={placeholder}
      />
    </label>
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
            activeCategory === category
              ? "bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)]"
              : "border border-slate-200 bg-white text-[#64748B] hover:border-blue-200 hover:bg-blue-50 hover:text-[#0F172A]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default SearchFilter;
