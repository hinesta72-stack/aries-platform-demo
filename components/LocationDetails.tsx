"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, TrendingUp, TrendingDown, AlertTriangle, Shield, RefreshCw } from "lucide-react"

interface LocationDetailsProps {
  location: {
    id: string
    name: string
    type: "state" | "county" | "city" | "address"
    coordinates: [number, number]
    resilienceScore: number
    population?: number
    parentId?: string
  } | null
}

interface DetailedData {
  resilienceScore: number
  trend: "improving" | "stable" | "declining"
  riskFactors: Array<{
    name: string
    score: number
    impact: "high" | "medium" | "low"
  }>
  demographics: {
    population: number
    medianAge: number
    medianIncome: number
    unemploymentRate: number
  }
  infrastructure: {
    hospitalBeds: number
    emergencyServices: number
    broadbandAccess: number
    transportationScore: number
  }
  recommendations: string[]
  alerts: Array<{
    type: string
    severity: "high" | "medium" | "low"
    message: string
  }>
}

export default function LocationDetails({ location }: LocationDetailsProps) {
  const [detailedData, setDetailedData] = useState<DetailedData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location) {
      fetchDetailedData(location)
    }
  }, [location])

  const fetchDetailedData = async (loc: any) => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate mock detailed data
    const mockData: DetailedData = {
      resilienceScore: loc.resilienceScore,
      trend: Math.random() > 0.6 ? "improving" : Math.random() > 0.3 ? "stable" : "declining",
      riskFactors: [
        { name: "Climate Risk", score: Math.floor(Math.random() * 40) + 50, impact: "high" },
        { name: "Economic Vulnerability", score: Math.floor(Math.random() * 30) + 60, impact: "medium" },
        { name: "Infrastructure Age", score: Math.floor(Math.random() * 35) + 55, impact: "high" },
        { name: "Social Cohesion", score: Math.floor(Math.random() * 25) + 70, impact: "low" },
      ],
      demographics: {
        population: loc.population || Math.floor(Math.random() * 100000) + 10000,
        medianAge: Math.floor(Math.random() * 20) + 35,
        medianIncome: Math.floor(Math.random() * 40000) + 45000,
        unemploymentRate: Math.random() * 8 + 3,
      },
      infrastructure: {
        hospitalBeds: Math.floor(Math.random() * 500) + 100,
        emergencyServices: Math.floor(Math.random() * 20) + 5,
        broadbandAccess: Math.floor(Math.random() * 30) + 70,
        transportationScore: Math.floor(Math.random() * 40) + 50,
      },
      recommendations: [
        "Strengthen emergency response infrastructure",
        "Improve flood mitigation systems",
        "Enhance community preparedness programs",
        "Invest in renewable energy infrastructure",
      ],
      alerts: [
        { type: "Weather Alert", severity: "medium", message: "Severe weather expected in 48 hours" },
        { type: "Infrastructure", severity: "low", message: "Scheduled maintenance on water systems" },
      ],
    }

    setDetailedData(mockData)
    setLoading(false)
  }

  if (!location) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Select a Location</h3>
          <p className="text-gray-400">Click on the map or search for a location to view detailed resilience data</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading detailed data...</p>
        </CardContent>
      </Card>
    )
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <div className="w-4 h-4 bg-gray-500 rounded-full" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    if (score >= 60) return "text-orange-500"
    return "text-red-500"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      default:
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>{location.name}</span>
              </CardTitle>
              <CardDescription className="capitalize">{location.type} • Resilience Analysis</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {detailedData && getTrendIcon(detailedData.trend)}
              <div className={`text-3xl font-bold ${getScoreColor(location.resilienceScore)}`}>
                {location.resilienceScore}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={location.resilienceScore} className="h-3 mb-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Resilience Score</span>
            <span className="text-gray-400">
              {location.resilienceScore >= 80
                ? "Excellent"
                : location.resilienceScore >= 70
                  ? "Good"
                  : location.resilienceScore >= 60
                    ? "Fair"
                    : "Needs Improvement"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {detailedData?.alerts && detailedData.alerts.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span>Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {detailedData.alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{alert.type}</div>
                      <div className="text-sm opacity-80">{alert.message}</div>
                    </div>
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Factors */}
      {detailedData?.riskFactors && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Risk Factor Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detailedData.riskFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{factor.name}</span>
                      <span className={`font-bold ${getScoreColor(factor.score)}`}>{factor.score}</span>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                  <Badge
                    variant="outline"
                    className={`ml-4 ${
                      factor.impact === "high"
                        ? "border-red-500 text-red-400"
                        : factor.impact === "medium"
                          ? "border-yellow-500 text-yellow-400"
                          : "border-green-500 text-green-400"
                    }`}
                  >
                    {factor.impact}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demographics & Infrastructure */}
      {detailedData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Demographics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Population:</span>
                  <span className="text-white">{detailedData.demographics.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Median Age:</span>
                  <span className="text-white">{detailedData.demographics.medianAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Median Income:</span>
                  <span className="text-white">${detailedData.demographics.medianIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Unemployment:</span>
                  <span className="text-white">{detailedData.demographics.unemploymentRate.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Infrastructure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Hospital Beds:</span>
                  <span className="text-white">{detailedData.infrastructure.hospitalBeds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Emergency Services:</span>
                  <span className="text-white">{detailedData.infrastructure.emergencyServices}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Broadband Access:</span>
                  <span className="text-white">{detailedData.infrastructure.broadbandAccess}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transportation:</span>
                  <span className="text-white">{detailedData.infrastructure.transportationScore}/100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recommendations */}
      {detailedData?.recommendations && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {detailedData.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
