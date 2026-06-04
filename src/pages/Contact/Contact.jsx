import { useRef, useState } from "react";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import GlassCard from "../../components/UI/GlassCard";
import Icon from "../../components/UI/Icon";
import PageHero from "../../components/UI/PageHero";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { usePageTitle } from "../../hooks/usePageTitle";

const initialForm = {
  name: "",
  email: "",
  topic: "",
  message: "",
};

const topics = ["Career guidance", "Resource suggestion", "Community question", "Partnership"];

const validate = (form) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.topic) errors.topic = "Choose a contact topic.";
  if (form.message.trim().length < 20) errors.message = "Message should be at least 20 characters.";
  return errors;
};

const FloatingField = ({ id, label, error, children }) => (
  <label htmlFor={id} className="group relative block">
    {children}
    <span className="pointer-events-none absolute left-4 top-3 origin-left -translate-y-6 scale-90 rounded-full bg-white px-2 text-xs font-semibold text-[#64748B] transition-all group-focus-within:text-blue-700">
      {label}
    </span>
    {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
  </label>
);

const Contact = () => {
  const pageRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  useGsapReveal(pageRef);
  usePageTitle("Contact", "Contact ERP Pathway for ERP career guidance, resources, partnerships, and student questions.");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="Contact"
        title="Get precise ERP guidance for your next step."
        description="Tell us your background, module interest, and learning goal. The form is designed like a modern product workflow with clear validation and success feedback."
      />

      <section className="pb-20">
        <Container className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <GlassCard className="p-6 sm:p-8" data-reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">Student support</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#0F172A]">Send a message</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                <Icon name="support" className="h-5 w-5" />
              </span>
            </div>

            <form className="mt-8 grid gap-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-6 md:grid-cols-2">
                <FloatingField id="name" label="Full name" error={errors.name}>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className={`h-14 w-full rounded-2xl border bg-slate-50/90 px-4 pt-3 text-[#0F172A] outline-none transition placeholder:text-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                      errors.name ? "border-rose-300" : "border-slate-200"
                    }`}
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </FloatingField>

                <FloatingField id="email" label="Email address" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={`h-14 w-full rounded-2xl border bg-slate-50/90 px-4 pt-3 text-[#0F172A] outline-none transition placeholder:text-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                      errors.email ? "border-rose-300" : "border-slate-200"
                    }`}
                    placeholder="Email address"
                    autoComplete="email"
                  />
                </FloatingField>
              </div>

              <FloatingField id="topic" label="Topic" error={errors.topic}>
                <select
                  id="topic"
                  value={form.topic}
                  onChange={(event) => updateField("topic", event.target.value)}
                  className={`h-14 w-full rounded-2xl border bg-slate-50/90 px-4 pt-3 text-[#0F172A] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                    errors.topic ? "border-rose-300" : "border-slate-200"
                  }`}
                >
                  <option value="">Select a topic</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </FloatingField>

              <FloatingField id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className={`min-h-40 w-full rounded-2xl border bg-slate-50/90 px-4 pt-6 text-[#0F172A] outline-none transition placeholder:text-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                    errors.message ? "border-rose-300" : "border-slate-200"
                  }`}
                  placeholder="Message"
                />
              </FloatingField>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  Message validated successfully. This MVP is ready for backend email integration.
                </div>
              ) : null}

              <Button type="submit" className="w-full sm:w-auto" icon={<Icon name="arrow" className="h-4 w-4" />}>
                Send message
              </Button>
            </form>
          </GlassCard>

          <aside className="grid gap-5">
            {[
              {
                icon: "people",
                title: "Career context",
                text: "Include your degree, city, current skills, and the ERP module you are considering.",
              },
              {
                icon: "community",
                title: "Social channels",
                text: "LinkedIn, YouTube, and Facebook links are ready as front-end placeholders for the public launch.",
              },
              {
                icon: "spark",
                title: "Response quality",
                text: "Specific questions get better guidance: role fit, learning order, resource suggestions, and interview prep.",
              },
            ].map((item) => (
              <GlassCard key={item.title} className="p-6" data-reveal>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[#0F172A]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">{item.text}</p>
              </GlassCard>
            ))}

            <GlassCard className="p-6" data-reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">Direct email</p>
              <a href="mailto:hello@erppathway.pk" className="mt-3 block text-lg font-semibold text-blue-700">
                hello@erppathway.pk
              </a>
            </GlassCard>
          </aside>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
