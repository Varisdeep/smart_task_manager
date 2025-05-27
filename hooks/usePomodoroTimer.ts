"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Custom Hook 2: usePomodoroTimer
export function usePomodoroTimer(duration: number, shouldRun: boolean) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)

  // useRef Use Case 2: Track timer interval ID
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  // Timer logic
  useEffect(() => {
    if (shouldRun && timeLeft > 0) {
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setIsRunning(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [shouldRun, timeLeft])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(duration)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [duration])

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
  }
}
