# KPI Tree

All metrics below are proposed definitions, not measured outcomes. Initial MVP work should instrument them only with sample data or research-task observations clearly labeled as such.

## North-star outcome

**Defensible decisions completed within an acceptable time-to-decision.**

A defensible decision is one where required evidence and reviews are complete, every recommendation reason is traceable to versioned evidence or policy, severe unresolved failures cannot be hidden, disagreement is recorded, and risks/actions have owners. Track quality and speed together; speed alone can reward unsafe shortcuts.

```text
Defensible decisions completed within target time
├─ Decision quality
│  ├─ Required evidence completeness
│  ├─ Recommendation reasons with traceable sources
│  ├─ Required role-review completeness
│  ├─ Unresolved risks/actions with owners
│  └─ Decision snapshot reproducibility
└─ Time-to-decision
   ├─ Time from review-ready to recorded disposition
   ├─ Time waiting for evidence
   ├─ Time waiting for role reviews
   └─ Time spent resolving failed gates/disagreement
```

## Proposed measures

| Metric | Definition | Interpretation caution |
| --- | --- | --- |
| Defensible decision rate | Decisions meeting every quality condition / recorded decisions | Conditions require research validation; do not self-certify real-world quality from form completion alone. |
| Median time-to-decision | Median elapsed time from explicit `review_ready_at` to decision | Segment by risk tier and outcome; faster Block may be healthy. |
| Evidence completeness | Required evidence items valid and present / required items | “Required” must be policy-driven, not optimized after results. |
| Rationale traceability | Recommendation reason codes linked to evidence/gates / all reason codes | Link presence does not prove evidence validity. |
| Review completion | Required submitted role reviews / required role reviews | Completion does not imply consensus. |
| Owned follow-up rate | Unresolved risks/actions with owner and due date / unresolved risks/actions | Names and dates do not prove execution. |

## Guardrails

- **False-confidence guardrail:** zero Ship recommendations when required evidence is missing, a required gate is not evaluable, or required reviews are incomplete. Audit overrides separately.
- **Severe-failure guardrail:** zero Ship recommendations with an unresolved critical failure or failed blocking gate.
- **Disagreement guardrail:** percentage of decisions with material role disagreement that visibly preserve each position, resolution, and owner; target is 100% visibility, not zero disagreement.
- **Override guardrail:** 100% of overrides retain the original recommendation, named decision owner, rationale, timestamp, and evidence snapshot.
- **Provenance guardrail:** 100% of imported evidence used in a decision has schema version, source, checksum, and validation status.

## Diagnostic cuts

Segment by risk tier, workflow type, affected segment, outcome, blocking reason, role, and evidence source. Do not compare teams on raw speed without controlling for risk and review complexity.

## Research-phase indicators

For 5–8 interviews, report task comprehension and observed breakdowns qualitatively with participant counts only for transparency. Do not present this small purposive sample as adoption, conversion, or prevalence.
