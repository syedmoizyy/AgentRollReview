# ADR-001: PostgreSQL persistence

- Status: Accepted
- Date: 2026-07-15

## Context

The initial build plan proposed SQLite for a local demo. The implementation requirement now explicitly specifies Prisma with PostgreSQL and Docker Compose.

## Decision

Use PostgreSQL 16 locally through Docker Compose and Prisma as the persistence boundary. Keep recommendation and import rules as pure TypeScript so core governance behavior remains deterministic and testable without database or model calls.

## Consequences

Local persistence requires Docker or another compatible PostgreSQL instance. The application can still present labeled deterministic fixtures without an LLM API. Production tenancy, backup, retention, and access controls remain unresolved.
