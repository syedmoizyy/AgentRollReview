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

## Next (after research and first slice)

- CSV parity and richer import error recovery.
- Immutable decision snapshot/version UX.
- Investigate follow-up workflow and resolution evidence.
- Risk-tier templates only after threshold research.
- Stronger accessibility, responsive behavior, and export fidelity.

## Later, only with validated demand

Evidence-system integrations, authentication/RBAC, approval policy, notifications, portfolio reporting, retention controls, and deployment/release connections.

## Explicitly not planned for MVP

LLM-generated summaries or classifications, agent execution, observability, experiment running, regulatory certification, universal scoring, and fabricated performance or adoption claims.
