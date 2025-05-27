"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface SettingsContextType {
  autoFocus: boolean
  setAutoFocus: (value: boolean) => void
  soundEnabled: boolean
  setSoundEnabled: (value: boolean) => void
  workDuration: number
  setWorkDuration: (value: number) => void
  breakDuration: number
  setBreakDuration: (value: number) => void
}

// useContext Use Case 1: Settings management
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [autoFocus, setAutoFocus] = useLocalStorage("autoFocus", true)
  const [soundEnabled, setSoundEnabled] = useLocalStorage("soundEnabled", true)
  const [workDuration, setWorkDuration] = useLocalStorage("workDuration", 25)
  const [breakDuration, setBreakDuration] = useLocalStorage("breakDuration", 5)

  return (
    <SettingsContext.Provider
      value={{
        autoFocus,
        setAutoFocus,
        soundEnabled,
        setSoundEnabled,
        workDuration,
        setWorkDuration,
        breakDuration,
        setBreakDuration,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider")
  }
  return context
}
