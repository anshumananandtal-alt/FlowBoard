## Prompt 1

Act as a senior React architect.

Build a Kanban board named FlowBoard.

Constraints:
- React only.
- No external drag-drop libraries.
- Native HTML5/browser drag and drop only.
- Three fixed columns:
  - To Do
  - In Progress
  - Done
- Add task (title only) into To Do.
- Move tasks between columns.
- Delete task.
- Persist state in localStorage.
- Component state only (or Context API if justified).
- No backend.
- No external API.
- Must run with npm start.
- Include unit tests.
- Keep components reusable and modular.
- Follow clean architecture.
- Explain architecture in markdown after implementation.

Do not generate everything at once.
Wait for the next prompt after every milestone.


## Prompt 2

Create the folder structure only.

Generate:
src/
components/
hooks/
context/
utils/
tests/

Create empty React components and export them.

No implementation.


## Prompt 3

Implement the data model.

Task:
{
 id,
 title,
 status
}

Statuses:
todo
progress
done

Create sample data.


## Prompt 4

Implement App state.

Requirements:
- useState
- localStorage load
- localStorage save
- addTask
- moveTask
- deleteTask

Do not implement UI.


## Prompt 5

Implement the board layout.

Three equal columns.

Board
 ├── TodoColumn
 ├── ProgressColumn
 └── DoneColumn

Render tasks only.


## Prompt 6

Implement Add Task.

Requirements:
- input
- Add button
- add only to Todo
- ignore empty values


## Prompt 7

Implement TaskCard.

Display:
- title
- Delete button

No styling except minimal CSS.


## Prompt 8

Implement native drag and drop.

Allowed:
dragstart
dragover
drop

Do not use any library.

Move task between columns.


## Prompt 9

Persist changes in localStorage after:
- add
- move
- delete

Reload should restore board.


## Prompt 10

Implement optional filtering.

Dropdown:
All
Todo
In Progress
Done


## Prompt 11

Create reusable CSS.

Requirements:
Responsive
Flexbox
Simple cards
Hover effects


## Prompt 12

Write unit tests.

Test:
- add task
- delete task
- move task
- localStorage persistence