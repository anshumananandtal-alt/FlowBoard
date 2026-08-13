import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Board } from '../components/Board'
import type { Task } from '../models/task'

const sampleTasks: Task[] = [
  { id: 'task-1', title: 'Plan launch', status: 'todo' },
  { id: 'task-2', title: 'Build feature', status: 'progress' },
  { id: 'task-3', title: 'Ship update', status: 'done' },
]

test('Board renders all columns and task titles', () => {
  render(<Board tasks={sampleTasks} onTaskMove={vi.fn()} onTaskDelete={vi.fn()} />)

  expect(screen.getByText(/todo/i)).toBeInTheDocument()
  expect(screen.getByText(/in progress/i)).toBeInTheDocument()
  expect(screen.getByText(/done/i)).toBeInTheDocument()
  expect(screen.getByText('Plan launch')).toBeInTheDocument()
  expect(screen.getByText('Build feature')).toBeInTheDocument()
  expect(screen.getByText('Ship update')).toBeInTheDocument()
})
