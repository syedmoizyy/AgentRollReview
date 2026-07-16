# Deterministic evaluation import format

Schema version `1.0` accepts JSON or CSV. Fixtures in `fixtures/evaluations` are fictional sample data and are not product evaluation claims.

Required fields per row: `schema_version`, `run_id`, `scenario`, `user_segment`, `success`, `latency_ms`, `cost_usd`, `consistency_score`, `safety_passed`, `recovery_attempted`, `recovery_succeeded`, and `occurred_at`.

- `success`, `safety_passed`, and `recovery_attempted` are booleans.
- `recovery_succeeded` is boolean when recovery was attempted and null/empty otherwise.
- `consistency_score` is from 0 through 1.
- `latency_ms` is a non-negative integer; `cost_usd` is a non-negative decimal.
- `occurred_at` is an ISO 8601 timestamp.
- `run_id` must be unique within an import.

Imports reject unsupported versions and report row/path validation errors. Missing results are never coerced into success. A persisted import must retain source name, checksum, validation status, row counts, import time, and sample-data status. Re-import creates a new evidence version rather than silently replacing a prior decision snapshot.
