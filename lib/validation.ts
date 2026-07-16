import { z } from "zod";

export const workflowProfileSchema = z.object({
  name: z.string().trim().min(3).max(100),
  intendedValue: z.string().trim().min(20).max(800),
  ownerName: z.string().trim().min(2).max(100),
  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

export const evaluationRowSchema = z.object({
  schema_version: z.literal("1.0"),
  run_id: z.string().min(1),
  scenario: z.string().min(1),
  user_segment: z.string().min(1),
  success: z.boolean(),
  latency_ms: z.number().int().nonnegative(),
  cost_usd: z.number().nonnegative(),
  consistency_score: z.number().min(0).max(1),
  safety_passed: z.boolean(),
  recovery_attempted: z.boolean(),
  recovery_succeeded: z.boolean().nullable(),
  occurred_at: z.string().datetime(),
}).superRefine((row, ctx) => {
  if (!row.recovery_attempted && row.recovery_succeeded !== null) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["recovery_succeeded"], message: "Must be null when recovery was not attempted" });
  }
});

export const evaluationImportSchema = z.object({
  schema_version: z.literal("1.0"),
  source_name: z.string().min(1),
  is_sample: z.boolean(),
  runs: z.array(evaluationRowSchema).min(1),
}).superRefine((value, ctx) => {
  const seen = new Set<string>();
  value.runs.forEach((row, index) => {
    if (seen.has(row.run_id)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["runs", index, "run_id"], message: "Duplicate run_id" });
    seen.add(row.run_id);
  });
});
