const STAGES = [
  { n: "01", title: "3D Approval", note: "Visual sign-off before work begins" },
  { n: "02", title: "Drawings", note: "Working and detail drawings" },
  { n: "03", title: "BOQ", note: "Measured quantities and specifications" },
  { n: "04", title: "Site Survey", note: "Levels, boundaries and setting out" },
  { n: "05", title: "Team Mobilization", note: "Crews, materials and sequencing" },
  { n: "06", title: "Execution", note: "Structure raised under supervision" },
  { n: "07", title: "Finishing", note: "Surfaces, fixtures and detailing" },
  { n: "08", title: "Styling", note: "Interior arrangement and final look" },
  { n: "09", title: "Handover", note: "Walkthrough, corrections and keys" },
] as const;

export function ConstructionWorkflow() {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-surface">
      <div className="grid-canvas pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="lg:col-span-7 text-3xl leading-[1.06] font-extrabold tracking-[-0.03em] md:text-[3.4rem]">
            One workflow.
            <br />
            <span className="text-primary">From drawing to delivery.</span>
          </h2>
          <p className="lg:col-span-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            The same sequence runs through every project — each stage closes before the next one
            opens, and each one is documented as it is completed.
          </p>
        </div>

        {/* Stepped architectural flow */}
        <ol className="mt-20 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage, i) => (
            <li
              key={stage.n}
              className="group relative bg-background p-8 transition-colors duration-500 hover:bg-surface md:p-10"
              style={{ paddingTop: `${2 + (i % 3) * 0.9}rem` }}
            >
              <span className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-[2.4rem] leading-none font-extrabold tracking-[-0.04em] text-foreground/12 transition-colors duration-500 group-hover:text-primary md:text-[3rem]">
                  {stage.n}
                </span>
                <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
                <span className="h-1.5 w-1.5 bg-hairline transition-colors duration-500 group-hover:bg-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-lg font-extrabold tracking-[-0.01em] md:text-xl">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
