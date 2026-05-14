export type Locale = "es" | "en";

export function getLocale(value?: string): Locale {
  return value === "en" ? "en" : "es";
}

export const translations = {
  es: {
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
    nav: {
      dashboard: "Panel",
      income: "Ingresos",
      expenses: "Gastos",
      investments: "Inversiones",
      debts: "Deudas",
      reports: "Reportes",
      settings: "Configuración",
      admin: "Admin"
    },
    shell: {
      separatedFlows: "MXN / USD separados",
      financialMonth: "Mes financiero",
      quickAdd: "Agregar",
      logout: "Cerrar sesión",
      userName: "Usuario financiero",
      securedSession: "sesión segura"
    },
    dashboard: {
      selectedMonthCopy: "El panel carga la información del mes financiero seleccionado.",
      recentActivity: "Actividad reciente",
      recentActivityDescription: "Últimos movimientos en flujos separados por moneda.",
      recommendations: "Recomendaciones",
      recommendationsDescription: "Insights basados en reglas para este mes.",
      selectFinancialMonth: "Seleccionar mes financiero",
      incomeVsExpenses: "Ingresos vs gastos",
      investmentTrend: "Tendencia de inversiones"
    },
    summary: {
      monthlyBalance: "Balance mensual",
      income: "Ingresos",
      expenses: "Gastos",
      investments: "Inversiones",
      debts: "Deudas",
      debtPaymentRatio: "Ratio de pago de deuda"
    },
    table: {
      name: "Nombre",
      type: "Tipo",
      currency: "Moneda",
      amount: "Monto",
      status: "Estado"
    },
    status: {
      active: "activo",
      income: "ingreso",
      investment: "inversión",
      paid: "pagado",
      pending: "pendiente",
      partial: "parcial",
      recurring: "recurrente",
      received: "recibido"
    },
    severity: {
      info: "info",
      warning: "alerta",
      critical: "crítico"
    }
  },
  en: {
    language: "Language",
    spanish: "Spanish",
    english: "English",
    nav: {
      dashboard: "Dashboard",
      income: "Income",
      expenses: "Expenses",
      investments: "Investments",
      debts: "Debts",
      reports: "Reports",
      settings: "Settings",
      admin: "Admin"
    },
    shell: {
      separatedFlows: "MXN / USD separated",
      financialMonth: "Financial month",
      quickAdd: "Quick add",
      logout: "Logout",
      userName: "Finance User",
      securedSession: "secured session"
    },
    dashboard: {
      selectedMonthCopy: "Dashboard data is loaded for the selected financial month.",
      recentActivity: "Recent activity",
      recentActivityDescription: "Latest movements in separated currency flows.",
      recommendations: "Recommendations",
      recommendationsDescription: "Rules-based insights for this month.",
      selectFinancialMonth: "Select financial month",
      incomeVsExpenses: "Income vs expenses",
      investmentTrend: "Investment trend"
    },
    summary: {
      monthlyBalance: "Monthly balance",
      income: "Income",
      expenses: "Expenses",
      investments: "Investments",
      debts: "Debts",
      debtPaymentRatio: "Debt payment ratio"
    },
    table: {
      name: "Name",
      type: "Type",
      currency: "Currency",
      amount: "Amount",
      status: "Status"
    },
    status: {
      active: "active",
      income: "income",
      investment: "investment",
      paid: "paid",
      pending: "pending",
      partial: "partial",
      recurring: "recurring",
      received: "received"
    },
    severity: {
      info: "info",
      warning: "warning",
      critical: "critical"
    }
  }
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}
