import { useState } from 'react'

export function useLocalStorage<T>(_key: string, initialValue: T): [T, (v: T) => void] {
  const [state] = useState<T>(initialValue)
  const setState = (_: T) => {
    // stub - no implementation
  }
  return [state, setState]
}
