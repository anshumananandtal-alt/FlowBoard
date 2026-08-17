import { useState } from 'react'

type SetValue<T> = T | ((prevValue: T) => T)

function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue
  }

  const raw = window.localStorage.getItem(key)
  if (!raw) {
    return initialValue
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void] {
  const [state, setStateInternal] = useState<T>(() => readValue(key, initialValue))

  const setState = (value: SetValue<T>) => {
    setStateInternal((prevState) => {
      const nextState = value instanceof Function ? value(prevState) : value

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(nextState))
        } catch {
          // ignore write errors (e.g. storage full or unavailable)
        }
      }

      return nextState
    })
  }

  return [state, setState]
}