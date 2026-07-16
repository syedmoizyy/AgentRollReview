import { describe, expect, it } from "vitest";
import fixture from "@/fixtures/evaluations/support-refund-v1.sample.json";
import { evaluationImportSchema } from "./validation";
describe("evaluation import", () => { it("accepts the documented sample fixture", () => { expect(evaluationImportSchema.safeParse(fixture).success).toBe(true); }); it("rejects duplicate run IDs", () => { const duplicate = { ...fixture, runs: [fixture.runs[0], fixture.runs[0]] }; expect(evaluationImportSchema.safeParse(duplicate).success).toBe(false); }); });
