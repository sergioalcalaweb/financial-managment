"use server";

import { prisma } from "@/lib/prisma";
import { investmentMonthlySnapshotSchema } from "@/lib/validations";
import { requireUser } from "@/modules/authentication/session";
import {
  assertImmutableSnapshot,
  calculateInvestmentSnapshot
} from "@/modules/investments/calculations";

export async function createInvestmentMonthlySnapshot(formData: FormData) {
  const user = await requireUser();
  const parsed = investmentMonthlySnapshotSchema.parse(Object.fromEntries(formData));

  const account = await prisma.investmentAccount.findFirstOrThrow({
    where: {
      id: parsed.investmentAccountId,
      userId: user.id
    }
  });

  const existingSnapshot = await prisma.investmentMonthlySnapshot.findUnique({
    where: {
      investmentAccountId_financialMonthId: {
        investmentAccountId: account.id,
        financialMonthId: parsed.financialMonthId
      }
    },
    select: { id: true }
  });

  assertImmutableSnapshot(existingSnapshot?.id);

  const previousSnapshot = await prisma.investmentMonthlySnapshot.findFirst({
    where: {
      investmentAccountId: account.id,
      financialMonthId: {
        not: parsed.financialMonthId
      }
    },
    orderBy: { createdAt: "desc" },
    select: { accumulatedProfitUntilThisMonth: true }
  });

  const calculated = calculateInvestmentSnapshot({
    amountAtStartOfMonth: parsed.amountAtStartOfMonth,
    contributionAmount: parsed.contributionAmount,
    withdrawalAmount: parsed.withdrawalAmount,
    amountAtEndOfMonth: parsed.amountAtEndOfMonth,
    previousAccumulatedProfit:
      Number(previousSnapshot?.accumulatedProfitUntilThisMonth) || 0
  });

  return prisma.investmentMonthlySnapshot.create({
    data: {
      investmentAccountId: account.id,
      financialMonthId: parsed.financialMonthId,
      amountAtStartOfMonth: parsed.amountAtStartOfMonth,
      contributionAmount: parsed.contributionAmount,
      withdrawalAmount: parsed.withdrawalAmount,
      amountAtEndOfMonth: parsed.amountAtEndOfMonth,
      profitGeneratedThisMonth: calculated.profitGeneratedThisMonth,
      accumulatedProfitUntilThisMonth: calculated.accumulatedProfitUntilThisMonth,
      performancePercentage: calculated.performancePercentage,
      notes: parsed.notes
    }
  });
}
