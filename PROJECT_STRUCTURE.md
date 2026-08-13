# Project Structure

This project is a React + TypeScript kanban-style task board with drag-and-drop support and local storage persistence.

## Root files

- `package.json` — project dependencies and scripts
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript configuration files
- `vite.config.ts` — Vite build configuration
- `index.html` — application entry HTML
- `README.md` — project overview and usage notes
- `PROJECT_STRUCTURE.md` — this file
- `ARCHITECTURE.md` — architecture documentation

## Source structure

`src/`
- `main.tsx` — app bootstrap and render target
- `App.tsx` — top-level application component and task state management
- `App.css` — global app styles
- `index.css` — base styles

### `src/components/`
- `Board.tsx` — layout container for kanban columns
- `Column.tsx` — column component supporting drag-over/drop and optional filtering
- `Task.tsx` — draggable task card with delete action
- `AddTaskForm.tsx` — modal dialog for creating tasks
- `index.ts` — component exports aggregation

### `src/context/`
- `BoardContext.tsx` — React context stub for board state (currently unused)

### `src/hooks/`
- `useDrag.ts` — placeholder hook for drag utilities
- `useLocalStorage.ts` — placeholder local storage hook stub

### `src/models/`
- `task.ts` — task model types and status definitions

### `src/utils/`
- `storage.ts` — local storage key constant

### `src/tests/`
- `AddTaskForm.test.tsx`
- `Board.test.tsx`
- `Column.test.tsx`
- `Task.test.tsx`

## Feature boundaries

- Application state and task lifecycle are managed in `App.tsx`
- Board rendering and status filtering are handled in `Board.tsx` and `Column.tsx`
- Drag-and-drop behavior is implemented in `Task.tsx` and `Column.tsx`
- Persistence is implemented with browser `localStorage` via helper functions in `App.tsx` and `utils/storage.ts`

## Notes

- The project has a lightweight structure that separates UI components from model definitions and utilities.
- Some hooks and context modules exist as stubs or placeholders for future enhancements.
