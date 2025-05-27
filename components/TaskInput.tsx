"use client"

import type React from "react"
import { useRef, useCallback, useReducer, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTaskStats } from "@/context/TaskStatsContext"
import { useSettings } from "@/context/SettingsContext"
import { Plus } from "lucide-react"

interface InputState {
  text: string
  priority: "low" | "medium" | "high"
}

type InputAction =
  | { type: "SET_TEXT"; payload: string }
  | { type: "SET_PRIORITY"; payload: "low" | "medium" | "high" }
  | { type: "RESET" }

// useReducer Use Case 1: Manage task input form state
function inputReducer(state: InputState, action: InputAction): InputState {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload }
    case "SET_PRIORITY":
      return { ...state, priority: action.payload }
    case "RESET":
      return { text: "", priority: "medium" }
    default:
      return state
  }
}

export default function TaskInput() {
  const { tasks, setTasks } = useTaskStats()
  const { autoFocus } = useSettings()
  const [inputState, dispatch] = useReducer(inputReducer, { text: "", priority: "medium" })

  // useRef Use Case 1: Focus input after adding task
  const inputRef = useRef<HTMLInputElement>(null)

  // useEffect to focus input on mount if autoFocus is enabled
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // useCallback Use Case 1: Add task function
  const addTask = useCallback(() => {
    if (inputState.text.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: inputState.text.trim(),
        completed: false,
        createdAt: new Date(),
        priority: inputState.priority,
      }

      setTasks((prev) => [...prev, newTask])
      dispatch({ type: "RESET" })

      // Focus input after adding if autoFocus is enabled
      if (autoFocus) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      }
    }
  }, [inputState.text, inputState.priority, setTasks, autoFocus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter a new task..."
          value={inputState.text}
          onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })}
          className="flex-1"
        />
        <Select
          value={inputState.priority}
          onValueChange={(value: "low" | "medium" | "high") => dispatch({ type: "SET_PRIORITY", payload: value })}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" disabled={!inputState.text.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </form>
  )
}
