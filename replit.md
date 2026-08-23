# Project CORE

Project CORE is a static-first offline resource environment for curating,
maintaining, and exporting a personal collection of trusted resources.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

Project CORE itself does not require the API server, database, or any Replit
runtime. Its app package is `artifacts/project-core`; the static output is
`artifacts/project-core/dist/public`.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/project-core/src/App.tsx` — base-aware client routes and UI
- `artifacts/project-core/src/data/core-data.ts` — local resource and pack data
- `artifacts/project-core/src/hooks/use-core-store.tsx` — browser persistence
- `artifacts/project-core/src/index.css` — CORE design tokens and surfaces
- `artifacts/project-core/public/` — static logo and manifest schema
- `.github/workflows/deploy-project-core.yml` — GitHub Pages deployment

## Architecture decisions

- CORE is client-only by design: no account, backend, database, or hosted API is
  needed for its core workflows.
- Resources remain discovery records with official source links; CORE does not
  mirror or automatically download third-party content.
- User state uses a storage wrapper so the persistence implementation can move
  from localStorage to IndexedDB later without changing the UI contract.
- Vite `BASE_PATH` and a base-aware router keep the same build usable at the
  domain root and under `/project-core/` on GitHub Pages.

## Product

The app provides a CORE overview, searchable Atlas, resource details with
official acquisition links, editable local profile, curated packs, storage
estimates, and JSON manifest import/export.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
