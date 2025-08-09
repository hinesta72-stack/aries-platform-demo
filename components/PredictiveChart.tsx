"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts"
import { TrendingUp, Calendar, Brain, RefreshCw, AlertTriangle } from "lucide-react"

interface PredictiveChartProps {
  region: string
  regionType: "state" | "county" | "zip"
}

export default function PredictiveChart({ region, regionType }: PredictiveChartProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedScenario, setSelectedScenario] = useState<"baseline" | "disaster_impact" | "mitigation_applied">(
    "baseline",
  )
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(30)

  useEffect(() => {
    fetchPredictions()
  }, [region, regionType, timeRange])

  const fetchPredictions = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/predictions?region=${region}&type=${regionType}&days=${timeRange}&scenarios=true`,
      )
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Error fetching predictions:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatChartData = () => {
    if (!data) return []

    const predictions = data.scenarios ? data.scenarios[selectedScenario] : data.predictions

    return predictions.map((point: any, index: number) => ({
      date: new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      predicted: point.predicted,
      confidence_lower: point.confidence_lower,
      confidence_upper: point.confidence_upper,
      current: index === 0 ? data.current_score : null,
    }))
  }

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case "baseline":
        return "#3b82f6"
      case "disaster_impact":
        return "#ef4444"
      case "mitigation_applied":
        return "#22c55e"
      default:
        return "#3b82f6"
    }
  }

  const getScenarioDescription = (scenario: string) => {
    switch (scenario) {
      case "baseline":
        return "Current trajectory without major changes"
      case "disaster_impact":
        return "Impact of potential disaster event"
      case "mitigation_applied":
        return "With resilience interventions applied"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">Failed to load prediction data</div>
        </CardContent>
      </Card>
    )
  }

  const chartData = formatChartData()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span>Predictive Analysis</span>
              </CardTitle>
              <CardDescription>AI-powered resilience forecasting for {data.region}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                {data.model_info.model_type}
              </Badge>
              <Badge variant="secondary">{data.model_info.accuracy}% accuracy</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Current Score:</span>
              <span className="text-2xl font-bold text-white">{data.current_score}</span>
            </div>
            <div className="flex space-x-2">
              {[7, 14, 30].map((days) => (
                <Button
                  key={days}
                  size="sm"
                  variant={timeRange === days ? "default" : "outline"}
                  onClick={() => setTimeRange(days as 7 | 14 | 30)}
                >
                  {days}d
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Selection */}
      {data.scenarios && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Scenario Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(data.scenarios).map((scenario) => (
                <motion.button
                  key={scenario}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedScenario(scenario as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedScenario === scenario
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {scenario === "disaster_impact" && <AlertTriangle className="w-4 h-4 text-red-400" />}
                    {scenario === "mitigation_applied" && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {scenario === "baseline" && <Calendar className="w-4 h-4 text-blue-400" />}
                    <span className="text-white font-medium capitalize">{scenario.replace("_", " ")}</span>
                  </div>
                  <p className="text-xs text-gray-400 text-left">{getScenarioDescription(scenario)}</p>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            {timeRange}-Day Forecast
            <span className="ml-2 text-sm font-normal text-gray-400">({selectedScenario.replace("_", " ")})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" fontSize={12} domain={[20, 100]} />

                {/* Confidence interval */}
                <Area
                  dataKey="confidence_upper"
                  stackId="confidence"
                  stroke="none"
                  fill={getScenarioColor(selectedScenario)}
                  fillOpacity={0.1}
                />
                <Area
                  dataKey="confidence_lower"
                  stackId="confidence"
                  stroke="none"
                  fill={getScenarioColor(selectedScenario)}
                  fillOpacity={0.1}
                />

                {/* Prediction line */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke={getScenarioColor(selectedScenario)}
                  strokeWidth={3}
                  dot={{ fill: getScenarioColor(selectedScenario), strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: getScenarioColor(selectedScenario), strokeWidth: 2 }}
                />

                {/* Current score reference */}
                <ReferenceLine
                  y={data.current_score}
                  stroke="#64748b"
                  strokeDasharray="5 5"
                  label={{ value: "Current", position: "insideTopRight" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 rounded" style={{ backgroundColor: getScenarioColor(selectedScenario) }} />
              <span className="text-gray-300">Predicted Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-1 rounded opacity-30"
                style={{ backgroundColor: getScenarioColor(selectedScenario) }}
              />
              <span className="text-gray-300">Confidence Interval</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-slate-500 border-dashed border-t-2 border-slate-500" />
              <span className="text-gray-300">Current Score</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Info */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Model Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Features Used</h4>
              <div className="space-y-1">
                {data.model_info.features_used.map((feature: string, index: number) => (
                  <div key={index} className="text-sm text-white flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Model Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Algorithm:</span>
                  <span className="text-white">{data.model_info.model_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-white">{data.model_info.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Trained:</span>
                  <span className="text-white">{new Date(data.model_info.last_trained).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
