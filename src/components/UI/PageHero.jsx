import Container from "./Container";
import Badge from "./Badge";

const PageHero = ({ eyebrow, title, description, children }) => (
  <section className="premium-light-shell relative overflow-hidden pb-16 pt-32 sm:pt-40">
    <div className="absolute left-1/2 top-16 z-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[110px]" />
    <div className="absolute right-0 top-36 z-0 h-64 w-64 rounded-full bg-violet-400/12 blur-3xl" />
    <Container>
      <div className="relative z-10 max-w-4xl" data-reveal>
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-5 bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#8B5CF6] bg-clip-text text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#64748B]">{description}</p>
      </div>
      {children}
    </Container>
  </section>
);

export default PageHero;
