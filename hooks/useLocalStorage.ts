"use client"

import { useState, useEffect } from "react"

// Custom Hook 1: useLocalStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // useState to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // useEffect Use Case 1: Sync tasks to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    }
  }, [key, storedValue])

  // useEffect Use Case 2: Load tasks on mount and listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [key])

  return [storedValue, setStoredValue] as const
}
