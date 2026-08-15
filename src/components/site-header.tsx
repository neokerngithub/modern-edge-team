import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { label: "Property Valuation", to: "/property-valuation" },
  { label: "Construction", to: "/construction" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Founders", to: "/founders" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "nav-glass border-b border-hairline" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Modern Edge home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 whitespace-nowrap 2xl:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-[0.78rem] font-medium tracking-[0.06em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/property-valuation"
            hash="request"
            className="hidden h-9 items-center border border-primary bg-primary px-5 text-[0.7rem] font-bold tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary md:inline-flex"
          >
            Request Valuation
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary 2xl:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / tablet overlay menu */}
      <div
        className={`fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-background transition-all duration-300 2xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="grid-canvas min-h-full px-5 pt-8 pb-28 md:px-10">
          <ul className="border-t border-hairline">
            {NAV.map((item, i) => (
              <li key={item.to} className="border-b border-hairline">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 text-2xl font-extrabold tracking-tight transition-colors hover:text-primary"
                >
                  {item.label}
                  <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/property-valuation"
              hash="request"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center bg-primary px-6 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground"
            >
              Request Valuation
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center border border-border px-6 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-foreground"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
