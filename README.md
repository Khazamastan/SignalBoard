# SignalBoard — Frontend Engineer Assignment

SignalBoard is an analytics dashboard built with Next.js App Router and TypeScript, focused on scalable design-system and data architecture.

## Live Demo

- Live demo: [https://signal-board-green.vercel.app/](https://signal-board-green.vercel.app/)
- GitHub repo: [https://github.com/Khazamastan/SignalBoard](https://github.com/Khazamastan/SignalBoard)

## Tech Stack

- Next.js (App Router) + TypeScript
- CSS Modules + CSS custom-property tokens
- React state/context + custom hooks
- Next.js Route Handlers + native `fetch`
- No UI component libraries or JS animation libraries

## Run Locally

Prerequisites:
- Node.js `24+`
- npm `11+`

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm run start
```

## File Structure Overview

```text
src/
  app/                 # routes, layouts, loading/error boundaries, API handlers
  features/dashboard/  # dashboard sections, UI, data orchestration
  shared/              # hooks, utils, i18n, shared types
packages/design-system/# tokens, theming, reusable components
README.md
ARCHITECTURE.md
NOTES.md
```

## Assignment Coverage

- Part A: token system, theme switching, and core components (`Button`, `InputField`, `Card`).
- Part B: dashboard layout with sticky top bar, collapsible sidebar, stats cards, and responsive data table.
- Part C: mock APIs (`/api/stats`, `/api/analytics`, `/api/users`), server-first rendering, URL-driven table state, debounced search, and server-side sort/pagination.

## Part D Challenges Completed (and why)

1. Challenge 2 — Container Queries: to show component responsiveness based on container width, not viewport.
2. Challenge 4 — Fluid Typography & Spacing: to demonstrate principled token scaling with `clamp()` from mobile to large screens.

Part E reflection answers are in `NOTES.md`.
