import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { HeroVisual } from "@/components/hero-visual";
import { FloatingCta } from "@/components/floating-cta";
import { GoogleReviewsSection } from "@/components/google-reviews";
import { FoundersSection } from "@/components/founders-section";
import { getGoogleReviews } from "@/lib/reviews.functions";
import { EMAILS, OFFICES, PHONE_CONTACTS, telHref } from "@/lib/company";

const reviewsQueryOptions = queryOptions({
  queryKey: ["google-reviews"],
  queryFn: () => getGoogleReviews(),
  staleTime: 1000 * 60 * 30,
});

const TITLE = "Modern Edge Architects and Engineers | Valuation & Construction";
const DESCRIPTION =
  "Modern Edge Architects and Engineers provides professional property valuation, construction, architecture and engineering solutions with a focus on precision and quality.";
const URL = "https://modern-edge-team.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Modern Edge Architects and Engineers Pvt. Ltd.",
          url: URL,
          email: EMAILS[0],
          telephone: PHONE_CONTACTS[0].numbers[0],
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "Duhabi - 06",
              addressRegion: "Sunsari",
              addressCountry: "NP",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "Biratnagar - 10",
              addressRegion: "Morang",
              addressCountry: "NP",
            },
          ],
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQueryOptions),
  component: Index,
});

const HEADLINE = ["Precision in Every Property.", "Every Structure.", "Every Detail."];

const SECONDARY = [
  "Architecture",
  "Civil Engineering",
  "Interior Design",
  "Landscape Design",
  "Municipal Drawings",
  "Real Estate",
  "DPR",
  "CAD 2D/3D Course",
];

const WORKFLOWS = [
  {
    n: "01",
    title: "Valuation",
    stages: "6 stages",
    from: "Assignment",
    to: "Final report",
  },
  {
    n: "02",
    title: "Construction",
    stages: "7 stages",
    from: "Consultation",
    to: "Handover",
  },
  {
    n: "03",
    title: "Interior & Exterior",
    stages: "9 stages",
    from: "Brief",
    to: "Completion",
  },
] as const;

function SectionLabel({ n, children }: { n: string; children: string }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="text-foreground/40">{n}</span>
      <span className="h-px w-8 bg-primary" aria-hidden="true" />
      {children}
    </p>
  );
}

