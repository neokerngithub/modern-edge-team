import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { OfficeMap } from "@/components/office-map";
import {
  EMAILS,
  MAPS_PLACE_URL,
  OFFICES,
  PHONE_CONTACTS,
  SOCIAL_LINKS,
  telHref,
} from "@/lib/company";

const TITLE = "Contact — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "Talk to Modern Edge in Duhabi, Sunsari or Biratnagar, Morang about valuation, construction, architecture and engineering work.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Let's Build Something Extraordinary — Modern Edge" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 pt-28 pb-20 md:px-10 md:pt-40 md:pb-28">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-8 max-w-4xl text-4xl leading-[1.04] font-extrabold tracking-[-0.03em] md:text-7xl">
            Let's Build Something Extraordinary.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Tell us what you're planning.
          </p>
        </div>
      </section>

      {/* DETAILS + FORM */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-5">
            <p className="eyebrow">Offices</p>
            <div className="mt-8 space-y-10">
              {OFFICES.map((office) => (
                <div key={office.label} className="border-t border-hairline pt-6">
                  <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-primary">
                    {office.label}
                  </p>
                  <address className="mt-3 text-xl leading-snug font-bold tracking-[-0.01em] not-italic">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              ))}
            </div>

            <p className="eyebrow mt-14">Email</p>
            <ul className="mt-6 space-y-3">
              {EMAILS.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-base font-medium transition-colors hover:text-primary"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-14">Phone</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {PHONE_CONTACTS.map((contact) => (
                <div key={contact.name} className="border-t border-hairline pt-5">
                  <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                    {contact.name}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {contact.numbers.map((number) => (
                      <li key={number}>
                        <a
                          href={telHref(number)}
                          className="font-mono text-sm tracking-[0.04em] transition-colors hover:text-primary"
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="eyebrow mt-14">Follow</p>
            <ul className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center border border-border text-[0.6rem] font-bold tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {social.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-5">
            <p className="eyebrow">Visit</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-4xl">
              Main office, Duhabi.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              Our main office sits on the Koshi Highway in Duhabi - 06, Sunsari, with a branch office
              in Biratnagar - 10, Morang. Walk-in consultations are best arranged by phone first.
            </p>
            <a
              href={MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-[0.7rem] font-bold tracking-[0.18em] uppercase text-primary transition-opacity hover:opacity-70"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="md:col-span-7">
            <OfficeMap />
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
          <h2 className="max-w-3xl text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] md:text-6xl">
            Your next project starts with a conversation.
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/property-valuation"
              hash="request"
              className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              Request Valuation
            </Link>
            <Link
              to="/construction"
              hash="inquiry"
              className="inline-flex items-center border border-border px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
