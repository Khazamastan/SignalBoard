# SignalBoard Architecture

This document defines the current architecture and the guardrails we follow to keep the codebase modular, scalable, and safe to evolve.

## 1) Design Principles

- Server-first rendering by default
- Interactive islands only where browser state/events are needed
- Strict module boundaries
- Shared response contracts for all APIs
- Token-first styling with CSS Modules
- Performance choices that scale to larger datasets

## 2) Layered Structure

### App Layer (`src/app/*`)

Responsibilities:
- Routes, layouts, and route handlers
- Page-level composition
- Server entry points and route boundaries (`loading.tsx`, `error.tsx`)

Allowed imports:
- `src/features/*`
- `src/shared/*`
- `@design-system`

Must not contain:
- Reusable business/domain logic

### Feature Layer (`src/features/<feature>/*`)

Responsibilities:
- Vertical slice ownership (UI, data orchestration, feature-specific adapters)
- Server/client feature components

Typical folders:
- `components/`
- `layout/`
- `api/`
- `data/`
- `constants.ts`, `types.ts`, `utils/*`

Allowed imports:
- `src/shared/*`
- `@design-system`

Disallowed:
- `src/app/*`

### Shared Layer (`src/shared/*`)

Responsibilities:
- Cross-feature primitives only (types, generic hooks, pure utilities)

Disallowed:
- `src/features/*`
- `src/app/*`

### Design System (`packages/design-system/*`)

Responsibilities:
- Tokens, base styles, reusable UI primitives, icons, theme helpers

Disallowed:
- Any import from `src/*`

## 3) Boundary Enforcement

Import direction rules are enforced in `eslint.config.mjs` via `no-restricted-imports`.

Command:

```bash
npm run lint
```

## 4) Rendering Boundaries (Server vs Client)

### Server Components (default)

- `src/app/page.tsx`: page composition with `Suspense`
- `src/features/dashboard/components/StatsAnalyticsSection.tsx`: initial stats + analytics payload
- `src/features/dashboard/components/UsersTableSection.tsx`: initial table payload from URL params

### Client Components (interactive islands)

- `src/features/dashboard/layout/DashboardChrome.tsx`: sidebar/header interactivity
- `src/features/dashboard/components/UsersTable.tsx`: sort/search/pagination + URL sync
- `src/features/dashboard/components/StatsAnalyticsClient.tsx`: range switching for analytics
- Design system interactive components (for example `ThemeToggle`, `InputField`, `DataTable`)

## 5) Dashboard Composition

Dashboard sections are registry-driven:

- `src/features/dashboard/feature-registry.tsx`

Each section defines:
- stable `id`
- suspense `fallback`
- `render` function
- optional suspense key resolver for URL-sensitive sections

Why this matters:
- New sections can be added without rewriting page composition logic.
- Existing sections can be removed with minimal risk to others.

## 6) Data Flow

### API Contract

All route handlers return:

```ts
type ApiResponse<T> = {
  data: T;
  meta?: { page: number; totalPages: number; totalItems: number };
  error?: string;
}
```

Shared helpers:
- `src/shared/utils/api-response.ts`

### Route Handlers

- `src/app/api/stats/route.ts`
- `src/app/api/analytics/route.ts`
- `src/app/api/users/route.ts`

Behavior:
- randomized delay (`200–800ms`)
- consistent envelope on success/failure
- `dynamic = "force-dynamic"` for server freshness

### Repository/Service

- `src/features/dashboard/data/dashboard-repository.ts`
  - in-memory source
  - query/sort/filter/paginate users
  - precomputed search index
  - sorted-results cache
- `src/features/dashboard/data/dashboard-service.ts`
  - wraps repository output into `ApiResponse<T>`

### Client Fetch Layer

- `src/features/dashboard/api/dashboard-client.ts`
- `src/shared/hooks/useAsyncQuery.ts`

Patterns:
- `AbortController` cancels stale requests
- query-key based loading state
- explicit error propagation
- feature-level caches (users + analytics) with TTL

## 7) Data Table Architecture

Core component:
- `packages/design-system/src/components/DataTable/DataTable.tsx`

Key behavior:
- sticky header + sticky first column
- server-driven sorting/pagination/search
- URL synchronized state (`page`, `sort`, `order`, `search`)
- loading skeleton rows
- explicit empty and error states
- optional virtualization for large datasets

Current virtualization defaults used in dashboard users table:
- `threshold: 120`
- `rowHeight: 52`
- `overscan: 8`

## 8) Styling and Theming

### Token System

Source:
- `packages/design-system/src/styles/tokens.css`

All components consume token variables for:
- color
- spacing
- typography
- shadows
- radii
- motion

### CSS Isolation

- Component styles use CSS Modules (`*.module.css`)
- Avoid global overrides; prefer component-level tokenized styles
- Keep selectors scoped and predictable

### Theme Model

- `data-theme` on `<html>`
- server initializes from cookie in `src/app/layout.tsx`
- client toggles and persists via design-system theme helpers

## 9) Extension Guidelines

### Add a new dashboard section

1. Create section component(s) under `src/features/dashboard/components`
2. Add fallback if needed
3. Register in `dashboardFeatureRegistry`
4. Keep interactivity in client-only child components

### Add a new API endpoint

1. Add route in `src/app/api/<name>/route.ts`
2. Return `ApiResponse<T>` shape
3. Add parsing and service/repository logic in feature layer
4. Reuse shared response helpers

### Add a new design-system component

1. Add component folder in `packages/design-system/src/components`
2. Use only tokens and local module CSS
3. Export from `packages/design-system/src/index.ts`
4. Do not import from `src/*`

## 10) Anti-Patterns to Avoid

- Importing up the layer tree (`shared -> feature`, `feature -> app`)
- Adding `use client` to server-safe components
- Returning ad-hoc API response shapes
- Hardcoding style values where token equivalents exist
- Solving mobile issues with broad CSS overrides instead of component-level fixes

