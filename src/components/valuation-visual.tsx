export function ValuationVisual() {
  return (
    <div className="relative aspect-[5/6] w-full overflow-hidden border border-hairline bg-surface">
      <div className="grid-fine absolute inset-0 opacity-60" />

      <svg
        viewBox="0 0 500 600"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Site / plot boundary */}
        <g stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" fill="none">
          <path d="M40 470 L250 360 L460 470 L250 580 Z" />
          <path d="M40 470 L40 430" />
          <path d="M460 470 L460 430" />
          <path d="M250 360 L250 200" strokeDasharray="4 6" />
        </g>

        {/* Measured elevation */}
        <g stroke="var(--color-primary)" fill="none" strokeWidth="1.25">
          <path d="M150 470 L150 250 L250 190 L350 250 L350 470" strokeOpacity="0.9" />
          <path d="M150 320 H350" strokeOpacity="0.3" />
          <path d="M150 390 H350" strokeOpacity="0.3" />
          <path d="M215 470 V390" strokeOpacity="0.3" />
          <path d="M285 470 V390" strokeOpacity="0.3" />
          <rect x="180" y="270" width="40" height="34" strokeOpacity="0.55" />
          <rect x="280" y="270" width="40" height="34" strokeOpacity="0.55" />
        </g>

        {/* Dimension line */}
        <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1">
          <path d="M150 505 H350" />
          <path d="M150 498 V512" />
          <path d="M350 498 V512" />
        </g>
        <text
          x="250"
          y="528"
          textAnchor="middle"
          className="fill-current"
          style={{ fontSize: 13, letterSpacing: "0.24em", opacity: 0.45 }}
        >
          BUILT AREA
        </text>

        {/* Survey points */}
        <g fill="var(--color-primary)">
          <circle cx="150" cy="250" r="3" />
          <circle cx="250" cy="190" r="3" />
          <circle cx="350" cy="250" r="3" />
        </g>
      </svg>

      <div className="absolute right-0 bottom-0 h-[22%] w-[30%] bg-primary/85" />

      <div className="absolute top-7 left-7 border border-hairline bg-background/80 px-4 py-3 backdrop-blur-sm">
        <p className="text-[0.58rem] font-bold tracking-[0.26em] uppercase">Valuation File</p>
        <p className="mt-1 text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">
          Elevation • Plot • Area
        </p>
      </div>

      <div className="absolute bottom-6 left-7 space-y-1">
        <p className="text-[0.58rem] font-semibold tracking-[0.24em] uppercase text-muted-foreground">
          Site record 01
        </p>
        <p className="text-[0.58rem] tracking-[0.2em] uppercase text-muted-foreground">
          Scale 1 : 200
        </p>
      </div>
    </div>
  );
}
