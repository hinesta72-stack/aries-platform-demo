"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Target, DollarSign, Clock, TrendingUp } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  cost: string
  timeline: string
  impact: string
  category: string
  actionItems: string[]
}

interface RecommendationsListProps {
  stateCode: string
}

export default function RecommendationsList({ stateCode }: RecommendationsListProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/recommendations/${stateCode}`)
        if (response.ok) {
          const data = await response.json()
          setRecommendations(data.recommendations || [])
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [stateCode])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Resilience Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-400">Loading recommendations...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Resilience Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-700 rounded-lg border border-slate-600"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-semibold">{rec.title}</h3>
                    <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm">{rec.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(rec.id)}
                  className="text-gray-400 hover:text-white"
                >
                  {expandedItems.has(rec.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-1 text-green-400">
                  <DollarSign className="w-3 h-3" />
                  <span>Cost: {rec.cost}</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-400">
                  <Clock className="w-3 h-3" />
                  <span>Timeline: {rec.timeline}</span>
                </div>
                <div className="flex items-center space-x-1 text-orange-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>Impact: {rec.impact}</span>
                </div>
              </div>

              {expandedItems.has(rec.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-slate-600"
                >
                  <h4 className="text-white font-medium mb-2">Action Items:</h4>
                  <ul className="space-y-1">
                    {rec.actionItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
