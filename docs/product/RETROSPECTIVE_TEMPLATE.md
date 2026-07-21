# Release Review Retrospective Template

Use this template after a beta stage, significant decision, rollback, or experiment checkpoint. Separate observed facts from interpretation. Do not infer adoption, prevalence, causality, or safety from fictional fixtures or a small purposive sample.

## Record

- Retrospective date:
- Facilitator:
- Workflow/review IDs:
- Evidence versions:
- Review period:
- Outcome(s): Ship / Investigate / Block
- Participants and accountable roles:
- Sample, shadow, beta, or production data:

## Intended decision and success criteria

- Decision the workflow needed to support:
- Predeclared evidence requirements:
- Predeclared gates and hard blockers:
- Required critical roles/exceptions:
- Rollback triggers and next review date:
- Experiment assignment, if applicable:

## Observed timeline

| Event | Timestamp | Actor/role | Evidence or audit reference |
| --- | --- | --- | --- |
| Review ready | | | |
| Gate evaluation | | | |
| Role reviews complete/excepted | | | |
| Decision recorded | | | |
| Launch/rollback | | | |
| Post-launch review | | | |

## Decision-quality checks

- Were all recommendation reasons traceable?
- Were severe failures visible and correctly classified?
- Was missing evidence treated as missing rather than passing?
- Was disagreement preserved and resolved or owned?
- Did every remediation/risk have an owner and date?
- Did an override retain the original recommendation and snapshot?
- Could the memo be reproduced from the same inputs?

## What happened

### Facts

- Quantitative observations with numerator/denominator:
- Confirmed incidents or rollback triggers:
- Missing/corrupt data:
- Support interventions:

### Participant observations

- Quote or close paraphrase:
- Role and context:
- Do not convert this into measured prevalence:

### Interpretation

- What may explain the outcome:
- Alternative explanations:
- Confidence: low / medium / high
- Evidence that would change this interpretation:

## Time-to-decision decomposition

| Stage | Duration | Expected? | Cause | Owner/action |
| --- | ---: | --- | --- | --- |
| Waiting for evidence | | | | |
| Waiting for role reviews | | | | |
| Resolving gates/failures | | | | |
| Final owner action | | | | |

Did any speed improvement come from skipped evidence, narrower scope, absent roles, or hidden disagreement? If yes, treat it as a guardrail failure, not success.

## Safety and rollback review

- Severe incidents in the observation window, with denominator:
- Attribution status and reviewer:
- Known pre-launch signals:
- Trigger detected and response time:
- Rollback/disable action taken:
- User/operational consequence:
- Follow-up owner and due date:

## Keep, change, stop

### Keep

- Practice:
- Supporting evidence:

### Change

- Change:
- Owner:
- Due date:
- Validation method:

### Stop

- Practice:
- Reason and risk:

## Decision-log updates

- New or changed decision:
- Basis and evidence status:
- Consequence:
- Open question added/closed:

## Follow-up

| Action | Owner | Due date | Blocking? | Evidence of completion |
| --- | --- | --- | --- | --- |
| | | | | |

- Next review date:
- Expansion, continue, pause, or rollback:
- Named approver:
