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

const STATUSES = [
  {
    label: "In progress",
    gradient: "order-in-progress",
    swatch: "from-primary-500/91 to-primary-200/91 to-53%",
  },
  {
    label: "Cancelled",
    gradient: "order-cancelled",
    swatch: "from-error-500/24 to-error-200/24 to-67%",
  },
  {
    label: "Completed",
    gradient: "order-completed",
    swatch: "from-success-500 to-success-100",
  },
];

const LEGEND = ["In progress", "Completed", "Cancelled"].flatMap((label) =>
  STATUSES.filter((status) => status.label === label),
);

const ORDERS = [
  [15000, 10600, 18000],
  [18000, 7000, 13000],
  [11700, 12900, 18000],
  [11700, 11700, 11700],
  [13900, 15300, 14100],
  [17600, 15300, 14100],
  [17600, 5700, 9200],
  [17600, 10600, 7100],
  [15000, 10600, 18000],
  [18000, 7000, 13000],
  [11700, 12900, 18000],
  [17600, 5700, 9200],
  [11700, 12900, 18000],
  [17600, 15300, 14100],
  [11700, 6200, 18000],
  [17100, 10600, 8700],
  [9500, 16600, 8700],
  [17600, 15300, 14100],
  [9700, 17600, 17600],
  [17600, 8200, 11600],
  [12900, 14200, 17600],
  [17600, 7700, 17600],
  [17600, 7700, 17600],
  [10800, 6000, 17600],
];

const TICKS = ["18K", "16K", "14K", "12K", "10K", "8K", "6K"];

const COLUMN = 62;
const LEFT = 5;
const BAR = 12;
const BAR_GAP = 4;
const TOP_TICK = 18000;
const TICK_STEP = 2000;
const TOP_TICK_Y = 9.6;
const TICK_GAP = 35.2;
const BASELINE = 242;
const WIDTH = LEFT + (HOURS.length - 1) * COLUMN + 49;
const HEIGHT = 269;

const x = (i: number) => LEFT + i * COLUMN;
const y = (value: number) => TOP_TICK_Y + ((TOP_TICK - value) / TICK_STEP) * TICK_GAP;

const bar = (left: number, value: number) => {
  const radius = BAR / 2;
  const top = y(value);
  return `M${left} ${BASELINE} V${top + radius} A${radius} ${radius} 0 0 1 ${left + BAR} ${top + radius} V${BASELINE} Z`;
};

export function OrderStatus() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-9 rounded-3xl bg-neutral-50 p-6 shadow-card">
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2 leading-[normal]">
          <h2 className="text-2xl leading-[normal]">Order Status</h2>
          <p className="text-base leading-[normal] text-primary-800">Overview of order status</p>
        </div>
        <div className="flex items-start gap-[46px]">
          <RangeFilter label="Order status range" className="gap-1" />
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
              aria-label="Orders per hour by status over the last day"
            >
              <defs>
                <linearGradient id="order-in-progress" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0"
                    className="[stop-color:var(--color-primary-500)] [stop-opacity:0.91]"
                  />
                  <stop
                    offset="0.53"
                    className="[stop-color:var(--color-primary-200)] [stop-opacity:0.91]"
                  />
                </linearGradient>
                <linearGradient id="order-cancelled" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0"
                    className="[stop-color:var(--color-error-500)] [stop-opacity:0.24]"
                  />
                  <stop
                    offset="0.67"
                    className="[stop-color:var(--color-error-200)] [stop-opacity:0.24]"
                  />
                </linearGradient>
                <linearGradient id="order-completed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className="[stop-color:var(--color-success-500)]" />
                  <stop offset="1" className="[stop-color:var(--color-success-100)]" />
                </linearGradient>
              </defs>
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
              <line x1={0} x2={WIDTH} y1={BASELINE} y2={BASELINE} className="stroke-neutral-100" />
              {ORDERS.map((values, i) => (
                <g key={HOURS[i]}>
                  {STATUSES.map((status, j) => {
                    const value = values[j] ?? 0;
                    return (
                      <path
                        key={status.label}
                        d={bar(x(i) + j * (BAR + BAR_GAP), value)}
                        fill={`url(#${status.gradient})`}
                      >
                        <title>{`${HOURS[i]} · ${status.label}: ${value.toLocaleString("en-US")} orders`}</title>
                      </path>
                    );
                  })}
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
        {LEGEND.map((status) => (
          <li
            key={status.label}
            className="flex items-center gap-2 text-xl leading-[normal] text-neutral-600"
          >
            <span className={`h-[5px] w-[15px] rounded-xl bg-linear-to-l ${status.swatch}`} />
            {status.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
