# Experiment Plan: Reduce Review Time Without Weakening Safety

## Status and claim boundary

This is a proposed experiment. It has not started, no participants have been recruited, and no results exist. Sample sizes and thresholds below are planning assumptions that must be reviewed with product, engineering, trust/safety, and operations before launch.

## Decision to inform

Should the team expand the structured Agent Rollout Review workflow because it reduces time from review-ready evidence to a recorded disposition without increasing severe post-launch incidents or permitting false-confidence Ship decisions?

## Hypothesis

A structured evidence checklist, predeclared gates, parallel role views, and one decision memo will reduce median time-to-decision relative to the team's existing review process. The change is acceptable only if safety guardrails are not degraded.

## Population and unit of assignment

- Eligible units: real, upcoming release reviews for tool-using AI workflows that already have a named decision owner, imported evaluation evidence, and a documented rollback path.
- Exclude emergency releases, regulatory deadlines that prohibit random assignment, and releases lacking post-launch incident tracking.
- Unit of assignment: a review record, stratified by workflow risk tier and owning team.
- Proposed pilot: enough eligible reviews to cover at least two review cycles per participating team. Do not set a fixed count until the eligible review rate and baseline variance are known.

## Design

Use a prospective, stratified controlled trial where feasible:

1. Before assignment, record risk tier, workflow type, required roles, evidence requirements, and `review_ready_at` using one shared definition.
2. Randomly assign eligible reviews within risk-tier strata to:
   - **Structured workflow:** Agent Rollout Review with predeclared gates, role submissions, memo, and audit timeline.
   - **Current process:** the team's existing review process, with only the minimum instrumentation needed to measure the same endpoints.
3. If randomization is operationally impossible, use a stepped-wedge rollout by team and report the design limitation; do not present before/after differences as causal without adjustment.
4. Analyze on assigned group. Segment results by risk tier and outcome rather than pooling away material differences.

## Measures

### Primary speed measure

**Median time-to-decision:** elapsed hours from the moment all predeclared required evidence is valid and the record is explicitly marked review-ready to the first recorded Ship, Investigate, or Block disposition.

- Pause clocks only for documented external holds defined before the experiment.
- Report the distribution and 75th percentile; do not optimize only the median.
- Investigate is a completed disposition only when it names requested evidence/action, owner, and review date.

### Safety and decision-quality guardrails

1. **Severe post-launch incident rate:** releases with a confirmed Severity 1 or Severity 2 incident attributable to the reviewed workflow within 30 days / launched workflows with 30 days of observation.
2. **False-confidence Ship count:** Ship decisions with missing required evidence, a failed hard blocker, an unresolved critical failure, or a missing designated critical review/exception. Target: zero in both groups.
3. **Severe-failure escape count:** launched workflows where a pre-launch High/Critical failure was known but absent from the decision memo. Target: zero.
4. **Override integrity:** overrides retaining system recommendation, evidence snapshot, approver, rationale, and review date / all overrides. Target: 100%.
5. **Rollback readiness:** launched workflows with named rollback owner and tested trigger path / launched workflows. Proposed threshold: 100%.

Severe incidents are rare; a small beta cannot establish statistical safety equivalence. Any observed increase is a stop signal, while zero observed incidents is not proof of no added risk.

### Diagnostic measures

- Time waiting for evidence, role reviews, remediation, and final owner action.
- Gate failure and insufficient-evidence counts by gate, not as a quality score.
- Required evidence completeness at first review submission.
- Reviewer disagreement visibility and documented resolution/ownership.
- Reopened decisions within 14 and 30 days.

## Success and stopping rules

Proceed to a broader beta only when all are true:

- median time-to-decision improves by a predeclared practically meaningful amount set after baseline measurement;
- no false-confidence Ship or severe-failure escape occurs;
- no credible signal of increased severe post-launch incidents appears;
- override integrity and rollback readiness meet their thresholds;
- trust/safety and operations reviewers confirm that faster decisions did not come from narrowed evidence or skipped review.

Stop assignment and review immediately for any false-confidence Ship, missing severe failure in a memo, unowned rollback trigger, corrupted audit history, or credible experiment-related increase in severe incidents.

## Analysis and reporting

- Compare groups using median differences with bootstrap confidence intervals; report counts and denominators alongside rates.
- For severe incidents, show exact counts, exposure windows, and uncertainty. Do not claim non-inferiority unless a statistician approves a margin and the study is adequately powered.
- Report missing timestamps and protocol deviations.
- Have trust/safety review incident attribution without knowing the speed result when practical.
- Record neutral, adverse, and disconfirming findings in `DECISION_LOG.md`.

## Instrumentation required

`review_created`, `evidence_requirement_declared`, `evidence_imported`, `evidence_validated`, `review_ready`, `gate_evaluated`, `role_review_submitted`, `remediation_requested`, `decision_recorded`, `override_recorded`, `launch_started`, `rollback_triggered`, and `incident_confirmed`, each with workflow ID, evidence version, actor/role where appropriate, timestamp, and sample/production flag.

## Owners and approvals

- Experiment owner: Product placeholder
- Metric validity: Engineering placeholder
- Safety guardrails and incident attribution: Trust/safety placeholder
- Launch/rollback instrumentation: Operations placeholder
- Final approval: Named decision owner required before enrollment

