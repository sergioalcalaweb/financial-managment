import { DataTable } from "@/shared/components/data-table";
import { ModulePage } from "@/shared/components/module-page";

export default function DebtsPage() {
  return (
    <ModulePage
      title="Deudas"
      description="Gestiona hipotecas, préstamos, financiamientos y acuerdos de forma independiente a los gastos."
    >
      <DataTable
        rows={[
          { name: "Hipoteca", type: "hipoteca", currency: "MXN", amount: "$925,000", status: "activo" },
          { name: "Financiamiento auto", type: "financiamiento", currency: "USD", amount: "$12,200", status: "activo" }
        ]}
      />
    </ModulePage>
  );
}
