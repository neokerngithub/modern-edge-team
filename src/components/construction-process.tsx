import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "We start by understanding the requirement, the intended use, the timeline and the constraints of the client.",
  },
  {
    n: "02",
    title: "Site Analysis",
    body: "The site is studied on the ground — access, orientation, soil and surroundings, along with the available documents.",
  },
  {
    n: "03",
    title: "Concept Design",
    body: "Planning and design options are developed and reviewed with the client until the direction is agreed.",
  },
  {
    n: "04",
    title: "Estimation",
    body: "Quantities and specifications are worked out so the cost is discussed on the basis of measured items.",
  },
  {
    n: "05",
    title: "Construction",
    body: "Work is executed on site with supervision, sequencing and coordination between the trades involved.",
  },
  {
    n: "06",
    title: "Finishing",
    body: "Surfaces, fixtures and detailing are completed with attention to alignment, levels and material quality.",
  },
  {
    n: "07",
    title: "Handover",
    body: "The completed work is walked through with the client, corrections are closed and the project is handed over.",
  },
] as const;

export function ConstructionProcess() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  /* Mobile / tablet: activate the stage nearest the middle of the viewport. */
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
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.05, 0.5, 1] },
    );
    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Desktop: the horizontal story advances with the section's scroll progress. */
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const onScroll = () => {
      if (!isDesktop.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const span = rect.height + vh * 0.45;
        const progress = span > 0 ? (vh * 0.8 - rect.top) / span : 0;
        const index = Math.round(Math.min(1, Math.max(0, progress)) * (STEPS.length - 1));
        setActive(index);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const current = STEPS[active] ?? STEPS[0];
  const progressPct = (active / (STEPS.length - 1)) * 100;

  return (
    <section id="process" ref={sectionRef} className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">The Process</p>
            <h2 className="mt-6 max-w-xl text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] md:text-[2.9rem]">
              Seven stages,
              <br />
              one continuous line.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every project moves through the same sequence, so the client always knows which stage the
            work is in and what comes next.
          </p>
        </div>

        {/* DESKTOP — horizontal storytelling */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">
            <span className="absolute top-[3.4rem] right-0 left-0 h-px bg-hairline" aria-hidden="true" />
            <span
              className="absolute top-[3.4rem] left-0 h-px bg-primary transition-all duration-700 ease-out"
              style={{ width: `${progressPct}%` }}
              aria-hidden="true"
            />
            <ol className="relative grid grid-cols-7">
              {STEPS.map((step, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <li key={step.n} className="pr-6">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="block w-full text-left"
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span
                        className={`block text-[2.6rem] leading-none font-extrabold tracking-[-0.04em] transition-colors duration-500 ${
                          isActive
                            ? "text-primary"
                            : isPast
                              ? "text-foreground/40"
                              : "text-foreground/15"
                        }`}
                      >
                        {step.n}
                      </span>
                      <span
                        className={`mt-6 block h-2.5 w-2.5 border transition-all duration-500 ${
                          isActive
                            ? "border-primary bg-primary"
                            : isPast
                              ? "border-primary/50 bg-primary/50"
                              : "border-hairline bg-background"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`mt-6 block text-sm font-extrabold tracking-[-0.01em] transition-colors duration-500 ${
                          isActive ? "text-foreground" : "text-foreground/45"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-16 grid grid-cols-12 items-start gap-10 border-t border-hairline pt-12">
            <p className="col-span-3 eyebrow text-primary">
              Stage {current?.n} — {current?.title}
            </p>
            <p
              key={current?.n}
              className="reveal col-span-9 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-2xl md:leading-[1.5]"
            >
              {current?.body}
            </p>
          </div>
        </div>

        {/* MOBILE / TABLET — vertical timeline */}
        <ol className="relative mt-14 lg:hidden">
          <span className="absolute top-2 bottom-2 left-[0.3rem] w-px bg-hairline" aria-hidden="true" />
          {STEPS.map((step, i) => {
            const isActive = i === active;
            return (
              <li
                key={step.n}
                data-index={i}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className="relative pb-12 pl-8 last:pb-0"
              >
                <span
                  className={`absolute top-2 left-0 h-2.5 w-2.5 border transition-all duration-500 ${
                    isActive ? "border-primary bg-primary" : "border-hairline bg-background"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`block text-3xl leading-none font-extrabold tracking-[-0.04em] transition-colors duration-500 ${
                    isActive ? "text-primary" : "text-foreground/15"
                  }`}
                >
                  {step.n}
                </span>
                <h3
                  className={`mt-4 text-lg font-extrabold tracking-[-0.01em] transition-colors duration-500 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
