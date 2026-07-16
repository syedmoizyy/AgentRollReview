export const workflowTransitions = {
  DRAFT: ["EVALUATING"], EVALUATING: ["IN_REVIEW", "DRAFT"], IN_REVIEW: ["DECIDED", "EVALUATING"], DECIDED: ["ARCHIVED", "IN_REVIEW"], ARCHIVED: [],
} as const;
export const reviewTransitions = { DRAFT: ["SUBMITTED"], SUBMITTED: ["SUPERSEDED"], SUPERSEDED: [] } as const;
export const approvalTransitions = { PENDING: ["APPROVED", "REJECTED", "WITHDRAWN"], APPROVED: ["WITHDRAWN"], REJECTED: [], WITHDRAWN: [] } as const;
export const decisionTransitions = { PROPOSED: ["RECORDED"], RECORDED: ["SUPERSEDED"], SUPERSEDED: [] } as const;

export function canTransition<T extends Record<string, readonly string[]>>(map: T, from: keyof T, to: string) {
  return map[from].includes(to as never);
}
