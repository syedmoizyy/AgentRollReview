# Beta Launch Plan

## Status and boundary

This is a proposed beta plan, not a completed launch or evidence of adoption. Names, cohort sizes, dates, and service levels remain placeholders until owners accept them.

## Beta objective

Validate that the six-area governance workflow helps teams complete traceable release decisions while keeping hard blockers, severe failures, missing evidence, and reviewer disagreement visible.

## Cohort

- Begin with 2–3 internal or design-partner teams that conduct recurring cross-functional reviews for tool-using AI workflows.
- Require a named product coordinator, engineer, trust/safety contact, operations contact, and decision owner.
- Include a mix of High and Medium risk workflows only after trust/safety approves eligibility; exclude workflows without incident classification, rollback capability, or 30-day follow-up.
- Limit each team to one active beta review initially so support and audit quality remain observable.
- Do not describe invited, enrolled, or active teams as customers or adoption until participation is documented.

## Entry criteria

- Versioned evidence source and required-evidence list are declared.
- Hard-block policy and owners are agreed before results are inspected.
- Critical roles and exception authority are documented.
- Rollback/disable mechanism, trigger owner, and incident severity definitions exist.
- Data handling and retention are approved for the beta environment.

## Enablement

1. A 45-minute role-based walkthrough using only the fictional Support Refund Agent fixture.
2. A one-page checklist covering import provenance, gate configuration, severe-failure classification, role submissions, override requirements, memo export, and rollback triggers.
3. A dry run where each role explains which evidence changes its position; completion is not treated as agreement.
4. Office hours during the first live review and a named support channel.
5. Decision owners acknowledge that the system recommendation does not authorize launch.

## Instrumentation

Capture append-only events for evidence imports/validation, gate creation and changes, failure severity/status changes, review-ready time, role submissions, remediation requests, critical-role exceptions, recommendation recalculation, overrides, final decisions, memo exports, launch start, rollback triggers/actions, and confirmed incidents.

Required event properties:

- workspace/workflow and immutable evidence version;
- production versus sample flag;
- actor identity and role when applicable;
- event and client/server timestamp;
- before/after values for policy and disposition changes;
- reason code, owner, and due/review date where applicable.

Do not instrument prompts, model content, or sensitive evaluation payloads by default. Define retention and access before collecting production records.

## Support model

- **Product coordinator:** triages workflow and usability questions; owns cohort communications.
- **Engineering on-call:** handles import, calculation, persistence, and export defects.
- **Trust/safety contact:** handles severity disputes, false-Ship concerns, and safety stop decisions.
- **Operations contact:** owns launch/rollback readiness and incident coordination.
- Publish response targets as beta goals only after staffing is confirmed. Safety stop reports bypass normal triage.
- Maintain a known-issues log and record material support interventions in the audit timeline.

## Rollout stages

1. **Fixture validation:** roles complete the fictional scenario and verify definitions.
2. **Shadow review:** run alongside the current process; Agent Rollout Review does not authorize release.
3. **Decision-record beta:** use the product as the system of record only after parity and audit checks pass.
4. **Expansion review:** add teams/workflows only after guardrails and support load are reviewed.

## Rollback and stop triggers

Pause new reviews and revert to the documented current process when any occurs:

- a Ship recommendation or finalization is possible with failed hard blockers, missing critical evidence, unresolved critical failures, or missing critical reviews/exceptions;
- evidence versions, reviewer positions, original recommendations, or audit events are lost or silently rewritten;
- metric calculations differ for identical snapshots;
- a severe incident is plausibly linked to a missed or hidden pre-launch signal;
- export exposes data beyond the intended review record;
- identity/role attribution is incorrect in a material decision;
- the support team cannot respond to safety-critical defects within the approved beta target.

Rollback means disabling decision finalization, preserving/exporting existing records, notifying cohort owners, documenting the event, and using the prior review process until re-entry criteria pass.

## Review cadence

- Daily internal triage during each team's first live review.
- Weekly cohort review of delays, missing evidence, gate failures, severe failures, dissent, exceptions, overrides, support issues, and data quality.
- Decision-specific review at the memo's next-review date.
- 14-day check after each launch for rollback triggers and reopened decisions.
- 30-day post-launch safety and operations review before that workflow contributes to experiment guardrail analysis.
- End-of-stage retrospective before cohort expansion.

## Exit criteria

Move beyond beta only with complete audit records, zero false-confidence Ship events, acceptable support load, reproducible snapshots/exports, reviewed severe-incident data, and explicit approval from product, engineering, trust/safety, operations, and the decision owner. Zero observed incidents in a small beta is not evidence of safety equivalence.

