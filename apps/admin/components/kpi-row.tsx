import { KpiCard, type Kpi } from "./kpi-card";

const KPIS: Kpi[] = [
  {
    label: "Total Users",
    value: "15,250",
    change: "15% last month",
    caption: "Fan base expanding day by day.",
    icon: "/svg/kpi-total-users.svg",
  },
  {
    label: "Providers",
    value: "4,820",
    change: "8% last month",
    caption: "A growing network of professionals",
    icon: "/svg/kpi-providers.svg",
  },
  {
    label: "Total Requests",
    value: "92,400",
    change: "21% last month",
    caption: "Growing reflects user trust",
    icon: "/svg/kpi-total-requests.svg",
    iconInset: "inset-[5.79%_1.91%_5.8%_1.88%]",
  },
  {
    label: "Active Requests",
    value: "1,340",
    change: "15% last week",
    caption: "Activity keeping the platform moving",
    icon: "/svg/kpi-active-requests.svg",
  },
  {
    label: "Total Revenue",
    value: "$285,600",
    change: "18% last month",
    caption: "Financial reflects platform success",
    tightValue: true,
    icon: "/svg/kpi-total-users.svg",
  },
];

export function KpiRow() {
  return (
    <section
      aria-label="Key metrics"
      className="grid gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6"
    >
      {KPIS.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </section>
  );
}
