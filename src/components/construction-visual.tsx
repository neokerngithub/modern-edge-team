export function ConstructionVisual() {
  return (
    <div className="relative border border-hairline bg-surface">
      <div className="grid-canvas pointer-events-none absolute inset-0 opacity-70" />
      <svg
        viewBox="0 0 520 520"
        role="img"
        aria-label="Architectural line drawing of a building under construction with structural frame, floor plates and section markers"
        className="relative block h-auto w-full"
      >
        <g stroke="currentColor" className="text-hairline" strokeWidth="1">
          {/* structural frame — columns */}
          {[120, 200, 280, 360].map((x) => (
            <line key={x} x1={x} y1="90" x2={x} y2="430" />
          ))}
          {/* floor plates */}
          {[150, 220, 290, 360, 430].map((y) => (
            <line key={y} x1="90" y1={y} x2="390" y2={y} />
          ))}
        </g>

        {/* highlighted frame */}
        <g stroke="currentColor" className="text-primary" strokeWidth="1.4" fill="none">
          <path d="M120 430 L120 150 L360 150 L360 430" />
          <path d="M120 150 L240 90 L360 150" />
          <rect x="200" y="290" width="80" height="70" />
        </g>

        {/* completed volume */}
        <rect
          x="280"
          y="290"
          width="110"
          height="140"
          className="fill-primary/12"
          stroke="none"
        />

        {/* nodes */}
        <g className="fill-primary">
          {[
            [120, 150],
            [240, 90],
            [360, 150],
            [120, 430],
            [360, 430],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
          ))}
        </g>

        {/* dimension line */}
        <g stroke="currentColor" className="text-muted-foreground/50" strokeWidth="1">
          <line x1="90" y1="462" x2="390" y2="462" />
          <line x1="90" y1="455" x2="90" y2="469" />
          <line x1="390" y1="455" x2="390" y2="469" />
          <line x1="424" y1="150" x2="424" y2="430" />
          <line x1="417" y1="150" x2="431" y2="150" />
          <line x1="417" y1="430" x2="431" y2="430" />
        </g>

        <g
          className="fill-muted-foreground"
          fontSize="9"
          letterSpacing="2.2"
          style={{ fontWeight: 600 }}
        >
          <text x="90" y="70">
            SECTION A — A
          </text>
          <text x="90" y="486">
            SITE WIDTH
          </text>
          <text x="300" y="270">
            FINISHING
          </text>
          <text x="132" y="182">
            STRUCTURE
          </text>
        </g>
      </svg>

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-hairline px-5 py-4">
        <span className="eyebrow">Concept · Structure · Finish</span>
        <span className="eyebrow text-primary">Drawing 02</span>
      </div>
    </div>
  );
}
