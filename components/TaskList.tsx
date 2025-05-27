"use client"

import { useState, useMemo, useCallback, useLayoutEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTaskStats } from "@/context/TaskStatsContext"
import { Trash2, Filter } from "lucide-react"

export default function TaskList() {
  const { tasks, setTasks } = useTaskStats()

  // useState Use Case 1: Store task list filter state
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
  const [sortBy, setSortBy] = useState<"date" | "priority">("date")

  // useRef Use Case 2: Track container for scrolling to latest task
  const containerRef = useRef<HTMLDivElement>(null)
  const latestTaskRef = useRef<HTMLDivElement>(null)

  // useMemo Use Case 1: Memoize filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      if (filter === "completed") return task.completed
      if (filter === "pending") return !task.completed
      return true
    })

    // Sort tasks
    filtered.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return filtered
  }, [tasks, filter, sortBy])

  // useCallback Use Case 2: Remove task function
  const removeTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id))
    },
    [setTasks],
  )

  // useState Use Case 2: Toggle task completion
  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    },
    [setTasks],
  )

  // useLayoutEffect Use Case 1: Scroll to latest task when new task is added
  useLayoutEffect(() => {
    if (tasks.length > 0 && latestTaskRef.current) {
      latestTaskRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [tasks.length])

  // useLayoutEffect Use Case 2: Adjust layout when filter changes
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.minHeight = filteredTasks.length > 0 ? "auto" : "200px"
    }
  }, [filteredTasks.length])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex gap-2 items-center">
        <Filter className="h-4 w-4" />
        <Select value={filter} onValueChange={(value: "all" | "completed" | "pending") => setFilter(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value: "date" | "priority") => setSortBy(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">By Date</SelectItem>
            <SelectItem value="priority">By Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task List */}
      <div ref={containerRef} className="space-y-2 max-h-96 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {filter === "all" ? "No tasks yet. Add one above!" : `No ${filter} tasks.`}
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              ref={index === 0 ? latestTaskRef : null}
              className={`flex items-center gap-3 p-3 border rounded-lg transition-all duration-200 ${
                task.completed ? "bg-muted/50 border-muted" : "bg-background border-border hover:border-primary/50"
              }`}
            >
              <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />

              <div className="flex-1 min-w-0">
                <p className={`${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.text}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span className={getPriorityColor(task.priority)}>{task.priority.toUpperCase()}</span>
                  <span>•</span>
                  <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTask(task.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
