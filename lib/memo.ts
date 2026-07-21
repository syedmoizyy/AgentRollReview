import type { RoleReview } from "./reviews";

export type AuditEvent = { id: string; occurredAt: string; actor: string; action: string; detail: string; source: "IMPORT" | "RULE" | "REVIEW" | "OVERRIDE" | "DECISION" };
export type DecisionMemo = {
  title: string;
  sampleLabel: string;
  productContext: { intendedValue: string; owner: string; riskLevel: string; affectedUsers: string[]; tools: string[] };
  evaluationScope: { evidenceVersion: string; source: string; scenarios: string; acceptedRuns: number; period: string };
  notableFailures: { id: string; severity: string; description: string; status: string; owner: string; evidenceReference: string }[];
  gateResults: { name: string; status: string; observed: string; policy: string; behavior: string; owner: string }[];
  unresolvedRisks: { risk: string; owner: string; mitigation: string; dueDate: string }[];
  reviewerPositions: RoleReview[];
  finalDecision: { systemRecommendation: string; outcome: string; decisionOwner: string; rationale: string; decidedAt: string };
  rollbackTriggers: string[];
  nextReviewDate: string;
  auditTimeline: AuditEvent[];
};

const line = (value: string) => value.replace(/\r?\n/g, " ");
const list = (values: string[]) => values.map((value) => `- ${line(value)}`).join("\n");

export function memoToMarkdown(memo: DecisionMemo) {
  const reviewers = memo.reviewerPositions.map((review) => `- **${review.role} — ${review.reviewerName}: ${review.disposition ?? "Not submitted"}** — ${line(review.rationale)}`).join("\n");
  return `# ${line(memo.title)}

> ${line(memo.sampleLabel)}

## Product context

${line(memo.productContext.intendedValue)}

- Owner: ${line(memo.productContext.owner)}
- Risk level: ${line(memo.productContext.riskLevel)}
- Affected users: ${memo.productContext.affectedUsers.map(line).join(", ")}
- Tools: ${memo.productContext.tools.map(line).join(", ")}

## Evaluation scope

- Evidence version: ${line(memo.evaluationScope.evidenceVersion)}
- Source: ${line(memo.evaluationScope.source)}
- Scope: ${line(memo.evaluationScope.scenarios)}
- Accepted runs: ${memo.evaluationScope.acceptedRuns}
- Period: ${line(memo.evaluationScope.period)}

## Notable failures

${memo.notableFailures.map((failure) => `- **${failure.id} · ${failure.severity} · ${failure.status}** — ${line(failure.description)} Owner: ${line(failure.owner)}. Evidence: ${line(failure.evidenceReference)}.`).join("\n")}

## Gate results

${memo.gateResults.map((gate) => `- **${line(gate.status)} — ${line(gate.name)}** (${line(gate.behavior)}): observed ${line(gate.observed)}; policy ${line(gate.policy)}. Owner: ${line(gate.owner)}.`).join("\n")}

## Unresolved risks

${memo.unresolvedRisks.map((risk) => `- **${line(risk.risk)}** — Owner: ${line(risk.owner)}. Mitigation: ${line(risk.mitigation)}. Due: ${line(risk.dueDate)}.`).join("\n")}

## Reviewer positions

${reviewers}

## Final decision

- System recommendation: ${line(memo.finalDecision.systemRecommendation)}
- Recorded outcome: ${line(memo.finalDecision.outcome)}
- Decision owner: ${line(memo.finalDecision.decisionOwner)}
- Rationale: ${line(memo.finalDecision.rationale)}
- Decided at: ${line(memo.finalDecision.decidedAt)}

## Rollback triggers

${list(memo.rollbackTriggers)}

## Next review date

${line(memo.nextReviewDate)}

## Audit timeline

${memo.auditTimeline.map((event) => `- ${line(event.occurredAt)} · **${line(event.source)} / ${line(event.action)}** · ${line(event.actor)} — ${line(event.detail)}`).join("\n")}
`;
}

const escapeHtml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
export function memoToHtml(memo: DecisionMemo) {
  const markdown = memoToMarkdown(memo);
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(memo.title)}</title><style>body{font:15px/1.55 system-ui,sans-serif;max-width:850px;margin:40px auto;padding:0 24px;color:#172033}h1,h2{line-height:1.2}h2{margin-top:28px;border-bottom:1px solid #dbe2ea;padding-bottom:6px}pre{white-space:pre-wrap;font:inherit}@media print{body{margin:0;max-width:none}button{display:none}}</style></head><body><pre>${escapeHtml(markdown)}</pre></body></html>`;
}
