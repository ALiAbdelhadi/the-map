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

const REQUESTS = [
  14700, 13100, 13800, 10200, 14100, 10800, 17800, 15900, 15300, 7700, 7600, 17000, 18000, 10800,
  12900, 10400, 6400, 16300, 8300, 9500, 13900, 12800, 16000, 12500,
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

const x = (i: number) => LEFT + i * COLUMN;
const y = (value: number) => TOP_TICK_Y + ((TOP_TICK - value) / TICK_STEP) * TICK_GAP;

const LINE = REQUESTS.reduce((d, value, i) => {
  if (i === 0) return `M${x(0)} ${y(value)}`;
  const x0 = x(i - 1);
  const y0 = y(REQUESTS[i - 1] ?? value);
  return `${d} C${x0 + COLUMN * 0.4} ${y0} ${x0 + COLUMN * 0.6} ${y(value)} ${x(i)} ${y(value)}`;
}, "");

const AREA = `${LINE} L${x(REQUESTS.length - 1)} ${BASELINE} L${x(0)} ${BASELINE} Z`;

export function RequestsActivity() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-9 rounded-3xl bg-neutral-50 p-6 shadow-card">
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2 leading-[normal]">
          <h2 className="text-2xl leading-[normal]">Requests Activity</h2>
          <p className="text-base leading-[normal] text-primary-800">
            Track requests across the platform
          </p>
        </div>
        <div className="flex items-start gap-[46px]">
          <RangeFilter label="Requests range" className="gap-1" />
          <SortButton />
        </div>
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
              aria-label="Requests per hour over the last day"
            >
              {HOURS.map((hour, i) => (
                <line
                  key={hour}
                  x1={x(i)}
                  x2={x(i)}
                  y1={2}
                  y2={BASELINE}
                  className="stroke-neutral-100"
                />
              ))}
              <path d={AREA} className="fill-primary-100 opacity-44" />
              <path
                d={LINE}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-primary-500"
              />
              {REQUESTS.map((value, i) => (
                <circle
                  key={HOURS[i]}
                  cx={x(i)}
                  cy={y(value)}
                  r={4}
                  strokeWidth={2}
                  paintOrder="stroke"
                  className="fill-primary-500 stroke-neutral-50"
                >
                  <title>{`${HOURS[i]}: ${value.toLocaleString("en-US")} requests`}</title>
                </circle>
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
    </section>
  );
}
