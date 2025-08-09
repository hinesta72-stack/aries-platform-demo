"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { TrendingUp, TrendingDown, Download, Filter, AlertTriangle, Shield } from "lucide-react"

interface RiskFactor {
  name: string
  impact: number
  category: "infrastructure" | "social" | "economic" | "environmental" | "governance"
  trend: "up" | "down" | "stable"
  confidence: number
  description: string
}

interface FeatureImpactChartProps {
  riskFactors?: RiskFactor[]
  title?: string
  showLearnMore?: boolean
  height?: number
}

export default function FeatureImpactChart({
  riskFactors = [],
  title = "Risk Factor Impact Analysis",
  showLearnMore = true,
  height = 400,
}: FeatureImpactChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Sample data if none provided
  const sampleData: RiskFactor[] = [
    {
      name: "Healthcare Access",
      impact: 8.7,
      category: "social",
      trend: "up",
      confidence: 92,
      description: "Proximity and quality of healthcare facilities",
    },
    {
      name: "Economic Diversity",
      impact: 7.9,
      category: "economic",
      trend: "up",
      confidence: 88,
      description: "Variety of economic sectors and employment opportunities",
    },
    {
      name: "Infrastructure Age",
      impact: -6.8,
      category: "infrastructure",
      trend: "down",
      confidence: 85,
      description: "Age and condition of critical infrastructure",
    },
    {
      name: "Social Cohesion",
      impact: 6.2,
      category: "social",
      trend: "stable",
      confidence: 79,
      description: "Community connectivity and trust levels",
    },
    {
      name: "Climate Exposure",
      impact: -5.9,
      category: "environmental",
      trend: "down",
      confidence: 94,
      description: "Exposure to climate-related hazards",
    },
    {
      name: "Emergency Services",
      impact: 5.4,
      category: "governance",
      trend: "up",
      confidence: 87,
      description: "Quality and response time of emergency services",
    },
    {
      name: "Housing Stability",
      impact: 4.8,
      category: "social",
      trend: "down",
      confidence: 82,
      description: "Housing affordability and availability",
    },
    {
      name: "Transportation",
      impact: 4.3,
      category: "infrastructure",
      trend: "stable",
      confidence: 76,
      description: "Transportation network resilience and accessibility",
    },
  ]

  const chartData = riskFactors.length > 0 ? riskFactors : sampleData

  // Filter and sort data
  const filteredData = chartData
    .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
    .sort((a, b) => {
      const comparison = Math.abs(b.impact) - Math.abs(a.impact)
      return sortOrder === "desc" ? comparison : -comparison
    })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "infrastructure":
        return "#f97316" // orange
      case "social":
        return "#8b5cf6" // purple
      case "economic":
        return "#06b6d4" // cyan
      case "environmental":
        return "#22c55e" // green
      case "governance":
        return "#ef4444" // red
      default:
        return "#6b7280" // gray
    }
  }

  const getImpactColor = (impact: number) => {
    if (impact > 0) return "#22c55e" // positive impact - green
    return "#ef4444" // negative impact - red
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className={`text-lg font-bold ${data.impact > 0 ? "text-green-400" : "text-red-400"}`}>
            Impact: {data.impact > 0 ? "+" : ""}
            {data.impact.toFixed(1)}
          </p>
          <p className="text-blue-400 text-sm">Confidence: {data.confidence}%</p>
          <p className="text-gray-300 text-sm mt-1">{data.description}</p>
          <div className="flex items-center mt-2">
            <Badge
              className="text-xs mr-2"
              style={{
                backgroundColor: getCategoryColor(data.category) + "40",
                color: getCategoryColor(data.category),
              }}
            >
              {data.category}
            </Badge>
            <div
              className={`flex items-center text-xs ${
                data.trend === "up" ? "text-green-400" : data.trend === "down" ? "text-red-400" : "text-gray-400"
              }`}
            >
              {data.trend === "up" ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : data.trend === "down" ? (
                <TrendingDown className="w-3 h-3 mr-1" />
              ) : null}
              {data.trend}
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  const categories = ["all", ...Array.from(new Set(chartData.map((item) => item.category)))]

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg">{title}</CardTitle>
            <p className="text-gray-400 text-sm mt-1">
              Showing {filteredData.length} of {chartData.length} factors
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32 h-8 text-xs bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <Filter className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-3">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Shield className="w-3 h-3 mr-1" />
            {filteredData.filter((d) => d.impact > 0).length} Positive Factors
          </Badge>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {filteredData.filter((d) => d.impact < 0).length} Risk Factors
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {filteredData.filter((d) => d.confidence >= 85).length} High Confidence
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="impact" radius={[4, 4, 0, 0]}>
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getImpactColor(entry.impact)} opacity={entry.confidence / 100} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-slate-700/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{filteredData.filter((d) => d.impact > 0).length}</div>
            <div className="text-xs text-gray-400">Positive Factors</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">{filteredData.filter((d) => d.impact < 0).length}</div>
            <div className="text-xs text-gray-400">Risk Factors</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">
              {(filteredData.reduce((acc, d) => acc + d.confidence, 0) / filteredData.length).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">
              {filteredData.reduce((acc, d) => acc + Math.abs(d.impact), 0).toFixed(1)}
            </div>
            <div className="text-xs text-gray-400">Total Impact</div>
          </div>
        </div>

        {showLearnMore && (
          <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-blue-400 font-medium text-sm">Learn More About Risk Factors</h4>
                <p className="text-gray-300 text-xs mt-1">
                  Explore detailed analysis and recommendations for each factor
                </p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                View Details
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
