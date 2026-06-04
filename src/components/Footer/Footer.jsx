import { Link } from "react-router-dom";
import { erpModules, navLinks } from "../../data/siteData";
import Container from "../UI/Container";

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-xl">
    <Container className="py-12">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-200 bg-blue-50 text-sm font-black text-blue-700">
              EP
            </span>
            <div>
              <p className="font-black text-[#0F172A]">ERP Pathway</p>
              <p className="text-sm text-[#64748B]">ERP learning for Pakistani students.</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#64748B]">
            Learn ERP concepts, compare modules, prepare for jobs, and build confidence with a clear career path.
          </p>
          <div className="mt-5 flex gap-3">
            {["in", "yt", "fb"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold uppercase text-[#64748B] transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                aria-label={`${item} social link`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">Quick Links</h2>
          <div className="mt-4 grid gap-3">
            {navLinks.slice(0, 6).map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-[#64748B] transition hover:text-blue-700">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">ERP Categories</h2>
          <div className="mt-4 grid gap-3">
            {erpModules.slice(0, 6).map((module) => (
              <Link key={module.name} to="/modules" className="text-sm text-[#64748B] transition hover:text-blue-700">
                {module.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">Contact Info</h2>
          <div className="mt-4 grid gap-3 text-sm text-[#64748B]">
            <a href="mailto:hello@erppathway.pk" className="transition hover:text-blue-700">
              hello@erppathway.pk
            </a>
            <p>Lahore, Punjab, Pakistan</p>
            <p>Career guidance hours: Mon-Sat, 10 AM - 6 PM</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 ERP Pathway. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/faq" className="hover:text-blue-700">FAQ</Link>
          <Link to="/contact" className="hover:text-blue-700">Contact</Link>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
