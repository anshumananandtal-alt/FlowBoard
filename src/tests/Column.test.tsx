import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Column } from '../components/Column'

const tasks = [{ id: 'column-1', title: 'Sample task', status: 'todo' }]

test('Column renders title, task count badge, and task item', () => {
  render(
    <Column title="Todo" status="todo" tasks={tasks} onTaskDrop={vi.fn()} onTaskDelete={vi.fn()} />,
  )

  expect(screen.getByText(/todo/i)).toBeInTheDocument()
  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('Sample task')).toBeInTheDocument()
})

test('Progress column shows filter input and counts filtered tasks', () => {
  render(
    <Column
      title="In Progress"
      status="progress"
      tasks={[
        { id: 'task-1', title: 'First progress task', status: 'progress' },
        { id: 'task-2', title: 'Another task', status: 'progress' },
      ]}
      onTaskDrop={vi.fn()}
      onTaskDelete={vi.fn()}
    />,
  )

  expect(screen.getByPlaceholderText(/filter in progress/i)).toBeInTheDocument()
  expect(screen.getByText('2')).toBeInTheDocument()
})
