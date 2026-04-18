# Frontend Engineer Assignment — SignalBoard

A Next.js App Router dashboard implementation focused on scalable frontend architecture: design tokens, reusable components, server/client boundaries, and URL-driven table state.

## Live Demo

- Live URL: `TBD (deploy to Vercel)`

## Tech Choices

- Framework: Next.js 16 App Router + TypeScript
- Styling: CSS Modules + CSS custom properties (design tokens)
- State: React built-in state + Context (`ThemeProvider`)
- Data: Next.js Route Handlers (`src/app/api/*`) + server component initial load + client fetch for table interactivity

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Architecture Overview

### Design System (Part A)

- Global tokens live in `packages/design-system/src/styles/tokens.css`
- Token categories included:
  - Colors: primary/secondary shades, neutral 50–900, semantic, surface, text
  - Spacing: semantic fluid scale (`--space-2xs` … `--space-3xl`)
  - Typography: families, sizes (`xs`…`2xl`), weights, line-heights
  - Shadows: `sm`…`xl`
  - Breakpoints: `sm`, `md`, `lg`, `xl`
  - Bonus: radii, borders, transitions, easing
- Theme system:
  - Light/dark token overrides via `[data-theme='dark']`
  - `ThemeProvider` persists preference in `localStorage`
  - `ThemeToggle` switches theme with smooth token-based transitions

### CSS Architecture Scalability

1. **Centralized tokens as a single source of truth**
   - Core primitives (color, spacing, type, shadow, radius, motion, breakpoints) are defined once in `packages/design-system/src/styles/tokens.css`, so visual updates scale without hunting through component files.

2. **Theme expansion through token overrides**
   - Components consume stable token names, while theme-specific values are swapped at the root (`[data-theme='dark']`). Adding future themes means adding token scopes, not rewriting component styles.

3. **Local component boundaries with CSS Modules**
   - Each component keeps its styles isolated (`*.module.css`), reducing global cascade risk and making parallel team work safer as the system grows.

4. **Variant/state composition instead of duplication**
   - Reusable variant classes (`primary/secondary/ghost`, `focused/error/disabled`, etc.) let new states and visual treatments scale through composition, not copy-paste.

5. **Responsive primitives that age well**
   - Fluid `clamp()` token scales and container queries keep components adaptive to context, which avoids brittle, page-specific breakpoint overrides over time.

6. **Clear package boundary inside a single app**
   - Reusable primitives and theme logic live in `packages/design-system`, while app concerns are organized under `src/features` and `src/shared` for clean ownership boundaries.

### Components Built

- `Button`: `primary | secondary | ghost`, `small | medium | large`, loading spinner, icon slots, focus/disabled/loading states
- `InputField`: floating label (transform/scale), helper/error/counter, prefix/suffix, disabled/read-only
- `Card`: optional header/body/footer slots, `default | elevated`, hover elevation

### Dashboard (Part B)

- Sticky top nav with:
  - brand + breadcrumb
  - center search input (design system input)
  - theme toggle
  - CSS-only avatar dropdown (`details/summary` + hover)
- Sidebar:
  - desktop collapsible (260px → 64px)
  - mobile slide-in drawer with backdrop + hamburger trigger
- Main content:
  - responsive stats card row (4-up desktop, 2x2 tablet, stacked mobile)
  - analytics card
  - data table with sticky header, sticky first column, row striping, hover, pagination controls

### Data Layer + React/Next.js (Part C)

- Route Handlers:
  - `GET /api/stats`
  - `GET /api/analytics?range=7d|30d|90d`
  - `GET /api/users?page&limit&sort&order&search`
- Shared response contract:
  ```ts
  type ApiResponse<T> = {
    data: T;
    meta?: { page: number; totalPages: number; totalItems: number };
    error?: string;
  };
  ```
- Randomized response latency (200–800ms) in API handlers
- Server Components:
  - initial stats + analytics fetch in `src/app/page.tsx`
- Client Components:
  - sidebar/nav interactivity
  - users table sorting, search, pagination
- Table interactivity:
  - server-side pagination/sorting/search
  - debounced search (300ms)
  - URL state sync (`page`, `sort`, `order`, `search`)
  - direct URL hydration of state
  - skeleton rows during fetch
  - empty state messaging
  - optimistic sort indicator updates

### Part C Compliance Checklist

- Mock API Route Handlers:
  - `GET /api/stats` → `src/app/api/stats/route.ts`
  - `GET /api/analytics` → `src/app/api/analytics/route.ts`
  - `GET /api/users` → `src/app/api/users/route.ts`
- Consistent generic response type:
  - `ApiResponse<T>` defined in `src/shared/types/api.ts`
- Realistic API latency:
  - shared `randomDelay(200-800ms)` in `src/features/dashboard/api/http-effects.ts`
- Users endpoint query support:
  - `page`, `limit`, `sort`, `order`, `search` parsed in `parseUsersSearchParams`
- Server Components for initial load:
  - initial dashboard data fetched in `src/app/page.tsx`
- Client Components only where interactivity is needed:
  - table behavior in `src/features/dashboard/components/UsersTable.tsx`
  - shell interactions in `src/shared/layout/Dashboard/DashboardChrome.tsx`
- Route-level boundaries:
  - loading UI in `src/app/loading.tsx`
  - error boundary in `src/app/error.tsx`

## Part D Challenges Completed

1. **Challenge 2 — Container Queries**
   - Stats card uses `container-type: inline-size` and `@container` rules
   - Same `StatsCard` component shows horizontal layout in wide containers and vertical layout in narrow containers

2. **Challenge 4 — Fluid Typography & Spacing System**
   - Type and spacing tokens use `clamp(min, preferred, max)`
   - Formula approach is documented in token comments and demonstrated in `/challenges`
   - Demo includes specimen text plus frame-width previews (320-ish to 4K-scale container)

## Server vs Client Boundary Rationale

- Server by default for first paint and reduced client JS (`src/app/page.tsx` fetches core dashboard payload).
- Client only for interaction-heavy islands (`DashboardChrome`, `UsersTable`, theme toggle/input behaviors).
- Tricky boundary: keeping URL-driven table state responsive while avoiding full-page loading; solved with client-side param updates + granular skeleton loading in the table area.

## File Structure Overview

```text
src/
  app/
    api/
      analytics/route.ts
      stats/route.ts
      users/route.ts
    challenges/
      page.tsx
      page.module.css
    error.tsx
    globals.css
    layout.tsx
    loading.tsx
    page.tsx
  features/
    dashboard/
      api/
      components/
      data/
      types.ts
  shared/
    hooks/
    layout/
    types/
packages/
  design-system/
    src/
      components/
        Button/
        Card/
        InputField/
      styles/
        tokens.css
        foundations.css
        index.css
      theme/
        ThemeProvider.tsx
        ThemeToggle.tsx
NOTES.md
README.md
```
