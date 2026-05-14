import { ExpenseForm } from "@/modules/expenses/components/expense-form";
import { DataTable } from "@/shared/components/data-table";
import { ModulePage } from "@/shared/components/module-page";

export default function ExpensesPage() {
  return (
    <ModulePage
      title="Gastos"
      description="Captura montos esperados vs reales, recurrencia, fechas de vencimiento y estado de pago."
    >
      <div className="flex flex-col gap-6">
        <ExpenseForm />
        <DataTable
          rows={[
            { name: "Renta", type: "vivienda", currency: "MXN", amount: "$27,500", status: "pagado" },
            { name: "Herramientas cloud", type: "suscripciones", currency: "USD", amount: "$320", status: "pendiente" },
            { name: "Tarjeta de crédito", type: "pago de deuda", currency: "MXN", amount: "$9,100", status: "parcial" }
          ]}
        />
      </div>
    </ModulePage>
  );
}
