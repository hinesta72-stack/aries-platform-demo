"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  Zap,
} from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: "infrastructure" | "social" | "economic" | "environmental" | "governance"
  timeframe: string
  costEstimate: string
  expectedImpact: number
  confidence: number
  status: "not_started" | "in_progress" | "completed"
  details: string
}

interface AIRecommendationCardProps {
  recommendations?: Recommendation[]
  title?: string
  location?: string
  maxVisible?: number
}

export default function AIRecommendationCard({
  recommendations = [],
  title = "AI Recommendations",
  location = "Location",
  maxVisible = 3,
}: AIRecommendationCardProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  // Sample data if none provided
  const sampleRecommendations: Recommendation[] = [
    {
      id: "rec-1",
      title: "Strengthen Emergency Communication Systems",
      description: "Upgrade emergency alert systems and establish redundant communication channels",
      priority: "high",
      category: "infrastructure",
      timeframe: "3-6 months",
      costEstimate: "$2.5M - $4.2M",
      expectedImpact: 85,
      confidence: 92,
      status: "not_started",
      details:
        "Implementation includes upgrading cellular towers, establishing satellite backup systems, and creating community alert networks. This will improve emergency response coordination and public safety communications during disasters.",
    },
    {
      id: "rec-2",
      title: "Expand Community Preparedness Programs",
      description: "Develop neighborhood-level emergency response training and supply distribution",
      priority: "high",
      category: "social",
      timeframe: "6-12 months",
      costEstimate: "$800K - $1.5M",
      expectedImpact: 78,
      confidence: 88,
      status: "in_progress",
      details:
        "Program includes training community leaders, establishing neighborhood emergency supply caches, and creating mutual aid networks. Focus on vulnerable populations and areas with limited access to resources.",
    },
    {
      id: "rec-3",
      title: "Diversify Local Economic Base",
      description: "Support small business development and attract resilient industries",
      priority: "medium",
      category: "economic",
      timeframe: "12-24 months",
      costEstimate: "$5M - $8M",
      expectedImpact: 72,
      confidence: 75,
      status: "not_started",
      details:
        "Economic diversification strategy includes business incubators, workforce development programs, and incentives for sustainable industries. Focus on sectors that can withstand economic shocks and provide stable employment.",
    },
    {
      id: "rec-4",
      title: "Improve Flood Management Infrastructure",
      description: "Upgrade stormwater systems and implement green infrastructure solutions",
      priority: "high",
      category: "environmental",
      timeframe: "18-36 months",
      costEstimate: "$12M - $18M",
      expectedImpact: 89,
      confidence: 91,
      status: "not_started",
      details:
        "Comprehensive flood management including upgraded drainage systems, permeable surfaces, rain gardens, and early warning systems. Will significantly reduce flood risk and property damage.",
    },
    {
      id: "rec-5",
      title: "Enhance Healthcare System Capacity",
      description: "Expand medical facilities and improve emergency medical response",
      priority: "medium",
      category: "social",
      timeframe: "24-48 months",
      costEstimate: "$15M - $25M",
      expectedImpact: 81,
      confidence: 86,
      status: "not_started",
      details:
        "Healthcare expansion includes new medical facilities, equipment upgrades, staff training, and telemedicine capabilities. Will improve community health outcomes and emergency medical response.",
    },
  ]

  const displayRecommendations = recommendations.length > 0 ? recommendations : sampleRecommendations
  const visibleRecommendations = showAll ? displayRecommendations : displayRecommendations.slice(0, maxVisible)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "infrastructure":
        return <Zap className="w-4 h-4" />
      case "social":
        return <Users className="w-4 h-4" />
      case "economic":
        return <DollarSign className="w-4 h-4" />
      case "environmental":
        return <Target className="w-4 h-4" />
      case "governance":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "in_progress":
        return "text-yellow-400"
      case "not_started":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in_progress":
        return "In Progress"
      case "not_started":
        return "Not Started"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              {title}
            </CardTitle>
            <p className="text-gray-400 text-sm">{location}</p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">AI Generated</Badge>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {displayRecommendations.length} Recommendations
          </Badge>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            {displayRecommendations.filter((r) => r.priority === "high").length} High Priority
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {visibleRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className="p-2 bg-slate-600 rounded-lg">{getCategoryIcon(rec.category)}</div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                  <p className="text-gray-300 text-xs mt-1">{rec.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority.toUpperCase()}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setExpandedCard(expandedCard === rec.id ? null : rec.id)}
                >
                  {expandedCard === rec.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3 text-blue-400" />
                <span className="text-gray-400">Timeline:</span>
                <span className="text-white">{rec.timeframe}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-3 h-3 text-green-400" />
                <span className="text-gray-400">Cost:</span>
                <span className="text-white">{rec.costEstimate}</span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Expected Impact</span>
                <span className="text-green-400 font-medium">{rec.expectedImpact}%</span>
              </div>
              <Progress value={rec.expectedImpact} className="h-2" />
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Confidence:</span>
                <span className="text-blue-400 font-medium">{rec.confidence}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Status:</span>
                <span className={`font-medium ${getStatusColor(rec.status)}`}>{getStatusText(rec.status)}</span>
              </div>
            </div>

            {expandedCard === rec.id && (
              <div className="mt-4 pt-4 border-t border-slate-600">
                <h5 className="text-white font-medium text-sm mb-2">Implementation Details</h5>
                <p className="text-gray-300 text-xs leading-relaxed">{rec.details}</p>
                <div className="flex items-center space-x-2 mt-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                    View Full Plan
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Export Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        {displayRecommendations.length > maxVisible && (
          <div className="text-center pt-4">
            <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)} className="text-xs">
              {showAll ? "Show Less" : `Show ${displayRecommendations.length - maxVisible} More`}
            </Button>
          </div>
        )}

        {/* AI Insights Summary */}
        <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
          <div className="flex items-center mb-2">
            <Brain className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 font-medium text-sm">AI Analysis Summary</span>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">
            Based on current resilience data and predictive modeling, implementing the top 3 high-priority
            recommendations could improve overall resilience by{" "}
            <span className="text-green-400 font-medium">15-22%</span>
            within 18 months. The AI model shows <span className="text-blue-400 font-medium">89% confidence</span> in
            these projections based on similar community implementations.
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-gray-400">Projected ROI:</span>
                <span className="text-green-400 font-medium">3.2x</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3 text-blue-400" />
                <span className="text-gray-400">Risk Reduction:</span>
                <span className="text-blue-400 font-medium">28%</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="text-xs bg-transparent">
              View AI Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
