# Agent Rollout Review

Agent Rollout Review is a release-governance workflow for making a defensible **Ship**, **Investigate**, or **Block** decision for a tool-using AI workflow. It is not an observability dashboard or agent runner. The current UI and seed records are fictional sample data; no interviews, adoption, or product outcomes are claimed.

## Requirements

- Node.js 20 or newer (verified with Node.js 22.16.0)
- npm (verified with npm 10.9.2)
- Docker with Compose for the local PostgreSQL database

No LLM API key, paid model API, or sample login is required.

## Local setup

```powershell
Copy-Item .env.example .env
docker compose up -d postgres
npm install
npm run db:generate
npm run db:migrate -- --name initial
npm run db:seed
npm run dev
```

Open `http://localhost:3000`. The UI currently reads its deterministic display fixture directly, while Prisma defines and seeds the persistence model for subsequent form/import integration.

The Node, Prisma, test, and build commands above were verified in the development workspace. Docker was not installed there, so the Compose startup, migration, and seed commands still require verification on a machine with Docker.

## Verified project commands

```powershell
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Playwright requires its Chromium binary once per machine:

```powershell
npx playwright install chromium
```

## Deterministic evidence

The import contract is documented in `docs/import-format.md`. Equivalent fictional JSON and CSV examples are in `fixtures/evaluations`. Missing results are never interpreted as successes, and re-imports are designed to create evidence versions.

## Current roadmap

1. Connect the validated profile and evidence forms to Prisma transactions and audit events.
2. Implement JSON/CSV upload persistence and computed metric snapshots.
3. Add gate editing, review submission, approvals, and immutable decision snapshots.
4. Export deterministic Markdown/print memos.
5. Validate gate defaults, evidence sufficiency, permissions, and override policy through the planned 5–8 interviews; none have been completed yet.

Product scope and research assumptions are in `PRODUCT_THESIS.md`, `BUILD_PLAN.md`, and `docs/product`.
