# Research Plan

## Objective

Validate whether the proposed review record helps teams reach a more defensible launch decision without concealing severe failures or disagreement. No interviews have been completed; all current persona and workflow statements are hypotheses.

## Study design

Conduct **5–8 semi-structured interviews**, 45–60 minutes each, using a neutral walkthrough of the fictional deterministic scenario. Seek coverage across all four roles; one person may represent multiple roles only if that reflects their current work.

### Recruitment criteria

Participants should have done at least one of the following in the last 12 months:

- owned or coordinated a launch decision for an AI-enabled or tool-using workflow;
- built or interpreted offline evaluation evidence for such a workflow;
- reviewed safety, abuse, privacy, or other material launch risk;
- owned operational readiness, escalation, rollback, or support for the launch.

Aim for at least one participant from each role and at least two people who have participated in a cross-functional go/no-go review. Exclude people whose experience is limited to general AI interest with no review responsibility. Do not recruit only teammates already familiar with the concept.

## Research questions

1. What decision does each role actually own, recommend, or veto?
2. What evidence changes the decision, and what evidence is commonly missing or distrusted?
3. How are severe low-frequency failures handled relative to aggregate metrics?
4. When should the outcome be Investigate rather than Block?
5. How is disagreement resolved and preserved today?
6. What makes a release memo credible in a later audit or incident?
7. Which parts of the six-area flow are essential versus administrative burden?

Use the prompts in `INTERVIEW_GUIDE.md`; adapt follow-ups without leading participants toward the proposed solution.

## Session notes template

```markdown
# Session [anonymous ID]
- Date:
- Role(s):
- Relevant launch-review experience:
- Consent / recording status:

## Recent decision walkthrough
- Trigger and stakes:
- Participants and decision rights:
- Evidence used / missing:
- Thresholds or policy:
- Disagreement:
- Outcome and rationale:
- Follow-up / audit needs:

## Observed breakdowns
- Quote or close paraphrase:
- Behavior/context:
- Consequence:
- Frequency claimed (unverified):

## Concept reaction
- Useful:
- Confusing:
- Missing:
- Would not use:

## Researcher interpretation
- Supported hypothesis:
- Contradicted hypothesis:
- New question:
- Confidence: low / medium / high
```

Keep participant statements distinct from researcher interpretation. Do not convert claimed frequency into measured prevalence.

## Synthesis method

1. Create one evidence card per observed behavior, decision, breakdown, or direct need.
2. Tag by role, decision stage, evidence type, severity, and confidence.
3. Affinity-map cards without forcing them into the current six areas.
4. Build a decision/evidence matrix showing who decides, what changes the decision, and what blocks action.
5. Count participants only as directional coverage, not market prevalence.
6. Record confirming and disconfirming evidence in `DECISION_LOG.md` with source session IDs.
7. Review synthesis with a second person when possible to challenge interpretation.

## Scope-change decision rules

- **Keep an MVP area:** at least two roles describe a consequential decision it supports, with no evidence that another area fully covers it.
- **Simplify or remove a field:** three or more relevant participants cannot explain how it changes a decision, and no safety/audit requirement justifies it.
- **Add one-week scope:** only when at least three participants across two roles identify the same missing capability as necessary to complete the core decision, and it fits without displacing deterministic policy, provenance, or severe-failure safeguards.
- **Change outcome logic:** require evidence from at least two roles plus review of the false-Ship/false-Block risk; document the new truth table before implementation.
- **Stop or reposition:** if most participants cannot identify a recurring cross-functional launch decision, or existing process already provides a trusted auditable record with negligible pain.
- **Do not change scope:** based on one preference, hypothetical enthusiasm, vendor feature parity, or an unsupported request for automation.

## Outputs

An anonymized note set, evidence cards, decision/evidence matrix, prioritized findings, updated assumptions, and logged scope decisions. Findings must state sample limitations and must never be represented as adoption, conversion, or outcome data.
