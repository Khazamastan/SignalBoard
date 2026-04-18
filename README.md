# Frontend Engineer Assignment — SignalBoard

SignalBoard is a Next.js App Router analytics dashboard built for the frontend engineer assignment.  
The implementation is token-driven, server-first by default, and uses URL-synced table state for shareable views.

## Live Demo

- Live URL: `TODO: add deployed URL`

## Tech Stack

- Framework: Next.js 16.1.6 (App Router) + React 19 + TypeScript
- Styling: CSS Modules + CSS custom properties (design tokens)
- State: React state + reusable custom hooks
- Data: Next.js Route Handlers (`src/app/api/*`) with shared `ApiResponse<T>` envelope
- Interactivity: Client islands only where required (`UsersTable`, dashboard chrome, analytics range controls, theme toggle)

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

## Assignment Coverage

### Part A — Design System

- Tokens are centralized in `packages/design-system/src/styles/tokens.css`
- Categories implemented:
  - Colors (primary/secondary shades, neutral scale, semantic colors, surface, text)
  - Spacing scale (fluid semantic tokens)
  - Typography (families, sizes, weights, line-height)
  - Shadows, radii, borders, motion durations/easing
  - Breakpoints (`sm`, `md`, `lg`, `xl`)
- Theme support:
  - Light + dark via `[data-theme="dark"]` token overrides
  - `ThemeToggle` updates `data-theme`, `localStorage`, and theme cookie
  - SSR theme hydration uses cookie in `src/app/layout.tsx`
- Core components:
  - `Button` (variants, sizes, loading spinner, icon support, focus/disabled states)
  - `InputField` (floating label, helper/error/counter, prefix/suffix, read-only/disabled)
  - `Card` (slot-based header/body/footer, variants, hover elevation)

### Part B — Dashboard Layout

- Sticky top header with app title/breadcrumb, search, theme toggle, and user menu
- Sidebar:
  - Desktop collapse/expand
  - Mobile drawer with backdrop and close controls
- Main content:
  - Stats cards row
  - Analytics panel
  - Data table with sticky header + sticky first column + pagination UI
- Responsive behavior for desktop/tablet/mobile is implemented in dashboard layout CSS modules

### Part C — Data + React/Next.js

- Route handlers:
  - `GET /api/stats`
  - `GET /api/analytics`
  - `GET /api/users`
- Shared API envelope:

```ts
type ApiResponse<T> = {
  data: T;
  meta?: { page: number; totalPages: number; totalItems: number };
  error?: string;
}
```

- All handlers support randomized delay (`200–800ms`) and consistent failure payloads
- Server components provide initial dashboard payloads:
  - `StatsAnalyticsSection`
  - `UsersTableSection`
- Client components handle interactive state:
  - server-side pagination/sort/search table flow
  - URL state sync (`page`, `sort`, `order`, `search`)
  - debounced search (500ms)
  - loading skeleton rows
  - empty state (`No results found.`)
  - error state messaging from API failures

### Part D Challenges Completed

1. Challenge 2 — Container Queries
2. Challenge 4 — Fluid Typography and Spacing with `clamp()`

### Part E Reflection

- See `NOTES.md`

## Performance and Scalability Notes

- Feature composition is registry-driven (`src/features/dashboard/feature-registry.tsx`) so sections can be added/removed cleanly.
- Users data path is optimized for larger sets:
  - precomputed search index
  - sorted result cache by field/order
  - server-side paging/filtering/sorting
- Client fetch layer uses:
  - abortable requests (`AbortController`) through `useAsyncQuery`
  - short-lived in-memory caches for users and analytics
- DataTable virtualization is enabled for large row counts (`threshold: 120`, `rowHeight: 52`, `overscan: 8`).

## File Structure (Current)

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
        Badge/
        Button/
        Card/
        DataTable/
        InputField/
      styles/
      theme/
      icons/
ARCHITECTURE.md
NOTES.md
README.md
```

