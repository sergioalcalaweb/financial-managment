"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/modules/authentication/session";

export async function createFinancialMonth(year: number, month: number) {
  const user = await requireUser();
  const startsAt = new Date(Date.UTC(year, month - 1, 1));
  const endsAt = new Date(Date.UTC(year, month, 0, 23, 59, 59));
  const label = startsAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });

  return prisma.month.upsert({
    where: {
      userId_year_month: {
        userId: user.id,
        year,
        month
      }
    },
    create: {
      userId: user.id,
      year,
      month,
      label,
      startsAt,
      endsAt
    },
    update: {}
  });
}

export async function generateRecurringExpensesForMonth(year: number, month: number) {
  const user = await requireUser();
  const financialMonth = await createFinancialMonth(year, month);
  const templates = await prisma.expenseTemplate.findMany({
    where: { userId: user.id, active: true }
  });

  await prisma.expense.createMany({
    data: templates.map((template: (typeof templates)[number]) => ({
      userId: user.id,
      monthId: financialMonth.id,
      templateId: template.id,
      name: template.name,
      category: template.category,
      subcategory: template.subcategory,
      currency: template.currency,
      expectedAmount: template.expectedAmount,
      actualAmount: 0,
      dueDate: new Date(Date.UTC(year, month - 1, template.dueDay)),
      status: "PENDING",
      recurring: true,
      paymentMethod: template.paymentMethod,
      comments: template.comments
    })),
    skipDuplicates: true
  });
}
