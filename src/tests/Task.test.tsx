import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Task } from '../components/Task'

test('Task renders with drag handling and delete button', () => {
  const handleDelete = vi.fn()
  render(<Task id="task-1" title="Delete me" onDelete={handleDelete} />)

  expect(screen.getByText('Delete me')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /delete task/i })).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /delete task/i }))
  expect(handleDelete).toHaveBeenCalledWith('task-1')
})
