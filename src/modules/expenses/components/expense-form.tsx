"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { expenseSchema } from "@/lib/validations";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

type ExpenseFormInput = z.input<typeof expenseSchema>;
type ExpenseFormOutput = z.output<typeof expenseSchema>;

export function ExpenseForm() {
  const form = useForm<ExpenseFormInput, unknown, ExpenseFormOutput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      currency: "MXN",
      amount: 0,
      expenseDate: "2026-05-13",
      recurring: false
    }
  });

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={form.handleSubmit(() => form.reset())}
    >
      <label className="flex flex-col gap-2 text-sm font-medium">
        Nombre
        <Input {...form.register("name")} placeholder="Renta, AWS, pago de tarjeta" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Moneda
        <Select {...form.register("currency")}>
          <option value="MXN">MXN</option>
          <option value="USD">USD</option>
        </Select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Monto
        <Input {...form.register("amount")} type="number" min="0" step="0.01" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Fecha de gasto
        <Input {...form.register("expenseDate")} type="date" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
        Comentarios
        <Textarea {...form.register("comments")} placeholder="Notas opcionales" />
      </label>
      <div className="md:col-span-2">
        <Button type="submit">Capturar gasto</Button>
      </div>
    </form>
  );
}
