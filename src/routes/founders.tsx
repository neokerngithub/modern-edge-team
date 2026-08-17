import { createFileRoute } from "@tanstack/react-router";
import { FoundersSection } from "@/components/founders-section";

const TITLE = "Founders — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "Modern Edge is directed by Kiran Neupane and Md Samir Hussain, practising professionals in property valuation, design, construction and supervision.";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Founders — Modern Edge" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FoundersPage,
});

function FoundersPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 pt-32 pb-8 md:px-10 md:pt-40 md:pb-12">
          <p className="reveal eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            Founders
          </p>
          <h1 className="reveal mt-8 max-w-3xl text-[2.4rem] leading-[1.03] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[4.2rem]">
            The people behind <span className="text-primary">the practice.</span>
          </h1>
        </div>
      </section>
      <FoundersSection />
    </>
  );
}
