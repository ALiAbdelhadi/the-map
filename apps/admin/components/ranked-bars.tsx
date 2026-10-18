const TICKS = [0, 10000, 30000, 60000, 100000];

const BAR_MAX = 205;
const BAR = 12;
const FIRST_ROW = 10.4;
const ROW = 27;
const MAX_VALUE = 100000;

const rowY = (i: number) => FIRST_ROW + i * ROW;
const tickLabel = (value: number) => (value === 0 ? "0" : `${value / 1000}K`);

type RankedBarsProps = {
  items: { label: string; value: number }[];
  unit: string;
  label: string;
  barX: number;
};

export function RankedBars({ items, unit, label, barX }: RankedBarsProps) {
  const width = barX + BAR_MAX + 13;
  const gridBottom = rowY(items.length - 1) + 7.6;
  const tickY = gridBottom + 12;
  const height = tickY + 9;
  const gradient = `${unit}-bar`;

  const tickX = (value: number) => barX + (value / MAX_VALUE) * BAR_MAX;
  const bar = (center: number, value: number) => {
    const radius = BAR / 2;
    const end = tickX(value) - radius;
    return `M${barX} ${center - radius} H${end} A${radius} ${radius} 0 0 1 ${end} ${center + radius} H${barX} Z`;
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="0">
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
            y2={gridBottom}
            className="stroke-neutral-100"
          />
          <text
            x={tickX(tick)}
            y={tickY}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-neutral-500 text-xs"
          >
            {tickLabel(tick)}
          </text>
        </g>
      ))}
      {items.map((item, i) => (
        <g key={item.label}>
          <text x={0} y={rowY(i)} dominantBaseline="central" className="fill-neutral-500 text-xs">
            {item.label}
          </text>
          <path d={bar(rowY(i), item.value)} fill={`url(#${gradient})`}>
            <title>{`${item.label}: ${item.value.toLocaleString("en-US")} ${unit}`}</title>
          </path>
        </g>
      ))}
    </svg>
  );
}
