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

- **Status:** Proposed for implementation
- **Date:** 2026-07-14
- **Decision:** Prioritize one labeled sample workflow, JSON import/provenance, core metrics, several failures, configurable gates, four conflicting reviews, deterministic Block reasoning, and Markdown/print memo.
- **Basis:** Explicit one-week constraint and RICE assumptions in `ROADMAP.md`.
- **Consequence:** CSV implementation, PDF-specific export, integrations, permissions, and portfolio features follow only after the core slice and research.

## Open decisions

| ID | Question | Evidence needed | Owner placeholder |
| --- | --- | --- | --- |
| OD-001 | Which gate defaults vary by risk tier/domain? | Interviews plus policy/artifact review | Product + safety |
| OD-002 | What evidence is sufficient to resolve Investigate? | Recent decision walkthroughs | Product + engineering |
| OD-003 | Who can override Block and with what approvals? | Governance/security research | Safety + decision owner |
| OD-004 | What metric definitions are portable across workflows? | Evaluation artifact review | Engineering |
| OD-005 | Must the record live in an existing system? | Workflow and competitive-category research | Product + operations |
| OD-006 | Which export, retention, identity, and audit controls are required? | Enterprise discovery | Operations + security |

When research changes a decision, append a new entry; do not rewrite prior rationale as if it had always been known.
