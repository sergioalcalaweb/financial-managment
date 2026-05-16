"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { investmentAccountSchema } from "@/lib/validations";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";

type InvestmentAccountInput = z.input<typeof investmentAccountSchema>;
type InvestmentAccountOutput = z.output<typeof investmentAccountSchema>;

export function InvestmentAccountModal() {
  const [open, setOpen] = useState(false);
  const [createdAccount, setCreatedAccount] = useState<InvestmentAccountOutput | null>(null);
  const form = useForm<InvestmentAccountInput, unknown, InvestmentAccountOutput>({
    resolver: zodResolver(investmentAccountSchema),
    defaultValues: {
      name: "",
      institution: "",
      currency: "MXN",
      type: "fixed_income",
      initialAmount: 0,
      startDate: "2026-05-15",
      isActive: true
    }
  });

  return (
    <>
      <Button onClick={() => setOpen(true)} type="button">
        <Plus data-icon="inline-start" />
        Nueva inversión
      </Button>

      {open ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4"
          role="dialog"
        >
          <Card className="max-h-[92vh] w-full max-w-2xl overflow-y-auto">
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Agregar inversión</CardTitle>
                <CardDescription>
                  Registra la información permanente de la cuenta. Los snapshots
                  mensuales se capturan por separado para preservar el historial.
                </CardDescription>
              </div>
              <Button
                aria-label="Cerrar modal"
                onClick={() => setOpen(false)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X />
              </Button>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={form.handleSubmit((values) => {
                  setCreatedAccount(values);
                  form.reset();
                  setOpen(false);
                })}
              >
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Nombre
                  <Input {...form.register("name")} placeholder="GBM Plus" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Institución
                  <Input {...form.register("institution")} placeholder="GBM, IBKR, banco" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Moneda
                  <Select {...form.register("currency")}>
                    <option value="MXN">MXN</option>
                    <option value="USD">USD</option>
                  </Select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Tipo
                  <Select {...form.register("type")}>
                    <option value="fixed_income">Renta fija</option>
                    <option value="stocks">Acciones</option>
                    <option value="crypto">Crypto</option>
                    <option value="savings">Ahorro</option>
                    <option value="other">Otro</option>
                  </Select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Monto inicial
                  <Input
                    {...form.register("initialAmount")}
                    min="0"
                    step="0.01"
                    type="number"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Fecha de inicio
                  <Input {...form.register("startDate")} type="date" />
                </label>
                <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
                  <input
                    className="size-4 accent-primary"
                    type="checkbox"
                    {...form.register("isActive")}
                  />
                  Cuenta activa
                </label>
                <div className="flex justify-end gap-2 md:col-span-2">
                  <Button onClick={() => setOpen(false)} type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar inversión</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {createdAccount ? (
        <p className="text-sm text-muted-foreground">
          Inversión preparada: {createdAccount.name} ({createdAccount.currency}).
        </p>
      ) : null}
    </>
  );
}
