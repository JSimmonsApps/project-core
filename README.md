# Project CORE

Project CORE is a static-first, offline-friendly resource environment for curating a personal collection of information and field references.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Run locally

```bash
npm install
npm run dev
```

The development server defaults to `http://localhost:5173`.

## Validate and build

```bash
npm run typecheck
npm run build
```

The static production output is written to `dist/public`.

## Deploy to GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/deploy-project-core.yml`.

1. Upload these files to the root of the `JSimmonsApps/project-core` repository.
2. In the repository settings, set Pages to **GitHub Actions**.
3. Push to `main`, or run the workflow manually.

The workflow builds with `BASE_PATH=/project-core/`, so client-side routes and bundled assets work at the repository Pages URL.

## Portability

CORE has no required account, backend, database, Replit service, or runtime API. User selections and profile data stay in browser storage. The Builder can export a human-readable JSON manifest and import one later on another browser or device.

## Source map

- `src/data/core-data.ts` — local resource, category, and pack data
- `src/hooks/use-core-store.tsx` — browser persistence and manifest state
- `src/App.tsx` — routes and product UI
- `src/index.css` — CORE visual system
- `public/CORE_LOGO.png` — CORE logo
- `public/core-manifest.schema.json` — portable manifest contract
