import { RangeFilter } from "./range-filter";

const CATEGORIES = [
  { label: "Service", requests: 100000 },
  { label: "Needs", requests: 86000 },
  { label: "Medical", requests: 77000 },
  { label: "Employee", requests: 70000 },
  { label: "Real estate", requests: 63000 },
  { label: "Special", requests: 52000 },
  { label: "Blinkz", requests: 42000 },
  { label: "Food", requests: 33000 },
  { label: "Emergency", requests: 22000 },
];

const TICKS = [0, 10000, 30000, 60000, 100000];

const WIDTH = 292;
const HEIGHT = 255;
const BAR_X = 74;
const BAR_MAX = 205;
const BAR = 12;
const FIRST_ROW = 10.4;
const ROW = 27;
const GRID_BOTTOM = 234;
const TICK_Y = 246;
const MAX_VALUE = 100000;

const tickX = (value: number) => BAR_X + (value / MAX_VALUE) * BAR_MAX;
const rowY = (i: number) => FIRST_ROW + i * ROW;
const tickLabel = (value: number) => (value === 0 ? "0" : `${value / 1000}K`);

const bar = (center: number, value: number) => {
  const radius = BAR / 2;
  const end = tickX(value) - radius;
  return `M${BAR_X} ${center - radius} H${end} A${radius} ${radius} 0 0 1 ${end} ${center + radius} H${BAR_X} Z`;
};

export function MostRequested() {
  return (
    <section className="relative flex w-[346px] shrink-0 flex-col gap-[43px] overflow-clip rounded-2xl bg-neutral-50 px-[11px] py-4 shadow-card">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[45px] -left-[46.5px] h-[87px] w-[84px] rounded-full bg-primary-500/37 blur-[50px]"
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[normal]">Most requested</h2>
        <RangeFilter label="Most requested range" className="gap-8" />
      </div>

      <figure className="flex justify-center">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-[255px] w-[292px]"
          role="img"
          aria-label="Requests by category"
        >
          <defs>
            <linearGradient id="most-requested-bar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0.0037" className="[stop-color:var(--color-success-500)]" />
              <stop offset="0.29" className="[stop-color:var(--color-primary-300)]" />
            </linearGradient>
          </defs>
          {TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={tickX(tick)}
                x2={tickX(tick)}
                y1={0}
                y2={GRID_BOTTOM}
                className="stroke-neutral-100"
              />
              <text
                x={tickX(tick)}
                y={TICK_Y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-neutral-500 text-xs"
              >
                {tickLabel(tick)}
              </text>
            </g>
          ))}
          {CATEGORIES.map((category, i) => (
            <g key={category.label}>
              <text
                x={0}
                y={rowY(i)}
                dominantBaseline="central"
                className="fill-neutral-500 text-xs"
              >
                {category.label}
              </text>
              <path d={bar(rowY(i), category.requests)} fill="url(#most-requested-bar)">
                <title>{`${category.label}: ${category.requests.toLocaleString("en-US")} requests`}</title>
              </path>
            </g>
          ))}
        </svg>
      </figure>
    </section>
  );
}
