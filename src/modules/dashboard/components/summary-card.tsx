import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import type { FinancialSummary } from "../data";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";

export function SummaryCard({
  labels,
  summary
}: {
  labels: {
    monthlyBalance: string;
    income: string;
    expenses: string;
    investments: string;
    debts: string;
    debtPaymentRatio: string;
  };
  summary: FinancialSummary;
}) {
  const positive = summary.balance >= 0;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{summary.currency}</CardTitle>
        <div className="rounded-md bg-muted p-2">
          {positive ? <ArrowUpRight /> : <ArrowDownRight />}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{labels.monthlyBalance}</p>
          <p className="text-2xl font-semibold">
            {formatMoney(summary.balance, summary.currency)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">{labels.income}</p>
            <p className="font-medium">{formatMoney(summary.income, summary.currency)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{labels.expenses}</p>
            <p className="font-medium">{formatMoney(summary.expenses, summary.currency)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{labels.investments}</p>
            <p className="font-medium">{formatMoney(summary.investments, summary.currency)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{labels.debts}</p>
            <p className="font-medium">{formatMoney(summary.debts, summary.currency)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{labels.debtPaymentRatio}</span>
            <span>{summary.debtPaymentRatio}%</span>
          </div>
          <Progress value={summary.debtPaymentRatio} />
        </div>
      </CardContent>
    </Card>
  );
}
