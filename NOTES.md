# Part E — Written Reflection

## 1) Server vs Client components
I kept Server Components as the default for initial page composition and first data load, and used Client Components only for interaction islands (table controls, theme toggle, sidebar behaviors). The trickiest boundary was the users table because URL state, debounce, and client events had to stay interactive while still hydrating from server `searchParams`. I solved it by rendering initial state on the server and handling subsequent URL updates/fetches in the client table layer.

## 2) Trade-offs
I prioritized architecture, token consistency, and functional table behavior over broader automated test coverage and deeper visual polish. I also used an in-memory mock repository instead of a persistent backend to keep focus on frontend architecture and App Router patterns. With another 4 hours, I would add end-to-end tests for URL-driven table flows and run a fuller accessibility pass.

## 3) Hardest part
The hardest part was keeping table states consistent across debounce, sorting, pagination, loading, and empty/error results without stale UI. I addressed this by centralizing query state transitions, syncing them with URL params, and keeping pagination/sorting behavior inside shared table primitives. I also improved perceived performance with section-level Suspense and request-scoped server data loading.
