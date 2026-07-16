export type Outcome = "SHIP" | "INVESTIGATE" | "BLOCK";
export type GateResult = { name: string; blocking: boolean; status: "PASS" | "FAIL" | "NOT_EVALUATED" };
export type DecisionInput = {
  gates: GateResult[];
  unresolvedCriticalFailures: number;
  requiredEvidenceComplete: boolean;
  requiredReviewsComplete: boolean;
  materialDisagreementUnresolved: boolean;
};

export function recommend(input: DecisionInput): { outcome: Outcome; reasonCodes: string[] } {
  const blocking = input.gates.filter((gate) => gate.blocking && gate.status === "FAIL");
  const reasons: string[] = [];
  if (blocking.length) reasons.push(...blocking.map((gate) => `BLOCKING_GATE_FAILED:${gate.name}`));
  if (input.unresolvedCriticalFailures > 0) reasons.push("UNRESOLVED_CRITICAL_FAILURE");
  if (reasons.length) return { outcome: "BLOCK", reasonCodes: reasons };

  const incomplete = input.gates.filter((gate) => gate.status === "NOT_EVALUATED");
  const nonBlocking = input.gates.filter((gate) => !gate.blocking && gate.status === "FAIL");
  if (!input.requiredEvidenceComplete) reasons.push("REQUIRED_EVIDENCE_MISSING");
  if (!input.requiredReviewsComplete) reasons.push("REQUIRED_REVIEW_MISSING");
  if (input.materialDisagreementUnresolved) reasons.push("MATERIAL_DISAGREEMENT");
  reasons.push(...incomplete.map((gate) => `GATE_NOT_EVALUATED:${gate.name}`));
  reasons.push(...nonBlocking.map((gate) => `NON_BLOCKING_GATE_FAILED:${gate.name}`));
  return reasons.length ? { outcome: "INVESTIGATE", reasonCodes: reasons } : { outcome: "SHIP", reasonCodes: ["ALL_REQUIRED_GATES_PASSED"] };
}
