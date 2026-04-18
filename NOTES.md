# Part E — Written Reflection

## 1) Server vs Client components
I kept Server Components as the default for initial route composition and first-paint data hydration (`src/app/page.tsx` + server sections), and moved only interaction-heavy areas to Client Components (`DashboardChrome`, table controls, range toggles, theme switching). The trickiest boundary was the table URL state, because it needs browser history APIs and debounced input behavior while still supporting direct URL restoration from server-rendered search params. I handled that by hydrating initial query state from server params, then doing client-side URL mutation and fetch orchestration for subsequent interactions.

## 2) Trade-offs
Given time, I prioritized architecture and interactive correctness over polish extras like exhaustive visual regression coverage and richer empty/error illustrations. I also used local in-memory mock data rather than a persistent store since the assignment emphasized frontend architecture and API contracts. With another 4 hours, I would add end-to-end tests for URL state flows, improve accessibility audits (keyboard traversal + ARIA announcements), and complete production deployment/docs finalization.

## 3) Hardest part
The hardest part was getting table UX states to feel correct under all transitions: debounce, sort, pagination, loading skeletons, empty results, and API failure handling without stale visual artifacts. The main challenge was avoiding contradictory states (for example stale rows shown during errors, or focus loss during search updates). I worked through that by centralizing query state transitions, making the search input controlled, and tightening the DataTable state guards so empty/error/loading states are mutually consistent.
