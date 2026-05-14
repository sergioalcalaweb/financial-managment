import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLocale } from "@/lib/i18n";
import { getDashboardMonthData } from "@/modules/dashboard/data";
import { generateRecommendations } from "@/services/recommendations-engine";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const month = searchParams.get("month") ?? undefined;
  const locale = getLocale((await cookies()).get("fmp_locale")?.value);
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
