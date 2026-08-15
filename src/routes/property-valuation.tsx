import { createFileRoute, Link } from "@tanstack/react-router";
import { ValuationVisual } from "@/components/valuation-visual";
import { ValuationProcess } from "@/components/valuation-process";
import { ValuationForm } from "@/components/valuation-form";
import { ValuationStickyCta } from "@/components/valuation-sticky-cta";

const TITLE = "Property Valuation — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "Professional property valuation based on documentation, site inspection, verification, technical assessment and market considerations.";

export const Route = createFileRoute("/property-valuation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Know the Value. Understand the Property." },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertyValuationPage,
});

const ASSESSMENT = [
  {
    n: "01",
    title: "Property condition",
    body: "Observed structural condition, construction quality, age, finishes and visible maintenance.",
  },
  {
    n: "02",
    title: "Location",
    body: "Access, road frontage, surroundings, utilities and the immediate character of the area.",
  },
  {
    n: "03",
    title: "Specifications",
    body: "Land and building areas, layout, number of floors, materials and construction type.",
  },
  {
    n: "04",
    title: "Documentation",
    body: "Ownership papers, maps, approved drawings and other records provided for the property.",
  },
  {
    n: "05",
    title: "Technical analysis",
    body: "Engineering review of what exists on site against the documents and measured details.",
  },
  {
    n: "06",
    title: "Market considerations",
    body: "Relevant local market context considered while forming the assessment.",
  },
] as const;

const SERVICE_AREAS = [
  { title: "Property assessment", body: "Land, buildings, apartments and mixed-use property." },
  { title: "Site inspection", body: "On-site observation of condition, boundaries and access." },
  { title: "Document verification", body: "Checking provided papers against site reality." },
  { title: "Technical review", body: "Areas, layout, materials and construction details." },
  { title: "Market considerations", body: "Local context relevant to the property type." },
  { title: "Professional reporting", body: "Clear, structured reports you can act on." },
] as const;

function PropertyValuationPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="reveal eyebrow flex items-center gap-x-3" style={{ animationDelay: "0.05s" }}>
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              01 / Property Valuation
            </p>

            <h1 className="mt-8 text-[2.5rem] leading-[1.03] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]">
              <span className="block overflow-hidden">
                <span className="reveal block" style={{ animationDelay: "0.15s" }}>
                  Know the <span className="text-primary">Value.</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="reveal block" style={{ animationDelay: "0.27s" }}>
                  Understand the Property.
                </span>
              </span>
            </h1>

            <p
              className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
              style={{ animationDelay: "0.42s" }}
            >
              Professional property valuation based on documentation, site inspection, verification,
              technical assessment and market considerations.
            </p>

            <div className="reveal mt-10 flex flex-wrap items-center gap-6" style={{ animationDelay: "0.54s" }}>
              <a
                href="#request"
                className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Request a Valuation
              </a>
              <Link
                to="/contact"
                className="link-underline text-[0.72rem] font-bold tracking-[0.18em] uppercase text-foreground"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>

          <div className="reveal lg:col-span-5" style={{ animationDelay: "0.3s" }}>
            <ValuationVisual />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ValuationProcess />

      {/* PROFESSIONAL ASSESSMENT */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">What we look at</p>
              <h2 className="mt-6 max-w-xl text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-5xl">
                Professional Assessment
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each valuation is built from what can be documented, observed and measured — not from
              assumption.
            </p>
          </div>

          <dl className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {ASSESSMENT.map((item) => (
              <div key={item.n} className="bg-background p-8 md:p-10">
                <span className="eyebrow text-primary">{item.n}</span>
                <dt className="mt-6 text-lg font-extrabold tracking-[-0.01em] md:text-xl">
                  {item.title}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Service areas</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[2.9rem]">
              What the service covers.
            </h2>
          </div>
          <ul className="lg:col-span-8">
            {SERVICE_AREAS.map((item) => (
              <li
                key={item.title}
                className="group flex flex-col gap-2 border-b border-hairline py-7 first:border-t md:flex-row md:items-baseline md:gap-12"
              >
                <span className="text-base font-extrabold tracking-[-0.01em] transition-colors group-hover:text-primary md:w-64 md:shrink-0 md:text-lg">
                  {item.title}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REQUEST FORM */}
      <section id="request" className="scroll-mt-24 border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow">Valuation request</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-5xl">
              Request a professional valuation
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Share the property details below. The more you provide, the faster we can confirm the
              assignment and the documents needed.
            </p>
          </div>
          <div className="mt-14">
            <ValuationForm />
          </div>
        </div>
      </section>

      {/* CONVERSION */}
      <section className="relative overflow-hidden border-t border-hairline">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow">Planning a property transaction, financing or assessment?</p>
          <h2 className="mt-8 max-w-3xl text-3xl leading-[1.06] font-extrabold tracking-[-0.03em] md:text-[3.6rem]">
            Request a Professional Valuation
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#request"
              className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              Request Valuation
            </a>
            <Link
              to="/contact"
              className="link-underline text-[0.72rem] font-bold tracking-[0.18em] uppercase text-foreground"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      <ValuationStickyCta />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  );
}
