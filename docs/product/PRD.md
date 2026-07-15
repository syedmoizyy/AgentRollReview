# Agent Rollout Review — MVP PRD

## Purpose

Help a cross-functional team make a defensible launch decision for a tool-using AI workflow. The product converts evaluation evidence, classified failures, explicit release gates, and accountable reviews into a deterministic **Ship**, **Investigate**, or **Block** recommendation and an auditable memo.

This is a release-governance workflow, not an observability dashboard, generic CRUD system, chatbot, or agent runner.

## Problem and users

Launch evidence and judgment are often distributed across evaluation outputs, traces, documents, and team-specific tools. Product managers, AI/ML or backend engineers, trust/safety reviewers, and operations leads need one review record that preserves provenance, disagreement, thresholds, ownership, and decision rationale.

## Outcome definitions

- **Ship:** all blocking gates pass, required reviews and evidence are complete, no unresolved critical failure exists, and residual risks have acceptable mitigations and owners.
- **Investigate:** evidence is missing, stale, contradictory, or not evaluable; a non-blocking gate misses; or material reviewer concerns need a specific, time-bounded resolution.
- **Block:** a blocking gate fails, an unresolved critical failure exists, or a material risk lacks an acceptable mitigation. Aggregate success cannot override a blocker.

## One-week MVP scope

The vertical slice covers the six locked areas using a single clearly labeled fictional workflow:

1. **Workflow profile:** view intended value, owner, risk, affected users, tools, dependencies, and consequences.
2. **Evaluation evidence:** import documented JSON, validate it, and calculate deterministic success and recovery metrics with provenance. CSV remains documented but may follow after the one-week slice.
3. **Failure taxonomy:** view and classify seeded failures by category, severity, frequency, segment, status, and owner.
4. **Release gates:** inspect and edit a small set of thresholds; show pass/fail/not-evaluated and reason codes.
5. **Stakeholder review:** capture one assessment for each of four roles and preserve conflicting recommendations.
6. **Decision memo/audit log:** generate the deterministic recommendation and a Markdown/printable memo with evidence, blockers, disagreement, unresolved risks, owners, and actions.

### One-week acceptance scenario

A reviewer opens a record labeled **SAMPLE DATA**, imports a valid deterministic fixture, sees a sample 91% task-success rate, reviews several fictional failures and conflicting assessments, and receives **Block** because the recovery gate fails. Changing the evidence or gate to satisfy all blockers changes the recommendation deterministically. No LLM or paid API is involved.

## Functional requirements

- Validate import schema version, required fields, types, and duplicate run IDs without inventing missing values.
- Preserve source name, checksum, import time, row count, validation errors, and sample-data status.
- Show metric numerator, denominator, unit, and rounding rule.
- Allow failure classification without losing its evidence reference.
- Evaluate gates in a pure, versioned rules function and expose reason codes.
- Treat blocking gate failures and unresolved critical failures as Block before considering aggregate scores or reviewer support.
- Treat missing required evidence/reviews and unresolved material disagreement as Investigate when no blocker exists.
- Preserve each role's review rather than averaging reviews.
- Require an owner and rationale for a recorded human override; retain the original recommendation.
- Export a deterministic memo and append material changes to an audit log.

## Quality requirements

- Runs locally without network access after dependencies are installed.
- Same snapshot produces the same metrics, gate results, recommendation, and memo.
- Status is communicated with text, not color alone; primary flow is keyboard operable.
- Sample fixtures, fictional people, and placeholder dates are visibly labeled.
- Historical decision rationale references an immutable evidence/configuration snapshot.

## Non-goals

Agent execution, live telemetry, trace exploration, model-based classification or writing, third-party integrations, production authentication/RBAC, regulatory certification, universal thresholds, portfolio analytics, notifications, real-time collaboration, and claims of customer adoption or efficacy.

## Dependencies and open decisions

The proposed stack and data entities remain those in `BUILD_PLAN.md`. Gate defaults, evidence sufficiency, risk tiers, override authority, retention, authentication, metric definitions, and production export requirements require research; MVP defaults must be labeled assumptions.

## Release criteria

- The acceptance scenario passes end to end.
- Domain tests cover outcome precedence, boundaries, missing evidence, and deterministic memo generation.
- Valid/invalid import tests preserve provenance and sample labels.
- No severe unresolved failure can yield Ship.
- The memo contains source evidence, gate results, dissent, owners, follow-ups, and audit entries.
