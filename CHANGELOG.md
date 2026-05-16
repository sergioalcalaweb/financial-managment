# Changelog

## 2026-05-15

### Changed

- Simplified the Expenses module data model and interface:
  - Removed category, status, payment method, and actual amount from expenses.
  - Renamed expected amount to amount.
  - Renamed due date to expense date.
  - Updated recurring expense generation to use the simplified expense shape.

- Updated the Prisma schema and migrations for expenses:
  - Added `Expense.amount`.
  - Added `Expense.expenseDate`.
  - Removed the `ExpenseStatus` enum.
  - Updated `ExpenseTemplate` to use a single `amount`.

### Added

- Added historical investment tracking:
  - Updated `InvestmentAccount` with type, initial amount, start date, and active state.
  - Added immutable `InvestmentMonthlySnapshot` records for monthly investment history.
  - Added monthly profit, accumulated profit, and performance calculation helpers.
  - Added a server action that prevents overwriting existing monthly snapshots.

- Enhanced the Investments interface:
  - Added permanent investment account cards.
  - Added historical monthly snapshot table.
  - Added investment growth chart separated by MXN and USD.
  - Added a modal form to create a new investment account from the Investments page.
