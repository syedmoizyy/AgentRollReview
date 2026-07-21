export type AnalyticsReviewRecord = {
  id: string;
  reviewReadyAt?: string;
  decidedAt?: string;
  gates: { status: "PASSED" | "FAILED" | "INSUFFICIENT_EVIDENCE" }[];
  failures: { severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"; status: "OPEN" | "MITIGATING" | "RESOLVED" }[];
  reviewerPositions: ("APPROVE" | "REJECT" | "ABSTAIN")[];
  requiredEvidenceItems: number;
  completeEvidenceItems: number;
  outcome?: "SHIP" | "INVESTIGATE" | "BLOCK";
};

export type AnalyticsSummary = ReturnType<typeof calculateAnalytics>;

function median(values: number[]) {
  if (!values.length) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function calculateAnalytics(records: AnalyticsReviewRecord[]) {
  const decisionHours = records.flatMap((record) => record.reviewReadyAt && record.decidedAt ? [(Date.parse(record.decidedAt) - Date.parse(record.reviewReadyAt)) / 3_600_000] : []).filter((value) => Number.isFinite(value) && value >= 0);
  const evaluatedGates = records.flatMap((record) => record.gates).filter((gate) => gate.status !== "INSUFFICIENT_EVIDENCE");
  const failedGates = evaluatedGates.filter((gate) => gate.status === "FAILED").length;
  const unresolvedSevereFailures = records.flatMap((record) => record.failures).filter((failure) => (failure.severity === "HIGH" || failure.severity === "CRITICAL") && failure.status !== "RESOLVED");
  const reviewedRecords = records.filter((record) => record.reviewerPositions.length > 0);
  const disagreements = reviewedRecords.filter((record) => new Set(record.reviewerPositions).size > 1).length;
  const requiredEvidence = records.reduce((total, record) => total + record.requiredEvidenceItems, 0);
  const completeEvidence = records.reduce((total, record) => total + Math.min(record.completeEvidenceItems, record.requiredEvidenceItems), 0);
  const decisions = records.flatMap((record) => record.outcome ? [record.outcome] : []);
  return {
    timeToDecision: { medianHours: median(decisionHours), decidedRecords: decisionHours.length },
    gateFailure: { failed: failedGates, evaluated: evaluatedGates.length, rate: evaluatedGates.length ? failedGates / evaluatedGates.length : undefined },
    unresolvedSevereFailures: { count: unresolvedSevereFailures.length, critical: unresolvedSevereFailures.filter((failure) => failure.severity === "CRITICAL").length },
    reviewerDisagreement: { records: disagreements, reviewedRecords: reviewedRecords.length, rate: reviewedRecords.length ? disagreements / reviewedRecords.length : undefined },
    evidenceCompleteness: { complete: completeEvidence, required: requiredEvidence, rate: requiredEvidence ? completeEvidence / requiredEvidence : undefined },
    decisionDistribution: { total: decisions.length, SHIP: decisions.filter((value) => value === "SHIP").length, INVESTIGATE: decisions.filter((value) => value === "INVESTIGATE").length, BLOCK: decisions.filter((value) => value === "BLOCK").length },
  };
}