function Index() {
  const { data: reviews } = useSuspenseQuery(reviewsQueryOptions);

  return (
    <>
      {/* 01 — HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p
              className="reveal eyebrow flex flex-wrap items-center gap-x-3"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              Architects • Engineers • Valuers • Builders
            </p>

            <h1 className="mt-8 text-[2.15rem] leading-[1.04] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[4.4rem]">
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <span
                    className="reveal block"
                    style={{ animationDelay: `${0.15 + i * 0.11}s` }}
                  >
                    {i === 0 ? (
                      <>
                        Precision in Every <span className="text-primary">Property.</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
              style={{ animationDelay: "0.52s" }}
            >
              Modern Edge Architects and Engineers Pvt. Ltd. is a multidisciplinary practice
              delivering property valuation, construction, architecture and engineering with one
              coordinated technical standard.
            </p>

            <div
              className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={{ animationDelay: "0.64s" }}
            >
              <Link
                to="/property-valuation"
                hash="request"
                className="inline-flex items-center justify-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Request Valuation
              </Link>
              <Link
                to="/construction"
                hash="inquiry"
                className="inline-flex items-center justify-center border border-border px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
              >
                Start a Project
              </Link>
            </div>
          </div>

          <div className="reveal lg:col-span-5" style={{ animationDelay: "0.3s" }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* 02 — INTRODUCTION */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel n="02">Introduction</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-2xl text-2xl leading-[1.14] font-extrabold tracking-[-0.02em] sm:text-3xl md:text-5xl">
              We design, evaluate and build with precision.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We work across architecture, civil engineering, property valuation, construction,
              interior and landscape design, and related professional services — bringing
              documented technical detail to every stage of a property or project.
            </p>
          </div>
        </div>
      </section>

      {/* 03 — PROPERTY VALUATION */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel n="03">Property Valuation</SectionLabel>
            <h2 className="mt-8 text-3xl leading-[1.06] font-extrabold tracking-[-0.03em] sm:text-4xl md:text-[3.4rem]">
              Property
              <br />
              Valuation
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Evidence-based valuation of land, buildings and structures, documented in clear
              technical reports for financing, sale, purchase and record purposes.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/property-valuation"
                hash="request"
                className="inline-flex items-center justify-center border border-primary bg-primary px-7 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Request Valuation
              </Link>
              <Link
                to="/property-valuation"
                className="link-underline text-[0.72rem] font-bold tracking-[0.18em] uppercase"
              >
                View discipline
              </Link>
            </div>
          </div>
          <ul className="grid gap-px self-start border border-hairline bg-hairline sm:grid-cols-2 lg:col-span-7">
            {[
              ["Land", "Plots and open land parcels"],
              ["Buildings", "Residential and commercial structures"],
              ["Industrial", "Plant, sheds and industrial premises"],
              ["Apartments", "Units and shared-ownership property"],
            ].map(([t, d]) => (
              <li key={t} className="bg-background p-8 md:p-10">
                <p className="text-lg font-bold tracking-[-0.01em]">{t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — CONSTRUCTION */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:order-2">
            <SectionLabel n="04">Construction</SectionLabel>
            <h2 className="mt-8 text-3xl leading-[1.06] font-extrabold tracking-[-0.03em] sm:text-4xl md:text-[3.4rem]">
              Construction
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Residential and commercial construction executed with engineered detailing,
              coordinated drawings and supervised site quality from consultation to handover.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/construction"
                hash="inquiry"
                className="inline-flex items-center justify-center border border-primary bg-primary px-7 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Start a Project
              </Link>
              <Link
                to="/construction"
                className="link-underline text-[0.72rem] font-bold tracking-[0.18em] uppercase"
              >
                View discipline
              </Link>
            </div>
          </div>
          <ul className="grid gap-px self-start border border-hairline bg-hairline sm:grid-cols-2 lg:col-span-7 lg:order-1">
            {[
              ["Residential", "Houses and residential developments"],
              ["Commercial", "Retail, office and mixed-use builds"],
              ["Interior", "Interior fit-out and detailing"],
              ["Renovation", "Structural upgrades and remodelling"],
            ].map(([t, d]) => (
              <li key={t} className="bg-background p-8 md:p-10">
                <p className="text-lg font-bold tracking-[-0.01em]">{t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — SERVICES */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel n="05">Services</SectionLabel>
              <h2 className="mt-8 max-w-xl text-2xl leading-[1.12] font-extrabold tracking-[-0.02em] sm:text-3xl md:text-5xl">
                Two core disciplines. One technical standard.
              </h2>
            </div>
            <Link
              to="/services"
              className="link-underline text-[0.72rem] font-bold tracking-[0.18em] uppercase"
            >
              All services
            </Link>
          </div>

          <ul className="mt-14 border-t border-hairline">
            {SECONDARY.map((s, i) => (
              <li key={s} className="border-b border-hairline">
                <Link to="/services" className="group flex items-baseline gap-5 py-6 md:gap-12">
                  <span className="eyebrow w-8 shrink-0">{String(i + 3).padStart(2, "0")}</span>
                  <span className="text-lg font-bold tracking-[-0.01em] transition-colors group-hover:text-primary sm:text-xl md:text-2xl">
                    {s}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-primary opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — PROCESS */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel n="06">Process</SectionLabel>
              <h2 className="mt-8 max-w-xl text-2xl leading-[1.12] font-extrabold tracking-[-0.02em] sm:text-3xl md:text-5xl">
                A documented sequence for every engagement.
              </h2>
            </div>
            <Link
              to="/process"
              className="link-underline text-[0.72rem] font-bold tracking-[0.18em] uppercase"
            >
              Full process
            </Link>
          </div>

          <div className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
            {WORKFLOWS.map((w) => (
              <div key={w.title} className="bg-background p-8 md:p-10">
                <span className="eyebrow">{w.n}</span>
                <p className="mt-6 text-xl font-bold tracking-[-0.01em] md:text-2xl">{w.title}</p>
                <p className="mt-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase text-primary">
                  {w.stages}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {w.from} → {w.to}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — ABOUT */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel n="07">About</SectionLabel>
            <h2 className="mt-8 text-2xl leading-[1.12] font-extrabold tracking-[-0.02em] sm:text-3xl md:text-[3rem]">
              A multidisciplinary practice.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Modern Edge Architects and Engineers Pvt. Ltd. operates from a main office in Duhabi,
              Sunsari and a branch office in Biratnagar, Morang.
            </p>
            <Link
              to="/about"
              className="link-underline mt-10 inline-block text-[0.72rem] font-bold tracking-[0.18em] uppercase"
            >
              More about the practice
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-4 self-center border-t border-hairline pt-8 sm:grid-cols-2 lg:col-span-7">
            {["Property Valuation", "Construction", ...SECONDARY].map((d, i) => (
              <li
                key={d}
                className="flex items-baseline gap-4 border-b border-hairline pb-4 text-sm font-semibold"
              >
                <span className="eyebrow w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 — FOUNDERS */}
      <FoundersSection />

      {/* 09 — GOOGLE REVIEWS */}
      <GoogleReviewsSection data={reviews} />

      {/* 10 — CONTACT */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel n="10">Contact</SectionLabel>
            <h2 className="mt-8 text-2xl leading-[1.12] font-extrabold tracking-[-0.02em] sm:text-3xl md:text-[2.6rem]">
              Talk to the team directly.
            </h2>
            <Link
              to="/contact"
              className="link-underline mt-10 inline-block text-[0.72rem] font-bold tracking-[0.18em] uppercase"
            >
              Contact page
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            <div>
              <p className="eyebrow">Offices</p>
              <ul className="mt-6 space-y-6">
                {OFFICES.map((o) => (
                  <li key={o.label}>
                    <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-primary">
                      {o.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {o.lines.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-10">Email</p>
              <ul className="mt-4 space-y-2">
                {EMAILS.map((e) => (
                  <li key={e}>
                    <a
                      href={`mailto:${e}`}
                      className="text-sm break-words text-muted-foreground transition-colors hover:text-primary"
                    >
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Phone</p>
              <ul className="mt-6 space-y-6">
                {PHONE_CONTACTS.map((c) => (
                  <li key={c.name}>
                    <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-primary">
                      {c.name}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {c.numbers.map((n) => (
                        <li key={n}>
                          <a
                            href={telHref(n)}
                            className="text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {n}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — FINAL CTA */}
      <section className="relative overflow-hidden border-t border-hairline">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
          <SectionLabel n="11">Start</SectionLabel>
          <h2 className="mt-8 max-w-3xl text-3xl leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-4xl md:text-6xl">
            Your next project starts with a conversation.
          </h2>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              to="/property-valuation"
              hash="request"
              className="inline-flex items-center justify-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              Request Valuation
            </Link>
            <Link
              to="/construction"
              hash="inquiry"
              className="inline-flex items-center justify-center border border-border px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      <FloatingCta />
    </>
  );
}
