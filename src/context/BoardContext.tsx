import React from 'react'

export type BoardContextValue = unknown

export const BoardContext = React.createContext<BoardContextValue | undefined>(undefined)

export const BoardProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <BoardContext.Provider value={undefined}>{children}</BoardContext.Provider>
}
