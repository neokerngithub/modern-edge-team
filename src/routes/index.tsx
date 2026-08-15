import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroVisual } from "@/components/hero-visual";
import { FloatingCta } from "@/components/floating-cta";

const TITLE = "Modern Edge Architects and Engineers | Valuation & Construction";
const DESCRIPTION =
  "Modern Edge Architects and Engineers provides professional property valuation, construction, architecture and engineering solutions with a focus on precision and quality.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p
              className="reveal eyebrow flex flex-wrap items-center gap-x-3"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              Modern Edge / Architects • Engineers • Valuers • Builders
            </p>

            <h1 className="mt-8 text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem]">
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
              Modern Edge Architects and Engineers provides professional property valuation,
              construction, architecture and engineering solutions with a focus on precision,
              functionality and quality.
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.64s" }}
            >
              <Link
                to="/property-valuation"
                hash="request"
                className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Request Valuation
              </Link>
              <Link
                to="/contact"
                className="link-underline text-[0.72rem] font-bold tracking-[0.18em] uppercase text-foreground"
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

      {/* INTRO */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">About Modern Edge</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-2xl text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-5xl">
              We design, evaluate and build with precision.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Modern Edge Architects and Engineers Pvt. Ltd. is a multidisciplinary architecture and
              engineering company. We work across architecture, civil engineering, property
              valuation, construction, interior and landscape design, and related professional
              services — bringing one coordinated technical standard to every stage of a property or
              project.
            </p>
            <Link
              to="/about"
              className="link-underline mt-10 inline-block text-[0.72rem] font-bold tracking-[0.18em] uppercase"
            >
              More about the practice
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-6 max-w-xl text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-5xl">
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

          {/* Featured, asymmetric */}
          <div className="mt-16 grid gap-px border border-hairline bg-hairline lg:grid-cols-5">
            <Link
              to="/property-valuation"
              className="group relative flex min-h-[380px] flex-col justify-between bg-background p-8 transition-colors hover:bg-primary md:p-12 lg:col-span-3"
            >
              <span className="eyebrow transition-colors group-hover:text-primary-foreground/70">
                01 / Featured
              </span>
              <span>
                <span className="block text-3xl leading-[1.05] font-extrabold tracking-[-0.02em] transition-colors group-hover:text-primary-foreground md:text-5xl">
                  Property
                  <br />
                  Valuation
                </span>
                <span className="mt-6 block max-w-md text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                  Evidence-based valuation of land, buildings and structures, documented in clear
                  technical reports.
                </span>
                <span className="mt-8 inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary transition-colors group-hover:text-primary-foreground">
                  View discipline →
                </span>
              </span>
            </Link>

            <Link
              to="/construction"
              className="group relative flex min-h-[380px] flex-col justify-between bg-background p-8 transition-colors hover:bg-secondary md:p-12 lg:col-span-2"
            >
              <span className="eyebrow transition-colors group-hover:text-secondary-foreground/70">
                02 / Featured
              </span>
              <span>
                <span className="block text-3xl leading-[1.05] font-extrabold tracking-[-0.02em] transition-colors group-hover:text-secondary-foreground md:text-4xl">
                  Construction
                </span>
                <span className="mt-6 block max-w-sm text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-secondary-foreground/80">
                  Residential and commercial construction executed with engineered detailing and
                  supervised site quality.
                </span>
                <span className="mt-8 inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary transition-colors group-hover:text-secondary-foreground">
                  View discipline →
                </span>
              </span>
            </Link>
          </div>

          {/* Secondary — staggered index list */}
          <ul className="mt-20 border-t border-hairline">
            {SECONDARY.map((s, i) => (
              <li key={s} className="border-b border-hairline">
                <Link
                  to="/services"
                  className="group flex items-baseline gap-6 py-6 md:gap-12"
                  style={{ paddingLeft: `calc(${(i % 4) * 1.25}rem)` }}
                >
                  <span className="eyebrow w-8 shrink-0">{String(i + 3).padStart(2, "0")}</span>
                  <span className="text-xl font-bold tracking-[-0.01em] transition-colors group-hover:text-primary md:text-2xl">
                    {s}
                  </span>
                  <span className="ml-auto text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-hairline">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
          <h2 className="max-w-3xl text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] md:text-6xl">
            Your next project starts with a conversation.
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              Request Valuation
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center border border-border px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
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
