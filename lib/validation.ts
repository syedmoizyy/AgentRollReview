import { z } from "zod";

export const failureCategories = [
  "incorrect_outcome", "unsafe_action", "permission_violation", "hallucinated_tool_result",
  "dependency_failure", "unrecovered_timeout", "inconsistent_retry", "privacy_exposure",
  "excessive_cost", "latency_breach",
] as const;
export const severities = ["low", "medium", "high", "critical"] as const;

export const workflowProfileSchema = z.object({
  name: z.string().trim().min(3).max(100), intendedValue: z.string().trim().min(20).max(800),
  ownerName: z.string().trim().min(2).max(100), riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

export const evaluationRowSchema = z.object({
  schema_version: z.literal("2.0"), run_id: z.string().trim().min(1), test_case_id: z.string().trim().min(1),
  test_case: z.string().trim().min(1), expected_behavior: z.string().trim().min(1), actual_behavior: z.string().trim().min(1),
  passed: z.boolean(), severity: z.enum(severities).nullable(), latency_ms: z.number().int().nonnegative(),
  cost_usd: z.number().nonnegative(), tool_calls: z.array(z.string().trim().min(1)),
  evidence_links: z.array(z.string().url()).min(1), occurred_at: z.string().datetime(),
  failure_category: z.enum(failureCategories).nullable(),
}).superRefine((row, ctx) => {
  if (row.passed && (row.severity !== null || row.failure_category !== null)) ctx.addIssue({ code: "custom", path: ["passed"], message: "Passing rows must not include failure severity or category" });
  if (!row.passed && row.severity === null) ctx.addIssue({ code: "custom", path: ["severity"], message: "Failed rows require severity" });
  if (!row.passed && row.failure_category === null) ctx.addIssue({ code: "custom", path: ["failure_category"], message: "Failed rows require a failure category" });
});

export const evaluationImportSchema = z.object({
  schema_version: z.literal("2.0"), source_name: z.string().trim().min(1), is_sample: z.boolean(),
  runs: z.array(evaluationRowSchema).min(1),
}).superRefine((value, ctx) => {
  const seen = new Set<string>();
  value.runs.forEach((row, index) => { if (seen.has(row.run_id)) ctx.addIssue({ code: "custom", path: ["runs", index, "run_id"], message: `Duplicate run_id '${row.run_id}'` }); seen.add(row.run_id); });
});

export type EvaluationRow = z.infer<typeof evaluationRowSchema>;
export type ImportIssue = { row: number | null; field: string; message: string };
export type ImportPreview = { sourceName: string; isSample: boolean; rows: EvaluationRow[]; issues: ImportIssue[] };

const columns = ["schema_version", "run_id", "test_case_id", "test_case", "expected_behavior", "actual_behavior", "passed", "severity", "latency_ms", "cost_usd", "tool_calls", "evidence_links", "occurred_at", "failure_category"];

function csvCells(line: string) { const cells: string[] = []; let value = "", quoted = false; for (let i = 0; i < line.length; i++) { const c = line[i]; if (c === '"' && quoted && line[i + 1] === '"') { value += '"'; i++; } else if (c === '"') quoted = !quoted; else if (c === "," && !quoted) { cells.push(value); value = ""; } else value += c; } cells.push(value); return cells; }
function bool(value: string) { if (value === "true") return true; if (value === "false") return false; return value; }

export function parseCsvImport(text: string, sourceName = "upload.csv", isSample = false): unknown {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean); const headers = csvCells(lines[0] ?? "");
  return { schema_version: "2.0", source_name: sourceName, is_sample: isSample, runs: lines.slice(1).map(line => { const values = csvCells(line); const raw = Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""])); return { ...raw, passed: bool(raw.passed), severity: raw.severity || null, latency_ms: Number(raw.latency_ms), cost_usd: Number(raw.cost_usd), tool_calls: raw.tool_calls ? raw.tool_calls.split("|").map(v => v.trim()) : [], evidence_links: raw.evidence_links ? raw.evidence_links.split("|").map(v => v.trim()) : [], failure_category: raw.failure_category || null }; }) };
}

export function validateImport(input: unknown): ImportPreview {
  const parsed = evaluationImportSchema.safeParse(input); const value = input as { source_name?: string; is_sample?: boolean; runs?: unknown[] };
  if (parsed.success) return { sourceName: parsed.data.source_name, isSample: parsed.data.is_sample, rows: parsed.data.runs, issues: [] };
  return { sourceName: value?.source_name ?? "Unknown source", isSample: value?.is_sample ?? false, rows: [], issues: parsed.error.issues.map(issue => ({ row: issue.path[0] === "runs" && typeof issue.path[1] === "number" ? issue.path[1] + 1 : null, field: issue.path.map(String).join("."), message: issue.message })) };
}

export function validateCsvHeaders(text: string): ImportIssue[] { const header = csvCells(text.replace(/^\uFEFF/, "").split(/\r?\n/)[0] ?? ""); return columns.filter(c => !header.includes(c)).map(c => ({ row: null, field: c, message: `Missing required CSV column '${c}'` })); }
