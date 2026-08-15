import { LogoMark } from "./logo";

export function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-hairline bg-surface">
      <div className="grid-fine absolute inset-0 opacity-70" />

      {/* Perspective / technical construction lines */}
      <svg
        viewBox="0 0 400 500"
        className="drift absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" fill="none">
          <path d="M-40 470 L200 250 L440 470" />
          <path d="M-40 380 L200 180 L440 380" />
          <path d="M60 500 L60 210" />
          <path d="M140 500 L140 150" />
          <path d="M260 500 L260 150" />
          <path d="M340 500 L340 210" />
        </g>
        <g stroke="var(--color-primary)" strokeWidth="1.25" fill="none">
          <rect x="140" y="150" width="120" height="200" strokeOpacity="0.85" />
          <path d="M140 150 L200 100 L260 150" strokeOpacity="0.6" />
          <path d="M140 250 H260" strokeOpacity="0.35" />
          <path d="M140 300 H260" strokeOpacity="0.35" />
        </g>
        <g fill="var(--color-primary)">
          <circle cx="140" cy="150" r="2.5" />
          <circle cx="260" cy="150" r="2.5" />
          <circle cx="200" cy="100" r="2.5" />
        </g>
      </svg>

      {/* Solid architectural volume */}
      <div className="absolute right-0 bottom-0 h-[46%] w-[38%] bg-primary/90" />
      <div className="absolute right-[38%] bottom-0 h-[26%] w-[16%] border-t border-l border-foreground/15 bg-foreground/[0.04]" />

      {/* Logo plate */}
      <div className="absolute top-8 left-8 flex items-center gap-3 border border-hairline bg-background/80 px-4 py-3 backdrop-blur-sm">
        <LogoMark className="h-7 w-7 text-foreground" />
        <span className="text-[0.6rem] font-bold tracking-[0.26em] uppercase">Modern Edge</span>
      </div>

      {/* Technical annotations */}
      <div className="absolute bottom-6 left-8 space-y-1">
        <p className="text-[0.58rem] font-semibold tracking-[0.24em] uppercase text-muted-foreground">
          Section A–A
        </p>
        <p className="text-[0.58rem] tracking-[0.2em] uppercase text-muted-foreground">
          Scale 1 : 100
        </p>
      </div>
      <div className="absolute top-1/2 right-6 -translate-y-1/2 rotate-90 text-[0.55rem] tracking-[0.3em] uppercase text-muted-foreground">
        Precision Engineering
      </div>
    </div>
  );
}
