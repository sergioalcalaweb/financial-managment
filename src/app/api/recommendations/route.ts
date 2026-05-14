import { NextResponse } from "next/server";
import { getLocale } from "@/lib/i18n";
import { getDashboardMonthData } from "@/modules/dashboard/data";
import { generateRecommendations } from "@/services/recommendations-engine";

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const month = searchParams.get("month") ?? undefined;
  const dashboard = getDashboardMonthData(month, locale);

  return NextResponse.json({
    month: dashboard.key,
    recommendations: dashboard.summaries.flatMap((summary) =>
      generateRecommendations({
        current: summary,
        locale,
        previousExpenses: summary.expenses * 0.94,
        investmentGrowthPercent: summary.currency === "MXN" ? 1.34 : 0.8
      })
    )
  });
}
