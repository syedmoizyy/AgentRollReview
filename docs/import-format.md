# Deterministic evaluation import format

Schema version `2.0` accepts JSON and CSV. Imports are validated locally and shown as a preview before any persistence action. Re-importing creates a new evidence version; it never silently replaces evidence referenced by a decision. The included fixtures are fictional sample data, not measured product outcomes.

## Required fields

| Field | Type | Rules |
| --- | --- | --- |
| `schema_version` | string | Exactly `2.0` on the envelope and every row |
| `run_id` | string | Non-empty and unique within the import |
| `test_case_id` / `test_case` | string | Stable case ID and readable case name |
| `expected_behavior` / `actual_behavior` | string | Non-empty; do not omit or infer outcomes |
| `passed` | boolean | JSON boolean; CSV `true` or `false` |
| `severity` | enum or null | `low`, `medium`, `high`, `critical`; required for failures and null for passes |
| `failure_category` | enum or null | Required for failures and null for passes; see taxonomy below |
| `latency_ms` | integer | Non-negative |
| `cost_usd` | number | Non-negative decimal USD |
| `tool_calls` | string array | JSON array; CSV pipe-delimited (`order.lookup|refund.create`) |
| `evidence_links` | URL array | At least one URL; CSV pipe-delimited |
| `occurred_at` | string | ISO 8601 timestamp |

The JSON envelope also requires `source_name`, `is_sample`, and a non-empty `runs` array. CSV uses the exact row-field headers; source name comes from the uploaded filename and `is_sample` defaults to false. Applications may provide an explicit sample-data control before persistence.

## Failure taxonomy

`incorrect_outcome`, `unsafe_action`, `permission_violation`, `hallucinated_tool_result`, `dependency_failure`, `unrecovered_timeout`, `inconsistent_retry`, `privacy_exposure`, `excessive_cost`, and `latency_breach`.

## Validation and preview

Unsupported versions, missing columns, malformed values, duplicate IDs, invalid URLs, and pass/failure consistency errors block the entire import. Errors identify the one-based data row and field. The preview displays accepted rows, source and sample status before confirmation. Missing or malformed outcomes are never coerced into a success.

See `fixtures/evaluations/support-refund-v2.sample.json` and `.csv`. Version `1.0` fixtures remain in the repository only as historical examples and are not accepted by the `2.0` importer.
