"use client"

import { TaskStatsProvider } from "@/context/TaskStatsContext"
import { SettingsProvider } from "@/context/SettingsContext"
import TaskInput from "@/components/TaskInput"
import TaskList from "@/components/TaskList"
import TaskStats from "@/components/TaskStats"
import Timer from "@/components/Timer"
import { Card } from "@/components/ui/card"

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Smart Task Manager</h1>
          <p className="text-muted-foreground">Boost your productivity with intelligent task management</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Task Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
              <TaskInput />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
              <TaskList />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
              <TaskStats />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Pomodoro Timer</h2>
              <Timer />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <TaskStatsProvider>
        <Dashboard />
      </TaskStatsProvider>
    </SettingsProvider>
  )
}
