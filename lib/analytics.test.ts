import { describe, expect, it } from "vitest";
import { calculateAnalytics, type AnalyticsReviewRecord } from "./analytics";

const record = (overrides: Partial<AnalyticsReviewRecord> = {}): AnalyticsReviewRecord => ({ id: "one", reviewReadyAt: "2026-07-01T00:00:00Z", decidedAt: "2026-07-02T00:00:00Z", gates: [{ status: "PASSED" }, { status: "FAILED" }, { status: "INSUFFICIENT_EVIDENCE" }], failures: [{ severity: "CRITICAL", status: "OPEN" }, { severity: "HIGH", status: "RESOLVED" }], reviewerPositions: ["APPROVE", "REJECT"], requiredEvidenceItems: 4, completeEvidenceItems: 3, outcome: "BLOCK", ...overrides });

describe("decision-support analytics", () => {
  it("uses decided records for median time and ignores invalid intervals", () => {
    const result = calculateAnalytics([record(), record({ id: "two", decidedAt: "2026-07-04T00:00:00Z" }), record({ id: "open", decidedAt: undefined })]);
    expect(result.timeToDecision).toEqual({ medianHours: 48, decidedRecords: 2 });
  });
  it("excludes insufficient evidence from the gate failure denominator", () => expect(calculateAnalytics([record()]).gateFailure).toEqual({ failed: 1, evaluated: 2, rate: 0.5 }));
  it("counts only unresolved high and critical failures", () => expect(calculateAnalytics([record()]).unresolvedSevereFailures).toEqual({ count: 1, critical: 1 }));
  it("measures disagreement without averaging positions", () => expect(calculateAnalytics([record(), record({ id: "two", reviewerPositions: ["APPROVE", "APPROVE"] })]).reviewerDisagreement).toEqual({ records: 1, reviewedRecords: 2, rate: 0.5 }));
  it("caps evidence completion at required items and keeps explicit denominators", () => expect(calculateAnalytics([record({ completeEvidenceItems: 9 })]).evidenceCompleteness).toEqual({ complete: 4, required: 4, rate: 1 }));
  it("returns undefined rates when evidence is absent", () => { const result = calculateAnalytics([]); expect(result.gateFailure.rate).toBeUndefined(); expect(result.evidenceCompleteness.rate).toBeUndefined(); expect(result.timeToDecision.medianHours).toBeUndefined(); });
});
