# Frontend Engineer Assignment — SignalBoard

SignalBoard is a Next.js App Router analytics dashboard built for the frontend engineer assignment.
The app is token-driven, server-first by default, and URL-state driven for shareable table views.

## Live Demo

- Live URL: `Pending deployment (add Vercel URL here)`

## Tech Stack

- Framework: Next.js 16.1.6 (App Router) + React 19 + TypeScript
- Styling: CSS Modules + CSS custom properties (design tokens)
- State: React state + reusable custom hooks
- Data: Next.js Route Handlers (`src/app/api/*`) using shared `ApiResponse<T>` contract
- Interactivity: client islands only where required (`UsersTable`, `DashboardChrome`, analytics range switcher, theme toggle)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Scripts

```bash
npm run lint
npm run build
npm run start
```

## Architecture Highlights

- Server-first composition with per-section `Suspense` boundaries in `src/app/page.tsx`
- Request-scoped dashboard preload/read layer in `src/features/dashboard/data/dashboard-streaming.ts` for streaming-friendly initial render
- Registry-based section composition in `src/features/dashboard/feature-registry.tsx`
- Generic `DataTable` now owns pagination rendering via `pagination` prop
- URL-driven users table state (`page`, `sort`, `order`, `search`) with debounced search
- i18n with nested JSON catalogs, typed dot-path keys, and cached translators

## Assignment Coverage

### Part A — Design System

- Tokens centralized in `packages/design-system/src/styles/tokens.css`
- Token categories include color, spacing, typography, borders/radii, shadows, breakpoints, and motion
- Light/dark theme via `[data-theme="dark"]` token overrides
- Core components: `Button`, `InputField`, `Card`, plus reusable table/pagination primitives

### Part B — Dashboard Layout

- Sticky top navigation with search, theme toggle, and user menu
- Collapsible sidebar (desktop) + drawer behavior (mobile)
- Main content includes stats cards, analytics panel, and users data table
- Table supports sticky header and sticky first column with responsive overflow handling

### Part C — Data + React/Next.js

- APIs:
  - `GET /api/stats`
  - `GET /api/analytics`
  - `GET /api/users`
- Shared response envelope:

```ts
type ApiResponse<T> = {
  data: T;
  meta?: { page: number; totalPages: number; totalItems: number };
  error?: string;
}
```

- API routes implement realistic delay (`200–800ms`) and consistent error payload shape
- Initial data is rendered server-side; client handles only interactive updates
- Users table supports server-side sort/search/pagination, URL sync, loading skeleton rows, empty state, and error state

### Part D Challenges Completed

1. Challenge 2 — Container Queries
2. Challenge 4 — Fluid Typography and Spacing (`clamp()`)

### Part E Reflection

- See `NOTES.md`

## Performance and Scalability Notes

- Feature composition is modular and section-driven through registry entries
- Users query path is optimized with:
  - precomputed search index
  - sorted dataset cache by field/order
  - server-side query shaping
- Client query hooks use `AbortController` to cancel stale requests
- DataTable supports virtualization for large row counts (`threshold: 120`, `rowHeight: 52`, `overscan: 8`)

## File Structure

```text
src/
  app/
    api/
      analytics/route.ts
      stats/route.ts
      users/route.ts
    challenges/
    design-system-lab/
    reports/
    settings/
    error.tsx
    layout.tsx
    loading.tsx
    page.tsx
  features/
    dashboard/
      api/
      components/
      data/
        dashboard-repository.ts
        dashboard-service.ts
        dashboard-streaming.ts
      layout/
      feature-registry.tsx
      constants.ts
      types.ts
  shared/
    hooks/
    i18n/
    types/
    utils/
packages/
  design-system/
    src/
      components/
      icons/
      styles/
      theme/
ARCHITECTURE.md
NOTES.md
README.md
```
