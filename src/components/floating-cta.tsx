import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div
        className={`fixed right-8 bottom-8 z-40 hidden max-w-[280px] border border-hairline nav-glass p-5 transition-all duration-500 lg:block ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <p className="text-sm font-semibold tracking-tight">Need a Property Valuation?</p>
        <Link
          to="/contact"
          className="mt-4 inline-flex h-10 items-center bg-primary px-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
        >
          Request Valuation
        </Link>
      </div>

      {/* Mobile */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] border-t border-hairline nav-glass transition-transform duration-500 lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Link
          to="/contact"
          className="flex h-14 items-center justify-center bg-primary text-[0.7rem] font-bold tracking-[0.18em] uppercase text-primary-foreground"
        >
          Request Valuation
        </Link>
        <Link
          to="/contact"
          className="flex h-14 items-center justify-center px-6 text-[0.7rem] font-bold tracking-[0.18em] uppercase text-foreground"
        >
          Call
        </Link>
      </div>
    </>
  );
}
