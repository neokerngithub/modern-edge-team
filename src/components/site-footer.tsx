import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { EMAILS, PHONE_CONTACTS, SOCIAL_LINKS, telHref } from "@/lib/company";


const SERVICES = [
  { label: "Property Valuation", to: "/property-valuation" },
  { label: "Construction", to: "/construction" },
  { label: "Architecture", to: "/services" },
  { label: "Civil Engineering", to: "/services" },
  { label: "Interior Design", to: "/services" },
] as const;

const COMPANY = [
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Founders", to: "/founders" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface text-surface-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Modern Edge Architects and Engineers Pvt. Ltd. — architecture, engineering, property
            valuation and construction delivered with precision and documented detail.
          </p>
        </div>

        <nav className="md:col-span-3" aria-label="Services">
          <p className="eyebrow">Services</p>
          <ul className="mt-6 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.label}>
                <Link
                  to={s.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-2" aria-label="Company">
          <p className="eyebrow">Company</p>
          <ul className="mt-6 space-y-3">
            {COMPANY.map((s) => (
              <li key={s.label}>
                <Link
                  to={s.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="eyebrow">Contact</p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/property-valuation" hash="request" className="transition-colors hover:text-primary">
                Request a valuation
              </Link>
            </li>
            <li>
              <Link to="/construction" hash="inquiry" className="transition-colors hover:text-primary">
                Start a project
              </Link>
            </li>
            {EMAILS.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className="transition-colors hover:text-primary">
                  {email}
                </a>
              </li>
            ))}
            <li>
              <a href={telHref(PHONE_CONTACTS[0].numbers[0])} className="font-mono transition-colors hover:text-primary">
                {PHONE_CONTACTS[0].numbers[0]}
              </a>
            </li>
          </ul>
          <p className="eyebrow mt-8">Social</p>
          <ul className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-8 w-8 items-center justify-center border border-border text-[0.6rem] font-bold tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {social.short}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-[0.7rem] tracking-[0.1em] uppercase text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Modern Edge Architects and Engineers Pvt. Ltd.</span>
          <span>Architects • Engineers • Valuers • Builders</span>
        </div>
      </div>
    </footer>
  );
}
