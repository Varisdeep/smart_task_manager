"use client"

import { useTaskStats } from "@/context/TaskStatsContext"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react"

export default function TaskStats() {
  const { stats } = useTaskStats()

  return (
    <div className="space-y-4">
      {/* Completion Rate */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Completion Rate</span>
          <span className="text-sm text-muted-foreground">{Math.round(stats.completionRate)}%</span>
        </div>
        <Progress value={stats.completionRate} className="h-2" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Target className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-sm font-medium">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <div>
            <p className="text-sm font-medium">{stats.completed}</p>
            <p className="text-xs text-muted-foreground">Done</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Clock className="h-4 w-4 text-orange-500" />
          <div>
            <p className="text-sm font-medium">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <TrendingUp className="h-4 w-4 text-purple-500" />
          <div>
            <p className="text-sm font-medium">{stats.total > 0 ? Math.round(stats.completionRate) : 0}%</p>
            <p className="text-xs text-muted-foreground">Rate</p>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      {stats.total > 0 && (
        <div className="p-3 bg-primary/10 rounded-lg text-center">
          <p className="text-sm">
            {stats.completionRate === 100
              ? "🎉 All tasks completed! Great job!"
              : stats.completionRate >= 75
                ? "🔥 You're on fire! Keep it up!"
                : stats.completionRate >= 50
                  ? "💪 Good progress! You're halfway there!"
                  : "🚀 Let's get started on those tasks!"}
          </p>
        </div>
      )}
    </div>
  )
}
