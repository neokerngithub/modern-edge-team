import { createFileRoute, Link } from "@tanstack/react-router";
import { FoundersSection } from "@/components/founders-section";

const TITLE = "About — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "Modern Edge is a multidisciplinary firm working across architecture, civil engineering, property valuation, construction, interiors, landscape, planning, estimation, DPR and municipal drawings.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "We design, evaluate and build with precision." },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const DISCIPLINES = [
  "Architecture",
  "Civil Engineering",
  "Property Valuation",
  "Construction",
  "Interior Design",
  "Landscape Design",
  "Planning",
  "Estimation",
  "DPR",
  "Municipal Drawings",
] as const;

const MISSION = [
  { n: "01", title: "Innovation", body: "Design thinking applied to real constraints of site, use and budget." },
  { n: "02", title: "Sustainability", body: "Solutions considered for long-term use, material choice and context." },
  { n: "03", title: "Quality", body: "Careful execution and documentation at every stage of the work." },
  { n: "04", title: "Collaboration", body: "Working closely with clients, consultants and site teams." },
  { n: "05", title: "Creativity", body: "Ideas developed through drawing, iteration and technical review." },
  { n: "06", title: "Technical excellence", body: "Engineering judgement supporting each design decision." },
  { n: "07", title: "Precision", body: "Measured quantities, verified documents, accurate reporting." },
  { n: "08", title: "Functionality", body: "Spaces resolved for the way they will actually be used." },
  { n: "09", title: "Aesthetics", body: "Proportion, material and detail treated as part of performance." },
] as const;

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="reveal eyebrow flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              About Modern Edge
            </p>
            <h1 className="mt-8 text-[2.4rem] leading-[1.03] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[4.2rem]">
              <span className="block overflow-hidden">
                <span className="reveal block" style={{ animationDelay: "0.15s" }}>
                  We design, evaluate
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="reveal block" style={{ animationDelay: "0.26s" }}>
                  and build with <span className="text-primary">precision.</span>
                </span>
              </span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <p
              className="reveal max-w-md text-base leading-relaxed text-muted-foreground"
              style={{ animationDelay: "0.4s" }}
            >
              Modern Edge Architects and Engineers Pvt. Ltd. is a multidisciplinary firm bringing
              architecture, engineering, valuation and construction together under one practice — so
              a project can move from assessment and drawing through to a finished building without
              changing hands.
            </p>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24">
          <p className="eyebrow">What we work across</p>
          <ul className="mt-10 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-5">
            {DISCIPLINES.map((d, i) => (
              <li
                key={d}
                className="group flex items-baseline gap-4 bg-background px-6 py-8 transition-colors duration-500 hover:bg-surface"
              >
                <span className="text-[0.68rem] font-bold tracking-[0.16em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-extrabold tracking-[-0.01em]">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VISION */}
      <section className="relative overflow-hidden border-t border-hairline">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Vision
            </p>
            <span
              className="mt-6 block text-[4rem] leading-none font-extrabold tracking-[-0.04em] text-foreground/10"
              aria-hidden="true"
            >
              01
            </span>
          </div>
          <blockquote className="lg:col-span-9 border-l border-primary pl-6 md:pl-10">
            <p className="text-2xl leading-[1.25] font-extrabold tracking-[-0.02em] md:text-[2.6rem]">
              To become Nepal's leading multidisciplinary firm in architecture, engineering,
              construction, valuation, landscape and interior design — delivering{" "}
              <span className="text-primary">innovative, sustainable and high-quality</span>{" "}
              solutions.
            </p>
          </blockquote>
        </div>
      </section>

      {/* MISSION */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                Mission
              </p>
              <h2 className="mt-6 text-3xl leading-[1.06] font-extrabold tracking-[-0.03em] md:text-[3.2rem]">
                Nine commitments
                <br />
                <span className="text-primary">that shape the work.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Our mission is carried out project by project, through the way decisions are made,
              documented and delivered.
            </p>
          </div>

          <ol className="mt-16 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {MISSION.map((m) => (
              <li
                key={m.n}
                className="group bg-background p-8 transition-colors duration-500 hover:bg-surface md:p-10"
              >
                <span className="text-[0.68rem] font-bold tracking-[0.2em] text-foreground/30 transition-colors duration-500 group-hover:text-primary">
                  {m.n}
                </span>
                <h3 className="mt-6 text-lg font-extrabold tracking-[-0.01em]">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FoundersSection />

      {/* CTA */}
      <section className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
          <h2 className="max-w-2xl text-3xl leading-[1.08] font-extrabold tracking-[-0.03em] md:text-[3rem]">
            Work with a team that draws, measures and builds.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/property-valuation"
              hash="request"
              className="inline-flex h-12 items-center bg-primary px-7 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              Request Valuation
            </Link>
            <Link
              to="/construction"
              hash="inquiry"
              className="inline-flex h-12 items-center border border-border px-7 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
