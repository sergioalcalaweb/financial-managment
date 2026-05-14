"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { incomeSchema } from "@/lib/validations";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";

type IncomeFormInput = z.input<typeof incomeSchema>;
type IncomeFormOutput = z.output<typeof incomeSchema>;

export function IncomeForm() {
  const form = useForm<IncomeFormInput, unknown, IncomeFormOutput>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      name: "",
      category: "salary",
      currency: "MXN",
      amount: 0,
      date: "2026-05-13",
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
        <Input {...form.register("name")} placeholder="Salario, renta, negocio" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        Categoría
        <Select {...form.register("category")}>
          <option value="salary">Salario</option>
          <option value="investment profits">Ganancias de inversión</option>
          <option value="side income">Ingreso extra</option>
          <option value="rental income">Rentas</option>
          <option value="business income">Negocio</option>
          <option value="others">Otros</option>
        </Select>
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
        Fecha
        <Input {...form.register("date")} type="date" />
      </label>
      <div className="md:col-span-2">
        <Button type="submit">Capturar ingreso</Button>
      </div>
    </form>
  );
}
