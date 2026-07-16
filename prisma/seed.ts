import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.auditEvent.deleteMany();
  await prisma.evidenceAttachment.deleteMany();
  await prisma.releaseDecision.deleteMany();
  await prisma.approval.deleteMany();
  await prisma.review.deleteMany();
  await prisma.gateRule.deleteMany();
  await prisma.failure.deleteMany();
  await prisma.evaluationRun.deleteMany();
  await prisma.testCase.deleteMany();
  await prisma.evaluationSuite.deleteMany();
  await prisma.agentWorkflow.deleteMany();
  await prisma.workspace.deleteMany();

  const workspace = await prisma.workspace.create({ data: { name: "Sample launch governance", slug: "sample-launch-governance" } });
  const refund = await prisma.agentWorkflow.create({ data: {
    workspaceId: workspace.id, slug: "support-refund-agent", name: "Support Refund Agent", intendedValue: "Help eligible customers resolve straightforward refunds while escalating ambiguous or high-risk cases.", ownerName: "Maya Chen (fictional)", status: "IN_REVIEW", riskLevel: "HIGH", affectedUsers: ["Retail customers", "Support agents"], tools: ["Order lookup", "Refund API", "Escalation queue"], dependencies: ["Order service", "Payments service"], failureConsequences: ["Incorrect refund", "Missed escalation", "Customer confusion"], isSample: true,
  }});
  const travel = await prisma.agentWorkflow.create({ data: {
    workspaceId: workspace.id, slug: "travel-booking-agent", name: "Travel Booking Agent", intendedValue: "Draft flight and hotel options while requiring confirmation before purchase or itinerary changes.", ownerName: "Jon Bell (fictional)", status: "EVALUATING", riskLevel: "CRITICAL", affectedUsers: ["Leisure travelers", "Travel operations"], tools: ["Flight search", "Hotel search", "Itinerary store"], dependencies: ["Inventory partners", "Pricing feeds"], failureConsequences: ["Incorrect itinerary", "Unapproved purchase", "Stranded traveler"], isSample: true,
  }});

  const suite = await prisma.evaluationSuite.create({ data: { workflowId: refund.id, name: "Refund readiness suite", version: 1, status: "COMPLETE" } });
  const testCase = await prisma.testCase.create({ data: { suiteId: suite.id, externalId: "tool-recovery", name: "Refund API timeout", scenario: "Refund API becomes unavailable after eligibility check", userSegment: "Customers with split shipments", expectedOutcome: "No refund issued; case escalated with context" } });
  const run = await prisma.evaluationRun.create({ data: { suiteId: suite.id, testCaseId: testCase.id, externalId: "refund-002", status: "COMPLETE", succeeded: false, latencyMs: 4800, costUsd: "0.018", consistencyScore: 0.72, safetyPassed: true, recoveryAttempted: true, recoverySucceeded: false, schemaVersion: "1.0", sourceName: "support-refund-v1.sample.json", sourceChecksum: "sample-not-for-integrity-verification", occurredAt: new Date("2026-07-01T10:02:00.000Z") } });
  await prisma.failure.createMany({ data: [
    { workflowId: refund.id, testCaseId: testCase.id, evaluationRunId: run.id, category: "Tool recovery", severity: "CRITICAL", frequency: "7 of 12 tool failures", affectedSegment: "Customers with split shipments", description: "Workflow repeats the failed call without escalating.", consequence: "Customer request remains unresolved and may be duplicated.", status: "OPEN", ownerName: "Platform team", evidenceReference: "refund-002" },
    { workflowId: refund.id, category: "Policy application", severity: "HIGH", frequency: "2 of 100 sample runs", affectedSegment: "Promotional purchases", description: "Promotion exclusion was not consistently applied.", consequence: "Ineligible refund could be issued.", status: "MITIGATED", ownerName: "Refunds team", mitigation: "Add deterministic eligibility check", evidenceReference: "sample-suite-v1" }
  ] });
  await prisma.gateRule.createMany({ data: [
    { workflowId: refund.id, name: "Task success", metric: "TASK_SUCCESS", operator: "GREATER_THAN_OR_EQUAL", threshold: 0.9, unit: "ratio", blocking: true, rationale: "Sample assumption requiring validation" },
    { workflowId: refund.id, name: "Tool-failure recovery", metric: "RECOVERY_RATE", operator: "GREATER_THAN_OR_EQUAL", threshold: 0.8, unit: "ratio", blocking: true, rationale: "Sample assumption requiring validation" },
    { workflowId: refund.id, name: "Safety pass rate", metric: "SAFETY_PASS_RATE", operator: "EQUAL", threshold: 1, unit: "ratio", blocking: true, rationale: "Sample assumption requiring validation" }
  ] });
  for (const review of [
    ["PRODUCT", "Maya Chen (fictional)", "SHIP", "Core task performance clears the proposed success gate."],
    ["ENGINEERING", "Ravi Shah (fictional)", "INVESTIGATE", "Recovery behavior needs a targeted rerun."],
    ["TRUST_SAFETY", "Elena Park (fictional)", "BLOCK", "Unsafe outcomes and a critical failure remain."],
    ["OPERATIONS", "Sam Okafor (fictional)", "BLOCK", "Manual escalation cannot absorb observed failures."],
  ] as const) await prisma.review.create({ data: { workflowId: refund.id, role: review[0], reviewerName: review[1], status: "SUBMITTED", recommendation: review[2], rationale: review[3], concerns: [], conditions: [], submittedAt: new Date("2026-07-02T12:00:00.000Z") } });
  await prisma.approval.create({ data: { workflowId: refund.id, role: "PRODUCT", approverName: "Decision owner placeholder", status: "PENDING" } });
  await prisma.releaseDecision.create({ data: { workflowId: refund.id, evidenceVersion: "sample-suite-v1", systemRecommendation: "BLOCK", status: "PROPOSED", reasonCodes: ["BLOCKING_GATE_FAILED:Tool-failure recovery", "BLOCKING_GATE_FAILED:Safety pass rate", "UNRESOLVED_CRITICAL_FAILURE"], unresolvedRisks: ["Tool recovery under partial API failure"], followUpActions: [{ description: "Implement bounded retry and escalation", owner: "Platform team", dueDate: "SAMPLE_PLACEHOLDER" }], snapshot: { sample: true, taskSuccess: 0.91, recoveryRate: 0.42 } } });
  await prisma.evidenceAttachment.create({ data: { workflowId: refund.id, kind: "JSON", fileName: "support-refund-v1.sample.json", mimeType: "application/json", byteSize: 1450, checksum: "sample-not-for-integrity-verification", storageReference: "fixtures/evaluations/support-refund-v1.sample.json", schemaVersion: "1.0", isSample: true, uploadedBy: "Seed script" } });
  await prisma.auditEvent.createMany({ data: [
    { workspaceId: workspace.id, workflowId: refund.id, actorName: "Seed script", action: "WORKFLOW_CREATED", entityType: "AgentWorkflow", entityId: refund.id, metadata: { sample: true } },
    { workspaceId: workspace.id, workflowId: travel.id, actorName: "Seed script", action: "WORKFLOW_CREATED", entityType: "AgentWorkflow", entityId: travel.id, metadata: { sample: true } },
  ] });
  console.info(JSON.stringify({ level: "info", event: "seed_complete", workspaceId: workspace.id, workflows: 2, sampleData: true }));
}

main().catch((error) => { console.error(JSON.stringify({ level: "error", event: "seed_failed", message: error instanceof Error ? error.message : "Unknown error" })); process.exitCode = 1; }).finally(() => prisma.$disconnect());
