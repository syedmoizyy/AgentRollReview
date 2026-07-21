import { describe, expect, it } from "vitest";
import { memoToHtml, memoToMarkdown, type DecisionMemo } from "./memo";

const memo: DecisionMemo = { title: "Decision memo", sampleLabel: "FICTIONAL SAMPLE DATA", productContext: { intendedValue: "Help customers safely", owner: "Owner", riskLevel: "High", affectedUsers: ["Customers"], tools: ["Refund API"] }, evaluationScope: { evidenceVersion: "v1", source: "fixture.json", scenarios: "Refund readiness", acceptedRuns: 100, period: "2026-07-01" }, notableFailures: [{ id: "F-1", severity: "Critical", description: "Recovery failed", status: "Open", owner: "Platform", evidenceReference: "run-2" }], gateResults: [{ name: "Recovery", status: "Failed", observed: "42%", policy: ">= 80%", behavior: "Hard blocker", owner: "Platform" }], unresolvedRisks: [{ risk: "Retry loop", owner: "Platform", mitigation: "Bound retries", dueDate: "2026-08-01" }], reviewerPositions: [{ role: "PRODUCT", reviewerName: "Reviewer", designatedCritical: true, disposition: "APPROVE", rationale: "Value is supported", evidenceComments: [], remediationRequests: [], submittedAt: "2026-07-20" }], finalDecision: { systemRecommendation: "Block", outcome: "Block", decisionOwner: "Owner", rationale: "Blocking gates failed", decidedAt: "2026-07-20" }, rollbackTriggers: ["Critical safety failure"], nextReviewDate: "2026-08-15", auditTimeline: [{ id: "a1", occurredAt: "2026-07-20", actor: "System", action: "DECISION_RECORDED", detail: "Block", source: "DECISION" }] };

describe("decision memo export", () => {
  it("contains every required section deterministically", () => {
    const first = memoToMarkdown(memo);
    expect(first).toContain("## Product context"); expect(first).toContain("## Evaluation scope"); expect(first).toContain("## Notable failures"); expect(first).toContain("## Gate results"); expect(first).toContain("## Unresolved risks"); expect(first).toContain("## Reviewer positions"); expect(first).toContain("## Final decision"); expect(first).toContain("## Rollback triggers"); expect(first).toContain("## Next review date"); expect(first).toContain("## Audit timeline");
    expect(memoToMarkdown(memo)).toBe(first);
  });
  it("escapes content in printable HTML", () => expect(memoToHtml({ ...memo, title: "Review <script>" })).not.toContain("<script>"));
});
