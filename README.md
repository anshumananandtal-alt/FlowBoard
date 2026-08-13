# Flow Board

Flow Board is a lightweight kanban-style task manager built with React, TypeScript, and Vite.

## Features

- Kanban board with three columns: Todo, In Progress, Done
- Add tasks through a modal dialog
- Drag and drop tasks between columns
- Delete tasks from the board
- Search tasks inside the In Progress column
- Persist tasks in browser localStorage

## Tech stack

- React 18
- TypeScript
- Vite
- Bootstrap 5
- Material UI (MUI)
- ESLint
- Vitest + Testing Library

## Getting started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal to view the app in the browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
npm test
```

### Lint the codebase

```bash
npm run lint
```

## Project structure

- `src/App.tsx` — main app state, task management, and page layout
- `src/components/Board.tsx` — board layout and column composition
- `src/components/Column.tsx` — individual column UI, drag/drop, and search filtering
- `src/components/AddTaskForm.tsx` — modal form for creating new tasks
- `src/components/Task.tsx` — task card component with delete action
- `src/models/task.ts` — task and status type definitions
- `src/utils/storage.ts` — localStorage key management

## How it works

- Tasks are stored in browser `localStorage` under a project-specific key
- New tasks are created with a unique ID and default status of `todo`
- Moving a task updates its status in app state and persists the change
- Deleting a task removes it from state and storage
- The `In Progress` column includes a text filter to find tasks by title

## Notes

- This project is intended as a simple single-page kanban demo
- The UI uses both Bootstrap and MUI components for layout and dialogs
- Since tasks are saved in localStorage, they persist across browser refreshes
