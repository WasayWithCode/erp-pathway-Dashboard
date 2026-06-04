import GlassCard from "./GlassCard";

const Timeline = ({ items }) => (
  <div className="relative">
    <div data-timeline-line className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-primary via-secondary to-accent sm:left-1/2" />
    <div className="grid gap-7">
      {items.map((item, index) => (
        <div
          key={item.title || item.level}
          data-timeline-item
          className={`relative grid gap-4 sm:grid-cols-2 ${index % 2 ? "sm:[&>*:first-child]:col-start-2" : ""}`}
        >
          <span className="absolute left-2 top-6 z-10 h-5 w-5 rounded-full border-4 border-[#F8FAFC] bg-[#06B6D4] shadow-lg shadow-cyan-300/30 sm:left-[calc(50%-10px)]" />
          <GlassCard className="ml-12 p-5 sm:ml-0" data-card>
            <p className="text-sm font-semibold text-cyan-700">{item.duration || item.kicker}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#0F172A]">{item.title || item.level}</h3>
            {item.text && <p className="mt-3 text-sm leading-7 text-[#64748B]">{item.text}</p>}
            {item.items && (
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                {item.items.map((entry) => (
                  <li key={entry} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>
        </div>
      ))}
    </div>
  </div>
);

export default Timeline;
