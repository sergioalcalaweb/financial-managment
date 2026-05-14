export type Currency = "MXN" | "USD";

export type FinancialSummary = {
  currency: Currency;
  income: number;
  expenses: number;
  balance: number;
  investments: number;
  debts: number;
  debtPaymentRatio: number;
};

export type CashflowPoint = {
  month: string;
  MXNIncome: number;
  MXNExpenses: number;
  USDIncome: number;
  USDExpenses: number;
};

export type InvestmentTrendPoint = {
  month: string;
  MXN: number;
  USD: number;
};

export type RecentActivity = {
  label: string;
  currency: Currency;
  amount: number;
  status: string;
};

export type DashboardRecommendation = {
  severity: "info" | "warning" | "critical";
  title: string;
  message: string;
};

export type DashboardMonthData = {
  key: string;
  label: string;
  summaries: FinancialSummary[];
  cashflow: CashflowPoint[];
  investmentTrend: InvestmentTrendPoint[];
  recentActivity: RecentActivity[];
  recommendations: DashboardRecommendation[];
};

export const availableDashboardMonths = [
  { key: "2026-03", label: "March 2026" },
  { key: "2026-04", label: "April 2026" },
  { key: "2026-05", label: "May 2026" },
  { key: "2026-06", label: "June 2026" }
];

const monthLabelsEs: Record<string, string> = {
  "2026-03": "Marzo 2026",
  "2026-04": "Abril 2026",
  "2026-05": "Mayo 2026",
  "2026-06": "Junio 2026"
};

const spanishActivityLabels: Record<string, string> = {
  "Salary deposited": "Salario depositado",
  "Dental payment": "Pago dental",
  "Broker dividend": "Dividendo de broker",
  "Mortgage payment": "Pago de hipoteca",
  "Quarterly maintenance": "Mantenimiento trimestral",
  "Consulting invoice": "Factura de consultoría",
  "Broker contribution": "Aportación a broker",
  "Utilities bundle": "Servicios agrupados",
  "Rent paid": "Renta pagada",
  "Credit card partial payment": "Pago parcial de tarjeta",
  "Annual insurance": "Seguro anual",
  "Emergency fund transfer": "Transferencia a fondo de emergencia",
  "Cloud tools renewal": "Renovación de herramientas cloud"
};

const spanishRecommendations: Record<string, { title: string; message: string }> = {
  "MXN balance is stable": {
    title: "El balance MXN está estable",
    message: "Marzo cerró con suficiente excedente MXN para mantener sin cambios las plantillas recurrentes."
  },
  "USD expenses are rising": {
    title: "Los gastos USD están subiendo",
    message: "Las suscripciones de software aumentaron en marzo. Revisa los gastos recurrentes USD antes de abril."
  },
  "MXN expenses increased": {
    title: "Los gastos MXN aumentaron",
    message: "El mantenimiento de abril generó un pico temporal. Compara categorías antes de copiar presupuestos a mayo."
  },
  "Debt reduction is on track": {
    title: "La reducción de deuda va en línea",
    message: "La deuda MXN disminuyó mientras los pagos se mantuvieron debajo del umbral de 25% del ingreso."
  },
  "MXN expenses rose 5.9%": {
    title: "Los gastos MXN subieron 5.9%",
    message: "Mantenimiento y compras están por encima del mes anterior. Revisa plantillas recurrentes antes de junio."
  },
  "USD balance remains positive": {
    title: "El balance USD sigue positivo",
    message: "Puedes asignar hasta $900 USD sin cruzar el objetivo del fondo de emergencia."
  },
  "Debt payments near threshold": {
    title: "Pagos de deuda cerca del límite",
    message: "Los pagos de deuda MXN son 24% del ingreso mensual. Mantén el límite seguro debajo de 25%."
  },
  "USD balance is negative": {
    title: "El balance USD es negativo",
    message: "Los gastos USD de junio exceden el ingreso. Mueve pagos no esenciales o agrega ingreso antes del cierre."
  },
  "MXN debt ratio reached 25%": {
    title: "El ratio de deuda MXN llegó a 25%",
    message: "Los pagos de deuda están en el umbral seguro. Evita nuevo financiamiento este mes."
  }
};

export function getAvailableDashboardMonths(locale: Locale) {
  if (locale === "en") {
    return availableDashboardMonths;
  }

  return availableDashboardMonths.map((month) => ({
    ...month,
    label: monthLabelsEs[month.key] ?? month.label
  }));
}

