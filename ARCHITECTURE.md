# SignalBoard Architecture

## 1) Goals

- Server Components by default, Client Components only for interactivity.
- Token-first styling so components scale across themes and screens.
- Clear layer boundaries so features stay modular.

## 2) Project Layers

- `src/app`: routes, layouts, `loading.tsx`, `error.tsx`, and route handlers.
- `src/features/dashboard`: dashboard UI, data orchestration, and feature logic.
- `src/shared`: reusable hooks, utilities, i18n helpers, shared types.
- `packages/design-system`: tokens, theme logic, and reusable components.

Import direction is one-way (`app -> features -> shared`, design system independent from `src/*`).

## 3) Server vs Client Split

Server-rendered:
- `src/app/page.tsx`
- `src/features/dashboard/components/StatsAnalyticsSection.tsx`
- `src/features/dashboard/components/UsersTableSection.tsx`

Client-rendered interaction islands:
- `src/features/dashboard/layout/DashboardChrome.tsx`
- `src/features/dashboard/components/UsersTable.tsx`
- `src/features/dashboard/components/StatsAnalyticsClient.tsx`

## 4) Data Flow and API Contract

Route handlers:
- `GET /api/stats`
- `GET /api/analytics`
- `GET /api/users`

Common response shape:

```ts
type ApiResponse<T> = {
  data: T;
  meta?: { page: number; totalPages: number; totalItems: number };
  error?: string;
}
```

The dashboard uses a repository/service layer in `src/features/dashboard/data/*` with realistic delays and request-scoped server preloading for smoother Suspense streaming.

## 5) URL-Driven Table State

The users table keeps `page`, `limit`, `sort`, `order`, and `search` in URL params. This preserves shareable links and restores exact table state on refresh/navigation. Sorting, pagination, and debounced search are server-driven.

## 6) Design System and Theming

Tokens are defined in `packages/design-system/src/styles/tokens.css` (color, spacing, typography, shadows, radii, motion, breakpoints). Themes are implemented with CSS custom-property overrides via `data-theme`, and components consume tokens instead of hardcoded style values.

## 7) Part D Implemented

- Challenge 2: Container queries for stat cards (`@container`) so card layout adapts to container width.
- Challenge 4: Fluid typography and spacing via `clamp()` token formulas for continuous scaling.
