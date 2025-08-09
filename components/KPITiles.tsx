"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Users,
  Building,
  Info,
  Calendar,
  Target,
  DollarSign,
  Heart,
  AlertTriangle,
} from "lucide-react"

interface KPI {
  title: string
  value: number
  previousValue?: number
  unit: string
  trend: "up" | "down" | "stable"
  trendValue: number
  icon: any
  color: string
  sparklineData?: number[]
  description: string
  microLabel?: string
  drillDownPath?: string
  category: "readiness" | "people" | "economic"
  forecast?: {
    "30d": { value: number; confidence: number }
    "60d": { value: number; confidence: number }
    "90d": { value: number; confidence: number }
  }
}

interface KPITilesProps {
  kpis?: KPI[]
  showSparklines?: boolean
  showForecasts?: boolean
  animateOnLoad?: boolean
  timeHorizon?: string
}

export default function KPITiles({
  kpis = [],
  showSparklines = true,
  showForecasts = true,
  animateOnLoad = true,
  timeHorizon = "6M",
}: KPITilesProps) {
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState(timeHorizon)
  const [showForecastData, setShowForecastData] = useState(showForecasts)

  // Default KPIs if none provided
  const defaultKPIs: KPI[] = [
    {
      title: "National Resilience",
      value: 74,
      previousValue: 76,
      unit: "",
      trend: "down",
      trendValue: -2.6,
      icon: Shield,
      color: "text-cyan-400",
      sparklineData: [76, 75, 74, 73, 74, 72, 71, 74],
      description: "Composite score (0–100) reflecting national capacity to withstand and recover from disruptions.",
      microLabel: "Overall resilience index (0–100)",
      drillDownPath: "/national-resilience",
      category: "readiness",
      forecast: {
        "30d": { value: 73, confidence: 92 },
        "60d": { value: 72, confidence: 88 },
        "90d": { value: 71, confidence: 85 },
      },
    },
    {
      title: "Population at Risk",
      value: 45.2,
      previousValue: 42.8,
      unit: "M",
      trend: "up",
      trendValue: 5.6,
      icon: Users,
      color: "text-orange-400",
      sparklineData: [42.8, 43.2, 44.1, 44.8, 45.2, 45.0, 45.2],
      description: "Estimated number of people at increased risk based on infrastructure and environmental factors.",
      microLabel: "People in vulnerable categories",
      drillDownPath: "/population-risk",
      category: "people",
      forecast: {
        "30d": { value: 46.1, confidence: 85 },
        "60d": { value: 47.2, confidence: 82 },
        "90d": { value: 47.8, confidence: 78 },
      },
    },
    {
      title: "Economic Impact",
      value: 2.4,
      previousValue: 2.1,
      unit: "$B",
      trend: "up",
      trendValue: 14.3,
      icon: DollarSign,
      color: "text-green-400",
      sparklineData: [2.1, 2.2, 2.3, 2.4, 2.3, 2.4, 2.4],
      description: "Estimated potential financial impact of disruptions (in billions of USD).",
      microLabel: "Potential cost of disruptions ($B)",
      drillDownPath: "/economic-impact",
      category: "economic",
      forecast: {
        "30d": { value: 2.6, confidence: 88 },
        "60d": { value: 2.7, confidence: 85 },
        "90d": { value: 2.8, confidence: 82 },
      },
    },
    {
      title: "High Risk States",
      value: 12,
      previousValue: 10,
      unit: "",
      trend: "up",
      trendValue: 20.0,
      icon: AlertTriangle,
      color: "text-red-400",
      sparklineData: [10, 11, 12, 11, 12, 12, 12],
      description: "Number of states with resilience scores below 50.",
      microLabel: "States requiring immediate attention",
      drillDownPath: "/high-risk-states",
      category: "readiness",
      forecast: {
        "30d": { value: 13, confidence: 90 },
        "60d": { value: 14, confidence: 85 },
        "90d": { value: 15, confidence: 73 },
      },
    },
    {
      title: "Health System Capacity",
      value: 75,
      previousValue: 77,
      unit: "%",
      trend: "down",
      trendValue: -2.6,
      icon: Heart,
      color: "text-pink-400",
      sparklineData: [77, 76, 75, 74, 75, 75, 75],
      description: "Percentage of healthcare system functionality available during crises.",
      microLabel: "Healthcare system availability",
      drillDownPath: "/health-capacity",
      category: "people",
      forecast: {
        "30d": { value: 74, confidence: 92 },
        "60d": { value: 73, confidence: 89 },
        "90d": { value: 72, confidence: 88 },
      },
    },
    {
      title: "Infrastructure Score",
      value: 71,
      previousValue: 72,
      unit: "",
      trend: "down",
      trendValue: -1.4,
      icon: Building,
      color: "text-purple-400",
      sparklineData: [72, 72, 71, 71, 71, 70, 71],
      description: "Composite score (0–100) of critical infrastructure resilience.",
      microLabel: "Critical infrastructure health",
      drillDownPath: "/infrastructure",
      category: "economic",
      forecast: {
        "30d": { value: 70, confidence: 87 },
        "60d": { value: 69, confidence: 83 },
        "90d": { value: 69, confidence: 80 },
      },
    },
  ]

  const displayKPIs = kpis.length > 0 ? kpis : defaultKPIs

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />
      case "down":
        return <TrendingDown className="w-4 h-4" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "readiness":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "people":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "economic":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white">Key Performance Indicators</h2>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Calendar className="w-3 h-3 mr-1" />
              {selectedTimeHorizon} Forecast
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedTimeHorizon} onValueChange={setSelectedTimeHorizon}>
              <SelectTrigger className="w-24 h-8 text-xs bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">30D</SelectItem>
                <SelectItem value="60d">60D</SelectItem>
                <SelectItem value="90d">90D</SelectItem>
                <SelectItem value="6M">6M</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showForecastData ? "default" : "outline"}
              size="sm"
              onClick={() => setShowForecastData(!showForecastData)}
              className="h-8 text-xs"
            >
              {showForecastData ? "Current" : "Forecast"}
            </Button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayKPIs.map((kpi, index) => {
            const IconComponent = kpi.icon
            const currentValue = typeof kpi.value === "number" ? kpi.value : 0
            const forecastValue =
              kpi.forecast?.[selectedTimeHorizon as keyof typeof kpi.forecast]?.value || currentValue
            const displayValue = showForecastData ? forecastValue : currentValue
            const trendValue = typeof kpi.trendValue === "number" ? kpi.trendValue : 0

            return (
              <Tooltip key={kpi.title}>
                <TooltipTrigger asChild>
                  <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 bg-slate-700 rounded-lg ${kpi.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-sm font-medium">{kpi.title}</CardTitle>
                            {kpi.microLabel && <p className="text-xs text-gray-400 mt-1">{kpi.microLabel}</p>}
                          </div>
                        </div>
                        <Badge className={getCategoryColor(kpi.category)}>{kpi.category}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Main Value */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline space-x-1">
                          <span className={`text-3xl font-bold ${kpi.color}`}>
                            {Number(displayValue).toFixed(kpi.unit === "" ? 0 : 1)}
                          </span>
                          <span className="text-sm text-gray-400">{kpi.unit}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${getTrendColor(kpi.trend)}`}>
                          {getTrendIcon(kpi.trend)}
                          <span className="text-sm font-medium">{Math.abs(trendValue).toFixed(1)}%</span>
                        </div>
                      </div>

                      {/* Sparkline */}
                      {showSparklines && kpi.sparklineData && (
                        <div className="h-8 flex items-end space-x-1">
                          {kpi.sparklineData.map((value, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 bg-gradient-to-t from-slate-600 to-slate-500 rounded-sm opacity-60`}
                              style={{
                                height: `${(value / Math.max(...kpi.sparklineData!)) * 100}%`,
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Forecast Comparison */}
                      {showForecasts && kpi.forecast && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">{selectedTimeHorizon} Forecast:</span>
                            <span className={kpi.color}>
                              {Number(forecastValue).toFixed(kpi.unit === "" ? 0 : 1)}
                              {kpi.unit}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Confidence:</span>
                            <span className="text-blue-400">
                              {kpi.forecast[selectedTimeHorizon as keyof typeof kpi.forecast]?.confidence || 0}%
                            </span>
                          </div>
                          <Progress
                            value={kpi.forecast[selectedTimeHorizon as keyof typeof kpi.forecast]?.confidence || 0}
                            className="h-1"
                          />
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                        <div className="flex items-center space-x-2">
                          <Target className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-400">
                            {kpi.category.charAt(0).toUpperCase() + kpi.category.slice(1)}
                          </span>
                        </div>
                        <Info className="w-3 h-3 text-gray-500" />
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{kpi.description}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{displayKPIs.filter((k) => k.trend === "up").length}</div>
            <div className="text-xs text-gray-400">Improving</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-400">{displayKPIs.filter((k) => k.trend === "down").length}</div>
            <div className="text-xs text-gray-400">Declining</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">
              {Math.round(displayKPIs.reduce((acc, k) => acc + (k.value || 0), 0) / displayKPIs.length)}
            </div>
            <div className="text-xs text-gray-400">Avg Score</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">
              {displayKPIs.filter((k) => k.forecast && k.forecast["90d"]?.confidence > 85).length}
            </div>
            <div className="text-xs text-gray-400">High Confidence</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
