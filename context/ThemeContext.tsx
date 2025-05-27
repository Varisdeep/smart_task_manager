"use client"

import React, { createContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface ThemeContextType {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // useContext Use Case 1: Theme management
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light")

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
