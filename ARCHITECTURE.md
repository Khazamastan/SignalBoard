# Architecture Contract

This document defines strict boundaries for the app-level architecture.

## Goals

- Keep modules decoupled and easy to change.
- Keep each domain in a dedicated module.
- Keep reusable code free of feature-specific knowledge.
- Keep pure logic separate from side-effectful code.

## Layer Rules

### 1) App Layer: `src/app/*`

- Owns route definitions, layouts, page composition, and route handlers.
- Can import from `src/features/*`, `src/shared/*`, and `@design-system`.
- Must not contain reusable domain logic.

### 2) Feature Layer: `src/features/<feature>/*`

- Owns a vertical slice of one business domain.
- Typical structure per feature:
  - `components/` feature UI
  - `layout/` feature-owned shells/chrome for that domain
  - `api/` parsing/adapters for request/query details
  - `data/` repository + data source orchestration
  - `utils/` feature-specific pure helpers
  - `types.ts`, `constants.ts`
- Can import from `src/shared/*` and `@design-system`.
- Must not import from `src/app/*`.

### 3) Shared Layer: `src/shared/*`

- Cross-feature primitives only (types, pure utils, generic hooks, layout primitives).
- Must be domain-agnostic.
- Must not import from `src/features/*` or `src/app/*`.

### 4) Design System: `packages/design-system/*`

- UI primitives, tokens, icons, and theme infrastructure only.
- Must not import from `src/*` (app code).

## Side-Effect Rules

### Pure Modules

Keep these side-effect free:

- `constants.ts`
- `types.ts`
- `utils/*` (unless explicitly named as effect/adapters)

### Side Effects Allowed In

- React client effects (`useEffect`) inside interactive components.
- Route handlers (`src/app/api/*`).
- Explicit adapter/effects modules (for example `api/http-effects.ts`).

## Import Direction

Allowed:

- `src/app -> src/features`
- `src/app -> src/shared`
- `src/features -> src/shared`
- `src/app|src/features -> @design-system`

Disallowed:

- `src/shared -> src/features|src/app`
- `src/features -> src/app`
- `packages/design-system -> src/*`

## ESLint Enforcement

Boundaries are enforced in `eslint.config.mjs` via `no-restricted-imports`:

- Shared cannot import feature/app modules.
- Features cannot import app modules.
- Design system cannot import app source modules.

Run checks with:

```bash
npm run lint
```
