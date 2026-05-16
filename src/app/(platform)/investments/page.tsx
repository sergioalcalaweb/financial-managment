import { TrendingUp } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { InvestmentAccountModal } from "@/modules/investments/components/investment-account-modal";
import { InvestmentHistoryChart } from "@/modules/investments/components/investment-history-chart";
import {
  getInvestmentHistoryByCurrency,
  investmentAccounts,
  investmentSnapshots
} from "@/modules/investments/data";
import { ModulePage } from "@/shared/components/module-page";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

const typeLabels = {
  fixed_income: "Renta fija",
  stocks: "Acciones",
  crypto: "Crypto",
  savings: "Ahorro",
  other: "Otro"
};

export default function InvestmentsPage() {
  const history = Object.values(getInvestmentHistoryByCurrency());
  const latestSnapshots = investmentSnapshots.filter(
    (snapshot) => snapshot.financialMonthId === "2026-05"
  );

  return (
    <ModulePage
      title="Inversiones"
      description="Monitorea cuentas permanentes y snapshots históricos mensuales por moneda, sin conversión automática."
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Cuentas de inversión</h3>
            <p className="text-sm text-muted-foreground">
              Da de alta cuentas permanentes en MXN o USD sin conversión automática.
            </p>
          </div>
          <div className="flex justify-end">
            <InvestmentAccountModal />
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-2">
          {investmentAccounts.map((account) => (
            <Card key={account.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp />
                      {account.name}
                    </CardTitle>
                    <CardDescription>{account.institution}</CardDescription>
                  </div>
                  <Badge variant="secondary">{account.currency}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo</span>
                  <strong>{typeLabels[account.type]}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto inicial</span>
                  <strong>{formatMoney(account.initialAmount, account.currency)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha de inicio</span>
                  <strong>{account.startDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado</span>
                  <strong>{account.isActive ? "Activa" : "Inactiva"}</strong>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <InvestmentHistoryChart data={history} />

        <Card>
          <CardHeader>
            <CardTitle>Snapshots mensuales históricos</CardTitle>
            <CardDescription>
              Cada snapshot mensual es inmutable y conserva aportaciones, retiros,
              utilidad, acumulado y rendimiento para analítica futura.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="py-3 pr-4 font-medium">Cuenta</th>
                    <th className="py-3 pr-4 font-medium">Mes</th>
                    <th className="py-3 pr-4 font-medium">Inicio</th>
                    <th className="py-3 pr-4 font-medium">Aportación</th>
                    <th className="py-3 pr-4 font-medium">Retiro</th>
                    <th className="py-3 pr-4 font-medium">Cierre</th>
                    <th className="py-3 pr-4 font-medium">Utilidad mensual</th>
                    <th className="py-3 pr-4 font-medium">Utilidad acumulada</th>
                    <th className="py-3 pr-4 font-medium">Rendimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {latestSnapshots.map((snapshot) => {
                    const account = investmentAccounts.find(
                      (item) => item.id === snapshot.investmentAccountId
                    );

                    if (!account) {
                      return null;
                    }

                    return (
                      <tr key={snapshot.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{account.name}</td>
                        <td className="py-3 pr-4">{snapshot.monthLabel}</td>
                        <td className="py-3 pr-4">
                          {formatMoney(snapshot.amountAtStartOfMonth, account.currency)}
                        </td>
                        <td className="py-3 pr-4">
                          {formatMoney(snapshot.contributionAmount, account.currency)}
                        </td>
                        <td className="py-3 pr-4">
                          {formatMoney(snapshot.withdrawalAmount, account.currency)}
                        </td>
                        <td className="py-3 pr-4">
                          {formatMoney(snapshot.amountAtEndOfMonth, account.currency)}
                        </td>
                        <td className="py-3 pr-4">
                          {formatMoney(snapshot.profitGeneratedThisMonth, account.currency)}
                        </td>
                        <td className="py-3 pr-4">
                          {formatMoney(snapshot.accumulatedProfitUntilThisMonth, account.currency)}
                        </td>
                        <td className="py-3 pr-4">
                          {snapshot.performancePercentage.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
