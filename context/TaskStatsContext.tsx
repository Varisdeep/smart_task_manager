"use client"

import type React from "react"
import { createContext, useContext, type ReactNode, useMemo } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  priority: "low" | "medium" | "high"
}

interface TaskStatsContextType {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  stats: {
    total: number
    completed: number
    pending: number
    completionRate: number
  }
}

// useContext Use Case 2: Task statistics and data sharing
export const TaskStatsContext = createContext<TaskStatsContextType | undefined>(undefined)

export function TaskStatsProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])

  // useMemo Use Case 2: Memoize completion stats
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? (completed / total) * 100 : 0

    return { total, completed, pending, completionRate }
  }, [tasks])

  return <TaskStatsContext.Provider value={{ tasks, setTasks, stats }}>{children}</TaskStatsContext.Provider>
}

export function useTaskStats() {
  const context = useContext(TaskStatsContext)
  if (!context) {
    throw new Error("useTaskStats must be used within TaskStatsProvider")
  }
  return context
}
