import { Link } from "@tanstack/react-router";

export function SectionPlaceholder({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-40 pb-32 md:px-10">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
        {title}
      </h1>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      <div className="mt-12 flex flex-wrap gap-3 border-t border-hairline pt-10">
        <Link
          to="/"
          className="inline-flex h-12 items-center border border-border px-7 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
        >
          Back to home
        </Link>
        <Link
          to="/property-valuation"
          hash="request"
          className="inline-flex h-12 items-center bg-primary px-7 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
        >
          Request Valuation
        </Link>
      </div>
    </section>
  );
}
