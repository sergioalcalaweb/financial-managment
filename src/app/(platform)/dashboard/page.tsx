import { cookies } from "next/headers";
import { Suspense } from "react";
import { DashboardCharts } from "@/modules/dashboard/components/dashboard-charts";
import { MonthSelector } from "@/modules/dashboard/components/month-selector";
import { SummaryCard } from "@/modules/dashboard/components/summary-card";
import { getDashboardMonthData } from "@/modules/dashboard/data";
import { getLocale, getTranslations } from "@/lib/i18n";
import { formatMoney } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const locale = getLocale((await cookies()).get("fmp_locale")?.value);
  const t = getTranslations(locale);
  const dashboard = getDashboardMonthData(month, locale);

  return (
    <div className="flex flex-col gap-5 pb-20 lg:pb-0">
      <section className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{dashboard.label}</h2>
          <p className="text-sm text-muted-foreground">
            {t.dashboard.selectedMonthCopy}
          </p>
        </div>
        <div className="w-full sm:w-56">
          <MonthSelector
            label={t.dashboard.selectFinancialMonth}
            locale={locale}
            selectedMonth={dashboard.key}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {dashboard.summaries.map((summary) => (
          <SummaryCard key={summary.currency} labels={t.summary} summary={summary} />
        ))}
      </section>

      <Suspense fallback={<div className="h-72 rounded-lg border bg-card" />}>
        <DashboardCharts
          cashflow={dashboard.cashflow}
          investmentTrend={dashboard.investmentTrend}
          labels={t.dashboard}
        />
      </Suspense>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.recentActivity}</CardTitle>
            <CardDescription>{t.dashboard.recentActivityDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {dashboard.recentActivity.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.currency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatMoney(Math.abs(item.amount), item.currency)}
                    </p>
                    <Badge variant="secondary">
                      {t.status[item.status as keyof typeof t.status] ?? item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.recommendations}</CardTitle>
            <CardDescription>{t.dashboard.recommendationsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {dashboard.recommendations.map((item) => (
                <div key={item.title} className="rounded-md border p-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{item.title}</p>
                    <Badge
                      variant={item.severity === "critical" ? "destructive" : "secondary"}
                    >
                      {t.severity[item.severity]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
