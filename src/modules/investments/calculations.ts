export type SnapshotCalculationInput = {
  amountAtStartOfMonth: number;
  contributionAmount: number;
  withdrawalAmount: number;
  amountAtEndOfMonth: number;
  previousAccumulatedProfit: number;
};

export function calculateInvestmentSnapshot(input: SnapshotCalculationInput) {
  const netCapitalMovement = input.contributionAmount - input.withdrawalAmount;
  const profitGeneratedThisMonth =
    input.amountAtEndOfMonth - input.amountAtStartOfMonth - netCapitalMovement;
  const accumulatedProfitUntilThisMonth =
    input.previousAccumulatedProfit + profitGeneratedThisMonth;
  const performanceBase = input.amountAtStartOfMonth + input.contributionAmount;
  const performancePercentage =
    performanceBase > 0 ? (profitGeneratedThisMonth / performanceBase) * 100 : 0;

  return {
    profitGeneratedThisMonth,
    accumulatedProfitUntilThisMonth,
    performancePercentage
  };
}

export function assertImmutableSnapshot(existingSnapshotId?: string) {
  if (existingSnapshotId) {
    throw new Error("Investment monthly snapshots are immutable and must not be overwritten.");
  }
}
