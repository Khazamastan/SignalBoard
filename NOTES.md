# Part E — Written Reflection

## 1) Server vs Client components
I kept Server Components as the default for route composition and initial section payloads, and limited Client Components to interaction islands (`DashboardChrome`, users table controls, analytics range switching, and theme toggle). The trickiest boundary was keeping table URL sync and debounced input fully client-side while still hydrating the exact initial state from server search params. I addressed this by rendering initial query data in `UsersTableSection` and moving ongoing URL mutation + fetch orchestration into `UsersTable`.

## 2) Trade-offs
Given time constraints, I prioritized architecture consistency and interaction correctness over full test coverage and advanced visual polish for all states. I also kept the data source in-memory because the assignment weighted frontend architecture and API design rather than storage integration. With another 4 hours, I would add end-to-end coverage for URL-driven table flows and section streaming behavior, plus improve accessibility verification with keyboard and screen-reader focused audits.

## 3) Hardest part
The hardest part was keeping table UX states consistent across debounce, sort, pagination, empty/error states, and in-flight API updates without stale artifacts. Another challenge was improving perceived performance while preserving a server-first model. I worked through this by centralizing table query transitions, moving pagination ownership into the generic `DataTable`, and adding a request-scoped preload/read layer so Suspense boundaries stream more smoothly without changing functionality.