const dashboardMonths: Record<string, DashboardMonthData> = {
  "2026-03": {
    key: "2026-03",
    label: "March 2026",
    summaries: [
      {
        currency: "MXN",
        income: 124000,
        expenses: 81500,
        balance: 42500,
        investments: 286000,
        debts: 951000,
        debtPaymentRatio: 22
      },
      {
        currency: "USD",
        income: 7800,
        expenses: 5700,
        balance: 2100,
        investments: 45600,
        debts: 13800,
        debtPaymentRatio: 11
      }
    ],
    cashflow: [
      { month: "Nov", MXNIncome: 110000, MXNExpenses: 76000, USDIncome: 6800, USDExpenses: 5000 },
      { month: "Dec", MXNIncome: 118000, MXNExpenses: 90000, USDIncome: 7100, USDExpenses: 5600 },
      { month: "Jan", MXNIncome: 116000, MXNExpenses: 79000, USDIncome: 7200, USDExpenses: 5400 },
      { month: "Feb", MXNIncome: 121000, MXNExpenses: 83000, USDIncome: 7600, USDExpenses: 5900 },
      { month: "Mar", MXNIncome: 124000, MXNExpenses: 81500, USDIncome: 7800, USDExpenses: 5700 }
    ],
    investmentTrend: [
      { month: "Nov", MXN: 232000, USD: 39800 },
      { month: "Dec", MXN: 246000, USD: 41400 },
      { month: "Jan", MXN: 260000, USD: 43000 },
      { month: "Feb", MXN: 272000, USD: 44100 },
      { month: "Mar", MXN: 286000, USD: 45600 }
    ],
    recentActivity: [
      { label: "Salary deposited", currency: "MXN", amount: 82000, status: "income" },
      { label: "Dental payment", currency: "MXN", amount: -7200, status: "paid" },
      { label: "Broker dividend", currency: "USD", amount: 260, status: "income" },
      { label: "Mortgage payment", currency: "MXN", amount: -18500, status: "paid" }
    ],
    recommendations: [
      {
        severity: "info",
        title: "MXN balance is stable",
        message: "March closed with enough MXN surplus to keep recurring templates unchanged."
      },
      {
        severity: "warning",
        title: "USD expenses are rising",
        message: "Software subscriptions increased in March. Review USD recurring expenses before April."
      }
    ]
  },
  "2026-04": {
    key: "2026-04",
    label: "April 2026",
    summaries: [
      {
        currency: "MXN",
        income: 126000,
        expenses: 87000,
        balance: 39000,
        investments: 298000,
        debts: 938000,
        debtPaymentRatio: 23
      },
      {
        currency: "USD",
        income: 8100,
        expenses: 6350,
        balance: 1750,
        investments: 47000,
        debts: 13000,
        debtPaymentRatio: 13
      }
    ],
    cashflow: [
      { month: "Dec", MXNIncome: 118000, MXNExpenses: 90000, USDIncome: 7100, USDExpenses: 5600 },
      { month: "Jan", MXNIncome: 116000, MXNExpenses: 79000, USDIncome: 7200, USDExpenses: 5400 },
      { month: "Feb", MXNIncome: 121000, MXNExpenses: 83000, USDIncome: 7600, USDExpenses: 5900 },
      { month: "Mar", MXNIncome: 124000, MXNExpenses: 81500, USDIncome: 7800, USDExpenses: 5700 },
      { month: "Apr", MXNIncome: 126000, MXNExpenses: 87000, USDIncome: 8100, USDExpenses: 6350 }
    ],
    investmentTrend: [
      { month: "Dec", MXN: 246000, USD: 41400 },
      { month: "Jan", MXN: 260000, USD: 43000 },
      { month: "Feb", MXN: 272000, USD: 44100 },
      { month: "Mar", MXN: 286000, USD: 45600 },
      { month: "Apr", MXN: 298000, USD: 47000 }
    ],
    recentActivity: [
      { label: "Quarterly maintenance", currency: "MXN", amount: -12800, status: "paid" },
      { label: "Consulting invoice", currency: "USD", amount: 3900, status: "income" },
      { label: "Broker contribution", currency: "USD", amount: -1000, status: "investment" },
      { label: "Utilities bundle", currency: "MXN", amount: -4300, status: "paid" }
    ],
    recommendations: [
      {
        severity: "warning",
        title: "MXN expenses increased",
        message: "April maintenance created a temporary spike. Compare categories before copying budgets to May."
      },
      {
        severity: "info",
        title: "Debt reduction is on track",
        message: "MXN debt balance decreased while payments stayed under the 25% income threshold."
      }
    ]
  },
  "2026-05": {
    key: "2026-05",
    label: "May 2026",
    summaries: [
      {
        currency: "MXN",
        income: 128000,
        expenses: 84200,
        balance: 43800,
        investments: 310000,
        debts: 925000,
        debtPaymentRatio: 24
      },
      {
        currency: "USD",
        income: 8200,
        expenses: 6100,
        balance: 2100,
        investments: 48500,
        debts: 12200,
        debtPaymentRatio: 12
      }
    ],
    cashflow: [
      { month: "Jan", MXNIncome: 116000, MXNExpenses: 79000, USDIncome: 7200, USDExpenses: 5400 },
      { month: "Feb", MXNIncome: 121000, MXNExpenses: 83000, USDIncome: 7600, USDExpenses: 5900 },
      { month: "Mar", MXNIncome: 124000, MXNExpenses: 81500, USDIncome: 7800, USDExpenses: 5700 },
      { month: "Apr", MXNIncome: 126000, MXNExpenses: 87000, USDIncome: 8100, USDExpenses: 6350 },
      { month: "May", MXNIncome: 128000, MXNExpenses: 84200, USDIncome: 8200, USDExpenses: 6100 }
    ],
    investmentTrend: [
      { month: "Jan", MXN: 260000, USD: 43000 },
      { month: "Feb", MXN: 272000, USD: 44100 },
      { month: "Mar", MXN: 286000, USD: 45600 },
      { month: "Apr", MXN: 298000, USD: 47000 },
      { month: "May", MXN: 310000, USD: 48500 }
    ],
    recentActivity: [
      { label: "Salary deposited", currency: "MXN", amount: 82000, status: "income" },
      { label: "Rent paid", currency: "MXN", amount: -27500, status: "paid" },
      { label: "Broker contribution", currency: "USD", amount: -1200, status: "investment" },
      { label: "Credit card partial payment", currency: "MXN", amount: -9100, status: "partial" }
    ],
    recommendations: [
      {
        severity: "warning",
        title: "MXN expenses rose 5.9%",
        message: "Maintenance and shopping are above the previous month. Review recurring templates before June."
      },
      {
        severity: "info",
        title: "USD balance remains positive",
        message: "You can allocate up to $900 USD without crossing the target emergency threshold."
      },
      {
        severity: "critical",
        title: "Debt payments near threshold",
        message: "MXN debt payments are 24% of monthly income. Keep the safe limit under 25%."
      }
    ]
  },
  "2026-06": {
    key: "2026-06",
    label: "June 2026",
    summaries: [
      {
        currency: "MXN",
        income: 132000,
        expenses: 91200,
        balance: 40800,
        investments: 322500,
        debts: 912000,
        debtPaymentRatio: 25
      },
      {
        currency: "USD",
        income: 7600,
        expenses: 8300,
        balance: -700,
        investments: 49200,
        debts: 11400,
        debtPaymentRatio: 14
      }
    ],
    cashflow: [
      { month: "Feb", MXNIncome: 121000, MXNExpenses: 83000, USDIncome: 7600, USDExpenses: 5900 },
      { month: "Mar", MXNIncome: 124000, MXNExpenses: 81500, USDIncome: 7800, USDExpenses: 5700 },
      { month: "Apr", MXNIncome: 126000, MXNExpenses: 87000, USDIncome: 8100, USDExpenses: 6350 },
      { month: "May", MXNIncome: 128000, MXNExpenses: 84200, USDIncome: 8200, USDExpenses: 6100 },
      { month: "Jun", MXNIncome: 132000, MXNExpenses: 91200, USDIncome: 7600, USDExpenses: 8300 }
    ],
    investmentTrend: [
      { month: "Feb", MXN: 272000, USD: 44100 },
      { month: "Mar", MXN: 286000, USD: 45600 },
      { month: "Apr", MXN: 298000, USD: 47000 },
      { month: "May", MXN: 310000, USD: 48500 },
      { month: "Jun", MXN: 322500, USD: 49200 }
    ],
    recentActivity: [
      { label: "Annual insurance", currency: "USD", amount: -2200, status: "paid" },
      { label: "Salary deposited", currency: "MXN", amount: 84000, status: "income" },
      { label: "Emergency fund transfer", currency: "MXN", amount: -12000, status: "investment" },
      { label: "Cloud tools renewal", currency: "USD", amount: -890, status: "paid" }
    ],
    recommendations: [
      {
        severity: "critical",
        title: "USD balance is negative",
        message: "June USD expenses exceed income. Move non-essential USD payments or add income before month-end."
      },
      {
        severity: "warning",
        title: "MXN debt ratio reached 25%",
        message: "Debt payments are at the safe threshold. Avoid new financing this month."
      }
    ]
  }
};

export function getDashboardMonthData(
  monthKey?: string,
  locale: Locale = "es"
): DashboardMonthData {
  const data = monthKey && dashboardMonths[monthKey] ? dashboardMonths[monthKey] : dashboardMonths["2026-05"];

  if (locale === "en") {
    return data;
  }

  return {
    ...data,
    label: monthLabelsEs[data.key] ?? data.label,
    recentActivity: data.recentActivity.map((activity) => ({
      ...activity,
      label: spanishActivityLabels[activity.label] ?? activity.label
    })),
    recommendations: data.recommendations.map((recommendation) => ({
      ...recommendation,
      ...(spanishRecommendations[recommendation.title] ?? {})
    }))
  };
}
import type { Locale } from "@/lib/i18n";
