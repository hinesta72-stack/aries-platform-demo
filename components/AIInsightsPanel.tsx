"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Brain, AlertTriangle, TrendingUp, Target, Lightbulb, Clock, CheckCircle, ArrowRight } from "lucide-react"

interface AIInsight {
  id: string
  type: "warning" | "opportunity" | "trend" | "recommendation"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  timeframe: string
  actionItems?: string[]
}

interface AIInsightsPanelProps {
  insights: {
    summary: string
    riskDistribution: { name: string; value: number; color: string }[]
    keyInsights: AIInsight[]
    recommendations: AIInsight[]
    predictions: {
      shortTerm: string
      mediumTerm: string
      longTerm: string
    }
  }
  location: string
}

export default function AIInsightsPanel({ insights, location }: AIInsightsPanelProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "opportunity":
        return <Target className="w-4 h-4 text-green-400" />
      case "trend":
        return <TrendingUp className="w-4 h-4 text-blue-400" />
      case "recommendation":
        return <Lightbulb className="w-4 h-4 text-yellow-400" />
      default:
        return <Brain className="w-4 h-4 text-purple-400" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-orange-500"
      default:
        return "bg-yellow-500"
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-gray-300">{data.value}% of total risk</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Risk Intelligence
          <Badge className="ml-3 bg-purple-500 text-white">Beta</Badge>
        </CardTitle>
        <p className="text-gray-400 text-sm">AI-powered insights and recommendations for {location}</p>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-slate-700">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              Insights
            </TabsTrigger>
            <TabsTrigger value="actions" className="text-xs">
              Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* AI Summary */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-purple-400" />
                AI Analysis Summary
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">{insights.summary}</p>
            </div>

            {/* Risk Distribution Chart */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-3">Risk Distribution</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={insights.riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {insights.riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {insights.riskDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-300 text-xs">{item.name}</span>
                    <span className="text-white text-xs font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Predictions */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                AI Predictions
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">Next 30 days</span>
                    <Badge className="bg-orange-500 text-white text-xs">Medium Risk</Badge>
                  </div>
                  <p className="text-gray-300 text-xs">{insights.predictions.shortTerm}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">Next 90 days</span>
                    <Badge className="bg-red-500 text-white text-xs">High Risk</Badge>
                  </div>
                  <p className="text-gray-300 text-xs">{insights.predictions.mediumTerm}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">Next year</span>
                    <Badge className="bg-yellow-500 text-white text-xs">Moderate Risk</Badge>
                  </div>
                  <p className="text-gray-300 text-xs">{insights.predictions.longTerm}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-3 mt-4">
            {insights.keyInsights.map((insight, index) => (
              <div key={insight.id} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getInsightIcon(insight.type)}
                    <span className="text-white font-medium text-sm">{insight.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getImpactColor(insight.impact)} text-white text-xs`}>{insight.impact}</Badge>
                    <span className="text-gray-400 text-xs">{insight.timeframe}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-3">{insight.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs">Confidence:</span>
                    <Progress value={insight.confidence} className="w-16 h-1" />
                    <span className="text-gray-300 text-xs">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="actions" className="space-y-3 mt-4">
            {insights.recommendations.map((rec, index) => (
              <div key={rec.id} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">{rec.title}</span>
                  </div>
                  <Badge className={`${getImpactColor(rec.impact)} text-white text-xs`}>{rec.impact} impact</Badge>
                </div>

                <p className="text-gray-300 text-sm mb-3">{rec.description}</p>

                {rec.actionItems && (
                  <div className="space-y-2">
                    <span className="text-gray-400 text-xs">Action Items:</span>
                    {rec.actionItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-gray-300 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-600">
                  <span className="text-gray-400 text-xs">Timeline: {rec.timeframe}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-slate-600 text-gray-300 hover:text-white bg-transparent"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
