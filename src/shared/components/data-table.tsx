import { Badge } from "@/shared/components/ui/badge";

export type TableRow = {
  name: string;
  type: string;
  currency: "MXN" | "USD";
  amount: string;
  status: string;
};

const defaultLabels = {
  name: "Nombre",
  type: "Tipo",
  currency: "Moneda",
  amount: "Monto",
  status: "Estado"
};

export function DataTable({
  labels = defaultLabels,
  rows
}: {
  labels?: typeof defaultLabels;
  rows: TableRow[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="py-3 pr-4 font-medium">{labels.name}</th>
            <th className="py-3 pr-4 font-medium">{labels.type}</th>
            <th className="py-3 pr-4 font-medium">{labels.currency}</th>
            <th className="py-3 pr-4 font-medium">{labels.amount}</th>
            <th className="py-3 pr-4 font-medium">{labels.status}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.name}-${row.currency}`} className="border-b last:border-0">
              <td className="py-3 pr-4 font-medium">{row.name}</td>
              <td className="py-3 pr-4 text-muted-foreground">{row.type}</td>
              <td className="py-3 pr-4">{row.currency}</td>
              <td className="py-3 pr-4">{row.amount}</td>
              <td className="py-3 pr-4">
                <Badge variant="secondary">{row.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
