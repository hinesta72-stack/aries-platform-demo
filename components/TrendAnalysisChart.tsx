"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp } from "lucide-react"

interface RiskCategory {
  id: string
  name: string
  icon: string
  color: string
  averageScore: number
  factors: any[]
}

interface TrendAnalysisChartProps {
  data: RiskCategory[]
  location: string
  viewMode: "current" | "forecast"
}

export default function TrendAnalysisChart({ data, location, viewMode }: TrendAnalysisChartProps) {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(data.map((cat) => cat.id))

  // Generate trend data
  const generateTrendData = () => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
    const trendData = []

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))

      const dataPoint: any = {
        date: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }

      data.forEach((category) => {
        if (selectedCategories.includes(category.id)) {
          // Generate realistic trend data with some variation
          const baseScore = category.averageScore
          const variation = (Math.random() - 0.5) * 10
          const trendFactor = viewMode === "forecast" ? 1.1 : 1
          dataPoint[category.name] = Math.max(0, Math.min(100, baseScore + variation * trendFactor))
        }
      })

      trendData.push(dataPoint)
    }

    return trendData
  }

  const trendData = generateTrendData()

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const getCategoryColor = (categoryName: string) => {
    const colors = {
      "Climate Risk": "#ef4444",
      Infrastructure: "#f97316",
      "Public Health": "#eab308",
      Economic: "#22c55e",
      Social: "#3b82f6",
      Environmental: "#8b5cf6",
    }
    return colors[categoryName as keyof typeof colors] || "#6b7280"
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-300 text-sm">{entry.dataKey}</span>
              </div>
              <span className="text-white font-medium">{Math.round(entry.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Risk Trend Analysis
              <Badge className="ml-3 bg-blue-500 text-white">{location}</Badge>
            </CardTitle>
            <p className="text-gray-400 text-sm mt-1">
              {viewMode === "current" ? "Historical trends" : "Predictive forecast"} for risk categories
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <TabsList className="bg-slate-700">
                <TabsTrigger value="7d" className="text-xs">
                  7D
                </TabsTrigger>
                <TabsTrigger value="30d" className="text-xs">
                  30D
                </TabsTrigger>
                <TabsTrigger value="90d" className="text-xs">
                  90D
                </TabsTrigger>
                <TabsTrigger value="1y" className="text-xs">
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Category Toggles */}
        <div className="flex flex-wrap gap-2 mt-4">
          {data.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleCategory(category.id)}
              className={`text-xs ${
                selectedCategories.includes(category.id)
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-slate-600 text-gray-300 hover:text-white bg-transparent"
              }`}
            >
              <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: getCategoryColor(category.name) }} />
              {category.name}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#9ca3af" }} />

              {data.map(
                (category) =>
                  selectedCategories.includes(category.id) && (
                    <Line
                      key={category.id}
                      type="monotone"
                      dataKey={category.name}
                      stroke={getCategoryColor(category.name)}
                      strokeWidth={2}
                      dot={{ fill: getCategoryColor(category.name), strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, stroke: getCategoryColor(category.name), strokeWidth: 2 }}
                    />
                  ),
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {Math.round(data.reduce((acc, cat) => acc + cat.averageScore, 0) / data.length)}
            </div>
            <div className="text-xs text-gray-400">Avg Risk Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{data.filter((cat) => cat.averageScore > 70).length}</div>
            <div className="text-xs text-gray-400">High Risk Areas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{viewMode === "forecast" ? "+5%" : "-2%"}</div>
            <div className="text-xs text-gray-400">{timeRange.toUpperCase()} Change</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">85%</div>
            <div className="text-xs text-gray-400">Confidence</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
