import { KpiRow } from "../components/kpi-row";
import { MostRequested } from "../components/most-requested";
import { OrderStatus } from "../components/order-status";
import { RequestsActivity } from "../components/requests-activity";
import { RevenueGrowth } from "../components/revenue-growth";
import { TopBar } from "../components/top-bar";
import { TopProviders } from "../components/top-providers";
import { UserGrowth } from "../components/user-growth";

export default function OverviewPage() {
  return (
    <main className="flex max-w-[1174px] flex-col gap-8 px-6 py-6">
      <TopBar />
      <KpiRow />
      <div className="flex items-start gap-4">
        <RequestsActivity />
        <RevenueGrowth />
      </div>
      <div className="flex gap-4">
        <OrderStatus />
        <MostRequested />
      </div>
      <div className="flex gap-4">
        <UserGrowth />
        <TopProviders />
      </div>
    </main>
  );
}
