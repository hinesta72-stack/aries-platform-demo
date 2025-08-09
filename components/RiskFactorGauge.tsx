"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, TrendingUp } from "lucide-react"

interface RiskFactorGaugeProps {
  title?: string
  value?: number
  maxValue?: number
  riskLevel?: "low" | "moderate" | "high" | "critical"
  trend?: "up" | "down" | "stable"
  trendValue?: number
  description?: string
  size?: number
}

export default function RiskFactorGauge({
  title = "Risk Factor",
  value = 65,
  maxValue = 100,
  riskLevel = "moderate",
  trend = "stable",
  trendValue = 0,
  description = "Current risk assessment",
  size = 200,
}: RiskFactorGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Safe value handling
  const safeValue = typeof value === "number" && !isNaN(value) ? value : 0
  const safeMaxValue = typeof maxValue === "number" && !isNaN(maxValue) && maxValue > 0 ? maxValue : 100
  const safeTrendValue = typeof trendValue === "number" && !isNaN(trendValue) ? trendValue : 0

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "#10b981" // Green
      case "moderate":
        return "#f59e0b" // Yellow
      case "high":
        return "#f97316" // Orange
      case "critical":
        return "#ef4444" // Red
      default:
        return "#6b7280" // Gray
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <Shield className="w-4 h-4" />
      case "moderate":
        return <TrendingUp className="w-4 h-4" />
      case "high":
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 20

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 8
    ctx.stroke()

    // Progress arc
    const startAngle = -Math.PI / 2
    const endAngle = startAngle + 2 * Math.PI * (safeValue / safeMaxValue)

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.strokeStyle = getRiskColor(riskLevel)
    ctx.lineWidth = 8
    ctx.lineCap = "round"
    ctx.stroke()

    // Center text
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${size / 8}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(Number(safeValue).toFixed(0), centerX, centerY - 5)

    // Unit text
    ctx.fillStyle = "#9ca3af"
    ctx.font = `${size / 16}px sans-serif`
    ctx.fillText(`/ ${Number(safeMaxValue).toFixed(0)}`, centerX, centerY + 15)

    // Risk level indicator dots
    const dotRadius = 4
    const dotDistance = radius + 15

    for (let i = 0; i < 4; i++) {
      const angle = (i / 3) * Math.PI - Math.PI / 2
      const dotX = centerX + Math.cos(angle) * dotDistance
      const dotY = centerY + Math.sin(angle) * dotDistance

      ctx.beginPath()
      ctx.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI)

      const dotLevel = i === 0 ? "low" : i === 1 ? "moderate" : i === 2 ? "high" : "critical"
      const isActive = dotLevel === riskLevel

      ctx.fillStyle = isActive ? getRiskColor(dotLevel) : "#374151"
      ctx.fill()

      if (isActive) {
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }
  }, [safeValue, safeMaxValue, riskLevel, size])

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg flex items-center justify-between">
          {title}
          <Badge
            className={`text-xs ${
              riskLevel === "low"
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : riskLevel === "moderate"
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  : riskLevel === "high"
                    ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
            }`}
          >
            {getRiskIcon(riskLevel)}
            <span className="ml-1 capitalize">{riskLevel}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="mb-4"
        />

        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm">{description}</p>

          {trend !== "stable" && (
            <div
              className={`flex items-center justify-center space-x-1 text-sm ${
                trend === "up" ? "text-red-400" : "text-green-400"
              }`}
            >
              <TrendingUp className={`w-3 h-3 ${trend === "down" ? "rotate-180" : ""}`} />
              <span>{Number(Math.abs(safeTrendValue)).toFixed(1)}% vs last period</span>
            </div>
          )}

          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
            <span>Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
