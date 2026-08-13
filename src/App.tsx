import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Typography from '@mui/material/Typography'
import './App.css'
import type { Status, Task } from './models/task'
import { STORAGE_KEY } from './utils/storage'
import { Board, AddTaskForm } from './components'

const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

const createTask = (title: string, status: Status): Task => ({
  id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title,
  status,
})

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (title: string, status: Status = 'todo') => {
    setTasks((currentTasks) => [...currentTasks, createTask(title, status)])
  }

  const moveTask = (taskId: string, newStatus: Status) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleSaveTask = (title: string) => {
    addTask(title)
    closeModal()
  }

  return (
    <Container className="flow-board-app py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <Typography component="h1" variant="h3" gutterBottom sx={{ textAlign: 'left' }}>
            Flow Board
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Organize tasks with a clean kanban layout, drag-and-drop cards, and inline actions.
          </Typography>
        </div>

        <Button onClick={openModal} variant="primary" size="lg">
          Add Task
        </Button>
      </div>

      <AddTaskForm open={isModalOpen} onClose={closeModal} onAdd={handleSaveTask} />
      <Board tasks={tasks} onTaskMove={moveTask} onTaskDelete={deleteTask} />
    </Container>
  )
}

export default App
