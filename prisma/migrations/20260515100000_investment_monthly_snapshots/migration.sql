-- Add permanent investment account metadata and immutable monthly snapshots.
CREATE TYPE "InvestmentType" AS ENUM ('FIXED_INCOME', 'STOCKS', 'CRYPTO', 'SAVINGS', 'OTHER');

ALTER TABLE "InvestmentAccount" ADD COLUMN "type" "InvestmentType" NOT NULL DEFAULT 'OTHER';
ALTER TABLE "InvestmentAccount" ADD COLUMN "initialAmount" DECIMAL(14,2) NOT NULL DEFAULT 0;
ALTER TABLE "InvestmentAccount" ADD COLUMN "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "InvestmentAccount" RENAME COLUMN "active" TO "isActive";
ALTER TABLE "InvestmentAccount" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "InvestmentAccount" ALTER COLUMN "initialAmount" DROP DEFAULT;
ALTER TABLE "InvestmentAccount" ALTER COLUMN "startDate" DROP DEFAULT;

DROP INDEX IF EXISTS "InvestmentAccount_userId_currency_active_idx";
CREATE INDEX "InvestmentAccount_userId_currency_isActive_idx" ON "InvestmentAccount"("userId", "currency", "isActive");
CREATE INDEX "InvestmentAccount_userId_type_idx" ON "InvestmentAccount"("userId", "type");

ALTER TABLE "MonthlyInvestmentReport" RENAME TO "InvestmentMonthlySnapshot";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "accountId" TO "investmentAccountId";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "monthId" TO "financialMonthId";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "initialInvestmentAmount" TO "amountAtStartOfMonth";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "monthlyContribution" TO "contributionAmount";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "monthlyWithdrawal" TO "withdrawalAmount";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "finalInvestmentAmount" TO "amountAtEndOfMonth";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "monthlyInterestProfit" TO "profitGeneratedThisMonth";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "accumulatedProfit" TO "accumulatedProfitUntilThisMonth";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME COLUMN "comments" TO "notes";

ALTER TABLE "InvestmentMonthlySnapshot" RENAME CONSTRAINT "MonthlyInvestmentReport_pkey" TO "InvestmentMonthlySnapshot_pkey";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME CONSTRAINT "MonthlyInvestmentReport_accountId_fkey" TO "InvestmentMonthlySnapshot_investmentAccountId_fkey";
ALTER TABLE "InvestmentMonthlySnapshot" RENAME CONSTRAINT "MonthlyInvestmentReport_monthId_fkey" TO "InvestmentMonthlySnapshot_financialMonthId_fkey";

ALTER INDEX "MonthlyInvestmentReport_accountId_monthId_key" RENAME TO "InvestmentMonthlySnapshot_investmentAccountId_financialMonthId_key";
CREATE INDEX "InvestmentMonthlySnapshot_financialMonthId_idx" ON "InvestmentMonthlySnapshot"("financialMonthId");
CREATE INDEX "InvestmentMonthlySnapshot_investmentAccountId_createdAt_idx" ON "InvestmentMonthlySnapshot"("investmentAccountId", "createdAt");
