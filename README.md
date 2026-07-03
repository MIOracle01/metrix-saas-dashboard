# Metrix — SaaS Analytics Dashboard

A production-style SaaS analytics dashboard (MRR, active users, churn, ARPU) built as a
portfolio-grade reference project.

## Stack

- React 19 + TypeScript
- Vite 8
- React Router v6 (data router)
- TanStack React Query v5 (server state, mock API layer)
- Zustand v5 (client/UI state: auth, theme, sidebar, filters)
- Tailwind CSS v4
- Recharts (MRR area chart, user growth bar chart, churn line chart)

## Architecture

Feature-Sliced-Design–light layout:

```
src/
  app/          # router, providers, layout shells, route guards
  pages/        # route-level compositions (Login, Dashboard, Users, 404)
  widgets/      # composite UI blocks (Sidebar, Topbar, KpiCards, charts, tables)
  features/     # user-facing actions (LoginForm, ThemeToggle, CustomersFilters)
  entities/     # domain models + mock API clients (user, metric)
  shared/       # UI kit, lib helpers, api client, route constants
  stores/       # zustand stores (auth, theme, ui, customers filters)
```

Each entity (`user`, `metric`) owns its types and a mock API module that simulates network
latency, so swapping in a real backend later only means replacing the `api/*.ts` files —
nothing above the entity layer needs to change.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173. The login screen accepts any email + a password of 4+
characters (demo/mock auth backed by `localStorage` via Zustand's `persist` middleware).

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

## Notes

- All data (KPIs, charts, customer list) comes from an in-memory mock API in
  `src/entities/*/api` with artificial latency — no backend required.
- Theme (light/dark) and sidebar collapse state persist across reloads.
- The customers table supports search, status filtering, and pagination, all driven by a
  dedicated Zustand store and re-fetched through React Query.
