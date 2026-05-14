import type { FinancialSummary } from "@/modules/dashboard/data";
import type { Locale } from "@/lib/i18n";

export type RecommendationInput = {
  current: FinancialSummary;
  locale?: Locale;
  previousExpenses: number;
  investmentGrowthPercent: number;
};

export function generateRecommendations(input: RecommendationInput) {
  const recommendations: Array<{
    severity: "info" | "warning" | "critical";
    title: string;
    message: string;
  }> = [];

  if (input.current.balance < 0) {
    recommendations.push({
      severity: "critical",
      title:
        input.locale === "en"
          ? `${input.current.currency} balance is negative`
          : `El balance ${input.current.currency} es negativo`,
      message:
        input.locale === "en"
          ? "Reduce discretionary spending or move non-essential payments to the next month."
          : "Reduce gasto discrecional o mueve pagos no esenciales al siguiente mes."
    });
  }

  const expenseDelta =
    ((input.current.expenses - input.previousExpenses) / input.previousExpenses) * 100;
  if (expenseDelta > 5) {
    recommendations.push({
      severity: "warning",
      title: input.locale === "en" ? "Expenses increased" : "Los gastos aumentaron",
      message:
        input.locale === "en"
          ? `${input.current.currency} expenses rose ${expenseDelta.toFixed(1)}% compared to last month.`
          : `Los gastos ${input.current.currency} subieron ${expenseDelta.toFixed(1)}% comparado con el mes anterior.`
    });
  }

  if (input.current.debtPaymentRatio > 25) {
    recommendations.push({
      severity: "critical",
      title:
        input.locale === "en"
          ? "Debt payments exceed safe threshold"
          : "Los pagos de deuda exceden el umbral seguro",
      message:
        input.locale === "en"
          ? "Debt payments are above 25% of monthly income. Prioritize refinancing or extra principal control."
          : "Los pagos de deuda superan 25% del ingreso mensual. Prioriza refinanciar o controlar capital."
    });
  }

  if (input.investmentGrowthPercent < 0.5) {
    recommendations.push({
      severity: "info",
      title:
        input.locale === "en"
          ? "Investment growth slowed"
          : "El crecimiento de inversiones se desaceleró",
      message:
        input.locale === "en"
          ? "Review monthly contributions and performance by institution before changing strategy."
          : "Revisa aportaciones mensuales y rendimiento por institución antes de cambiar estrategia."
    });
  }

  return recommendations;
}
