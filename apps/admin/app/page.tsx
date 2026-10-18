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
    <main className="flex max-w-[1174px] flex-col gap-6 p-4 sm:gap-8 sm:p-6">
      <TopBar />
      <KpiRow />
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <RequestsActivity />
        <RevenueGrowth />
      </div>
      <div className="flex flex-col gap-4 xl:flex-row">
        <OrderStatus />
        <MostRequested />
      </div>
      <div className="flex flex-col gap-4 xl:flex-row">
        <UserGrowth />
        <TopProviders />
      </div>
    </main>
  );
}
