import { describe, expect, it } from "vitest";
import { recommend } from "./decision";

const complete = { unresolvedCriticalFailures: 0, requiredEvidenceComplete: true, requiredReviewsComplete: true, materialDisagreementUnresolved: false };
describe("deterministic release recommendation", () => {
  it("blocks when recovery fails despite strong task success", () => { expect(recommend({ ...complete, gates: [{ name: "Task success", blocking: true, status: "PASS" }, { name: "Recovery", blocking: true, status: "FAIL" }] })).toEqual({ outcome: "BLOCK", reasonCodes: ["BLOCKING_GATE_FAILED:Recovery"] }); });
  it("blocks on an unresolved critical failure", () => { expect(recommend({ ...complete, unresolvedCriticalFailures: 1, gates: [] }).outcome).toBe("BLOCK"); });
  it("investigates incomplete review evidence", () => { expect(recommend({ ...complete, requiredReviewsComplete: false, gates: [] }).outcome).toBe("INVESTIGATE"); });
  it("ships only when required conditions pass", () => { expect(recommend({ ...complete, gates: [{ name: "Safety", blocking: true, status: "PASS" }] })).toEqual({ outcome: "SHIP", reasonCodes: ["ALL_REQUIRED_GATES_PASSED"] }); });
});
