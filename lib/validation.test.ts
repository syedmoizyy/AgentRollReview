import { describe,expect,it } from "vitest";import fixture from "@/fixtures/evaluations/support-refund-v2.sample.json";import { evaluationImportSchema,parseCsvImport,validateCsvHeaders,validateImport } from "./validation";import { readFileSync } from "node:fs";import { join } from "node:path";
describe("evaluation import",()=>{
 it("accepts the documented JSON fixture",()=>expect(evaluationImportSchema.safeParse(fixture).success).toBe(true));
 it("normalizes the equivalent CSV fixture",()=>{const csv=readFileSync(join(process.cwd(),"fixtures/evaluations/support-refund-v2.sample.csv"),"utf8");expect(validateCsvHeaders(csv)).toEqual([]);expect(validateImport(parseCsvImport(csv,"fixture.csv",true)).rows).toHaveLength(2)});
 it("reports invalid schemas as actionable file errors",()=>{const p=validateImport({...fixture,schema_version:"9.0"});expect(p.issues).toContainEqual(expect.objectContaining({row:null,field:"schema_version"}))});
 it("reports the duplicate row and identifier",()=>{const p=validateImport({...fixture,runs:[fixture.runs[0],fixture.runs[0]]});expect(p.issues).toContainEqual(expect.objectContaining({row:2,field:"runs.1.run_id",message:expect.stringContaining("Duplicate")}))});
 it("requires severity and taxonomy for a failed row",()=>{const row={...fixture.runs[1],severity:null,failure_category:null};const p=validateImport({...fixture,runs:[row]});expect(p.issues.map(i=>i.field)).toEqual(expect.arrayContaining(["runs.0.severity","runs.0.failure_category"]))});
});
