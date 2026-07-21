# Product Decision Log

This log records product decisions and their evidence status. Dates reflect documentation activity, not customer validation.

## DL-001 — Product boundary

- **Status:** Accepted
- **Date:** 2026-07-14
- **Decision:** Build a decision and governance layer for tool-using AI workflow releases, not an observability dashboard, chatbot, generic CRUD product, or agent runner.
- **Basis:** Established product thesis and requested scope.
- **Consequence:** Upstream systems provide evidence; this product structures policy, judgment, outcome, and auditability.

## DL-002 — Outcome vocabulary and precedence

- **Status:** Accepted, defaults require validation
- **Date:** 2026-07-14
- **Decision:** Use Ship, Investigate, and Block. Blocking gate failures and unresolved critical failures take precedence; incomplete/non-evaluable evidence or material unresolved disagreement yields Investigate when no blocker exists.
- **Basis:** Established thesis and build plan.
- **Consequence:** Recommendation logic is deterministic, testable, and reason-coded. Exact gate defaults and disagreement materiality remain hypotheses.

## DL-003 — Six-area MVP

- **Status:** Accepted
- **Date:** 2026-07-14
- **Decision:** Lock the MVP to workflow profile, evaluation evidence, failure taxonomy, release gates, stakeholder review, and decision memo/audit log.
- **Basis:** Established product scope.
- **Consequence:** Features outside these areas must displace, not silently expand, MVP scope.

## DL-004 — Deterministic, API-independent operation

- **Status:** Accepted
- **Date:** 2026-07-14
- **Decision:** MVP works from versioned JSON/CSV formats and clearly labeled fictional fixtures without an LLM or paid API.
- **Basis:** Product constraint and trust requirement.
- **Consequence:** Identical snapshots must reproduce metrics, recommendation, and memo; generated judgment is a non-goal.

## DL-005 — Preserve disagreement and human accountability

- **Status:** Accepted, authority model requires validation
- **Date:** 2026-07-14
- **Decision:** Store role assessments independently; never average away dissent. A human override requires a named owner and rationale while retaining the system recommendation.
- **Basis:** Product principles.
- **Consequence:** Review completion is distinct from consensus. Production override permissions are unresolved.

## DL-006 — One-week vertical slice

- **Status:** Implemented as a local deterministic slice; persistence incomplete
- **Date:** 2026-07-14
- **Decision:** Prioritize one labeled sample workflow, JSON import/provenance, core metrics, several failures, configurable gates, four conflicting reviews, deterministic Block reasoning, and Markdown/print memo.
- **Basis:** Explicit one-week constraint and RICE assumptions in `ROADMAP.md`.
- **Consequence:** JSON/CSV validation, role review, gates, memo, audit fixture, and browser print export are demonstrable without an API. Durable persistence, permissions, integrations, and production controls remain later work.

## DL-007 — Pure domain logic before durable mutation

- **Status:** Accepted implementation tradeoff
- **Date:** 2026-07-20
- **Decision:** Implement gate evaluation, recommendation, role-finalization checks, overrides, analytics, and memo generation as pure TypeScript over deterministic fixtures before connecting database route handlers.
- **Basis:** The MVP must work without an LLM or live database, identical snapshots must reproduce results, and the workspace lacked a verified running PostgreSQL environment.
- **Consequence:** Core governance behavior is tested and inspectable, but interactive edits are local demo state and do not yet constitute a durable multi-user audit record. Prisma remains the intended persistence boundary.

## DL-008 — Browser-native document export

- **Status:** Accepted for MVP; production fidelity requires validation
- **Date:** 2026-07-20
- **Decision:** Generate deterministic Markdown and standalone print-friendly HTML, using the browser print dialog for PDF rather than adding a document service.
- **Basis:** Portable export is required; a heavy service would add operational scope without validating the core decision-record need.
- **Consequence:** The memo works offline and has no service dependency. Popup policy, print fidelity, accessibility, retention, and production document controls remain unresolved.

## DL-009 — Critical-role completion with explicit exceptions

- **Status:** Accepted; authority defaults require validation
- **Date:** 2026-07-20
- **Decision:** Finalization requires each designated critical role to submit an accountable position or a documented exception with role, rationale, approver, and timestamp. Positions remain separate and are never averaged.
- **Basis:** Missing safety or operations judgment must not be mistaken for consensus, while a demo-safe workflow needs an explicit exceptional path.
- **Consequence:** Completion and consensus are distinct. Production designation, exception authority, authentication, and approval policy require governance research.

## DL-010 — Compact process analytics, not vanity reporting

- **Status:** Accepted for seeded demo instrumentation
- **Date:** 2026-07-20
- **Decision:** Show only time-to-decision, gate failure rate, unresolved severe failures, reviewer disagreement, evidence completeness, and decision distribution, with definitions, denominators, missing-data behavior, and the decision each supports.
- **Basis:** The requested analytics must help coordinators find delay or decision-quality risk without turning Ship volume, activity, or sample counts into success claims.
- **Consequence:** The dashboard uses four explicitly fictional seeded records and cannot support product-impact, adoption, benchmarking, or safety claims. Production use requires the event contract, data-quality controls, baselines, and the experiment guardrails.

## Open decisions

| ID | Question | Evidence needed | Owner placeholder |
| --- | --- | --- | --- |
| OD-001 | Which gate defaults vary by risk tier/domain? | Interviews plus policy/artifact review | Product + safety |
| OD-002 | What evidence is sufficient to resolve Investigate? | Recent decision walkthroughs | Product + engineering |
| OD-003 | Who can override Block and with what approvals? | Governance/security research | Safety + decision owner |
| OD-004 | What metric definitions are portable across workflows? | Evaluation artifact review | Engineering |
| OD-005 | Must the record live in an existing system? | Workflow and competitive-category research | Product + operations |
| OD-006 | Which export, retention, identity, and audit controls are required? | Enterprise discovery | Operations + security |
| OD-007 | What practically meaningful time-to-decision improvement justifies expansion without weakening guardrails? | Baseline measurement and controlled beta | Product + safety |
| OD-008 | Which review-process analytics cuts are actionable without encouraging team ranking or threshold gaming? | Beta observation and reviewer research | Product + operations |

When research changes a decision, append a new entry; do not rewrite prior rationale as if it had always been known.
