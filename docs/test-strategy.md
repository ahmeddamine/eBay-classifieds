# Automated test strategy

## Scope
1. Unit tests (helpers/validation/permissions/query params)
2. Component/integration tests (critical UI interactions)
3. Minimal E2E tests (core route journeys)

## Install
```bash
npm install
```

## Run
```bash
npm test
npm run test:watch
npm run test:e2e
```

## Notes
- Supabase is mocked in unit/component tests where auth gating is required.
- E2E expects a running app at `PLAYWRIGHT_BASE_URL` or `http://127.0.0.1:3000`.
