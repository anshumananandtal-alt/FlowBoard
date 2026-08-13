import React from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

export interface TaskProps {
  id?: string
  title?: string
  onDragStart?: (taskId: string) => void
  onDelete?: (taskId: string) => void
}

export const Task: React.FC<TaskProps> = ({ id, title, onDragStart, onDelete }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (!id) return
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', id)
    onDragStart?.(id)
  }

  return (
    <div
      draggable={Boolean(id)}
      onDragStart={handleDragStart}
      data-task-id={id}
      className="task-card"
    >
      <div className="task-top">
        <div className="d-flex align-items-center gap-2">
          <DragIndicatorIcon color="action" fontSize="small" />
          <span className="task-label">Task</span>
        </div>
      </div>

      <div className="task-body d-flex align-items-center justify-content-between w-100">
        <div className="task-bottom">
          <Tooltip title={title || ''} placement="top-start">
            <Typography
              variant="body1"
              component="span"
              sx={{ textAlign: 'left', width: '80%', display: 'block' }}
              className="task-title"
            >
              {title}
            </Typography>
          </Tooltip>
        </div>
        <IconButton
          aria-label="Delete task"
          size="small"
          color="error"
          onClick={() => id && onDelete?.(id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>


    </div>
  )
}

export default Task
