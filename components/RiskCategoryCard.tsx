"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Minus,
  Cloud,
  Zap,
  Heart,
  DollarSign,
  Users,
  Shield,
} from "lucide-react"

interface RiskFactor {
  id: string
  name: string
  score: number
  trend: "increasing" | "decreasing" | "stable"
  trendValue: number
  confidence: number
  forecastScore: number
  lastUpdated: string
  sparklineData: number[]
  subFactors: {
    name: string
    score: number
    impact: "high" | "medium" | "low"
    description: string
  }[]
  recommendations: {
    title: string
    description: string
    costAvoidance: number
    priority: "high" | "medium" | "low"
    timeframe: string
  }[]
}

interface RiskCategory {
  id: string
  name: string
  icon: string
  color: string
  averageScore: number
  factors: RiskFactor[]
}

interface RiskCategoryCardProps {
  category: RiskCategory
  viewMode: "current" | "forecast"
  isExpanded: boolean
  onToggleExpand: () => void
}

const iconMap = {
  cloud: Cloud,
  zap: Zap,
  heart: Heart,
  "dollar-sign": DollarSign,
  users: Users,
  shield: Shield,
}

export default function RiskCategoryCard({ category, viewMode, isExpanded, onToggleExpand }: RiskCategoryCardProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Shield

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-400"
    if (score >= 60) return "text-orange-400"
    if (score >= 40) return "text-yellow-400"
    return "text-green-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-red-500"
    if (score >= 60) return "bg-orange-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-red-400" />
      case "decreasing":
        return <TrendingDown className="w-4 h-4 text-green-400" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-orange-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <Card className="bg-slate-700 border-slate-600 hover:border-slate-500 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${category.color}`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{category.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-2xl font-bold ${getScoreColor(category.averageScore)}`}>
                  {category.averageScore}
                </span>
                <Badge className={`${getScoreBgColor(category.averageScore)} text-white text-xs`}>
                  {category.averageScore >= 80
                    ? "Critical"
                    : category.averageScore >= 60
                      ? "High"
                      : category.averageScore >= 40
                        ? "Moderate"
                        : "Low"}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggleExpand} className="text-gray-400 hover:text-white">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        <div className="mt-3">
          <Progress value={category.averageScore} className="h-2" />
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Risk Factors */}
                <div>
                  <h4 className="text-white font-medium mb-3">Risk Factors</h4>
                  <div className="space-y-3">
                    {category.factors.slice(0, 3).map((factor) => (
                      <div key={factor.id} className="bg-slate-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-medium">{factor.name}</span>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(factor.trend)}
                            <span
                              className={`text-sm font-bold ${getScoreColor(viewMode === "current" ? factor.score : factor.forecastScore)}`}
                            >
                              {viewMode === "current" ? factor.score : factor.forecastScore}
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={viewMode === "current" ? factor.score : factor.forecastScore}
                          className="h-1"
                        />

                        {/* Sub-factors */}
                        {factor.subFactors.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {factor.subFactors.slice(0, 2).map((subFactor, index) => (
                              <div key={index} className="flex items-center justify-between text-xs">
                                <span className="text-gray-300">{subFactor.name}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge className={`${getImpactColor(subFactor.impact)} text-white text-xs px-1 py-0`}>
                                    {subFactor.impact}
                                  </Badge>
                                  <span className="text-gray-400">{subFactor.score}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Recommendations */}
                {category.factors[0]?.recommendations && (
                  <div>
                    <h4 className="text-white font-medium mb-3">Top Recommendations</h4>
                    <div className="space-y-2">
                      {category.factors[0].recommendations.slice(0, 2).map((rec, index) => (
                        <div key={index} className="bg-slate-800 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white text-sm font-medium">{rec.title}</span>
                            <Badge className={`${getPriorityColor(rec.priority)} text-white text-xs`}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-xs mb-2">{rec.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-green-400">
                              ${rec.costAvoidance.toLocaleString()} potential savings
                            </span>
                            <span className="text-gray-400">{rec.timeframe}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
