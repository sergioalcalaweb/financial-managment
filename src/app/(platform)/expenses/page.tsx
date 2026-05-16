import { ExpenseForm } from "@/modules/expenses/components/expense-form";
import { ModulePage } from "@/shared/components/module-page";

const expenses = [
  { name: "Renta", currency: "MXN", amount: "$27,500", expenseDate: "2026-05-01" },
  { name: "Herramientas cloud", currency: "USD", amount: "$320", expenseDate: "2026-05-08" },
  { name: "Tarjeta de crédito", currency: "MXN", amount: "$9,100", expenseDate: "2026-05-13" }
];

export default function ExpensesPage() {
  return (
    <ModulePage
      title="Gastos"
      description="Captura gastos por moneda, monto y fecha de gasto."
    >
      <div className="flex flex-col gap-6">
        <ExpenseForm />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Nombre</th>
                <th className="py-3 pr-4 font-medium">Moneda</th>
                <th className="py-3 pr-4 font-medium">Monto</th>
                <th className="py-3 pr-4 font-medium">Fecha de gasto</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={`${expense.name}-${expense.currency}`} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{expense.name}</td>
                  <td className="py-3 pr-4">{expense.currency}</td>
                  <td className="py-3 pr-4">{expense.amount}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{expense.expenseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModulePage>
  );
}
