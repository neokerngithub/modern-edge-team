import { Link } from "@tanstack/react-router";

export function ValuationStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] border-t border-hairline nav-glass lg:hidden">
      <a
        href="#request"
        className="flex h-14 items-center justify-center bg-primary text-[0.7rem] font-bold tracking-[0.18em] uppercase text-primary-foreground"
      >
        Request Valuation
      </a>
      <Link
        to="/contact"
        className="flex h-14 items-center justify-center px-6 text-[0.7rem] font-bold tracking-[0.18em] uppercase text-foreground"
      >
        Our Team
      </Link>
    </div>
  );
}
