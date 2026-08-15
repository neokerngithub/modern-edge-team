import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: "01",
    title: "Assignment",
    body: "We record the property details, purpose of valuation and the scope of work before any assessment begins.",
  },
  {
    n: "02",
    title: "Documents Collection",
    body: "Ownership papers, drawings, maps and approvals relevant to the property are collected and organised.",
  },
  {
    n: "03",
    title: "Site Inspection",
    body: "The property is visited and observed on site — condition, construction, access, boundaries and surroundings.",
  },
  {
    n: "04",
    title: "Verification",
    body: "Site observations are compared against the documentation to confirm what physically exists on the property.",
  },
  {
    n: "05",
    title: "Preliminary Report",
    body: "Findings, measurements and technical observations are compiled and reviewed internally for consistency.",
  },
  {
    n: "06",
    title: "Final Report",
    body: "A clear, structured valuation report is issued with the assessment, supporting details and observations.",
  },
] as const;

export function ValuationProcess() {
  const [active, setActive] = useState(0);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = Number((visible.target as HTMLElement).dataset["index"]);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.1, 0.5, 1] },
    );
    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">The Process</p>
            <h2 className="mt-6 text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] md:text-[2.9rem]">
              Six stages,
              <br />
              in sequence.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Every valuation follows the same order of work, so the reasoning behind the report is
              always traceable.
            </p>

            {/* Desktop stage indicator */}
            <div className="mt-12 hidden lg:block">
              <div className="flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <span
                    key={s.n}
                    className={`h-px transition-all duration-500 ${
                      i === active ? "w-10 bg-primary" : "w-6 bg-hairline"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-5 text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary">
                {STEPS[active]?.n} — {STEPS[active]?.title}
              </p>
            </div>
          </div>

          <ol className="relative lg:col-span-8">
            {/* Connecting line */}
            <span
              className="absolute top-0 bottom-0 left-0 w-px bg-hairline md:left-[7.5rem]"
              aria-hidden="true"
            />
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <li
                  key={step.n}
                  data-index={i}
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  onMouseEnter={() => setActive(i)}
                  className="relative border-t border-hairline first:border-t-0"
                >
                  <div className="flex flex-col gap-4 py-9 pl-8 md:flex-row md:items-baseline md:gap-10 md:pl-0">
                    <span
                      className={`shrink-0 text-4xl leading-none font-extrabold tracking-[-0.04em] transition-all duration-500 md:w-[7.5rem] md:text-[3.4rem] ${
                        isActive ? "text-primary" : "text-foreground/15"
                      }`}
                    >
                      {step.n}
                    </span>
                    <div className="md:pl-10">
                      <h3
                        className={`text-xl font-extrabold tracking-[-0.01em] transition-colors duration-500 md:text-2xl ${
                          isActive ? "text-foreground" : "text-foreground/60"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-3 max-w-xl text-sm leading-relaxed transition-opacity duration-500 ${
                          isActive ? "text-muted-foreground opacity-100" : "text-muted-foreground opacity-60"
                        }`}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                  {/* Node on the connecting line */}
                  <span
                    className={`absolute top-[3.1rem] left-0 h-[7px] w-[7px] -translate-x-[3px] transition-colors duration-500 md:left-[7.5rem] ${
                      isActive ? "bg-primary" : "bg-hairline"
                    }`}
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
