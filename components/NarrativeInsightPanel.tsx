"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Download,
  Share,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Sparkles,
} from "lucide-react"

interface NarrativeData {
  summary: string
  keyInsights: string[]
  riskAssessment: string
  opportunities: string[]
  confidence: number
  lastUpdated: string
}

interface NarrativeInsightPanelProps {
  narrative?: NarrativeData
  location?: string
  topConcerns?: string[]
  showFeedback?: boolean
}

export default function NarrativeInsightPanel({
  narrative,
  location = "Location",
  topConcerns = [],
  showFeedback = true,
}: NarrativeInsightPanelProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "insights" | "risks" | "opportunities">("summary")
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [userFeedback, setUserFeedback] = useState<"positive" | "negative" | null>(null)
  const [customQuery, setCustomQuery] = useState("")

  // Sample data if none provided
  const sampleNarrative: NarrativeData = {
    summary:
      "The community demonstrates moderate resilience with strong economic foundations but faces significant challenges in infrastructure modernization and climate adaptation. Recent trends show improving social cohesion and emergency preparedness, while environmental risks continue to escalate. The AI analysis indicates a 73% overall resilience score with high confidence in economic stability but growing concerns about aging infrastructure and increasing climate exposure.",
    keyInsights: [
      "Economic diversity has increased by 12% over the past 18 months, providing better shock absorption capacity",
      "Community preparedness programs show 89% participation rate, significantly above national average",
      "Infrastructure age presents the highest risk factor, with 34% of critical systems beyond recommended replacement cycles",
      "Social cohesion metrics indicate strong neighborhood networks and mutual aid capabilities",
      "Climate adaptation measures lag behind projected need by approximately 24 months",
    ],
    riskAssessment:
      "Primary risks center on infrastructure vulnerability and climate exposure. The aging power grid poses cascading failure risks during extreme weather events. Water system redundancy is insufficient for projected population growth. However, strong community networks and economic stability provide significant buffering capacity. Emergency response capabilities have improved markedly, reducing overall risk exposure by an estimated 18%.",
    opportunities: [
      "Federal infrastructure funding opportunities align well with identified modernization needs",
      "Growing tech sector presence offers potential for smart city implementations",
      "Strong community engagement creates ideal conditions for resilience co-investment programs",
      "Regional partnerships could leverage shared resources for climate adaptation projects",
      "Local university research capabilities could support innovation in sustainable infrastructure",
    ],
    confidence: 87,
    lastUpdated: "2024-01-15T10:30:00Z",
  }

  const displayNarrative = narrative || sampleNarrative
  const defaultConcerns = [
    "Aging infrastructure requiring immediate modernization",
    "Climate change impacts accelerating faster than adaptation measures",
    "Healthcare system capacity constraints during peak demand periods",
  ]
  const concerns = topConcerns.length > 0 ? topConcerns : defaultConcerns

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    // Simulate AI regeneration
    setTimeout(() => {
      setIsRegenerating(false)
    }, 3000)
  }

  const handleFeedback = (type: "positive" | "negative") => {
    setUserFeedback(type)
  }

  const getTabContent = () => {
    switch (activeTab) {
      case "summary":
        return (
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">{displayNarrative.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 font-medium text-sm">Strengths</span>
                </div>
                <p className="text-gray-300 text-xs">Strong economic base and community engagement</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-medium text-sm">Challenges</span>
                </div>
                <p className="text-gray-300 text-xs">Infrastructure aging and climate adaptation gaps</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-400 font-medium text-sm">Opportunities</span>
                </div>
                <p className="text-gray-300 text-xs">Federal funding and regional partnerships available</p>
              </div>
            </div>
          </div>
        )
      case "insights":
        return (
          <div className="space-y-3">
            {displayNarrative.keyInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        )
      case "risks":
        return (
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">{displayNarrative.riskAssessment}</p>
            <div className="space-y-3">
              <h4 className="text-white font-medium text-sm">Top Concerns</h4>
              {concerns.map((concern, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-red-900/20 rounded-lg border border-red-700/30"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                  <p className="text-gray-300 text-sm">{concern}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case "opportunities":
        return (
          <div className="space-y-3">
            {displayNarrative.opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-green-900/20 rounded-lg border border-green-700/30"
              >
                <Lightbulb className="w-4 h-4 text-green-400 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">{opportunity}</p>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              AI Narrative Insights
            </CardTitle>
            <p className="text-gray-400 text-sm">{location}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              {displayNarrative.confidence}% Confidence
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <RefreshCw className={`w-3 h-3 ${isRegenerating ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <Download className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <Share className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mt-4">
          {[
            { id: "summary", label: "Summary", icon: MessageSquare },
            { id: "insights", label: "Key Insights", icon: Lightbulb },
            { id: "risks", label: "Risk Assessment", icon: AlertTriangle },
            { id: "opportunities", label: "Opportunities", icon: TrendingUp },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="text-xs"
            >
              <tab.icon className="w-3 h-3 mr-1" />
              {tab.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tab Content */}
        <div className="min-h-[300px]">{getTabContent()}</div>

        {/* Custom Query Section */}
        <div className="border-t border-slate-700 pt-6">
          <h4 className="text-white font-medium text-sm mb-3 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
            Ask AI About This Analysis
          </h4>
          <div className="flex space-x-2">
            <Textarea
              placeholder="Ask a specific question about the resilience analysis..."
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400 text-sm"
              rows={2}
            />
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" disabled={!customQuery.trim()}>
              Ask AI
            </Button>
          </div>
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Was this analysis helpful?</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant={userFeedback === "positive" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback("positive")}
                  className="h-8 w-8 p-0"
                >
                  <ThumbsUp className="w-3 h-3" />
                </Button>
                <Button
                  variant={userFeedback === "negative" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback("negative")}
                  className="h-8 w-8 p-0"
                >
                  <ThumbsDown className="w-3 h-3" />
                </Button>
              </div>
            </div>
            {userFeedback && (
              <p className="text-green-400 text-xs mt-2">
                Thank you for your feedback! This helps improve our AI analysis.
              </p>
            )}
          </div>
        )}

        {/* Last Updated */}
        <div className="text-xs text-gray-500 text-center">
          Last updated: {new Date(displayNarrative.lastUpdated).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
