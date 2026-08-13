export type Status = 'todo' | 'progress' | 'done'

export interface Task {
  id: string
  title: string
  status: Status
}
