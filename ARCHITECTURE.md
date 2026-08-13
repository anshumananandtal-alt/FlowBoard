# Architecture

## Component Hierarchy

The application uses a nested component hierarchy with a single top-level state owner.

- `App`
  - `AddTaskForm`
  - `Board`
    - `Column` (Todo)
      - `Task`
    - `Column` (In Progress)
      - `Task`
    - `Column` (Done)
      - `Task`

### Component responsibilities

- `App`
  - Holds the task list state.
  - Loads and saves tasks from `localStorage`.
  - Provides task actions: create, move, delete.
  - Opens and closes the add-task modal.

- `AddTaskForm`
  - Displays a modal dialog for entering a task title.
  - Calls back to `App` when a new task is created.

- `Board`
  - Splits tasks into status columns.
  - Passes move and delete callbacks to each column.

- `Column`
  - Renders a column pane for a single status.
  - Handles drag-over and drop events.
  - Applies a text filter for the `progress` status.
  - Renders a list of `Task` cards.

- `Task`
  - Renders an individual draggable task card.
  - Emits drag start data and delete events.

## Architecture pattern

This project follows a simple unidirectional data flow pattern similar to the React component state model.

- `App` is the single source of truth for the task list.
- Child components receive data and event callbacks via props.
- Events bubble up from `Task` → `Column` → `Board` → `App`.
- `App` updates state and re-renders the tree.

This approach keeps state management centralized in one place, while components remain reusable and easy to reason about.

## State management explanation

### Local state in `App`

`App.tsx` uses React `useState` to store the full task array and an `isModalOpen` flag.

- Task operations are pure updates of the existing task array.
- The `moveTask` action updates a task's `status` field.
- The `deleteTask` action removes a task from the array.
- The `addTask` action appends a new task object.

### Persistence

- `loadTasks()` reads from `localStorage` and restores saved tasks on initial render.
- `saveTasks()` writes the full task array to `localStorage` whenever tasks change.
- `STORAGE_KEY` in `src/utils/storage.ts` centralizes the storage key.

### Prop drilling vs. global context

The app currently uses prop drilling for event handlers and state data because the tree is shallow.

- `Board` and `Column` receive only the props they need.
- A React context exists in `src/context/BoardContext.tsx`, but it is currently unused.
- For this scale, passing props directly keeps the architecture simple and avoids unnecessary complexity.

## Drag and drop implementation

### Why drag and drop?

Drag and drop makes the kanban board feel more natural and interactive for moving tasks between workflow stages.

- It improves usability by letting users move tasks visually.
- It is a familiar interaction pattern for task boards.
- It reduces the number of clicks needed to change task status.

### How it works

- `Task.tsx` sets `draggable={true}` and attaches `onDragStart`.
- When dragging begins, the task ID is stored in the drag event payload using `dataTransfer.setData('text/plain', id)`.
- `Column.tsx` handles `onDragOver`, `onDragLeave`, and `onDrop`.
- On drop, the column reads the dragged task ID from `dataTransfer` and calls `onTaskDrop(taskId, status)`.
- `App` receives the drop event through props and updates the task's `status`.

### Results

- Tasks can be moved between `Todo`, `In Progress`, and `Done` without page reload.
- The implementation is lightweight and uses built-in browser drag-and-drop APIs.
- This keeps the UI responsive and easy to extend.
