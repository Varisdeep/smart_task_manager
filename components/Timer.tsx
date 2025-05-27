"use client"

import { useReducer, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { usePomodoroTimer } from "@/hooks/usePomodoroTimer"
import { useSettings } from "@/context/SettingsContext"
import { Play, Pause, RotateCcw, Coffee, Settings } from "lucide-react"

interface TimerState {
  mode: "work" | "break"
  isRunning: boolean
  showSettings: boolean
}

type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "SWITCH_MODE"; payload: "work" | "break" }
  | { type: "TOGGLE_SETTINGS" }

// useReducer Use Case 2: Handle timer logic and state
function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true }
    case "PAUSE":
      return { ...state, isRunning: false }
    case "RESET":
      return { ...state, isRunning: false }
    case "SWITCH_MODE":
      return { ...state, mode: action.payload, isRunning: false }
    case "TOGGLE_SETTINGS":
      return { ...state, showSettings: !state.showSettings }
    default:
      return state
  }
}

export default function Timer() {
  const { workDuration, breakDuration, soundEnabled, setSoundEnabled } = useSettings()
  const [timerState, dispatch] = useReducer(timerReducer, {
    mode: "work",
    isRunning: false,
    showSettings: false,
  })

  const workDurationSeconds = workDuration * 60
  const breakDurationSeconds = breakDuration * 60

  const { timeLeft, isRunning, start, pause, reset } = usePomodoroTimer(
    timerState.mode === "work" ? workDurationSeconds : breakDurationSeconds,
    timerState.isRunning,
  )

  // useCallback Use Case 2: Control timer functions
  const handleStart = useCallback(() => {
    dispatch({ type: "START" })
    start()
  }, [start])

  const handlePause = useCallback(() => {
    dispatch({ type: "PAUSE" })
    pause()
  }, [pause])

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" })
    reset()
  }, [reset])

  const switchMode = useCallback(
    (mode: "work" | "break") => {
      dispatch({ type: "SWITCH_MODE", payload: mode })
      reset()
    },
    [reset],
  )

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalDuration = timerState.mode === "work" ? workDurationSeconds : breakDurationSeconds
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100

  return (
    <div className="space-y-6 text-center">
      {/* Settings Toggle */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "TOGGLE_SETTINGS" })}
          className="text-muted-foreground"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Settings Panel */}
      {timerState.showSettings && (
        <div className="p-4 bg-muted/50 rounded-lg space-y-3 text-left">
          <h3 className="font-medium text-center">Timer Settings</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm">Sound notifications</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={soundEnabled ? "bg-primary text-primary-foreground" : ""}
            >
              {soundEnabled ? "On" : "Off"}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Work: {workDuration}min | Break: {breakDuration}min
          </div>
        </div>
      )}

      {/* Mode Selector */}
      <div className="flex gap-2">
        <Button
          variant={timerState.mode === "work" ? "default" : "outline"}
          onClick={() => switchMode("work")}
          className="flex-1"
          disabled={isRunning}
        >
          Work
        </Button>
        <Button
          variant={timerState.mode === "break" ? "default" : "outline"}
          onClick={() => switchMode("break")}
          className="flex-1"
          disabled={isRunning}
        >
          <Coffee className="h-4 w-4 mr-2" />
          Break
        </Button>
      </div>

      {/* Timer Display */}
      <div className="space-y-4">
        <div className="text-4xl font-mono font-bold">{formatTime(timeLeft)}</div>

        <Progress value={progress} className="h-2" />

        <p className="text-sm text-muted-foreground">{timerState.mode === "work" ? "Focus time!" : "Take a break!"}</p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        {!isRunning ? (
          <Button onClick={handleStart} className="flex-1">
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        ) : (
          <Button onClick={handlePause} variant="outline" className="flex-1">
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
        )}

        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Timer completed notification */}
      {timeLeft === 0 && (
        <div className="p-3 bg-primary/10 rounded-lg">
          <p className="text-sm font-medium">
            {timerState.mode === "work" ? "🎉 Work session complete!" : "☕ Break time over!"}
          </p>
        </div>
      )}
    </div>
  )
}
