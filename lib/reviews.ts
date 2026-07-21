export const reviewRoles = ["PRODUCT", "ENGINEERING", "TRUST_SAFETY", "OPERATIONS"] as const;
export type ReviewRole = (typeof reviewRoles)[number];
export type ReviewDisposition = "APPROVE" | "REJECT" | "ABSTAIN";

export type EvidenceComment = { evidenceReference: string; comment: string };
export type RemediationRequest = { request: string; owner: string; dueDate: string };
export type RoleReview = {
  role: ReviewRole;
  reviewerName: string;
  designatedCritical: boolean;
  disposition?: ReviewDisposition;
  rationale: string;
  evidenceComments: EvidenceComment[];
  remediationRequests: RemediationRequest[];
  submittedAt?: string;
};

export type CriticalRoleException = { role: ReviewRole; rationale: string; approvedBy: string; recordedAt: string };

export function recordCriticalRoleException(input: Omit<CriticalRoleException, "recordedAt">, recordedAt = new Date().toISOString()): CriticalRoleException {
  if (!input.rationale.trim()) throw new Error("Critical-role exception rationale is required");
  if (!input.approvedBy.trim()) throw new Error("Critical-role exception approver is required");
  return { ...input, rationale: input.rationale.trim(), approvedBy: input.approvedBy.trim(), recordedAt };
}

export function submitReview(review: RoleReview, submittedAt = new Date().toISOString()): RoleReview {
  if (!review.reviewerName.trim()) throw new Error("Reviewer identity is required");
  if (!review.disposition) throw new Error("Approve, reject, or abstain is required");
  if (!review.rationale.trim()) throw new Error("Review rationale is required");
  for (const item of review.evidenceComments) {
    if (!item.evidenceReference.trim() || !item.comment.trim()) throw new Error("Evidence comments require a reference and comment");
  }
  for (const item of review.remediationRequests) {
    if (!item.request.trim() || !item.owner.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(item.dueDate)) throw new Error("Remediation requests require a request, owner, and due date");
  }
  return { ...review, reviewerName: review.reviewerName.trim(), rationale: review.rationale.trim(), submittedAt };
}

export function finalizationReadiness(reviews: RoleReview[], exceptions: CriticalRoleException[]) {
  const missingCriticalRoles = reviews.filter((review) => review.designatedCritical && !review.submittedAt && !exceptions.some((item) => item.role === review.role)).map((review) => review.role);
  return { ready: missingCriticalRoles.length === 0, missingCriticalRoles, reasonCode: missingCriticalRoles.length ? "CRITICAL_REVIEWS_OR_EXCEPTIONS_MISSING" : "CRITICAL_ROLE_REQUIREMENT_SATISFIED" };
}

export function reviewDisagreement(reviews: RoleReview[]) {
  const submitted = reviews.filter((review): review is RoleReview & { disposition: ReviewDisposition; submittedAt: string } => Boolean(review.submittedAt && review.disposition));
  return { disagree: new Set(submitted.map((review) => review.disposition)).size > 1, positions: submitted.map(({ role, reviewerName, disposition, rationale }) => ({ role, reviewerName, disposition, rationale })) };
}
