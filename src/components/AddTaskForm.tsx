import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export interface AddTaskFormProps {
  open: boolean
  onAdd?: (title: string) => void
  onClose: () => void
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ open, onAdd, onClose }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!open) {
      setValue('')
    }
  }, [open])

  const handleSave = () => {
    const title = (value || '').trim()
    if (!title) return
    onAdd?.(title)
  }

  const handleCancel = () => {
    setValue('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Task title"
          placeholder="Enter a task name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTaskForm
