import { createFileRoute, Link } from "@tanstack/react-router";
import { ProcessTimeline } from "@/components/process-timeline";

const TITLE = "Process — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "Three documented workflows: property valuation, construction, and interior/exterior delivery — each stage closing before the next begins.";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Process — Modern Edge" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

const VALUATION = [
  { title: "Assignment", body: "Property details, purpose of valuation and scope of work are recorded." },
  { title: "Documents Collection", body: "Ownership papers, drawings, maps and approvals are collected and organised." },
  { title: "Site Inspection", body: "The property is observed on site — condition, construction, access and boundaries." },
  { title: "Verification", body: "Site observations are compared against documentation to confirm what exists." },
  { title: "Preliminary Report", body: "Findings and measurements are compiled and reviewed internally." },
  { title: "Final Report", body: "A structured valuation report is issued with assessment and supporting detail." },
] as const;

const CONSTRUCTION = [
  { title: "Consultation", body: "Requirements, intended use and priorities are discussed before design begins." },
  { title: "Site Analysis", body: "Levels, boundaries, access and context are assessed on site." },
  { title: "Concept Design", body: "Layout and form are developed and reviewed with the client." },
  { title: "Estimation", body: "Quantities and specifications are measured into a transparent cost basis." },
  { title: "Construction", body: "The structure is executed under supervision with coordinated sequencing." },
  { title: "Finishing", body: "Surfaces, fixtures and detailing are completed as their own stage." },
  { title: "Handover", body: "Walkthrough, corrections and a clear handover of the completed work." },
] as const;

const INTERIOR = [
  { title: "3D Approval", body: "Visual sign-off on the proposed scheme before work begins." },
  { title: "Drawings", body: "Working and detail drawings prepared for execution." },
  { title: "BOQ", body: "Measured quantities and specifications compiled." },
  { title: "Site Survey", body: "Levels, dimensions and setting out verified on site." },
  { title: "Team Mobilization", body: "Crews, materials and sequencing arranged." },
  { title: "Execution", body: "Work carried out under supervision against the drawings." },
  { title: "Finishing", body: "Surfaces, fixtures and detailing completed." },
  { title: "Styling", body: "Interior arrangement and final composition." },
  { title: "Handover", body: "Walkthrough, corrections and keys." },
] as const;

function ProcessPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="reveal eyebrow flex items-center gap-3">
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              Process
            </p>
            <h1 className="reveal mt-8 text-[2.4rem] leading-[1.03] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[4.2rem]">
              Three workflows.
              <br />
              <span className="text-primary">One standard of work.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Valuation, construction and interior delivery each follow a fixed sequence — every
              stage closes and is documented before the next one opens.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-6 text-[0.7rem] font-bold tracking-[0.18em] uppercase">
              <a href="#valuation" className="text-muted-foreground transition-colors hover:text-primary">
                Valuation
              </a>
              <a href="#construction" className="text-muted-foreground transition-colors hover:text-primary">
                Construction
              </a>
              <a href="#interior" className="text-muted-foreground transition-colors hover:text-primary">
                Interior / Exterior
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProcessTimeline
        id="valuation"
        index="01"
        eyebrow="Valuation"
        title="From assignment to final report."
        intro="Six stages that keep the reasoning behind every valuation traceable."
        steps={VALUATION}
      />

      <div className="bg-surface">
        <ProcessTimeline
          id="construction"
          index="02"
          eyebrow="Construction"
          title="From concept to completion."
          intro="Seven stages carried through planning, cost, execution and handover."
          steps={CONSTRUCTION}
        />
      </div>

      <ProcessTimeline
        id="interior"
        index="03"
        eyebrow="Interior / Exterior"
        title="From drawing to delivery."
        intro="Nine stages covering approval, documentation, execution and styling."
        steps={INTERIOR}
      />

      {/* CTA */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
          <h2 className="max-w-2xl text-3xl leading-[1.08] font-extrabold tracking-[-0.03em] md:text-[3rem]">
            Ready to begin at stage one?
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
