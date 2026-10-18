import { RangeFilter } from "./range-filter";
import { RankedBars } from "./ranked-bars";

const PROVIDERS = [
  { label: "Al Noor Pharmacy", value: 100000 },
  { label: "Fresh Market", value: 86000 },
  { label: "City Bakery", value: 77000 },
  { label: "Care Clinic", value: 70000 },
  { label: "Speed Taxi", value: 63000 },
  { label: "Smart Delivery", value: 52000 },
  { label: "Dream Real Estate", value: 42000 },
  { label: "Quick Fix Services", value: 33000 },
  { label: "Play Zone", value: 22000 },
  { label: "Rescue Team", value: 17000 },
];

export function TopProviders() {
  return (
    <section className="relative flex w-full shrink-0 xl:w-[346px] flex-col gap-3.5 overflow-clip rounded-2xl bg-neutral-50 px-[11px] py-4 shadow-card">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[45px] -left-[46.5px] h-[87px] w-[84px] rounded-full bg-primary-500/37 blur-[50px]"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl leading-[normal]">Top 10 providers</h2>
          <p className="text-base leading-[normal]">Top providers based on performance.</p>
        </div>
        <RangeFilter label="Top providers range" className="gap-8" />
      </div>

      <figure className="flex justify-center">
        <RankedBars items={PROVIDERS} unit="orders" label="Top providers by orders" barX={106} />
      </figure>
    </section>
  );
}
