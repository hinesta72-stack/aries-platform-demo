"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Clock,
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

interface TimelineSliderProps {
  onTimeChange: (timePoint: string) => void
  currentTime: string
  forecastData?: any
}

const timePoints = [
  { id: "historical", label: "Historical", icon: Clock, type: "past" },
  { id: "current", label: "Current", icon: Activity, type: "present" },
  { id: "forecast30", label: "30 Days", icon: Brain, type: "future" },
  { id: "forecast60", label: "60 Days", icon: Brain, type: "future" },
  { id: "forecast90", label: "90 Days", icon: Brain, type: "future" },
]

export default function TimelineSlider({ onTimeChange, currentTime, forecastData }: TimelineSliderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(1) // Start at "current"
  const [confidence, setConfidence] = useState(95)
  const [collapsed, setCollapsed] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1
          if (next >= timePoints.length) {
            setIsPlaying(false)
            return prev
          }
          onTimeChange(timePoints[next].id)
          return next
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, onTimeChange])

  // Update current index when time changes externally
  useEffect(() => {
    const index = timePoints.findIndex((tp) => tp.id === currentTime)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [currentTime])

  // Update confidence based on forecast distance
  useEffect(() => {
    const currentPoint = timePoints[currentIndex]
    if (currentPoint.type === "future") {
      switch (currentPoint.id) {
        case "forecast30":
          setConfidence(88)
          break
        case "forecast60":
          setConfidence(75)
          break
        case "forecast90":
          setConfidence(62)
          break
        default:
          setConfidence(95)
      }
    } else {
      setConfidence(95)
    }
  }, [currentIndex])

  const handleTimePointClick = useCallback(
    (timePointId: string, index: number) => {
      setCurrentIndex(index)
      onTimeChange(timePointId)
      setIsPlaying(false)
    },
    [onTimeChange],
  )

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    setCurrentIndex(newIndex)
    onTimeChange(timePoints[newIndex].id)
    setIsPlaying(false)
  }

  const handleNext = () => {
    const newIndex = Math.min(timePoints.length - 1, currentIndex + 1)
    setCurrentIndex(newIndex)
    onTimeChange(timePoints[newIndex].id)
    setIsPlaying(false)
  }

  const getTimePointColor = (type: string, isActive: boolean) => {
    if (isActive) {
      switch (type) {
        case "past":
          return "bg-blue-600 text-white border-blue-500"
        case "present":
          return "bg-green-600 text-white border-green-500"
        case "future":
          return "bg-orange-600 text-white border-orange-500"
        default:
          return "bg-gray-600 text-white border-gray-500"
      }
    }
    return "bg-slate-700 text-gray-300 border-slate-600 hover:bg-slate-600 hover:text-white"
  }

  const currentPoint = timePoints[currentIndex]

  return (
    <Card className="bg-slate-900/95 backdrop-blur-sm border-slate-600">
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2" />
            Timeline Analysis
            {currentPoint.type === "future" && (
              <Badge className="ml-2 bg-orange-500 text-white text-xs">
                <Brain className="w-3 h-3 mr-1" />
                AI Forecast
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white h-6 w-6 p-0"
          >
            {collapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <CardContent className="p-3 pt-0 space-y-4">
              {/* Timeline Points */}
              <div className="flex justify-between items-center space-x-1">
                {timePoints.map((point, index) => {
                  const IconComponent = point.icon
                  const isActive = index === currentIndex
                  return (
                    <Button
                      key={point.id}
                      size="sm"
                      variant="outline"
                      onClick={() => handleTimePointClick(point.id, index)}
                      className={`flex-1 text-xs h-8 ${getTimePointColor(point.type, isActive)}`}
                    >
                      <IconComponent className="w-3 h-3 mr-1" />
                      {point.label}
                    </Button>
                  )
                })}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Past</span>
                  <span>Present</span>
                  <span>Future</span>
                </div>
                <Progress value={(currentIndex / (timePoints.length - 1)) * 100} className="h-2" />
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center space-x-2">
                <Button size="sm" variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
                  <SkipBack className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentIndex === timePoints.length - 1}
                >
                  <SkipForward className="w-3 h-3" />
                </Button>
              </div>

              {/* Current Status */}
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{currentPoint.label} Analysis</span>
                  {currentPoint.type === "future" && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {confidence}% Confidence
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-300">
                  {currentPoint.type === "past" && "Historical data from previous 6 months"}
                  {currentPoint.type === "present" && "Real-time resilience metrics and current risk assessment"}
                  {currentPoint.type === "future" &&
                    `AI-powered ${currentPoint.label.toLowerCase()} forecast with ${confidence}% confidence interval`}
                </div>
                {currentPoint.type === "future" && (
                  <div className="mt-2">
                    <Progress value={confidence} className="h-1" />
                  </div>
                )}
              </div>

              {/* Trend Indicator */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Trend Direction:</span>
                <div className="flex items-center space-x-1">
                  {currentPoint.type === "future" ? (
                    <>
                      <TrendingDown className="w-3 h-3 text-red-400" />
                      <span className="text-red-400">Declining</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Stable</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
