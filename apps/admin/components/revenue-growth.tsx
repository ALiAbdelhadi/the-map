import { RangeFilter } from "./range-filter";

type Segment = {
  label: string;
  revenue: string;
  share: number;
  fill: string;
  dot: string;
};

const SEGMENTS: Segment[] = [
  { label: "Food", revenue: "$10,000", share: 9, fill: "fill-primary-50", dot: "bg-primary-50" },
  {
    label: "Blinkz",
    revenue: "$20,000",
    share: 11,
    fill: "fill-secondary-100",
    dot: "bg-secondary-100",
  },
  {
    label: "Needs",
    revenue: "$60,000",
    share: 13,
    fill: "fill-warning-700",
    dot: "bg-warning-700",
  },
  {
    label: "Medical",
    revenue: "$40,000",
    share: 12,
    fill: "fill-warning-800",
    dot: "bg-warning-800",
  },
  {
    label: "Employee",
    revenue: "$35,000",
    share: 11,
    fill: "fill-warning-600",
    dot: "bg-warning-600",
  },
  {
    label: "Emergency",
    revenue: "$28,000",
    share: 10,
    fill: "fill-success-400",
    dot: "bg-success-400",
  },
  {
    label: "Special",
    revenue: "$21,000",
    share: 10,
    fill: "fill-success-200",
    dot: "bg-success-200",
  },
  {
    label: "Service",
    revenue: "$85,000",
    share: 15,
    fill: "fill-primary-500",
    dot: "bg-primary-500",
  },
  {
    label: "Real estate",
    revenue: "$7,000",
    share: 9,
    fill: "fill-primary-250",
    dot: "bg-primary-250",
  },
];

const LEGEND_ORDER = [
  "Service",
  "Needs",
  "Medical",
  "Blinkz",
  "Food",
  "Real estate",
  "Special",
  "Employee",
  "Emergency",
];

const LEGEND = [...SEGMENTS].sort(
  (a, b) => LEGEND_ORDER.indexOf(a.label) - LEGEND_ORDER.indexOf(b.label),
);

const CENTER = 96;
const OUTER = 73.5;
const INNER = 52;
const CORNER = 8;
const GAP = 6;
const START = -31;

const point = (radius: number, degrees: number) => {
  const radians = (degrees * Math.PI) / 180;
  return `${(CENTER + radius * Math.sin(radians)).toFixed(2)} ${(CENTER - radius * Math.cos(radians)).toFixed(2)}`;
};

const sector = (from: number, to: number) => {
  const outer = (CORNER / OUTER) * (180 / Math.PI);
  const inner = (CORNER / INNER) * (180 / Math.PI);
  return [
    `M${point(OUTER, from + outer)}`,
    `A${OUTER} ${OUTER} 0 0 1 ${point(OUTER, to - outer)}`,
    `Q${point(OUTER, to)} ${point(OUTER - CORNER, to)}`,
    `L${point(INNER + CORNER, to)}`,
    `Q${point(INNER, to)} ${point(INNER, to - inner)}`,
    `A${INNER} ${INNER} 0 0 0 ${point(INNER, from + inner)}`,
    `Q${point(INNER, from)} ${point(INNER + CORNER, from)}`,
    `L${point(OUTER - CORNER, from)}`,
    `Q${point(OUTER, from)} ${point(OUTER, from + outer)}`,
    "Z",
  ].join(" ");
};

const ARCS = SEGMENTS.reduce<{ segment: Segment; from: number; to: number }[]>((arcs, segment) => {
  const last = arcs.at(-1);
  const from = last ? last.to + GAP : START + GAP / 2;
  const to = from + (segment.share / 100) * 360 - GAP;
  return [...arcs, { segment, from, to }];
}, []);

const labelRotation = (degrees: number) => ((((degrees + 90) % 180) + 180) % 180) - 90;

export function RevenueGrowth() {
  return (
    <section className="relative flex w-full shrink-0 xl:w-[346px] flex-col overflow-clip rounded-2xl bg-neutral-50 px-[11px] py-2 shadow-card">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[35px] -right-[31px] h-[63px] w-[74px] rounded-full bg-primary-500/37 blur-[50px]"
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[normal]">Revenue Growth</h2>
        <RangeFilter label="Revenue range" className="gap-8" />
      </div>

      <figure className="relative mx-auto -mb-0.5 size-48">
        <svg
          viewBox="0 0 192 192"
          className="size-full"
          role="img"
          aria-label="Revenue share by category"
        >
          {ARCS.map(({ segment, from, to }) => {
            const middle = (from + to) / 2;
            return (
              <g key={segment.label}>
                <path d={sector(from, to)} className={segment.fill}>
                  <title>{`${segment.label}: ${segment.share}%`}</title>
                </path>
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`translate(${point((OUTER + INNER) / 2, middle)}) rotate(${labelRotation(middle)})`}
                  className="fill-primary-950 text-[10px]"
                >
                  {segment.share}%
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption className="absolute inset-0 flex items-center justify-center font-display text-[15px] leading-[normal] text-secondary-900">
          $306,000
        </figcaption>
      </figure>

      <ul className="flex flex-wrap gap-x-3 gap-y-2.5 py-2">
        {LEGEND.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-xs leading-[normal]">
            <span className="flex items-center gap-1 text-neutral-500">
              <span className={`size-2 rounded-full ${segment.dot}`} />
              {segment.label}
            </span>
            {segment.revenue}
          </li>
        ))}
      </ul>
    </section>
  );
}
