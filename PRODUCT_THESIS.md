# Agent Rollout Review: Product Thesis

## Product thesis

Agent Rollout Review helps a cross-functional team make a defensible launch decision for a tool-using AI workflow. It turns deterministic evaluation evidence, failure analysis, explicit release policy, and accountable stakeholder judgment into one auditable outcome: **Ship**, **Investigate**, or **Block**.

The product is a decision and governance layer, not an LLM observability dashboard. It does not replace trace collection, experiment platforms, or incident monitoring; it organizes their relevant evidence around a release decision.

## Primary job to be done

When a tool-using AI workflow is approaching release, help product, engineering, trust and safety, and operations reviewers assemble the relevant evidence, expose unresolved risk, apply agreed thresholds consistently, and record who decided what and why so the team can make and later defend the launch decision.

## Target users and roles

- **Product manager:** owns intended user value, affected users, product tradeoffs, and the final review process.
- **Engineer:** owns evaluation validity, technical dependencies, reliability, recovery behavior, and remediation feasibility.
- **Trust and safety reviewer:** owns safety risk interpretation, severity, vulnerable segments, and blocking concerns.
- **Operations lead:** owns support readiness, escalation paths, monitoring, and operational recovery.
- **Decision owner:** accepts the recommendation or records an explicit override with rationale.

These roles and responsibilities are product hypotheses until validated with real users.

## Decision outcomes

### Ship

Use when every blocking gate passes, no unresolved critical failure remains, required reviews are complete, and residual risks have named owners and acceptable mitigations. A Ship decision can include non-blocking follow-up actions and monitoring commitments.

### Investigate

Use when evidence is incomplete, contradictory, stale, or too narrow to support a responsible decision; when stakeholder concerns need resolution; or when a non-blocking threshold misses and remediation or targeted evaluation could materially change the result. Investigate is a time-bounded request for specific evidence or action, not an indefinite holding state.

### Block

Use when any configured blocking gate fails, an unresolved critical failure or unacceptable safety consequence exists, or the workflow lacks a viable mitigation for a material risk. Strong aggregate performance must not override a blocking condition. For example, the demo's explicitly labeled sample workflow may show 91% task success and still be blocked because tool-failure recovery is below its required threshold.

## Locked MVP scope

The MVP contains exactly six product areas:

1. **Workflow profile:** intended user value, owner, lifecycle state, risk level, affected users, tools, dependencies, and potential failure consequences.
2. **Evaluation evidence:** documented JSON/CSV import; deterministic sample fixtures; validation errors; success, latency, cost, consistency, safety, and recovery summaries; source and import timestamp.
3. **Failure taxonomy:** failure records classified by category, severity, observed frequency, affected segment, evidence link, status, mitigation, and owner.
4. **Release gates:** configurable metric thresholds and categorical blocking rules with operator, target, rationale, scope, and deterministic pass/fail/not-evaluated status.
5. **Stakeholder review:** product, engineering, safety, and operations assessments; recommendation, rationale, concerns, conditions, reviewer identity, and timestamp; disagreement stays visible.
6. **Decision memo and audit log:** deterministic recommendation, gate results, evidence, stakeholder disagreement, unresolved risks, owners, follow-ups, decision/override rationale, and append-only change history; exportable in a portable format.

## Product principles

- **Policy before score:** explicit blocking rules outrank aggregate averages.
- **Evidence provenance:** every material claim points to an imported record, classified failure, gate, or signed review.
- **Visible disagreement:** conflicting reviews are decision input, not noise to average away.
- **Deterministic by default:** identical inputs and policy produce the same recommendation; no paid model API is required.
- **Human accountability:** software recommends; a named decision owner records the disposition and any override.
- **No invented proof:** sample data and placeholders are labeled and never presented as customer evidence.

## Assumptions log

| Type | Statement | How it is treated |
| --- | --- | --- |
| Known fact | The requested product governs release decisions for tool-using AI workflows. | Product boundary. |
| Known fact | The MVP must run without a paid model API and use deterministic fixtures/imports. | Architecture constraint. |
| Known fact | The demo must include evidence, classified failures, configurable gates, conflicting reviews, and an explanatory memo. | Acceptance criterion. |
| Known fact | The required outcome vocabulary is Ship, Investigate, and Block. | Core domain model. |
| Product hypothesis | Teams will benefit from one structured review rather than evidence scattered across documents and dashboards. | Validate through workflow interviews and prototype tasks. |
| Product hypothesis | Explicit thresholds plus visible dissent will improve decision consistency and defensibility. | Test with repeated scenario reviews across roles. |
| Product hypothesis | A PM or release owner will coordinate the review while domain reviewers own their assessments. | Validate role ownership and permissions. |
| Product hypothesis | Deterministic recommendations will build more trust than opaque generated judgments in the MVP. | Compare comprehension and confidence in usability sessions. |
| Sample data | A demo workflow may have 91% task success and fail its recovery gate. | Label `SAMPLE` in fixtures and UI; never cite as observed performance. |
| Sample data | Demo failures, stakeholder names, comments, thresholds, costs, and latency values are fictional. | Clearly label throughout UI and exports. |
| Requires validation | Which metrics and gate defaults differ by workflow risk tier and domain? | Interview reviewers; do not imply universal defaults. |
| Requires validation | What evidence is sufficient to move from Investigate to Ship? | Scenario testing with cross-functional teams. |
| Requires validation | Who can override a Block recommendation, and what approvals are required? | Customer governance and compliance research. |
| Requires validation | Which export formats, retention rules, identity controls, and integrations are mandatory? | Enterprise discovery and security review. |

## Non-goals for the MVP

- Running model evaluations, agents, or production traffic.
- Live trace ingestion, observability, alerting, or incident response.
- LLM-generated decisions, summaries, failure labels, or remediation advice.
- Universal benchmarks or claims that one threshold fits every domain.
- Automated regulatory compliance or legal assurance.
- Enterprise SSO, granular RBAC, approvals, notifications, or external integrations.
- Collaborative real-time editing, portfolio analytics, or longitudinal production monitoring.
- Claims about user adoption, conversion, evaluation efficacy, or interview findings.

## Demo success criteria

A reviewer can load a clearly labeled fictional workflow, inspect imported deterministic evidence, understand several classified failures, change a release gate and see its deterministic effect, compare conflicting stakeholder reviews, and export a memo that explains the resulting Ship, Investigate, or Block recommendation with unresolved risks, owners, and follow-up actions.
