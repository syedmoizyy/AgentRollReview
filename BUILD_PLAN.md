# Agent Rollout Review: MVP Build Plan

## Delivery boundary

Build a local-first web application covering the six locked areas in `PRODUCT_THESIS.md`. The first end-to-end fixture is explicitly fictional and deterministic. No model call, paid API, network dependency, or generated evaluation outcome is required to run the demo.

## Proposed technical architecture

Use a TypeScript monorepo with a single web application to keep the portfolio demo easy to run and inspect:

- **UI and server:** Next.js App Router with React and server-side route handlers.
- **Domain layer:** framework-independent TypeScript modules for import validation, metric aggregation, gate evaluation, and recommendation policy.
- **Persistence:** SQLite with Prisma for local durability, migrations, and a legible relational model.
- **Validation:** Zod schemas shared by imports, forms, and route handlers.
- **Styling/accessibility:** a small token-based CSS system and accessible native interaction patterns; avoid a large UI dependency unless implementation proves it necessary.
- **Testing:** Vitest for domain and component tests, React Testing Library for interactions, and Playwright for the critical review journey.
- **Export:** deterministic Markdown and print-friendly HTML; PDF is deferred unless it can be added without a browser service or platform-specific dependency.

Architecture rule: recommendation logic lives in a pure domain function. Given a versioned workflow snapshot, evidence set, failures, gate configuration, and reviews, it returns the same outcome and reason codes every time.

## Recommendation policy (initial hypothesis)

Evaluate in priority order:

1. Return **Block** if a blocking gate fails or an unresolved critical failure is present.
2. Otherwise return **Investigate** if required evidence or reviews are missing, a gate is not evaluable, material stakeholder concerns remain unresolved, or a non-blocking gate fails.
3. Otherwise return **Ship**.

The UI must show each reason code and its source. A human decision owner may record a different final disposition only with an override rationale; the system recommendation remains visible in the audit record. Exact defaults and override authority require user validation.

## Route map

| Route | Purpose |
| --- | --- |
| `/` | Review queue, sample-data notice, and create workflow action. |
| `/workflows/new` | Create the workflow profile and intended user value. |
| `/workflows/[workflowId]` | Review overview, completeness, recommendation, and next actions. |
| `/workflows/[workflowId]/profile` | Risk, users, tools, dependencies, and consequences. |
| `/workflows/[workflowId]/evidence` | Import, validate, and summarize JSON/CSV evidence. |
| `/workflows/[workflowId]/failures` | Classify and manage observed failures. |
| `/workflows/[workflowId]/gates` | Configure gates and inspect deterministic results. |
| `/workflows/[workflowId]/reviews` | Collect and compare stakeholder assessments. |
| `/workflows/[workflowId]/decision` | Explain recommendation and record final disposition/override. |
| `/workflows/[workflowId]/memo` | Preview and export the decision memo and audit history. |

Route handlers should expose narrowly scoped CRUD/import/export operations under `/api/workflows/...`; they are an internal application boundary, not a public API commitment.

## Core entities

| Entity | Essential fields |
| --- | --- |
| `Workflow` | id, name, description, intendedValue, owner, status, riskLevel, affectedUsers, tools, dependencies, failureConsequences, sampleDataFlag, createdAt, updatedAt |
| `EvidenceImport` | id, workflowId, formatVersion, sourceName, sourceType, checksum, importedAt, rowCount, validationStatus, errors |
| `EvaluationRun` | id, importId, externalId, scenario, userSegment, success, latencyMs, costUsd, consistencyScore, safetyPassed, recoveryAttempted, recoverySucceeded, occurredAt |
| `MetricSnapshot` | id, workflowId, evidenceVersion, metricKey, value, unit, numerator, denominator, computedAt |
| `Failure` | id, workflowId, evaluationRunId, category, severity, frequency, affectedSegment, description, status, mitigation, owner, evidenceReference |
| `ReleaseGate` | id, workflowId, metricKeyOrRule, operator, threshold, unit, blocking, rationale, required, enabled |
| `GateResult` | id, gateId, evidenceVersion, status, observedValue, reasonCode, evaluatedAt |
| `StakeholderReview` | id, workflowId, role, reviewerName, recommendation, rationale, concerns, conditions, status, submittedAt |
| `Decision` | id, workflowId, evidenceVersion, systemRecommendation, reasonCodes, finalOutcome, decisionOwner, overrideRationale, decidedAt |
| `FollowUpAction` | id, workflowId, decisionId, description, owner, dueDate, status, blocking |
| `AuditEvent` | id, workflowId, actor, action, entityType, entityId, beforeJson, afterJson, timestamp |

Use enums only for stable controlled vocabularies. Store a snapshot/version reference on derived results and decisions so later edits do not silently rewrite historical rationale.

## Deterministic import contract

Ship a versioned JSON fixture and equivalent CSV example. Every file and seeded record must be labeled as sample data.

Required logical fields per evaluation row:

```text
schema_version, run_id, scenario, user_segment, success,
latency_ms, cost_usd, consistency_score, safety_passed,
recovery_attempted, recovery_succeeded, occurred_at
```

