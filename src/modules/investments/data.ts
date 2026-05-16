import type {
  InvestmentAccountRecord,
  InvestmentMonthlySnapshotRecord
} from "./types";

export const investmentAccounts: InvestmentAccountRecord[] = [
  {
    id: "gbm-plus-mxn",
    name: "GBM Plus",
    institution: "GBM",
    currency: "MXN",
    type: "stocks",
    initialAmount: 250000,
    startDate: "2025-11-01",
    isActive: true
  },
  {
    id: "cetes-mxn",
    name: "CETES Directo",
    institution: "CETES Directo",
    currency: "MXN",
    type: "fixed_income",
    initialAmount: 100000,
    startDate: "2026-01-01",
    isActive: true
  },
  {
    id: "ibkr-usd",
    name: "Interactive Brokers",
    institution: "IBKR",
    currency: "USD",
    type: "stocks",
    initialAmount: 42000,
    startDate: "2025-10-01",
    isActive: true
  },
  {
    id: "crypto-usd",
    name: "Crypto Vault",
    institution: "Coinbase",
    currency: "USD",
    type: "crypto",
    initialAmount: 6500,
    startDate: "2026-02-01",
    isActive: true
  }
];

export const investmentSnapshots: InvestmentMonthlySnapshotRecord[] = [
  {
    id: "gbm-2026-03",
    investmentAccountId: "gbm-plus-mxn",
    financialMonthId: "2026-03",
    monthLabel: "Mar 2026",
    amountAtStartOfMonth: 272000,
    contributionAmount: 8000,
    withdrawalAmount: 0,
    amountAtEndOfMonth: 286000,
    profitGeneratedThisMonth: 6000,
    accumulatedProfitUntilThisMonth: 28000,
    performancePercentage: 2.14,
    notes: "Equity rebound after February volatility."
  },
  {
    id: "gbm-2026-04",
    investmentAccountId: "gbm-plus-mxn",
    financialMonthId: "2026-04",
    monthLabel: "Apr 2026",
    amountAtStartOfMonth: 286000,
    contributionAmount: 8000,
    withdrawalAmount: 0,
    amountAtEndOfMonth: 298000,
    profitGeneratedThisMonth: 4000,
    accumulatedProfitUntilThisMonth: 32000,
    performancePercentage: 1.36
  },
  {
    id: "gbm-2026-05",
    investmentAccountId: "gbm-plus-mxn",
    financialMonthId: "2026-05",
    monthLabel: "May 2026",
    amountAtStartOfMonth: 298000,
    contributionAmount: 8000,
    withdrawalAmount: 0,
    amountAtEndOfMonth: 310000,
    profitGeneratedThisMonth: 4000,
    accumulatedProfitUntilThisMonth: 36000,
    performancePercentage: 1.31
  },
  {
    id: "cetes-2026-05",
    investmentAccountId: "cetes-mxn",
    financialMonthId: "2026-05",
    monthLabel: "May 2026",
    amountAtStartOfMonth: 98500,
    contributionAmount: 5000,
    withdrawalAmount: 0,
    amountAtEndOfMonth: 104350,
    profitGeneratedThisMonth: 850,
    accumulatedProfitUntilThisMonth: 4350,
    performancePercentage: 0.82
  },
  {
    id: "ibkr-2026-03",
    investmentAccountId: "ibkr-usd",
    financialMonthId: "2026-03",
    monthLabel: "Mar 2026",
    amountAtStartOfMonth: 44100,
    contributionAmount: 1000,
    withdrawalAmount: 0,
    amountAtEndOfMonth: 45600,
    profitGeneratedThisMonth: 500,
    accumulatedProfitUntilThisMonth: 3600,
    performancePercentage: 1.11
  },
  {
    id: "ibkr-2026-04",
    investmentAccountId: "ibkr-usd",
    financialMonthId: "2026-04",
    monthLabel: "Apr 2026",
    amountAtStartOfMonth: 45600,
    contributionAmount: 1000,
    withdrawalAmount: 0,
    amountAtEndOfMonth: 47000,
    profitGeneratedThisMonth: 400,
    accumulatedProfitUntilThisMonth: 4000,
    performancePercentage: 0.86
  },
  {
    id: "ibkr-2026-05",
    investmentAccountId: "ibkr-usd",
    financialMonthId: "2026-05",
    monthLabel: "May 2026",
    amountAtStartOfMonth: 47000,
    contributionAmount: 1200,
    withdrawalAmount: 0,
    amountAtEndOfMonth: 48500,
    profitGeneratedThisMonth: 300,
    accumulatedProfitUntilThisMonth: 4300,
    performancePercentage: 0.62
  },
  {
    id: "crypto-2026-05",
    investmentAccountId: "crypto-usd",
    financialMonthId: "2026-05",
    monthLabel: "May 2026",
    amountAtStartOfMonth: 6900,
    contributionAmount: 0,
    withdrawalAmount: 500,
    amountAtEndOfMonth: 6150,
    profitGeneratedThisMonth: -250,
    accumulatedProfitUntilThisMonth: -350,
    performancePercentage: -3.62
  }
];

export function getInvestmentHistoryByCurrency() {
  return investmentSnapshots.reduce<Record<string, { month: string; MXN: number; USD: number }>>(
    (history, snapshot) => {
      const account = investmentAccounts.find(
        (item) => item.id === snapshot.investmentAccountId
      );
      if (!account) {
        return history;
      }

      history[snapshot.financialMonthId] ??= {
        month: snapshot.monthLabel,
        MXN: 0,
        USD: 0
      };
      history[snapshot.financialMonthId][account.currency] += snapshot.amountAtEndOfMonth;
      return history;
    },
    {}
  );
}
