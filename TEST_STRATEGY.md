# Test Strategy

## Purpose

This document describes the test coverage goals, rationale, and recommended testing approach for the `flow-board` application. It explains which areas should be covered by unit, integration, and end-to-end tests, maps current tests to coverage areas, and lists recommended additions.

## Scope

- Frontend React TypeScript app: components, hooks, context, and core utils.
- Excludes build/tooling config and third-party libraries.

## Test Types & Tools

- Unit tests: small, fast tests for pure functions, hooks, and component behavior. Use Vitest or Jest with React Testing Library.
- Integration tests: component interactions and context flows (e.g., board + columns + tasks). Use React Testing Library + Vitest/Jest.
- End-to-end (E2E) tests: user flows (add task, drag/drop, persistence). Use Playwright or Cypress.
- Coverage measurement: use `--coverage` (Vitest/Jest) and CI reporting (Codecov or Coveralls optional).

## Coverage Goals

- Unit tests: 80%+ for utils, hooks, and core component logic.
- Integration tests: cover major user flows (board rendering, adding tasks, column moves).
- E2E tests: 5–10 representative user journeys (critical paths), not full combinatorial coverage.

Target overall: aim for 80%+ project coverage, with emphasis on user-visible flows and critical logic.

## Mapping: Existing Tests

The repository already includes tests under `tests/`: AddTaskForm.test.tsx, Board.test.tsx, Column.test.tsx, Task.test.tsx.

- `AddTaskForm.test.tsx`: covers form validation and submission — good unit/integration coverage for create-task flow.
- `Board.test.tsx`: verifies board composition and rendering — provides integration coverage for top-level layout and context usage.
- `Column.test.tsx`: covers column behaviors (task lists) — integration area for task grouping and minimal drag interactions.
- `Task.test.tsx`: tests task display and actions — unit coverage for task UI and callbacks.

These tests form a solid baseline for render and behavior checks of UI pieces.

## Identified Gaps & Recommended Tests

- Drag-and-drop interactions: add integration and E2E tests that simulate dragging tasks between columns and ensure state updates and persistence.
- Persistence/localStorage: add unit/integration tests for `useLocalStorage` and `utils/storage.ts` to validate read/write, initial state, and migration cases.
- `BoardContext` flows: add integration tests that assert context-driven operations (create, update, move, delete tasks) across components.
- Edge cases and input validation: add tests for invalid input, very long text, duplicate titles, and empty states (no tasks/columns).
- Accessibility smoke tests: verify keyboard interactions for add-task and basic ARIA attributes using testing-library's `axe` or similar.
- Error-handling paths: simulate and assert graceful failures where async or storage operations can fail.

Priority: Drag-and-drop + persistence + context flows → high. Input validation, accessibility, and error paths → medium.

## Test Data, Mocks & Patterns

- Prefer lightweight test fixtures for tasks/columns defined in a single `tests/fixtures` module to keep tests readable.
- Mock `localStorage` for unit tests (or use `@testing-library/react` helpers to wrap components with a fake storage provider).
- For E2E tests, use a clean test profile and reset state between tests; seed minimal data only when needed.

## CI Integration

- Run unit and integration tests on pull requests. Fail the pipeline on regressions or coverage drops below thresholds (e.g., 75% per-file or 80% project).
- Run a small set of E2E tests on the main branch or nightly scheduled runs to validate critical user journeys.

Suggested CI steps:

1. Install dependencies.
2. Run `npm run test:ci` or `npm test -- --runInBand`.
3. Collect coverage and upload to reporting service (optional).
4. Run E2E suite on protected branches.

## Running Tests Locally

Common commands (adapt to project scripts):

```
npm test
npm run test:coverage
npm run test:watch
npx playwright test   # if using Playwright
```

If the project uses `vitest`, use `npx vitest` variants instead.

## Maintenance & Responsibilities

- Authors: add tests when implementing new features or fixing bugs.
- Reviewers: require at least unit/integration tests for feature PRs and ensure critical flows have E2E coverage where applicable.
- Keep fixtures and common test helpers in `tests/__utils__` for reuse.

## Suggested Next Steps

1. Add unit tests for `useLocalStorage` and `utils/storage.ts`.
2. Add integration tests that exercise `BoardContext` operations end-to-end through the UI components.
3. Add 2–3 Playwright/Cypress E2E tests: create task, move task across columns, and persistence after reload.

---

This strategy balances fast feedback from unit tests with higher-level confidence from integration and E2E tests. Adjust coverage targets and CI gating to match team priorities.
