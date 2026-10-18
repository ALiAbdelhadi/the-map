import { RangeFilter } from "./range-filter";
import { RankedBars } from "./ranked-bars";

const CATEGORIES = [
  { label: "Service", value: 100000 },
  { label: "Needs", value: 86000 },
  { label: "Medical", value: 77000 },
  { label: "Employee", value: 70000 },
  { label: "Real estate", value: 63000 },
  { label: "Special", value: 52000 },
  { label: "Blinkz", value: 42000 },
  { label: "Food", value: 33000 },
  { label: "Emergency", value: 22000 },
];

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
        <RankedBars items={CATEGORIES} unit="requests" label="Requests by category" barX={74} />
      </figure>
    </section>
  );
}
