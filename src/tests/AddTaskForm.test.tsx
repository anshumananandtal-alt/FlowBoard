import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTaskForm } from '../components/AddTaskForm'

test('renders Add Task modal and saves a new task', async () => {
  const handleAdd = jest.fn()
  const handleClose = jest.fn()
  const user = userEvent.setup()

  render(<AddTaskForm open={true} onAdd={handleAdd} onClose={handleClose} />)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
  await user.type(screen.getByLabelText(/task title/i), 'Implement modal')
  await user.click(screen.getByRole('button', { name: /save/i }))

  expect(handleAdd).toHaveBeenCalledWith('Implement modal')
})

test('cancel closes the modal without adding a task', async () => {
  const handleAdd = jest.fn()
  const handleClose = jest.fn()
  const user = userEvent.setup()

  render(<AddTaskForm open={true} onAdd={handleAdd} onClose={handleClose} />)

  await user.click(screen.getByRole('button', { name: /cancel/i }))
  expect(handleAdd).not.toHaveBeenCalled()
  expect(handleClose).toHaveBeenCalled()
})