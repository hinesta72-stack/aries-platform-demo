"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Download, Maximize2 } from "lucide-react"

interface TrendDataPoint {
  date: string
  value: number
  forecast?: boolean
  confidence?: number
}

interface TrendGraphProps {
  data?: TrendDataPoint[]
  title?: string
  location?: string
  showForecast?: boolean
  timeRange?: string
}

export default function TrendGraph({
  data = [],
  title = "Resilience Trend",
  location = "Location",
  showForecast = true,
  timeRange = "90d",
}: TrendGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange)
  const [hoveredPoint, setHoveredPoint] = useState<TrendDataPoint | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Generate sample data if none provided
  const sampleData: TrendDataPoint[] = [
    { date: "2024-01", value: 76.2 },
    { date: "2024-02", value: 75.8 },
    { date: "2024-03", value: 74.1 },
    { date: "2024-04", value: 73.5 },
    { date: "2024-05", value: 74.8 },
    { date: "2024-06", value: 72.3 },
    { date: "2024-07", value: 71.9 },
    { date: "2024-08", value: 74.2 },
    { date: "2024-09", value: 72.8, forecast: true, confidence: 88 },
    { date: "2024-10", value: 69.5, forecast: true, confidence: 82 },
    { date: "2024-11", value: 71.2, forecast: true, confidence: 75 },
  ]

  const chartData = data.length > 0 ? data : sampleData
  const historicalData = chartData.filter((d) => !d.forecast)
  const forecastData = chartData.filter((d) => d.forecast)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const padding = { top: 20, right: 40, bottom: 40, left: 60 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Clear canvas
    ctx.fillStyle = "#1e293b"
    ctx.fillRect(0, 0, rect.width, rect.height)

    if (chartData.length === 0) return

    // Calculate scales
    const values = chartData.map((d) => d.value).filter((v) => typeof v === "number" && !isNaN(v))
    if (values.length === 0) return

    const minValue = Math.min(...values) * 0.95
    const maxValue = Math.max(...values) * 1.05

    const xScale = (index: number) => padding.left + (index / (chartData.length - 1)) * chartWidth
    const yScale = (value: number) =>
      padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight

    // Draw grid lines
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      // Y-axis labels
      const value = maxValue - (i / 5) * (maxValue - minValue)
      ctx.fillStyle = "#9ca3af"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(value.toFixed(1), padding.left - 10, y + 4)
    }

    // Vertical grid lines
    for (let i = 0; i < chartData.length; i += Math.ceil(chartData.length / 6)) {
      const x = xScale(i)
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, padding.top + chartHeight)
      ctx.stroke()

      // X-axis labels
      ctx.fillStyle = "#9ca3af"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(chartData[i]?.date || "", x, padding.top + chartHeight + 20)
    }

    // Draw confidence area for forecast
    if (showForecast && forecastData.length > 0) {
      const lastHistorical = historicalData[historicalData.length - 1]
      if (lastHistorical) {
        const allForecastData = [lastHistorical, ...forecastData]

        ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
        ctx.beginPath()

        // Top confidence bound
        allForecastData.forEach((point, index) => {
          if (typeof point.value === "number") {
            const dataIndex = historicalData.length - 1 + index
            const x = xScale(dataIndex)
            const confidence = point.confidence || 90
            const upperBound = point.value + (point.value * (100 - confidence)) / 200
            const y = yScale(upperBound)

            if (index === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
        })

        // Bottom confidence bound (reverse order)
        for (let i = allForecastData.length - 1; i >= 0; i--) {
          const point = allForecastData[i]
          if (typeof point.value === "number") {
            const dataIndex = historicalData.length - 1 + i
            const x = xScale(dataIndex)
            const confidence = point.confidence || 90
            const lowerBound = point.value - (point.value * (100 - confidence)) / 200
            const y = yScale(lowerBound)
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.fill()
      }
    }

    // Draw historical line
    if (historicalData.length > 0) {
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 3
      ctx.beginPath()

      let firstPoint = true
      historicalData.forEach((point, index) => {
        if (typeof point.value === "number") {
          const x = xScale(index)
          const y = yScale(point.value)

          if (firstPoint) {
            ctx.moveTo(x, y)
            firstPoint = false
          } else {
            ctx.lineTo(x, y)
          }
        }
      })

      ctx.stroke()
    }

    // Draw forecast line
    if (showForecast && forecastData.length > 0) {
      const lastHistorical = historicalData[historicalData.length - 1]
      if (lastHistorical) {
        const allForecastData = [lastHistorical, ...forecastData]

        ctx.strokeStyle = "#8b5cf6"
        ctx.lineWidth = 2
        ctx.setLineDash([8, 4])
        ctx.beginPath()

        let firstPoint = true
        allForecastData.forEach((point, index) => {
          if (typeof point.value === "number") {
            const dataIndex = historicalData.length - 1 + index
            const x = xScale(dataIndex)
            const y = yScale(point.value)

            if (firstPoint) {
              ctx.moveTo(x, y)
              firstPoint = false
            } else {
              ctx.lineTo(x, y)
            }
          }
        })

        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    // Draw data points
    chartData.forEach((point, index) => {
      if (typeof point.value === "number") {
        const x = xScale(index)
        const y = yScale(point.value)

        ctx.fillStyle = point.forecast ? "#8b5cf6" : "#3b82f6"
        ctx.beginPath()
        ctx.arc(x, y, point.forecast ? 4 : 5, 0, 2 * Math.PI)
        ctx.fill()

        // Highlight hovered point
        if (hoveredPoint === point) {
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(x, y, 8, 0, 2 * Math.PI)
          ctx.stroke()
        }
      }
    })

    // Draw "Now" indicator
    const nowIndex = historicalData.length - 1
    if (nowIndex >= 0) {
      const x = xScale(nowIndex)
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 2
      ctx.setLineDash([2, 2])
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, padding.top + chartHeight)
      ctx.stroke()
      ctx.setLineDash([])

      // "Now" label
      ctx.fillStyle = "#ef4444"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Now", x, padding.top - 5)
    }
  }, [chartData, showForecast, hoveredPoint])

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setMousePos({ x: event.clientX, y: event.clientY })

    // Find closest data point
    const padding = { left: 60, right: 40 }
    const chartWidth = rect.width - padding.left - padding.right

    let closestPoint: TrendDataPoint | null = null
    let minDistance = Number.POSITIVE_INFINITY

    chartData.forEach((point, index) => {
      const pointX = padding.left + (index / (chartData.length - 1)) * chartWidth
      const distance = Math.abs(x - pointX)

      if (distance < minDistance && distance < 20) {
        minDistance = distance
        closestPoint = point
      }
    })

    setHoveredPoint(closestPoint)
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

  // Safe value extraction with defaults
  const currentValue = chartData[chartData.length - 1]?.value
  const previousValue = chartData[chartData.length - 2]?.value

  const safeCurrentValue = typeof currentValue === "number" ? currentValue : 0
  const safePreviousValue = typeof previousValue === "number" ? previousValue : 0

  const trend = safeCurrentValue > safePreviousValue ? "up" : safeCurrentValue < safePreviousValue ? "down" : "stable"
  const trendValue = safePreviousValue !== 0 ? ((safeCurrentValue - safePreviousValue) / safePreviousValue) * 100 : 0

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg">{title}</CardTitle>
            <p className="text-gray-400 text-sm">{location}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-2xl font-bold text-blue-400">{safeCurrentValue.toFixed(1)}</div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-gray-400"
                }`}
              >
                {trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : trend === "down" ? (
                  <TrendingDown className="w-4 h-4" />
                ) : null}
                <span>{Math.abs(trendValue).toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-20 h-8 text-xs bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">30D</SelectItem>
                <SelectItem value="90d">90D</SelectItem>
                <SelectItem value="6M">6M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <Download className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <Maximize2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Historical</Badge>
          {showForecast && <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Forecast</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            className="w-full cursor-crosshair"
            style={{ height: "300px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />

          {/* Tooltip */}
          {hoveredPoint && typeof hoveredPoint.value === "number" && (
            <div
              className="absolute z-10 bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-lg pointer-events-none"
              style={{
                left: mousePos.x - 100,
                top: mousePos.y - 80,
              }}
            >
              <div className="text-white text-sm font-medium">{hoveredPoint.date}</div>
              <div className="text-blue-400 text-lg font-bold">{hoveredPoint.value.toFixed(1)}</div>
              {hoveredPoint.forecast && (
                <div className="text-purple-400 text-xs">Forecast • {hoveredPoint.confidence || 90}% confidence</div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
