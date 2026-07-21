# Roadmap and Prioritization

## Method and assumptions

Use a lightweight RICE score: `(Reach × Impact × Confidence) / Effort`. Reach is the number of the four core roles directly served in a representative review, Impact uses 0.5/1/2/3, Confidence is 0–1, and Effort is estimated engineer-days. Scores rank hypotheses; they are not measured customer demand.

| Capability | R | I | C | E | Score | Rationale |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Deterministic decision engine + reason codes | 4 | 3 | 0.90 | 2 | 5.40 | Core differentiation and severe-failure safeguard |
| Labeled sample workflow + profile | 4 | 2 | 0.95 | 2 | Establishes decision context and supports demo |
| Versioned JSON import + provenance | 3 | 3 | 0.85 | 2 | Makes recommendation evidence-backed without APIs |
| Configurable blocking gates | 4 | 3 | 0.85 | 3 | Expresses release policy and 91%/recovery scenario |
| Four role reviews + visible disagreement | 4 | 3 | 0.80 | 3 | Captures cross-functional judgment without averaging |
| Failure classification | 4 | 2 | 0.80 | 2 | Connects technical failures to consequence and ownership |
| Deterministic memo + basic audit events | 4 | 3 | 0.75 | 3 | Makes decision defensible and portable |
| CSV import parity | 2 | 1 | 0.65 | 2 | Valuable interoperability; JSON proves the first slice |
| PDF-specific export | 2 | 1 | 0.45 | 3 | Print HTML/Markdown can validate the need first |
| Live integrations | 3 | 2 | 0.35 | 8 | High uncertainty and outside deterministic one-week scope |

## One-week committed slice

- **Day 1:** domain truth table, schema, labeled fixture, foundational tests.
- **Day 2:** workflow profile and JSON import with validation/provenance.
- **Day 3:** metrics, classified failures, editable gates, reason codes.
- **Day 4:** four stakeholder reviews, disagreement, recommendation view.
- **Day 5:** Markdown/print memo, basic audit history, end-to-end test, accessibility/manual QA, limitation notes.

If capacity tightens, preserve the decision engine, provenance, blocking precedence, visible disagreement, and memo. Reduce visual polish, field breadth, and edit surfaces before removing safeguards.

## Implementation status as of 2026-07-20

This status reflects repository behavior, not user validation or adoption.

| Area | Implemented locally | Remaining |
| --- | --- | --- |
| Workflow and evidence | Labeled fictional workflow, documented JSON/CSV contract, local validation, deterministic metrics, row drill-down | Prisma transactions, durable imports, immutable evidence versions |
| Failures and gates | Failure review helpers; configurable pure gate evaluation; Block/Investigate/Ship precedence and boundary tests | Persisted edits/results and validated production defaults |
| Stakeholder review | Four role views; identity, rationale, evidence comments, remediation, Approve/Reject/Abstain; critical-role exceptions; visible dissent | Authentication, authorization, durable submissions, notification/coordination |
| Decision and audit | Deterministic recommendation/override rules; complete memo; Markdown/HTML/browser-print export; seeded import/rule/review/override/decision timeline | Durable append-only audit, immutable snapshots, production export/retention controls |
| Decision-support analytics | Seeded, explicitly fictional process diagnostics with definitions and denominators | Production instrumentation, data-quality monitoring, baseline measurement, research validation |

Implementation tradeoff: the vertical slice prioritizes pure deterministic domain behavior and a complete inspectable journey over database-backed mutation. Interactive changes currently remain local demo state; the Prisma schema expresses the intended persistence boundary but migrations and live database behavior are not verified here.

## Next (after research and first slice)

- Connect imports, gate edits, failures, reviews, exceptions, overrides, decisions, and audit events through Prisma transactions.
- Add migrations and immutable decision/evidence snapshot persistence.
- Instrument the event contract in `EXPERIMENT_PLAN.md` and `LAUNCH_PLAN.md`, including explicit `review_ready_at`.
- Add Investigate follow-up and resolution evidence without weakening blocking precedence.
- Conduct accessibility/manual QA and validate browser export fidelity.
- Run research before introducing risk-tier templates, permission policy, or universal defaults.

## Later, only with validated demand

Evidence-system integrations, authentication/RBAC, approval policy, notifications, multi-workspace portfolio reporting, retention controls, and deployment/release connections.

## Explicitly not planned for MVP

LLM-generated summaries or classifications, agent execution, observability, automated experiment assignment, regulatory certification, universal scoring, and fabricated performance or adoption claims. The implemented compact dashboard is limited to seeded single-workspace decision-process diagnostics; it is not portfolio performance reporting.
