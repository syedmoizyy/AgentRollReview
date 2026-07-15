# Personas and Decision Needs

These are provisional role personas derived from the product thesis, not findings from completed research.

## Product manager — review coordinator

**Decision:** Is the workflow's user value worth the known residual risk, and is the review complete enough to request launch approval?

**Evidence needed:** intended value and affected segments; scenario coverage; aggregate and segment metrics; threshold rationale; unresolved failures; all role assessments; mitigation owners and dates.

**Failure modes:** overweights aggregate task success; accepts incomplete evidence to meet a date; hides dissent in a summary; leaves follow-ups ownerless; treats Investigate as an indefinite queue.

## AI/ML or backend engineer — evidence and reliability owner

**Decision:** Are the evaluation data, tool dependencies, failure behavior, and recovery mechanisms technically valid and sufficient for the proposed release?

**Evidence needed:** import provenance and schema; run-level results; denominators and metric definitions; tool/dependency inventory; reproducibility; failure traces or references; recovery attempts; boundary behavior.

**Failure modes:** optimizes the headline metric while missing severe tails; imports incomparable runs; treats missing recovery observations as success; disputes policy only after results are known; provides technical fixes without user-impact context.

## Trust/safety reviewer — harm and severity owner

**Decision:** Could the workflow cause unacceptable harm to any affected segment, and are safeguards, escalation, and evidence adequate?

**Evidence needed:** failure consequence and segment; severity/frequency classification; safety scenarios and coverage; unresolved critical failures; mitigations and residual risk; override policy; reviewer disagreement.

**Failure modes:** lacks evidence for low-frequency severe cases; severity is diluted by averages; vulnerable segments are absent; safety concerns become non-blocking prose; an override erases the original objection.

## Operations lead — readiness and recovery owner

**Decision:** Can the organization detect, contain, recover from, and support failures at launch?

**Evidence needed:** tool-failure and recovery rates; dependency failure modes; support/escalation path; rollback or disable mechanism; monitoring and ownership; expected volume assumptions; follow-up deadlines.

**Failure modes:** launch occurs without an escalation owner; recovery is tested only on happy paths; operational burden is unbounded; mitigations depend on undocumented manual work; post-launch conditions have no due date.

## Shared collaboration risks

- Identical terms may have different definitions across roles.
- A signed review can be mistaken for agreement rather than an accountable position.
- The decision owner may confuse the system recommendation with authority to launch.
- Time pressure may turn missing evidence into false confidence.

Research should validate these decisions, evidence needs, role boundaries, and failure modes before adding permissions or workflow automation.
