import { useMemo, useRef, useState } from "react";
import Container from "../../components/UI/Container";
import GlassCard from "../../components/UI/GlassCard";
import PageHero from "../../components/UI/PageHero";
import SearchFilter from "../../components/UI/SearchFilter";
import { resources } from "../../data/siteData";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const Resources = () => {
  const pageRef = useRef(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  useGsapReveal(pageRef);
  usePageTitle("Learning Resources", "Search and filter free ERP resources including playlists, PDFs, documentation, courses, and projects.");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(resources.map((item) => item.category)))],
    [],
  );

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();
    return resources.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const haystack = `${item.title} ${item.category} ${item.level} ${item.description}`.toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  }, [category, search]);

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="Learning Resources"
        title="Free ERP resources arranged by learning need."
        description="Find videos, PDFs, documentation, free courses, and practice projects without jumping between random links."
      />

      <section className="pb-20">
        <Container>
          <div data-reveal>
            <SearchFilter
              search={search}
              onSearchChange={setSearch}
              categories={categories}
              activeCategory={category}
              onCategoryChange={setCategory}
              placeholder="Search by module, level, or topic"
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-card-reveal>
            {filteredResources.map((resource) => (
              <GlassCard key={resource.title} className="flex h-full flex-col p-6" data-card>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-lg border border-blue-400/30 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    {resource.category}
                  </span>
                  <span className="text-xs font-semibold text-[#64748B]">{resource.format}</span>
                </div>
                <h2 className="mt-5 text-xl font-black text-[#0F172A]">{resource.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{resource.description}</p>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-sm text-[#64748B]">
                    Level: <span className="font-semibold text-slate-700">{resource.level}</span>
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>

          {!filteredResources.length && (
            <GlassCard className="mt-8 p-8 text-center" data-reveal>
              <p className="font-bold text-[#0F172A]">No resources found</p>
              <p className="mt-2 text-sm text-[#64748B]">
                Try another keyword or switch the category filter back to All.
              </p>
            </GlassCard>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Resources;

