import { IncomeForm } from "@/modules/income/components/income-form";
import { DataTable } from "@/shared/components/data-table";
import { ModulePage } from "@/shared/components/module-page";

export default function IncomePage() {
  return (
    <ModulePage
      title="Ingresos"
      description="Registra ingresos mensuales por categoría y moneda sin conversión."
    >
      <div className="flex flex-col gap-6">
        <IncomeForm />
        <DataTable
          rows={[
            { name: "Salario", type: "salario", currency: "MXN", amount: "$82,000", status: "recurrente" },
            { name: "Consultoría", type: "ingreso extra", currency: "USD", amount: "$4,800", status: "recibido" }
          ]}
        />
      </div>
    </ModulePage>
  );
}
