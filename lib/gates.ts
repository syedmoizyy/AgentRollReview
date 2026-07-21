export const gateMetrics = [
  "SEVERE_SAFETY_FAILURES",
  "TOOL_RECOVERY_RATE",
  "P95_LATENCY_MS",
  "COST_PER_SUCCESSFUL_TASK_USD",
  "UNRESOLVED_CRITICAL_FAILURES",
] as const;

export type GateMetric = (typeof gateMetrics)[number];
export type GateOperator = "GT" | "GTE" | "LT" | "LTE" | "EQ" | "NEQ";
export type GateScope = "ALL_RUNS" | "SAFETY_CASES" | "TOOL_FAILURES" | "CRITICAL_FAILURES";
export type GateSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type GateBehavior = "HARD_BLOCK" | "ADVISORY";
export type GateStatus = "PASSED" | "FAILED" | "INSUFFICIENT_EVIDENCE";

export type GateRule = {
  id: string;
  name: string;
  metric: GateMetric;
  operator: GateOperator;
  threshold: number;
  scope: GateScope;
  severity: GateSeverity;
  behavior: GateBehavior;
  rationale: string;
  owner: string;
  required: boolean;
  enabled: boolean;
};

export type MetricObservation = { value: number; numerator?: number; denominator?: number; unit: string };
export type EvaluationSnapshot = {
  id: string;
  label: string;
  evidenceVersion: string;
  isSample: boolean;
  observations: Partial<Record<GateMetric, Partial<Record<GateScope, MetricObservation>>>>;
};

export type EvaluatedGate = GateRule & { status: GateStatus; observation?: MetricObservation; reasonCode: string };

function compare(value: number, operator: GateOperator, threshold: number) {
  if (operator === "GT") return value > threshold;
  if (operator === "GTE") return value >= threshold;
  if (operator === "LT") return value < threshold;
  if (operator === "LTE") return value <= threshold;
  if (operator === "EQ") return value === threshold;
  return value !== threshold;
}

export function evaluateGate(rule: GateRule, snapshot: EvaluationSnapshot): EvaluatedGate {
  const observation = snapshot.observations[rule.metric]?.[rule.scope];
  if (!observation || !Number.isFinite(observation.value) || observation.denominator === 0) {
    return { ...rule, status: "INSUFFICIENT_EVIDENCE", reasonCode: `INSUFFICIENT_EVIDENCE:${rule.id}` };
  }
  const status = compare(observation.value, rule.operator, rule.threshold) ? "PASSED" : "FAILED";
  return { ...rule, observation, status, reasonCode: `${status}:${rule.id}` };
}

export function evaluateGates(rules: GateRule[], snapshot: EvaluationSnapshot) {
  return rules.filter((rule) => rule.enabled).map((rule) => evaluateGate(rule, snapshot));
}

export type GateRecommendation = { outcome: "SHIP" | "INVESTIGATE" | "BLOCK"; reasonCodes: string[] };

export function recommendFromGates(results: EvaluatedGate[]): GateRecommendation {
  const hardFailures = results.filter((result) => result.behavior === "HARD_BLOCK" && result.status === "FAILED");
  if (hardFailures.length) return { outcome: "BLOCK", reasonCodes: hardFailures.map((result) => `HARD_BLOCK_FAILED:${result.id}`) };

  const investigate = results.filter((result) =>
    (result.required && result.status === "INSUFFICIENT_EVIDENCE") ||
    (result.behavior === "ADVISORY" && result.status === "FAILED"),
  );
  if (investigate.length) return {
    outcome: "INVESTIGATE",
    reasonCodes: investigate.map((result) => result.status === "FAILED" ? `ADVISORY_FAILED:${result.id}` : `CRITICAL_EVIDENCE_MISSING:${result.id}`),
  };
  return { outcome: "SHIP", reasonCodes: ["ALL_REQUIRED_GATES_PASSED"] };
}

export type OverrideInput = {
  finalOutcome: GateRecommendation["outcome"];
  rationale: string;
  approver: string;
  reviewDate: string;
};

export type OverrideRecord = OverrideInput & {
  systemRecommendation: GateRecommendation["outcome"];
  evidenceVersion: string;
  auditEvent: { action: "DECISION_OVERRIDDEN"; actor: string; occurredAt: string; details: Record<string, string> };
};

export function recordOverride(input: OverrideInput, recommendation: GateRecommendation, evidenceVersion: string, occurredAt = new Date().toISOString()): OverrideRecord {
  if (input.finalOutcome === recommendation.outcome) throw new Error("An override must differ from the system recommendation");
  if (!input.rationale.trim()) throw new Error("Override rationale is required");
  if (!input.approver.trim()) throw new Error("Override approver is required");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.reviewDate) || Number.isNaN(Date.parse(`${input.reviewDate}T00:00:00Z`))) throw new Error("A valid expiration or review date is required");
  return {
    ...input,
    systemRecommendation: recommendation.outcome,
    evidenceVersion,
    auditEvent: {
      action: "DECISION_OVERRIDDEN",
      actor: input.approver.trim(),
      occurredAt,
      details: { from: recommendation.outcome, to: input.finalOutcome, rationale: input.rationale.trim(), reviewDate: input.reviewDate, evidenceVersion },
    },
  };
}
