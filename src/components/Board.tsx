import React from 'react'
import type { Task as TaskModel, Status } from '../models/task'
import { Column } from './Column'

export interface BoardProps {
  tasks?: TaskModel[]
  onTaskMove?: (taskId: string, newStatus: Status) => void
  onTaskDelete?: (taskId: string) => void
}

const filterBy = (tasks: TaskModel[] = [], status: Status) =>
  tasks.filter((t) => t.status === status)

export const Board: React.FC<BoardProps> = ({ tasks = [], onTaskMove, onTaskDelete }) => {
  return (
    <div className="board-grid">
      <Column
        title="Todo"
        status="todo"
        tasks={filterBy(tasks, 'todo')}
        onTaskDrop={onTaskMove}
        onTaskDelete={onTaskDelete}
      />
      <Column
        title="In Progress"
        status="progress"
        tasks={filterBy(tasks, 'progress')}
        onTaskDrop={onTaskMove}
        onTaskDelete={onTaskDelete}
      />
      <Column
        title="Done"
        status="done"
        tasks={filterBy(tasks, 'done')}
        onTaskDrop={onTaskMove}
        onTaskDelete={onTaskDelete}
      />
    </div>
  )
}

export default Board
