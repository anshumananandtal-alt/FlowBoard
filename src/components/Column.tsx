import React, { useMemo, useState } from 'react'
import type { Status, Task as TaskModel } from '../models/task'
import { Task as TaskComp } from './Task'

export interface ColumnProps {
  title?: string
  status: Status
  tasks?: TaskModel[]
  onTaskDrop?: (taskId: string, newStatus: Status) => void
  onTaskDelete?: (taskId: string) => void
}

export const Column: React.FC<ColumnProps> = ({ title, status, tasks = [], onTaskDrop, onTaskDelete }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [filterText, setFilterText] = useState('')

  const filteredTasks = useMemo(() => {
    if (status !== 'progress' || !filterText.trim()) {
      return tasks
    }

    const normalizedFilter = filterText.toLowerCase()
    return tasks.filter((task) => task.title.toLowerCase().includes(normalizedFilter))
  }, [filterText, status, tasks])

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const taskId = event.dataTransfer.getData('text/plain') || event.dataTransfer.getData('text')
    if (taskId) {
      onTaskDrop?.(taskId, status)
    }
  }

  return (
    <div
      className={`column-pane ${isDragOver ? 'column-drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h3>{title}</h3>
        <span className="column-badge">{filteredTasks.length}</span>
      </div>

      {status === 'progress' && (
        <div className="column-filter mb-3">
          <label htmlFor="progress-filter" className="visually-hidden">
            Search Tasks ...
          </label>
          <input
            id="progress-filter"
            type="text"
            className="form-control"
            placeholder="Search Tasks..."
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
        </div>
      )}

      <div className="column-task-list">
        {filteredTasks.map((t) => (
          <TaskComp
            key={t.id}
            id={t.id}
            title={t.title}
            onDelete={onTaskDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default Column
