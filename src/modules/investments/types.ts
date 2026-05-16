import type { Currency } from "@/modules/dashboard/data";

export type InvestmentType = "fixed_income" | "stocks" | "crypto" | "savings" | "other";

export type InvestmentAccountRecord = {
  id: string;
  name: string;
  institution: string;
  currency: Currency;
  type: InvestmentType;
  initialAmount: number;
  startDate: string;
  isActive: boolean;
};

export type InvestmentMonthlySnapshotRecord = {
  id: string;
  investmentAccountId: string;
  financialMonthId: string;
  monthLabel: string;
  amountAtStartOfMonth: number;
  contributionAmount: number;
  withdrawalAmount: number;
  amountAtEndOfMonth: number;
  profitGeneratedThisMonth: number;
  accumulatedProfitUntilThisMonth: number;
  performancePercentage: number;
  notes?: string;
};
