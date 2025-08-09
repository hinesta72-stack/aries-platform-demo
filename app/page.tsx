"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import EnhancedUSHeatMap from "@/components/EnhancedUSHeatMap"
import FeatureImpactChart from "@/components/FeatureImpactChart"
import AIRecommendationCard from "@/components/AIRecommendationCard"
import NarrativeInsightPanel from "@/components/NarrativeInsightPanel"
import TrendGraph from "@/components/TrendGraph"
import KPITiles from "@/components/KPITiles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  TrendingUp,
  Shield,
  AlertTriangle,
  Activity,
  BarChart3,
  Target,
  Building,
  Heart,
  Navigation,
  Layers,
  Brain,
  Clock,
  DollarSign,
} from "lucide-react"

interface StateData {
  id: string
  name: string
  resilienceIndex: number
  riskLevel: "low" | "medium" | "high" | "critical"
  population: number
  economicStability: number
  healthSystemCapacity: number
  infrastructureQuality: number
  emergencyResponse: number
  socialCohesion: number
  environmentalPreparedness: number
}

export default function Overview() {
  const [selectedState, setSelectedState] = useState<StateData | null>(null)
  const [timePoint, setTimePoint] = useState("current")
  const [predictiveData, setPredictiveData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Enhanced KPI data with all new features
  const kpiData = [
    {
      title: "National Resilience",
      value: 74,
      previousValue: 76,
      unit: "",
      trend: "down" as const,
      trendValue: -2.6,
      icon: Shield,
      color: "text-cyan-400",
      sparklineData: [76, 75, 74, 73, 74, 72, 71, 74],
      description: "Composite score (0–100) reflecting national capacity to withstand and recover from disruptions.",
      microLabel: "Overall resilience index (0–100)",
      drillDownPath: "/national-resilience",
      category: "readiness" as const,
      forecast: {
        "30d": { value: 73, confidence: 92 },
        "60d": { value: 72, confidence: 88 },
        "90d": { value: 71, confidence: 85 },
      },
    },
    {
      title: "Population at Risk",
      value: 45.2,
      previousValue: 42.8,
      unit: "M",
      trend: "up" as const,
      trendValue: 5.6,
      icon: Users,
      color: "text-orange-400",
      sparklineData: [42.8, 43.2, 44.1, 44.8, 45.2, 45.0, 45.2],
      description: "Estimated number of people at increased risk based on infrastructure and environmental factors.",
      microLabel: "People in vulnerable categories",
      drillDownPath: "/population-risk",
      category: "people" as const,
      forecast: {
        "30d": { value: 46.1, confidence: 85 },
        "60d": { value: 47.2, confidence: 82 },
        "90d": { value: 47.8, confidence: 78 },
      },
    },
    {
      title: "Economic Impact",
      value: 2.4,
      previousValue: 2.1,
      unit: "$",
      trend: "up" as const,
      trendValue: 14.3,
      icon: DollarSign,
      color: "text-green-400",
      sparklineData: [2.1, 2.2, 2.3, 2.4, 2.3, 2.4, 2.4],
      description: "Estimated potential financial impact of disruptions (in billions of USD).",
      microLabel: "Potential cost of disruptions ($B)",
      drillDownPath: "/economic-impact",
      category: "economic" as const,
      forecast: {
        "30d": { value: 2.6, confidence: 88 },
        "60d": { value: 2.7, confidence: 85 },
        "90d": { value: 2.8, confidence: 82 },
      },
    },
    {
      title: "High Risk States",
      value: 12,
      previousValue: 10,
      unit: "",
      trend: "up" as const,
      trendValue: 20.0,
      icon: AlertTriangle,
      color: "text-red-400",
      sparklineData: [10, 11, 12, 11, 12, 12, 12],
      description: "Number of states with resilience scores below 50.",
      microLabel: "States requiring immediate attention",
      drillDownPath: "/high-risk-states",
      category: "readiness" as const,
      forecast: {
        "30d": { value: 13, confidence: 90 },
        "60d": { value: 14, confidence: 85 },
        "90d": { value: 15, confidence: 73 },
      },
    },
    {
      title: "Health System Capacity",
      value: 75,
      previousValue: 77,
      unit: "%",
      trend: "down" as const,
      trendValue: -2.6,
      icon: Heart,
      color: "text-pink-400",
      sparklineData: [77, 76, 75, 74, 75, 75, 75],
      description: "Percentage of healthcare system functionality available during crises.",
      microLabel: "Healthcare system availability",
      drillDownPath: "/health-capacity",
      category: "people" as const,
      forecast: {
        "30d": { value: 74, confidence: 92 },
        "60d": { value: 73, confidence: 89 },
        "90d": { value: 72, confidence: 88 },
      },
    },
    {
      title: "Infrastructure Score",
      value: 71,
      previousValue: 72,
      unit: "",
      trend: "down" as const,
      trendValue: -1.4,
      icon: Building,
      color: "text-purple-400",
      sparklineData: [72, 72, 71, 71, 71, 70, 71],
      description: "Composite score (0–100) of critical infrastructure resilience.",
      microLabel: "Critical infrastructure health",
      drillDownPath: "/infrastructure",
      category: "economic" as const,
      forecast: {
        "30d": { value: 70, confidence: 87 },
        "60d": { value: 69, confidence: 83 },
        "90d": { value: 69, confidence: 80 },
      },
    },
  ]

  // Mock trend data with proper formatting
  const trendData = [
    { date: "2024-01-01", resilienceIndex: 76, riskLevel: "medium", forecast: false },
    { date: "2024-02-01", resilienceIndex: 75, riskLevel: "medium", forecast: false },
    { date: "2024-03-01", resilienceIndex: 74, riskLevel: "medium", forecast: false },
    { date: "2024-04-01", resilienceIndex: 73, riskLevel: "medium", forecast: false },
    { date: "2024-05-01", resilienceIndex: 74, riskLevel: "medium", forecast: false },
    { date: "2024-06-01", resilienceIndex: 72, riskLevel: "medium", forecast: false },
    { date: "2024-07-01", resilienceIndex: 71, riskLevel: "medium", forecast: false },
    { date: "2024-08-01", resilienceIndex: 74, riskLevel: "medium", forecast: false },
    { date: "2024-09-01", resilienceIndex: 72, riskLevel: "medium", forecast: true, confidence: 88 },
    { date: "2024-10-01", resilienceIndex: 69, riskLevel: "high", forecast: true, confidence: 82 },
    { date: "2024-11-01", resilienceIndex: 71, riskLevel: "medium", forecast: true, confidence: 75 },
  ]

  // Load predictive data
  useEffect(() => {
    const loadPredictiveData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/predictive-data?level=national")
        const data = await response.json()
        setPredictiveData(data)
      } catch (error) {
        console.error("Failed to load predictive data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPredictiveData()
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "border-green-500 text-green-400 bg-green-500/10"
      case "medium":
        return "border-yellow-500 text-yellow-400 bg-yellow-500/10"
      case "high":
        return "border-orange-500 text-orange-400 bg-orange-500/10"
      case "critical":
        return "border-red-500 text-red-400 bg-red-500/10"
      default:
        return "border-gray-500 text-gray-400 bg-gray-500/10"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400"
    if (score >= 75) return "text-cyan-400"
    if (score >= 65) return "text-yellow-400"
    if (score >= 50) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900"
    >
      <NavBar />

      <div className="container mx-auto px-6 py-8 w-full max-w-7xl">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-400" />
            ARIES™ AI-Enhanced Resilience Platform
          </h1>
          <p className="text-xl text-gray-300">
            Predictive analytics with machine learning insights • Google Maps-style drill-down • Real-time AI
            recommendations
          </p>
        </motion.div>

        {/* Enhanced KPI Tiles */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {console.log("About to render KPITiles with data:", kpiData.length, "KPIs")}
          {console.log(
            "KPI titles:",
            kpiData.map((k) => k.title),
          )}
          <KPITiles kpis={kpiData} showSparklines={true} showForecasts={true} animateOnLoad={true} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Layers className="w-5 h-5 mr-2" />
                  AI-Enhanced Interactive Heat Map
                  <Badge className="ml-3 bg-purple-500 text-white">
                    <Brain className="w-3 h-3 mr-1" />
                    ML Powered
                  </Badge>
                </CardTitle>
                <div className="text-sm text-gray-400 flex items-center">
                  <Navigation className="w-4 h-4 mr-2" />
                  Timeline slider • Predictive forecasting • Multi-layer analysis • Google Maps-style navigation
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <EnhancedUSHeatMap
                  onStateSelect={setSelectedState}
                  selectedState={selectedState}
                  timePoint={timePoint}
                  onTimePointChange={setTimePoint}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-6"
          >
            {selectedState ? (
              <>
                {/* Selected State Overview */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        {selectedState.name}
                      </div>
                      <Badge className={getRiskColor(selectedState.riskLevel)}>
                        {selectedState.riskLevel.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-1">{selectedState.resilienceIndex}</div>
                      <div className="text-sm text-gray-400">Current Resilience Index</div>
                      <Progress value={selectedState.resilienceIndex} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center">
                        <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <div className="font-bold text-white">{selectedState.population.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Population</div>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <div className={`font-bold ${getScoreColor(selectedState.economicStability)}`}>
                          {selectedState.economicStability}
                        </div>
                        <div className="text-xs text-gray-400">Economic</div>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700/50">
                      <div className="flex items-center mb-2">
                        <Brain className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-sm font-medium text-purple-400">AI Insights Available</span>
                      </div>
                      <p className="text-xs text-gray-300">
                        Predictive analysis, risk factors, and AI recommendations ready for {selectedState.name}.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Breakdown */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Resilience Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Health System</span>
                        <span className={getScoreColor(selectedState.healthSystemCapacity)}>
                          {selectedState.healthSystemCapacity}
                        </span>
                      </div>
                      <Progress value={selectedState.healthSystemCapacity} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Economic Stability</span>
                        <span className={getScoreColor(selectedState.economicStability)}>
                          {selectedState.economicStability}
                        </span>
                      </div>
                      <Progress value={selectedState.economicStability} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Infrastructure</span>
                        <span className={getScoreColor(selectedState.infrastructureQuality)}>
                          {selectedState.infrastructureQuality}
                        </span>
                      </div>
                      <Progress value={selectedState.infrastructureQuality} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Emergency Response</span>
                        <span className={getScoreColor(selectedState.emergencyResponse)}>
                          {selectedState.emergencyResponse}
                        </span>
                      </div>
                      <Progress value={selectedState.emergencyResponse} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Social Cohesion</span>
                        <span className={getScoreColor(selectedState.socialCohesion)}>
                          {selectedState.socialCohesion}
                        </span>
                      </div>
                      <Progress value={selectedState.socialCohesion} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Environmental Prep</span>
                        <span className={getScoreColor(selectedState.environmentalPreparedness)}>
                          {selectedState.environmentalPreparedness}
                        </span>
                      </div>
                      <Progress value={selectedState.environmentalPreparedness} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Default State Selection Prompt */
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    AI-Powered Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Select a State for AI Insights</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Click on any state to access predictive analytics, risk factor analysis, and AI-generated
                    recommendations.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center justify-center">
                      <Clock className="w-3 h-3 mr-2" />
                      <span>30/60/90-day forecasts</span>
                    </div>
                    <div>• Machine learning risk predictions</div>
                    <div>• AI-generated action recommendations</div>
                    <div>• Real-time confidence intervals</div>
                    <div>• Cost avoidance calculations</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* National Insights */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  AI National Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-900/30 rounded-lg border border-green-700/50">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-400">Predictive Strength</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    AI models show 88% confidence in 30-day forecasts, with Northeast states maintaining highest
                    resilience trajectories.
                  </p>
                </div>

                <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-700/50">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-orange-400">Risk Acceleration</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    ML algorithms detect accelerating risk patterns in Gulf Coast regions, with 60-day decline
                    projections requiring immediate intervention.
                  </p>
                </div>

                <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700/50">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-purple-400">Cost Avoidance</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    AI recommendations could prevent $3.7B in economic impact if implemented within 30-day windows.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional AI Components Row */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8"
        >
          {/* Trend Graph */}
          <div className="lg:col-span-1">
            <TrendGraph
              data={trendData}
              title="National Resilience Trend"
              location="United States"
              showForecast={true}
              timeRange="90d"
            />
          </div>

          {/* Feature Impact Chart */}
          <div className="lg:col-span-1">
            {predictiveData?.topRiskFactors && (
              <FeatureImpactChart
                riskFactors={predictiveData.topRiskFactors}
                title="National Risk Factors"
                showLearnMore={true}
              />
            )}
          </div>

          {/* AI Recommendations */}
          <div className="lg:col-span-1">
            {predictiveData?.recommendations && (
              <AIRecommendationCard
                recommendations={predictiveData.recommendations}
                title="National AI Recommendations"
                location="United States"
              />
            )}
          </div>
        </motion.div>

        {/* Narrative Insights Panel */}
        {predictiveData?.narrative && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <NarrativeInsightPanel
              narrative={predictiveData.narrative}
              location="United States"
              topConcerns={[
                "Climate change acceleration affecting coastal and wildfire-prone regions",
                "Healthcare system capacity strain in high-population density areas",
                "Infrastructure aging requiring immediate modernization investments",
              ]}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
