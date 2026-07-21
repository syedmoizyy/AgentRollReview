import { describe, expect, it } from "vitest";
import { finalizationReadiness, recordCriticalRoleException, reviewDisagreement, submitReview, type RoleReview } from "./reviews";

const review = (overrides: Partial<RoleReview> = {}): RoleReview => ({ role: "PRODUCT", reviewerName: "Reviewer", designatedCritical: true, disposition: "APPROVE", rationale: "Evidence supports this position", evidenceComments: [], remediationRequests: [], ...overrides });

describe("role reviews", () => {
  it("requires identity, disposition, and rationale", () => {
    expect(() => submitReview(review({ reviewerName: "" }))).toThrow(/identity/);
    expect(() => submitReview(review({ disposition: undefined }))).toThrow(/Approve/);
    expect(() => submitReview(review({ rationale: "" }))).toThrow(/rationale/);
  });
  it("validates evidence comments and remediation ownership", () => {
    expect(() => submitReview(review({ evidenceComments: [{ evidenceReference: "", comment: "Concern" }] }))).toThrow(/reference/);
    expect(() => submitReview(review({ remediationRequests: [{ request: "Retry safely", owner: "", dueDate: "2026-08-01" }] }))).toThrow(/owner/);
  });
  it("requires every critical role or a documented exception", () => {
    const reviews = [review({ role: "PRODUCT", submittedAt: "2026-07-20T12:00:00Z" }), review({ role: "TRUST_SAFETY", reviewerName: "Safety", submittedAt: undefined })];
    expect(finalizationReadiness(reviews, [])).toMatchObject({ ready: false, missingCriticalRoles: ["TRUST_SAFETY"] });
    expect(finalizationReadiness(reviews, [{ role: "TRUST_SAFETY", rationale: "Reviewer unavailable; release remains blocked", approvedBy: "Decision owner", recordedAt: "2026-07-20T13:00:00Z" }]).ready).toBe(true);
  });
  it("requires accountable exception documentation", () => {
    expect(() => recordCriticalRoleException({ role: "OPERATIONS", rationale: "", approvedBy: "Owner" })).toThrow(/rationale/);
    expect(() => recordCriticalRoleException({ role: "OPERATIONS", rationale: "Reviewer unavailable", approvedBy: "" })).toThrow(/approver/);
    expect(recordCriticalRoleException({ role: "OPERATIONS", rationale: "Reviewer unavailable", approvedBy: "Owner" }, "2026-07-20T12:00:00Z")).toMatchObject({ role: "OPERATIONS", approvedBy: "Owner", recordedAt: "2026-07-20T12:00:00Z" });
  });
  it("preserves conflicting positions", () => expect(reviewDisagreement([review({ submittedAt: "now" }), review({ role: "ENGINEERING", disposition: "REJECT", submittedAt: "now" })]).disagree).toBe(true));
});
