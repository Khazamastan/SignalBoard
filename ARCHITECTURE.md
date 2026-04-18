# SignalBoard Layer Architecture

## Layers

- `app`: `src/app/*`
- `feature`: `src/features/*`
- `shared`: `src/shared/*`
- `design-system`: `packages/design-system/*`

## Allowed Dependencies

- `app -> feature/shared/design-system`
- `feature -> shared/design-system`

## Disallowed Dependencies

- `shared -> feature/app`
- `feature -> app`
- `design-system -> src/*`
