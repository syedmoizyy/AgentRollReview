# Competitive Category Scan

This scan compares product categories and likely boundaries. It does not claim exhaustive vendor capabilities or superiority; specific products require current, sourced research before a buying or positioning decision.

| Category | Primary job | Evidence contributed to rollout review | Typical gap Agent Rollout Review targets |
| --- | --- | --- | --- |
| LLM/agent observability | Inspect production traces, latency, errors, and behavior | Trace references, runtime failures, tool-call behavior, production metrics | Often optimized for diagnosis/monitoring rather than a cross-functional launch disposition with gates, dissent, owners, and memo |
| Evaluation platforms | Define datasets/tests and compare model or workflow performance | Run-level results, scenario coverage, scores, regression evidence | Evaluation results do not by themselves establish release policy, operational readiness, or accountable risk acceptance |
| Model-risk governance | Inventory models, assess controls, document compliance and approvals | Risk classification, control evidence, policy attestations, approval history | May be broader and heavier than a workflow-level product decision; agent/tool recovery evidence may need separate handling |
| Experiment tracking | Record parameters, artifacts, metrics, and lineage across runs | Reproducibility, artifact provenance, comparative metrics | Optimizes experimentation rather than multi-role review, failure consequence, release gates, and decision memo |
| Release management | Coordinate environments, approvals, deployment gates, and rollback | Change record, approvers, deployment status, automated technical checks | Usually lacks AI-specific evaluation semantics, failure taxonomy, affected segments, and evidence sufficiency logic |

## Positioning hypothesis

Agent Rollout Review sits between evidence systems and release execution. It should ingest or reference evidence, apply explicit AI-workflow release policy, preserve role-level judgment, and export a decision record. It should not rebuild trace viewers, evaluation runners, experiment stores, or deployment orchestration in the MVP.

## Validation questions

- Which category currently holds the de facto source of truth for a launch decision?
- Is the pain missing functionality, weak integration, unclear ownership, or an inconsistent process?
- Would teams adopt a separate decision record, or must it live inside an existing governance/release system?
- Which import/export boundary creates value without recreating upstream products?
- What evidence or approval cannot leave existing systems?
