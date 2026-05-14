import { DashboardCharts } from "@/modules/dashboard/components/dashboard-charts";
import { getDashboardMonthData } from "@/modules/dashboard/data";
import { getTranslations } from "@/lib/i18n";
import { ModulePage } from "@/shared/components/module-page";

export default function ReportsPage() {
  const dashboard = getDashboardMonthData("2026-05");
  const t = getTranslations("es");

  return (
    <ModulePage
      title="Reportes"
      description="Compara meses, analiza tendencias de flujo, crecimiento de inversiones y reducción de deuda."
    >
      <DashboardCharts
        cashflow={dashboard.cashflow}
        investmentTrend={dashboard.investmentTrend}
        labels={t.dashboard}
      />
    </ModulePage>
  );
}
