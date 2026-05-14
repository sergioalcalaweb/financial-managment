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
  category: z.string().min(2),
  subcategory: z.string().optional(),
  currency: currencySchema,
  expectedAmount: z.coerce.number().positive(),
  actualAmount: z.coerce.number().min(0),
  dueDate: z.string().min(1),
  paymentDate: z.string().optional(),
  status: z.enum(["pending", "paid", "partial", "overdue"]),
  recurring: z.coerce.boolean().default(false),
  paymentMethod: z.string().optional(),
  comments: z.string().optional()
});
