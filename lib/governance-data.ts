import type { AuditEvent, DecisionMemo } from "./memo";
import type { CriticalRoleException, RoleReview } from "./reviews";

export const sampleRoleReviews: RoleReview[] = [
  { role: "PRODUCT", reviewerName: "Maya Chen (fictional)", designatedCritical: true, disposition: "APPROVE", rationale: "The intended customer value is supported, but this position does not supersede safety or recovery policy.", evidenceComments: [{ evidenceReference: "sample-suite-v1", comment: "Task success is 91/100 accepted fictional sample runs." }], remediationRequests: [], submittedAt: "2026-07-18T16:00:00.000Z" },
  { role: "ENGINEERING", reviewerName: "Ravi Shah (fictional)", designatedCritical: true, disposition: "ABSTAIN", rationale: "A targeted rerun is needed after bounded retry and escalation behavior is implemented.", evidenceComments: [{ evidenceReference: "refund-002", comment: "The run timed out without a reliable escalation." }], remediationRequests: [{ request: "Implement bounded retry and rerun tool-failure scenarios", owner: "Platform team", dueDate: "2026-08-01" }], submittedAt: "2026-07-18T17:15:00.000Z" },
  { role: "TRUST_SAFETY", reviewerName: "Elena Park (fictional)", designatedCritical: true, disposition: "REJECT", rationale: "Severe safety outcomes and an unresolved critical failure violate the configured release policy.", evidenceComments: [{ evidenceReference: "F-014", comment: "Critical impact remains open for customers with split shipments." }], remediationRequests: [{ request: "Resolve the critical failure and rerun safety cases", owner: "Trust & safety", dueDate: "2026-08-05" }], submittedAt: "2026-07-18T18:30:00.000Z" },
  { role: "OPERATIONS", reviewerName: "Sam Okafor (fictional)", designatedCritical: true, disposition: "REJECT", rationale: "The current manual escalation path cannot absorb the observed recovery failures.", evidenceComments: [{ evidenceReference: "recovery-gate", comment: "Recovery is 5/12 attempts against an assumed 80% minimum." }], remediationRequests: [{ request: "Document escalation ownership and rollback procedure", owner: "Support operations", dueDate: "2026-08-05" }], submittedAt: "2026-07-18T19:00:00.000Z" },
];

export const sampleCriticalRoleExceptions: CriticalRoleException[] = [];

export const sampleAuditTimeline: AuditEvent[] = [
  { id: "audit-1", occurredAt: "2026-07-17T09:00:00.000Z", actor: "Seed script", action: "EVIDENCE_IMPORTED", detail: "Imported 100 accepted fictional sample rows from support-refund-v2.sample.json as sample-suite-v1.", source: "IMPORT" },
  { id: "audit-2", occurredAt: "2026-07-17T11:30:00.000Z", actor: "Maya Chen (fictional)", action: "GATE_RULE_CHANGED", detail: "Changed the tool-recovery hard-block threshold from 70% to 80%; sample assumption requiring validation.", source: "RULE" },
  ...sampleRoleReviews.map((review, index): AuditEvent => ({ id: `audit-review-${index}`, occurredAt: review.submittedAt!, actor: review.reviewerName, action: "ROLE_REVIEW_SUBMITTED", detail: `${review.role} recorded ${review.disposition} with rationale.`, source: "REVIEW" })),
  { id: "audit-7", occurredAt: "2026-07-19T10:00:00.000Z", actor: "Decision owner placeholder", action: "OVERRIDE_RECORDED", detail: "Recorded a temporary Investigate override with review date 2026-07-20; original Block recommendation retained.", source: "OVERRIDE" },
  { id: "audit-8", occurredAt: "2026-07-20T12:00:00.000Z", actor: "Decision owner placeholder", action: "FINAL_DECISION_RECORDED", detail: "Recorded Block after the temporary override review; evidence snapshot sample-suite-v1 retained.", source: "DECISION" },
];

export function sampleDecisionMemo(reviewerPositions = sampleRoleReviews, auditTimeline = sampleAuditTimeline): DecisionMemo {
  return {
    title: "Support Refund Agent release decision",
    sampleLabel: "FICTIONAL SAMPLE DATA · Assumptions and placeholder identities are not customer evidence",
    productContext: { intendedValue: "Help eligible customers resolve straightforward refund requests while escalating ambiguous or high-risk cases.", owner: "Maya Chen (fictional)", riskLevel: "High", affectedUsers: ["Retail customers", "Support agents"], tools: ["Order lookup", "Refund API", "Escalation queue"] },
    evaluationScope: { evidenceVersion: "sample-suite-v1", source: "support-refund-v2.sample.json", scenarios: "100 accepted fictional refund-readiness runs covering standard refunds, policy exceptions, safety cases, and dependency failures", acceptedRuns: 100, period: "2026-07-01 sample fixture" },
    notableFailures: [
      { id: "F-014", severity: "Critical", description: "Workflow repeated a failed refund call without reliable escalation.", status: "Open", owner: "Platform team", evidenceReference: "refund-002" },
      { id: "F-009", severity: "High", description: "Promotion exclusion was not consistently applied.", status: "Mitigating", owner: "Refunds team", evidenceReference: "sample-suite-v1" },
    ],
    gateResults: [
      { name: "Severe safety failures equal zero", status: "Failed", observed: "2 failures / 100 runs", policy: "= 0", behavior: "Hard blocker", owner: "Trust & safety" },
      { name: "Tool recovery rate at least 80%", status: "Failed", observed: "5 / 12 (42%)", policy: ">= 80%", behavior: "Hard blocker", owner: "Platform team" },
      { name: "P95 latency below 5 seconds", status: "Passed", observed: "4.8 seconds", policy: "< 5 seconds", behavior: "Advisory", owner: "Engineering" },
      { name: "Unresolved critical failures equal zero", status: "Failed", observed: "1 open critical failure", policy: "= 0", behavior: "Hard blocker", owner: "Decision owner" },
    ],
    unresolvedRisks: [
      { risk: "Tool recovery under partial API failure", owner: "Platform team", mitigation: "Bound retries, guarantee escalation, and run the targeted recovery suite.", dueDate: "2026-08-01 sample target" },
      { risk: "Unsafe refund outcome", owner: "Trust & safety", mitigation: "Resolve F-014 and rerun safety scenarios before reconsideration.", dueDate: "2026-08-05 sample target" },
    ],
    reviewerPositions,
    finalDecision: { systemRecommendation: "Block", outcome: "Block", decisionOwner: "Decision owner placeholder", rationale: "Multiple hard blockers failed and an unresolved critical failure remains. Product approval does not override policy or dissent.", decidedAt: "2026-07-20T12:00:00.000Z" },
    rollbackTriggers: ["Any severe safety failure after a future release", "Tool-recovery rate falls below the approved threshold", "An unresolved critical failure is discovered", "Escalation or disable controls are unavailable"],
    nextReviewDate: "2026-08-08 sample placeholder",
    auditTimeline,
  };
}
