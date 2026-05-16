import { z } from "zod";

export const currencySchema = z.enum(["MXN", "USD"]);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2),
  role: z.enum(["ADMIN", "USER"]).default("USER")
});

export const incomeSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  currency: currencySchema,
  amount: z.coerce.number().positive(),
  date: z.string().min(1),
  recurring: z.coerce.boolean().default(false),
  comments: z.string().optional()
});

export const expenseSchema = z.object({
  name: z.string().min(2),
  currency: currencySchema,
  amount: z.coerce.number().positive(),
  expenseDate: z.string().min(1),
  recurring: z.coerce.boolean().default(false),
  comments: z.string().optional()
});

export const investmentTypeSchema = z.enum([
  "fixed_income",
  "stocks",
  "crypto",
  "savings",
  "other"
]);

export const investmentAccountSchema = z.object({
  name: z.string().min(2),
  institution: z.string().min(2),
  currency: currencySchema,
  type: investmentTypeSchema,
  initialAmount: z.coerce.number().min(0),
  startDate: z.string().min(1),
  isActive: z.coerce.boolean().default(true)
});

export const investmentMonthlySnapshotSchema = z.object({
  investmentAccountId: z.string().min(1),
  financialMonthId: z.string().min(1),
  amountAtStartOfMonth: z.coerce.number().min(0),
  contributionAmount: z.coerce.number().min(0),
  withdrawalAmount: z.coerce.number().min(0),
  amountAtEndOfMonth: z.coerce.number().min(0),
  notes: z.string().optional()
});
