import { createFileRoute, Link } from "@tanstack/react-router";
import { ConstructionVisual } from "@/components/construction-visual";
import { ConstructionProcess } from "@/components/construction-process";
import { ConstructionWorkflow } from "@/components/construction-workflow";
import { ConstructionForm } from "@/components/construction-form";
import { ConstructionStickyCta } from "@/components/construction-sticky-cta";

const TITLE = "Construction — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "A structured, client-centered construction process from consultation and site analysis through design, estimation, construction, finishing and handover.";

export const Route = createFileRoute("/construction")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "From Concept to Completion." },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConstructionPage,
});

const APPROACH = [
  {
    n: "01",
    title: "Planning",
    body: "Consultation and site analysis come first, so the design responds to the actual site, the intended use and the client's priorities.",
  },
  {
    n: "02",
    title: "Cost transparency",
    body: "Estimation is prepared from quantities and specifications, so the cost conversation is based on measured items rather than assumption.",
  },
  {
    n: "03",
    title: "Quality execution",
    body: "Construction is carried out with supervision and sequencing, keeping structure, services and site coordination aligned.",
  },
  {
    n: "04",
    title: "Finishing",
    body: "Finishing is treated as its own stage — surfaces, fixtures and detailing completed with attention to alignment and material quality.",
  },
  {
    n: "05",
    title: "Client-centered handover",
    body: "The project closes with a walkthrough, corrections addressed and a clear handover of the completed work.",
  },
] as const;

function ConstructionPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="reveal eyebrow flex items-center gap-x-3" style={{ animationDelay: "0.05s" }}>
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              02 / Construction
            </p>

            <h1 className="mt-8 text-[2.5rem] leading-[1.03] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]">
              <span className="block overflow-hidden">
                <span className="reveal block" style={{ animationDelay: "0.15s" }}>
                  From Concept
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="reveal block" style={{ animationDelay: "0.27s" }}>
                  to <span className="text-primary">Completion.</span>
                </span>
              </span>
            </h1>

            <p
              className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
              style={{ animationDelay: "0.42s" }}
            >
              Modern Edge provides a structured, client-centered construction process from
              consultation and site analysis through design, estimation, construction, finishing and
              handover.
            </p>

            <div className="reveal mt-10 flex flex-wrap items-center gap-6" style={{ animationDelay: "0.54s" }}>
              <a
                href="#inquiry"
                className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Start a Project
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
            <ConstructionVisual />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ConstructionProcess />

      {/* DESIGN TO DELIVERY */}
      <ConstructionWorkflow />

      {/* SERVICE EXPERIENCE */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">The experience</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[2.9rem]">
              How the work is run.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Consultation, site analysis, concept design, estimation, construction, finishing and
              handover — carried out in that order, on every project.
            </p>
          </div>
          <ul className="lg:col-span-8">
            {APPROACH.map((item) => (
              <li
                key={item.n}
                className="group flex flex-col gap-3 border-b border-hairline py-8 first:border-t md:flex-row md:gap-12"
              >
                <span className="eyebrow text-primary md:w-16 md:shrink-0 md:pt-1">{item.n}</span>
                <span className="text-lg font-extrabold tracking-[-0.01em] transition-colors group-hover:text-primary md:w-64 md:shrink-0">
                  {item.title}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="inquiry" className="scroll-mt-24 border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow">Project inquiry</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-5xl">
              Start a construction project
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Share what you have so far — site, stage and requirement. The more detail you provide,
              the more precise the first conversation can be.
            </p>
          </div>
          <div className="mt-14">
            <ConstructionForm />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-hairline">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow">Ready when you are</p>
          <h2 className="mt-8 max-w-3xl text-3xl leading-[1.06] font-extrabold tracking-[-0.03em] md:text-[3.6rem]">
            Let's turn your idea into something real.
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#inquiry"
              className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              Start a Project
            </a>
            <Link
              to="/property-valuation"
              hash="request"
              className="inline-flex items-center border border-border px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Request Valuation
            </Link>
          </div>
        </div>
      </section>

      <ConstructionStickyCta />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  );
}
