-- Simplify expenses to use a single amount and expense date.
DROP INDEX IF EXISTS "Expense_userId_monthId_currency_status_idx";

ALTER TABLE "Expense" RENAME COLUMN "expectedAmount" TO "amount";
ALTER TABLE "Expense" RENAME COLUMN "dueDate" TO "expenseDate";
ALTER TABLE "Expense"
  DROP COLUMN "category",
  DROP COLUMN "subcategory",
  DROP COLUMN "actualAmount",
  DROP COLUMN "paymentDate",
  DROP COLUMN "status",
  DROP COLUMN "paymentMethod";

CREATE INDEX "Expense_userId_monthId_currency_idx" ON "Expense"("userId", "monthId", "currency");

ALTER TABLE "ExpenseTemplate" RENAME COLUMN "expectedAmount" TO "amount";
ALTER TABLE "ExpenseTemplate"
  DROP COLUMN "category",
  DROP COLUMN "subcategory",
  DROP COLUMN "paymentMethod";

DROP TYPE IF EXISTS "ExpenseStatus";