JSON may use typed booleans/numbers; CSV documents accepted boolean and decimal representations. Import behavior must:

- reject unknown schema versions and duplicate `run_id` values;
- report row-level errors without inventing or coercing missing outcomes;
- calculate metrics from accepted rows with documented denominators and rounding;
- preserve source name, checksum, timestamp, and validation results;
- make re-import behavior explicit (new evidence version rather than silent replacement).

## Test strategy and acceptance coverage

### Domain unit tests

- Metric calculations, zero denominators, rounding, and missing optional observations.
- Gate operators, boundary equality, disabled gates, and not-evaluable gates.
- Precedence: a blocking recovery miss produces Block even with 91% sample task success.
- Critical unresolved failure produces Block; missing evidence/review produces Investigate; all required conditions passing produces Ship.
- Overrides preserve the original system recommendation and require rationale.
- Memo generation is stable for an identical snapshot.

### Import and persistence tests

- Valid JSON and CSV produce equivalent normalized runs and metrics.
- Invalid version, duplicate IDs, malformed values, missing columns, and partial row errors are surfaced.
- Sample-data flags and provenance survive persistence and export.
- Audit events are appended for material profile, gate, review, failure, and decision changes.

### Component and accessibility tests

- Forms expose validation messages and retain user input.
- Gate results are conveyed by text, not color alone.
- Conflicting reviews and unresolved concerns are visible in the decision view.
- Keyboard navigation, focus order, labels, headings, and dialog behavior cover the main flow.

### End-to-end tests

1. Create/edit a profile and import a fixture.
2. Inspect metrics and classify several failures.
3. Configure a recovery gate that blocks the sample workflow.
4. Submit conflicting role reviews.
5. Confirm the reasoned Block recommendation.
6. Export a memo containing provenance, gate failure, dissent, risks, owners, follow-ups, and audit entries.

## Weekly milestone plan

| Week | Outcome | Exit criteria |
| --- | --- | --- |
| 1 | Foundation and domain contract | App shell, schema/migrations, seed fixture labels, import specification, decision policy tests, and accessible navigation exist. |
| 2 | Profile and evidence | Workflow creation/editing and JSON/CSV validation/import work; provenance and six metric families render from deterministic fixtures. |
| 3 | Failures and release gates | Failure taxonomy CRUD, configurable thresholds, pure gate engine, reason codes, and boundary/precedence tests work. |
| 4 | Reviews and decision | Four role reviews, visible disagreement, completeness checks, deterministic recommendation, and rationale/override handling work. |
| 5 | Memo, audit, and polish | Exportable memo, append-only audit trail, full sample story, accessibility pass, error/empty states, and end-to-end tests are complete. |
| 6 | Portfolio validation and hardening | Usability sessions are planned or conducted without fabricating findings; bugs are triaged; README/demo script, screenshots, and limitations are accurate. |

## Implementation sequence

1. Write the import schema and recommendation truth table before UI implementation.
2. Create schema, migrations, labeled fixture, and seed command.
3. Build the workflow shell and completion model across the six areas.
4. Add profile and evidence flows, then metric aggregation.
5. Add failure classification and gate evaluation with reason codes.
6. Add stakeholder review and deterministic decision workflow.
7. Generate memo/audit exports from an immutable decision snapshot.
8. Run automated coverage and manual scenario/accessibility QA; document limitations.

## Manual QA checklist

- Start from a clean local database and load only labeled sample data.
- Complete the primary flow at desktop and narrow viewport widths.
- Import valid JSON and CSV; confirm equal metrics and clear provenance.
- Try malformed, duplicate, empty, and unsupported-version imports.
- Change the recovery threshold around its exact boundary and verify reason codes/outcomes.
- Confirm a blocking gate outranks aggregate success and stakeholder support.
- Enter conflicting reviews and verify neither is hidden or averaged away.
- Verify missing required evidence leads to Investigate rather than Ship.
- Record an override and confirm rationale, actor, timestamp, and original recommendation remain visible.
- Export the memo and confirm sample labels, evidence, unresolved risks, owners, follow-ups, and audit history.
- Navigate the main journey by keyboard and check focus, labels, contrast, zoom, and non-color status cues.

## Risks and unresolved decisions

- Gate defaults, risk tiers, evidence sufficiency, role permissions, and override policy require real user validation.
- SQLite is appropriate for a local demo but not a decision on production concurrency, tenancy, backup, or retention.
- Audit logs in the MVP demonstrate traceability, not tamper-evident compliance controls.
- Cost, consistency, safety, and recovery need precise measurement definitions in the import documentation to avoid misleading comparisons.
- Markdown/HTML export is portable; production-grade PDF fidelity may need additional tooling.
- Storing reviewer identity as display text is a demo assumption, not an authentication design.

## Explicit non-goals

Do not add agent execution, live observability, model-based classification or writing, paid APIs, third-party integrations, enterprise identity, regulatory claims, universal scoring, portfolio analytics, or production monitoring in the MVP. Do not report sample outcomes as user or customer results.
