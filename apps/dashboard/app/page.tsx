import { KpiRow } from "../components/kpi-row";
import { TopBar } from "../components/top-bar";

export default function OverviewPage() {
  return (
    <main className="flex max-w-[1174px] flex-col gap-8 px-6 py-6">
      <TopBar />
      <KpiRow />
    </main>
  );
}
