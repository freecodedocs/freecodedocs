type Variant =
  | "guide"
  | "speed"
  | "library"
  | "git"
  | "container"
  | "database"
  | "terminal"
  | "components"
  | "compare"
  | "network"
  | "layout";

/** Small, original SVG illustrations for blog covers — no external images, matches the site's line-art style. */
export default function BlogArt({ variant, className = "" }: { variant: Variant; className?: string }) {
  const common = { viewBox: "0 0 400 220", role: "img" as const, "aria-hidden": true, fill: "none" };
  const bg = <rect x="0" y="0" width="400" height="220" fill="var(--subtle)" />;

  if (variant === "guide") {
    return (
      <svg {...common} className={className}>
        {bg}
        <g stroke="var(--line)" strokeWidth="2"><path d="M40 190V50a10 10 0 0 1 10-10h90v150z" fill="var(--bg)" /><path d="M360 190V50a10 10 0 0 0-10-10h-90v150z" fill="var(--bg)" /></g>
        <path d="M140 40v150M260 40v150" stroke="var(--line)" strokeWidth="2" />
        {[64, 82, 100].map((y) => <rect key={"l" + y} x="60" y={y} width="60" height="6" rx="3" fill="var(--line)" />)}
        {[64, 82, 100].map((y) => <rect key={"r" + y} x="280" y={y} width="60" height="6" rx="3" fill="var(--line)" />)}
        <path d="M60 130h60M280 130h60" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="200" cy="38" r="14" fill="var(--accent)" />
      </svg>
    );
  }

  if (variant === "speed") {
    return (
      <svg {...common} className={className}>
        {bg}
        <circle cx="200" cy="112" r="62" fill="none" stroke="var(--line)" strokeWidth="10" />
        <path d="M200 112 L236 76" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="112" r="7" fill="var(--ink)" />
        {[0, 30, 60, 90, 120, 150, 180].map((a) => (
          <line key={a} x1={200 + 74 * Math.cos((a - 90) * (Math.PI / 180))} y1={112 + 74 * Math.sin((a - 90) * (Math.PI / 180))}
            x2={200 + 84 * Math.cos((a - 90) * (Math.PI / 180))} y2={112 + 84 * Math.sin((a - 90) * (Math.PI / 180))}
            stroke="var(--line)" strokeWidth="4" strokeLinecap="round" />
        ))}
      </svg>
    );
  }

  /* ───────── New variants ───────── */

  // Git & version control: a main line with a branch that splits off and merges back.
  if (variant === "git") {
    return (
      <svg {...common} className={className}>
        {bg}
        <g stroke="var(--line)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 150H350" />
          <path d="M120 150C150 150 150 74 190 74H250C290 74 280 150 310 150" />
          <path d="M120 150C150 150 150 190 190 190" opacity="0" />
        </g>
        <path d="M120 150C150 150 150 74 190 74H250C290 74 280 150 310 150" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
        {[50, 120, 200, 310, 350].map((x) => (
          <circle key={x} cx={x} cy="150" r="10" fill="var(--bg)" stroke="var(--ink)" strokeWidth="4" />
        ))}
        {[190, 250].map((x) => (
          <circle key={x} cx={x} cy="74" r="10" fill="var(--accent)" stroke="var(--ink)" strokeWidth="4" />
        ))}
      </svg>
    );
  }

  // Docker & containers: stacked shipping crates.
  if (variant === "container") {
    const crate = (x: number, y: number, accent = false) => (
      <g key={`${x}-${y}`}>
        <rect x={x} y={y} width="70" height="42" rx="5" fill={accent ? "var(--accent)" : "var(--bg)"} stroke="var(--line)" strokeWidth="2" />
        <path d={`M${x + 18} ${y + 8}v26M${x + 35} ${y + 8}v26M${x + 52} ${y + 8}v26`} stroke={accent ? "var(--bg)" : "var(--line)"} strokeWidth="3" strokeLinecap="round" />
      </g>
    );
    return (
      <svg {...common} className={className}>
        {bg}
        <path d="M40 176H360" stroke="var(--line)" strokeWidth="4" strokeLinecap="round" />
        {[85, 165, 245].map((x) => crate(x, 134))}
        {[125, 205].map((x) => crate(x, 90, x === 205))}
        {crate(165, 46)}
        <circle cx="200" cy="30" r="0" />
      </svg>
    );
  }

  // Databases & SQL: a main cylinder with two smaller ones.
  if (variant === "database") {
    const cyl = (cx: number, top: number, w: number, h: number, bands: number, accentBand = -1) => {
      const rx = w / 2;
      const ry = w / 8;
      const left = cx - rx;
      return (
        <g key={cx}>
          <path d={`M${left} ${top}v${h}a${rx} ${ry} 0 0 0 ${w} 0v-${h}`} fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
          {Array.from({ length: bands }).map((_, i) => {
            const y = top + ((i + 1) * h) / (bands + 1);
            return (
              <path key={i} d={`M${left} ${y}a${rx} ${ry} 0 0 0 ${w} 0`}
                stroke={i === accentBand ? "var(--accent)" : "var(--line)"} strokeWidth={i === accentBand ? 5 : 2} strokeLinecap="round" />
            );
          })}
          <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        </g>
      );
    };
    return (
      <svg {...common} className={className}>
        {bg}
        {cyl(90, 100, 80, 60, 1)}
        {cyl(310, 100, 80, 60, 1)}
        {cyl(200, 52, 116, 110, 2, 1)}
        <path d="M130 130H160M240 130H270" stroke="var(--line)" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
      </svg>
    );
  }

  // Linux & terminal: a window with a prompt and output lines.
  if (variant === "terminal") {
    return (
      <svg {...common} className={className}>
        {bg}
        <rect x="60" y="34" width="280" height="150" rx="10" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <path d="M60 64H340" stroke="var(--line)" strokeWidth="2" />
        <circle cx="80" cy="49" r="5" fill="var(--line)" />
        <circle cx="98" cy="49" r="5" fill="var(--line)" />
        <circle cx="116" cy="49" r="5" fill="var(--accent)" />
        <path d="M82 92l14 10-14 10" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="108" y="98" width="96" height="8" rx="4" fill="var(--ink)" />
        <rect x="82" y="124" width="150" height="6" rx="3" fill="var(--line)" />
        <rect x="82" y="140" width="110" height="6" rx="3" fill="var(--line)" />
        <rect x="82" y="156" width="20" height="10" rx="2" fill="var(--accent)" />
      </svg>
    );
  }

  // React, Vue & component frameworks: a tree of composed components.
  if (variant === "components") {
    return (
      <svg {...common} className={className}>
        {bg}
        <g stroke="var(--line)" strokeWidth="3" strokeLinecap="round">
          <path d="M200 52V80M200 80H90V100M200 80H310V100M200 80V100" />
          <path d="M90 150V166M310 150V166" />
        </g>
        <circle cx="200" cy="40" r="14" fill="var(--ink)" />
        <rect x="55" y="100" width="70" height="50" rx="8" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <rect x="165" y="100" width="70" height="50" rx="8" fill="var(--accent)" stroke="var(--line)" strokeWidth="2" />
        <rect x="275" y="100" width="70" height="50" rx="8" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <circle cx="90" cy="176" r="9" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <circle cx="310" cy="176" r="9" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
      </svg>
    );
  }

  // Comparison posts (X vs Y): a balance scale.
  if (variant === "compare") {
    return (
      <svg {...common} className={className}>
        {bg}
        <path d="M200 70V176" stroke="var(--line)" strokeWidth="6" strokeLinecap="round" />
        <rect x="150" y="174" width="100" height="10" rx="5" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <path d="M100 70H300" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
        <g stroke="var(--line)" strokeWidth="2" strokeLinecap="round">
          <path d="M100 70L64 132M100 70L136 132M300 70L264 132M300 70L336 132" />
        </g>
        <path d="M56 132a44 24 0 0 0 88 0z" fill="var(--accent)" stroke="var(--line)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M256 132a44 24 0 0 0 88 0z" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="200" cy="70" r="10" fill="var(--ink)" />
        <circle cx="200" cy="40" r="0" />
      </svg>
    );
  }

  // APIs, REST & GraphQL: a hub with connected nodes.
  if (variant === "network") {
    const nodes: [number, number][] = [[80, 58], [80, 164], [320, 58], [320, 164], [200, 36], [200, 188]];
    return (
      <svg {...common} className={className}>
        {bg}
        <g stroke="var(--line)" strokeWidth="3" strokeLinecap="round">
          {nodes.map(([x, y]) => <path key={`${x}-${y}`} d={`M200 112L${x} ${y}`} />)}
        </g>
        {nodes.map(([x, y]) => (
          <circle key={`n${x}-${y}`} cx={x} cy={y} r="13" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        ))}
        <circle cx="200" cy="112" r="24" fill="var(--accent)" stroke="var(--ink)" strokeWidth="4" />
        <circle cx="80" cy="58" r="4" fill="var(--ink)" />
        <circle cx="320" cy="164" r="4" fill="var(--ink)" />
      </svg>
    );
  }

  // CSS, Tailwind & Bootstrap: a page layout wireframe.
  if (variant === "layout") {
    return (
      <svg {...common} className={className}>
        {bg}
        <rect x="50" y="30" width="300" height="24" rx="6" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <circle cx="66" cy="42" r="4" fill="var(--accent)" />
        <rect x="80" y="39" width="60" height="6" rx="3" fill="var(--line)" />
        <rect x="50" y="64" width="70" height="120" rx="6" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        {[80, 96, 112].map((y) => <rect key={y} x="62" y={y} width="46" height="6" rx="3" fill="var(--line)" />)}
        <rect x="132" y="64" width="102" height="54" rx="6" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <rect x="246" y="64" width="104" height="54" rx="6" fill="var(--accent)" stroke="var(--line)" strokeWidth="2" />
        <rect x="132" y="130" width="218" height="54" rx="6" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <rect x="146" y="146" width="90" height="6" rx="3" fill="var(--line)" />
        <rect x="146" y="162" width="130" height="6" rx="3" fill="var(--line)" />
      </svg>
    );
  }

  // "library" (default)
  return (
    <svg {...common} className={className}>
      {bg}
      {[[70, 150, 60], [150, 130, 90], [250, 145, 70], [330, 160, 45]].map(([x, h, w], i) => (
        <rect key={i} x={x - w / 2} y={190 - h} width={w} height={h} rx="6" fill={i === 1 ? "var(--accent)" : "var(--bg)"} stroke="var(--line)" strokeWidth="2" />
      ))}
      <circle cx="150" cy="46" r="10" fill="var(--ink)" />
    </svg>
  );
}