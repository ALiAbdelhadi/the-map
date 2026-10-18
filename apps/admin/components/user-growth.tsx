import { RangeFilter } from "./range-filter";
import { SortButton } from "./sort-button";

const HOURS = [
  "12:00PM",
  "01:00PM",
  "02:00PM",
  "03:00PM",
  "04:00PM",
  "05:00PM",
  "06:00PM",
  "07:00PM",
  "08:00PM",
  "09:00PM",
  "10:00PM",
  "11:00PM",
  "12:00AM",
  "01:00AM",
  "02:00AM",
  "03:00AM",
  "04:00AM",
  "05:00AM",
  "06:00AM",
  "07:00AM",
  "08:00AM",
  "09:00AM",
  "10:00AM",
  "11:00AM",
];

const TICKS = ["18K", "16K", "14K", "12K", "10K", "8K", "6K"];

const COLUMN = 62;
const LEFT = 5;
const TOP_TICK = 18000;
const TICK_STEP = 2000;
const TOP_TICK_Y = 9.6;
const TICK_GAP = 35.2;
const BASELINE = 242;
const WIDTH = LEFT + (HOURS.length - 1) * COLUMN + 49;
const HEIGHT = 269;
const MARKER = 4;

const x = (i: number) => LEFT + i * COLUMN;
const y = (value: number) => TOP_TICK_Y + ((TOP_TICK - value) / TICK_STEP) * TICK_GAP;

const line = (values: number[]) =>
  values.reduce((d, value, i) => {
    if (i === 0) return `M${x(0)} ${y(value)}`;
    const x0 = x(i - 1);
    const y0 = y(values[i - 1] ?? value);
    return `${d} C${x0 + COLUMN * 0.4} ${y0} ${x0 + COLUMN * 0.6} ${y(value)} ${x(i)} ${y(value)}`;
  }, "");

const area = (values: number[]) =>
  `${line(values)} L${x(values.length - 1)} ${BASELINE} L${x(0)} ${BASELINE} Z`;

const SERIES = [
  {
    label: "New Users",
    shape: "circle",
    line: "stroke-primary-500",
    marker: "fill-primary-500",
    swatch: "size-4 rounded-full bg-primary-500",
    values: [
      16100, 14100, 11100, 12300, 15900, 10500, 18500, 14200, 14900, 14600, 12800, 15400, 10000,
      10100, 18400, 14300, 15800, 14300, 15500, 12500, 11900, 10600, 15900, 16100,
    ],
  },
  {
    label: "Active Users",
    shape: "diamond",
    line: "stroke-success-800 opacity-91",
    marker: "fill-success-800",
    area: { gradient: "user-growth-active", opacity: "opacity-17" },
    swatch: "m-0.5 size-3 rotate-45 rounded-[1px] bg-success-800",
    values: [
      17100, 13200, 10000, 15000, 10300, 18400, 15700, 10300, 17800, 9900, 14300, 11500, 13700,
      15000, 16200, 14400, 15900, 10300, 12000, 16000, 10300, 13300, 14400, 17700,
    ],
  },
  {
    label: "Providers",
    shape: "square",
    line: "stroke-primary-200",
    marker: "fill-primary-200",
    area: { gradient: "user-growth-providers", opacity: "opacity-20" },
    swatch: "h-[17px] w-4 rounded-[1px] bg-primary-200",
    values: [
      13000, 9600, 18500, 10700, 9300, 15000, 18400, 9700, 10600, 11600, 16100, 18600, 12200, 18600,
      9300, 18100, 13600, 13500, 14000, 12700, 13500, 11500, 14900, 12600,
    ],
  },
];

const marker = (shape: string, cx: number, cy: number) => {
  if (shape === "diamond") {
    return `M${cx} ${cy - MARKER} L${cx + MARKER} ${cy} L${cx} ${cy + MARKER} L${cx - MARKER} ${cy} Z`;
  }
  if (shape === "square") {
    return `M${cx - MARKER} ${cy - MARKER} h${MARKER * 2} v${MARKER * 2} h${-MARKER * 2} Z`;
  }
  return `M${cx - MARKER} ${cy} a${MARKER} ${MARKER} 0 1 0 ${MARKER * 2} 0 a${MARKER} ${MARKER} 0 1 0 ${-MARKER * 2} 0`;
};

export function UserGrowth() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4 rounded-3xl bg-neutral-50 p-6 shadow-card">
      <header className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-2xl leading-[normal]">User Growth Over Time</h2>
          <div className="flex shrink-0 items-start gap-[46px]">
            <RangeFilter label="User growth range" className="gap-1" />
            <SortButton />
          </div>
        </div>
        <p className="text-base leading-[normal] text-primary-800">
          Track how the number of users grows over time.
        </p>
      </header>

      <div className="flex items-start gap-2">
        <ul
          aria-hidden
          className="flex w-[21px] shrink-0 flex-col gap-4 text-xs leading-[normal] text-neutral-600"
        >
          {TICKS.map((tick) => (
            <li key={tick}>{tick}</li>
          ))}
        </ul>
        <div className="min-w-0 flex-1 overflow-x-auto overflow-y-clip [scrollbar-width:none]">
          <figure className="relative h-[269px] w-[1480px]">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="absolute inset-0 size-full"
              role="img"
              aria-label="New users, active users and providers per hour over the last day"
            >
              <defs>
                <linearGradient id="user-growth-active" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className="[stop-color:var(--color-primary-500)]" />
                  <stop offset="0.53" className="[stop-color:var(--color-primary-200)]" />
                </linearGradient>
                <linearGradient id="user-growth-providers" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" className="[stop-color:var(--color-success-500)]" />
                  <stop offset="0.29" className="[stop-color:var(--color-primary-300)]" />
                </linearGradient>
              </defs>
              {SERIES.map(
                (series) =>
                  series.area && (
                    <path
                      key={series.label}
                      d={area(series.values)}
                      fill={`url(#${series.area.gradient})`}
                      className={series.area.opacity}
                    />
                  ),
              )}
              {SERIES.map((series) => (
                <path
                  key={series.label}
                  d={line(series.values)}
                  fill="none"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={series.line}
                />
              ))}
              {SERIES.map((series) => (
                <g key={series.label} className={series.marker}>
                  {series.values.map((value, i) => (
                    <path key={HOURS[i]} d={marker(series.shape, x(i), y(value))}>
                      <title>{`${HOURS[i]} · ${series.label}: ${value.toLocaleString("en-US")}`}</title>
                    </path>
                  ))}
                </g>
              ))}
            </svg>
            <ol
              aria-hidden
              className="absolute top-[250px] left-1 flex gap-4 text-xs leading-[normal] whitespace-nowrap text-neutral-600"
            >
              {HOURS.map((hour) => (
                <li key={hour} className="w-[46px]">
                  {hour}
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </div>

      <ul className="flex items-center justify-center gap-6">
        {SERIES.map((series) => (
          <li
            key={series.label}
            className="flex items-center gap-2 text-xl leading-[normal] text-neutral-600"
          >
            <span aria-hidden className={series.swatch} />
            {series.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
