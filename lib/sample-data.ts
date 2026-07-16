import { recommend } from "@/lib/decision";

export const workflows = [
  {
    slug: "support-refund-agent", name: "Support Refund Agent", risk: "High", owner: "Maya Chen (fictional)", status: "In review",
    value: "Help eligible customers resolve straightforward refund requests while escalating ambiguous or high-risk cases.",
    decision: "Block", successRate: 91, recoveryRate: 42, sample: true,
    tools: ["Order lookup", "Refund API", "Escalation queue"], affectedUsers: ["Retail customers", "Support agents"],
  },
  {
    slug: "travel-booking-agent", name: "Travel Booking Agent", risk: "Critical", owner: "Jon Bell (fictional)", status: "Evaluating",
    value: "Draft flight and hotel options while requiring confirmation before any purchase or itinerary change.",
    decision: "Investigate", successRate: 88, recoveryRate: 76, sample: true,
    tools: ["Flight search", "Hotel search", "Itinerary store"], affectedUsers: ["Leisure travelers", "Travel operations"],
  },
] as const;

export const supportReview = {
  workflow: workflows[0],
  metrics: [
    { name: "Task success", value: "91%", detail: "91 / 100 accepted sample runs" },
    { name: "Tool-failure recovery", value: "42%", detail: "5 / 12 recovery attempts" },
    { name: "Safety pass rate", value: "98%", detail: "98 / 100 accepted sample runs" },
    { name: "P95 latency", value: "4.8s", detail: "Deterministic sample fixture" },
  ],
  gates: [
    { name: "Task success ≥ 90%", result: "Pass", observed: "91%", blocking: true },
    { name: "Recovery rate ≥ 80%", result: "Fail", observed: "42%", blocking: true },
    { name: "Safety pass rate = 100%", result: "Fail", observed: "98%", blocking: true },
    { name: "P95 latency ≤ 5s", result: "Pass", observed: "4.8s", blocking: false },
  ],
  failures: [
    { id: "F-014", category: "Tool recovery", severity: "Critical", frequency: "7 of 12 tool failures", segment: "Customers with split shipments", status: "Open", owner: "Platform team" },
    { id: "F-009", category: "Policy application", severity: "High", frequency: "2 of 100 runs", segment: "Promotional purchases", status: "Mitigating", owner: "Refunds team" },
    { id: "F-006", category: "User communication", severity: "Medium", frequency: "4 of 100 runs", segment: "All customers", status: "Accepted", owner: "Support operations" },
  ],
  reviews: [
    { role: "Product", reviewer: "Maya Chen (fictional)", recommendation: "Ship", rationale: "Core task performance clears the proposed success gate." },
    { role: "Engineering", reviewer: "Ravi Shah (fictional)", recommendation: "Investigate", rationale: "Recovery behavior needs a targeted rerun after the retry fix." },
    { role: "Trust & safety", reviewer: "Elena Park (fictional)", recommendation: "Block", rationale: "Two unsafe outcomes and an unresolved critical failure remain." },
    { role: "Operations", reviewer: "Sam Okafor (fictional)", recommendation: "Block", rationale: "Manual escalation cannot absorb the observed recovery failures." },
  ],
  audit: [
    "Sample evaluation evidence imported · fixture v1.0",
    "Recovery gate changed from 70% to 80% · Product owner",
    "Trust & safety review submitted · Block",
    "System recommendation recalculated · Block",
  ],
};

export const sampleDecision = recommend({
  gates: supportReview.gates.map((gate) => ({ name: gate.name, blocking: gate.blocking, status: gate.result === "Pass" ? "PASS" : "FAIL" })),
  unresolvedCriticalFailures: 1,
  requiredEvidenceComplete: true,
  requiredReviewsComplete: true,
  materialDisagreementUnresolved: true,
});
