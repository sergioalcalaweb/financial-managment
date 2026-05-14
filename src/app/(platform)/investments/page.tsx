import { TrendingUp } from "lucide-react";
import { DataTable } from "@/shared/components/data-table";
import { ModulePage } from "@/shared/components/module-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function InvestmentsPage() {
  return (
    <ModulePage
      title="Inversiones"
      description="Monitorea cuentas y reportes mensuales por moneda, incluyendo aportaciones, retiros, ganancias y rendimiento."
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp />
              Reporte mensual
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <div className="flex justify-between"><span>Inversión inicial</span><strong>$298,000 MXN</strong></div>
            <div className="flex justify-between"><span>Aportación</span><strong>$8,000 MXN</strong></div>
            <div className="flex justify-between"><span>Ganancia por intereses</span><strong>$4,000 MXN</strong></div>
            <div className="flex justify-between"><span>Rendimiento</span><strong>1.34%</strong></div>
          </CardContent>
        </Card>
        <DataTable
          rows={[
            { name: "GBM Plus", type: "broker", currency: "MXN", amount: "$310,000", status: "activo" },
            { name: "Interactive Brokers", type: "broker", currency: "USD", amount: "$48,500", status: "activo" }
          ]}
        />
      </div>
    </ModulePage>
  );
}
