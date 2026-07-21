import { describe, expect, it } from "vitest";
import { evaluateGate, evaluateGates, recommendFromGates, recordOverride, type EvaluationSnapshot, type GateRule } from "./gates";

const rule = (overrides: Partial<GateRule> = {}): GateRule => ({
  id: "recovery", name: "Recovery", metric: "TOOL_RECOVERY_RATE", operator: "GTE", threshold: 0.8,
  scope: "TOOL_FAILURES", severity: "CRITICAL", behavior: "HARD_BLOCK", rationale: "Release policy", owner: "Engineering",
  required: true, enabled: true, ...overrides,
});
const snapshot = (value?: number): EvaluationSnapshot => ({
  id: "run-1", label: "Run 1", evidenceVersion: "v1", isSample: true,
  observations: value === undefined ? {} : { TOOL_RECOVERY_RATE: { TOOL_FAILURES: { value, numerator: 8, denominator: 10, unit: "ratio" } } },
});

describe("gate evaluation", () => {
  it("handles equality at inclusive and exclusive boundaries", () => {
    expect(evaluateGate(rule(), snapshot(0.8)).status).toBe("PASSED");
    expect(evaluateGate(rule({ operator: "GT" }), snapshot(0.8)).status).toBe("FAILED");
    expect(evaluateGate(rule({ operator: "LTE" }), snapshot(0.8)).status).toBe("PASSED");
    expect(evaluateGate(rule({ operator: "LT" }), snapshot(0.8)).status).toBe("FAILED");
  });
  it("reports missing and zero-denominator observations as insufficient evidence", () => {
    expect(evaluateGate(rule(), snapshot()).status).toBe("INSUFFICIENT_EVIDENCE");
    const zero = snapshot(0); zero.observations.TOOL_RECOVERY_RATE!.TOOL_FAILURES!.denominator = 0;
    expect(evaluateGate(rule(), zero).status).toBe("INSUFFICIENT_EVIDENCE");
  });
  it("ignores disabled rules", () => expect(evaluateGates([rule({ enabled: false })], snapshot(0)).length).toBe(0));
});

describe("gate recommendation", () => {
  it("blocks on any failed hard blocker even when another rule passes", () => {
    const results = evaluateGates([rule(), rule({ id: "success", threshold: 0.4, behavior: "ADVISORY" })], snapshot(0.5));
    expect(recommendFromGates(results).outcome).toBe("BLOCK");
  });
  it("investigates advisory failures and missing critical evidence", () => {
    expect(recommendFromGates(evaluateGates([rule({ behavior: "ADVISORY" })], snapshot(0.5))).outcome).toBe("INVESTIGATE");
    expect(recommendFromGates(evaluateGates([rule()], snapshot())).outcome).toBe("INVESTIGATE");
  });
  it("ships when all required gates pass", () => expect(recommendFromGates(evaluateGates([rule()], snapshot(0.8))).outcome).toBe("SHIP"));
  it("resolves conflicting rules by hard-block precedence", () => {
    const results = evaluateGates([rule({ id: "hard", operator: "GTE" }), rule({ id: "advice", operator: "LT", behavior: "ADVISORY" })], snapshot(0.7));
    expect(recommendFromGates(results)).toEqual({ outcome: "BLOCK", reasonCodes: ["HARD_BLOCK_FAILED:hard"] });
  });
});

describe("human overrides", () => {
  it("requires rationale, approver, and review date", () => {
    const recommendation = { outcome: "BLOCK" as const, reasonCodes: ["HARD_BLOCK_FAILED:recovery"] };
    expect(() => recordOverride({ finalOutcome: "SHIP", rationale: "", approver: "A", reviewDate: "2026-08-01" }, recommendation, "v1")).toThrow(/rationale/);
    expect(() => recordOverride({ finalOutcome: "SHIP", rationale: "Reason", approver: "", reviewDate: "2026-08-01" }, recommendation, "v1")).toThrow(/approver/);
    expect(() => recordOverride({ finalOutcome: "SHIP", rationale: "Reason", approver: "A", reviewDate: "" }, recommendation, "v1")).toThrow(/date/);
    expect(() => recordOverride({ finalOutcome: "BLOCK", rationale: "Reason", approver: "A", reviewDate: "2026-08-01" }, recommendation, "v1")).toThrow(/differ/);
  });
  it("retains the recommendation and creates an audit event", () => {
    const record = recordOverride({ finalOutcome: "INVESTIGATE", rationale: "Targeted rerun approved", approver: "Alex", reviewDate: "2026-08-01" }, { outcome: "BLOCK", reasonCodes: [] }, "v3", "2026-07-20T12:00:00.000Z");
    expect(record.systemRecommendation).toBe("BLOCK");
    expect(record.auditEvent).toMatchObject({ action: "DECISION_OVERRIDDEN", actor: "Alex", details: { from: "BLOCK", to: "INVESTIGATE", evidenceVersion: "v3" } });
  });
});
