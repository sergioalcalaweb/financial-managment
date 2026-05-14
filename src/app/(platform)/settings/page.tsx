import { DataTable } from "@/shared/components/data-table";
import { ModulePage } from "@/shared/components/module-page";

export default function SettingsPage() {
  return (
    <ModulePage
      title="Configuración"
      description="Configura meses financieros, categorías, plantillas recurrentes y preferencias de usuario."
    >
      <DataTable
        rows={[
          { name: "Plantilla de renta", type: "gasto recurrente", currency: "MXN", amount: "$27,500", status: "activo" },
          { name: "Aportación a broker", type: "inversión recurrente", currency: "USD", amount: "$1,200", status: "activo" }
        ]}
      />
    </ModulePage>
  );
}
