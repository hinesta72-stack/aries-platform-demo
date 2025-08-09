"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, DollarSign, Zap, Cloud, Shield, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react"

interface ResilienceFactorsProps {
  region: string
  regionType: "state" | "county" | "zip"
}

interface FactorData {
  healthSystemStress: {
    hospitalCapacity: number
    chronicDiseasePrevalence: number
    healthcareAccess: number
    score: number
  }
  economicVulnerability: {
    medianIncome: number
    unemploymentRate: number
    housingInstability: number
    povertyRate: number
    score: number
  }
  infrastructureRisk: {
    gridReliability: number
    transportationCondition: number
    waterSystemAge: number
    broadbandAccess: number
    score: number
  }
  environmentalRisk: {
    floodRisk: number
    droughtRisk: number
    wildfireRisk: number
    stormFrequency: number
    score: number
  }
  emergencyResponse: {
    emsResponseTime: number
    cboDensity: number
    emergencyPlanningScore: number
    communityPreparedness: number
    score: number
  }
}

export default function ResilienceFactorsBreakdown({ region, regionType }: ResilienceFactorsProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null)

  useEffect(() => {
    fetchResilienceData()
  }, [region, regionType])

  const fetchResilienceData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/resilience-index?region=${region}&type=${regionType}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Error fetching resilience data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const factors = [
    {
      key: "healthSystemStress",
      title: "Health System Stress",
      icon: Heart,
      description: "Hospital capacity, disease prevalence, healthcare access",
      color: "text-red-400",
    },
    {
      key: "economicVulnerability",
      title: "Economic Vulnerability",
      icon: DollarSign,
      description: "Income, unemployment, housing stability, poverty",
      color: "text-green-400",
    },
    {
      key: "infrastructureRisk",
      title: "Infrastructure Risk",
      icon: Zap,
      description: "Grid reliability, transportation, water systems, broadband",
      color: "text-blue-400",
    },
    {
      key: "environmentalRisk",
      title: "Environmental Risk",
      icon: Cloud,
      description: "Flood, drought, wildfire, storm frequency",
      color: "text-purple-400",
    },
    {
      key: "emergencyResponse",
      title: "Emergency Response",
      icon: Shield,
      description: "EMS response time, CBO density, preparedness",
      color: "text-orange-400",
    },
  ]

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
          <div className="text-center text-gray-400">Failed to load resilience data</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Resilience Index</CardTitle>
              <CardDescription>
                {data.region} • {data.regionType} • Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {getTrendIcon(data.trend)}
              <Badge variant={data.dataQuality === "high" ? "default" : "secondary"}>{data.dataQuality} quality</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="text-6xl font-bold text-white">{data.compositeScore}</div>
            <div className="flex-1">
              <Progress value={data.compositeScore} className="h-3" />
              <div className="text-sm text-gray-400 mt-1">Composite score based on 5 key factors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factor Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factors.map((factor, index) => {
          const factorData = data.factors[factor.key]
          const IconComponent = factor.icon

          return (
            <motion.div
              key={factor.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`bg-slate-800 border-slate-700 cursor-pointer transition-all hover:border-slate-600 ${
                  selectedFactor === factor.key ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedFactor(selectedFactor === factor.key ? null : factor.key)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-5 h-5 ${factor.color}`} />
                      <CardTitle className="text-sm text-white">{factor.title}</CardTitle>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(factorData.score)}`}>{factorData.score}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Progress value={factorData.score} className="h-2 mb-2" />
                  <p className="text-xs text-gray-400">{factor.description}</p>

                  {selectedFactor === factor.key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-slate-600"
                    >
                      <div className="space-y-2">
                        {Object.entries(factorData).map(([key, value]) => {
                          if (key === "score") return null
                          return (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                              <span className="text-white">
                                {typeof value === "number"
                                  ? key.includes("Rate") || key.includes("Time")
                                    ? `${value.toFixed(1)}${key.includes("Rate") ? "%" : key.includes("Time") ? " min" : ""}`
                                    : key.includes("Income")
                                      ? `$${value.toLocaleString()}`
                                      : `${value.toFixed(1)}${key.includes("Percentage") || key.includes("Access") || key.includes("Capacity") ? "%" : ""}`
                                  : value}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button onClick={fetchResilienceData} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>
    </div>
  )
}
