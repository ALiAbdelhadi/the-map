import { KpiRow } from "../components/kpi-row";
import { RequestsActivity } from "../components/requests-activity";
import { RevenueGrowth } from "../components/revenue-growth";
import { TopBar } from "../components/top-bar";

export default function OverviewPage() {
  return (
    <main className="flex max-w-[1174px] flex-col gap-8 px-6 py-6">
      <TopBar />
      <KpiRow />
      <div className="flex items-start gap-4">
        <RequestsActivity />
        <RevenueGrowth />
      </div>
    </main>
  );
}
