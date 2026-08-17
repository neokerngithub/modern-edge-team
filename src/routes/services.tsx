import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Services — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "Property valuation and construction, alongside architecture, civil engineering, interiors, landscape, municipal drawings, real estate, DPR and CAD 2D/3D training.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Services — Modern Edge" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const SECONDARY = [
  {
    n: "03",
    title: "Architecture",
    body: "Concept, design development and drawing sets for residential, commercial and institutional buildings.",
  },
  {
    n: "04",
    title: "Civil Engineering",
    body: "Structural and civil design, technical review and site engineering support.",
  },
  {
    n: "05",
    title: "Interior Design",
    body: "Layouts, materials, joinery detailing and styling coordinated with the built work.",
  },
  {
    n: "06",
    title: "Landscape Design",
    body: "External spaces, hardscape and planting resolved with levels and drainage.",
  },
  {
    n: "07",
    title: "Municipal Drawings",
    body: "Drawing sets prepared for municipal and local level submission requirements.",
  },
  {
    n: "08",
    title: "Real Estate",
    body: "Property advisory support informed by technical assessment and market considerations.",
  },
  {
    n: "09",
    title: "Detailed Project Report",
    body: "DPR preparation covering scope, technical basis, quantities and cost structure.",
  },
  {
    n: "10",
    title: "CAD 2D/3D Course",
    body: "Practical drafting and modelling training delivered by working professionals.",
  },
] as const;

function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="reveal eyebrow flex items-center gap-3">
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              Services
            </p>
            <h1 className="reveal mt-8 text-[2.4rem] leading-[1.03] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[4.2rem]">
              Ten disciplines.
              <br />
              <span className="text-primary">One practice.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Property valuation and construction lead our work. Around them sits a full set of
              design, engineering and documentation services.
            </p>
          </div>
        </div>
      </section>

      {/* FLAGSHIP */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Link
            to="/property-valuation"
            className="group grid gap-8 border-b border-hairline py-16 md:py-20 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="eyebrow text-primary">01 / Flagship</p>
              <h2 className="mt-6 text-4xl leading-[1.03] font-extrabold tracking-[-0.03em] transition-colors duration-500 group-hover:text-primary md:text-[3.6rem]">
                Property
                <br />
                Valuation
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Professional property valuation based on documentation, site inspection,
                verification, technical assessment and market considerations — reported in a clear,
                structured format.
              </p>
              <span className="mt-8 inline-flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary">
                View valuation service
                <span className="h-px w-8 bg-primary transition-all duration-500 group-hover:w-14" />
              </span>
            </div>
          </Link>

          <Link
            to="/construction"
            className="group grid gap-8 border-b border-hairline py-16 md:py-20 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="eyebrow text-primary">02 / Flagship</p>
              <h2 className="mt-6 text-4xl leading-[1.03] font-extrabold tracking-[-0.03em] transition-colors duration-500 group-hover:text-primary md:text-[3.6rem]">
                Construction
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                A structured process from consultation and site analysis through design, estimation,
                construction, finishing and handover — supervised throughout.
              </p>
              <span className="mt-8 inline-flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary">
                View construction service
                <span className="h-px w-8 bg-primary transition-all duration-500 group-hover:w-14" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* SECONDARY */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow">Additional services</p>
          <ul className="mt-12 grid gap-px bg-hairline md:grid-cols-2">
            {SECONDARY.map((s) => (
              <li
                key={s.n}
                className="group relative bg-background p-8 transition-colors duration-500 hover:bg-surface md:p-10"
              >
                <span className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-[0.68rem] font-bold tracking-[0.2em] text-foreground/35 transition-colors duration-500 group-hover:text-primary">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-extrabold tracking-[-0.01em] md:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
          <h2 className="max-w-2xl text-3xl leading-[1.08] font-extrabold tracking-[-0.03em] md:text-[3rem]">
            Not sure which service you need?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center bg-primary px-7 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              Talk to our team
            </Link>
            <Link
              to="/process"
              className="inline-flex h-12 items-center border border-border px-7 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              See our process
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
