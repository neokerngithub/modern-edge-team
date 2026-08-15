export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M8 30V10l12 12 12-12v20" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <path d="M8 30h24" stroke="var(--color-primary)" strokeWidth="2.25" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 text-foreground ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="leading-none">
        <span className="block text-[0.95rem] font-extrabold tracking-[0.14em] uppercase">
          Modern Edge
        </span>
        <span className="mt-1 block text-[0.5rem] font-medium tracking-[0.28em] uppercase text-muted-foreground">
          Architects &amp; Engineers
        </span>
      </span>
    </span>
  );
}
