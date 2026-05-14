import { DataTable } from "@/shared/components/data-table";
import { ModulePage } from "@/shared/components/module-page";

export default function AdminUsersPage() {
  return (
    <ModulePage
      title="Usuarios admin"
      description="Gestiona usuarios, roles, categorías globales, plantillas y acceso a reportes globales."
    >
      <DataTable
        rows={[
          { name: "Admin Demo", type: "ADMIN", currency: "MXN", amount: "N/A", status: "activo" },
          { name: "User Demo", type: "USER", currency: "USD", amount: "N/A", status: "activo" }
        ]}
      />
    </ModulePage>
  );
}
