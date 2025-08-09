"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import NavBar from "@/components/NavBar"
import RiskFactorGauge from "@/components/RiskFactorGauge"
import RiskCategoryCard from "@/components/RiskCategoryCard"
import AIInsightsPanel from "@/components/AIInsightsPanel"
import TrendAnalysisChart from "@/components/TrendAnalysisChart"
import BenchmarkComparison from "@/components/BenchmarkComparison"
import TestChart from "@/components/TestChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Download,
  Share2,
  MapPin,
  Users,
  Calendar,
  AlertTriangle,
  Activity,
  BarChart3,
  Clock,
  Target,
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

interface LocationData {
  state: string
  county?: string
  zipCode?: string
  population: number
  area: string
}

export default function RiskFactorsPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"current" | "forecast">("current")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [riskData, setRiskData] = useState<RiskCategory[]>([])
  const [overallRiskScore, setOverallRiskScore] = useState(0)
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [aiInsights, setAiInsights] = useState<any>(null)

  // Get location parameters
  const state = searchParams.get("state") || "Pennsylvania"
  const county = searchParams.get("county") || "Allegheny County"
  const zipCode = searchParams.get("zip")

  useEffect(() => {
    const loadRiskData = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          state,
          ...(county && { county }),
          ...(zipCode && { zipCode }),
        })

        const response = await fetch(`/api/risk-factors?${params}`)
        const data = await response.json()

        setRiskData(data.categories)
        setOverallRiskScore(data.overallScore)
        setLocationData(data.location)
        setAiInsights(data.aiInsights)
      } catch (error) {
        console.error("Failed to load risk data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRiskData()
  }, [state, county, zipCode])

  const getLocationTitle = () => {
    if (zipCode) return `Risk Factor Analysis for ZIP Code ${zipCode}`
    if (county) return `Risk Factor Analysis for ${county}, ${state}`
    return `Risk Factor Analysis for ${state}`
  }

  const getBreadcrumbItems = () => {
    const items = [
      { label: "Overview", href: "/" },
      { label: state, href: `/state/${state.toLowerCase().replace(/\s+/g, "-")}` },
    ]

    if (county) {
      items.push({
        label: county,
        href: `/state/${state.toLowerCase().replace(/\s+/g, "-")}/county/${county.toLowerCase().replace(/\s+/g, "-")}`,
      })
    }

    if (zipCode) {
      items.push({
        label: `ZIP ${zipCode}`,
        href: `/state/${state.toLowerCase().replace(/\s+/g, "-")}/zip/${zipCode}`,
      })
    }

    items.push({ label: "Risk Factor Analysis", href: "" })
    return items
  }

  const handleExportPDF = () => {
    console.log("Exporting PDF report...")
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    console.log("Link copied to clipboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading risk factor analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900"
    >
      <NavBar />

      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              {getBreadcrumbItems().map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink href={item.href} className="text-gray-400 hover:text-white">
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-white font-medium">{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Title and Location Info */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <AlertTriangle className="w-8 h-8 mr-3 text-red-400" />
                {getLocationTitle()}
              </h1>
              {locationData && (
                <div className="flex items-center space-x-6 text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{locationData.area}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{locationData.population.toLocaleString()} residents</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Updated 2 hours ago</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="border-slate-600 text-gray-300 hover:text-white bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-slate-600 text-gray-300 hover:text-white bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "current" | "forecast")}>
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="current" className="flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Current Risk Levels
              </TabsTrigger>
              <TabsTrigger value="forecast" className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                AI Forecast (30 days)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Test Chart - Remove this after testing */}
            <TestChart />

            {/* Overall Risk Score */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <RiskFactorGauge
                score={overallRiskScore}
                title="Overall Risk Score"
                subtitle={`Comprehensive risk assessment for ${locationData?.state || state}`}
                showAnimation={true}
              />
            </motion.div>

            {/* Risk Categories */}
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Risk Factor Categories
                    <Badge className="ml-3 bg-blue-500 text-white">
                      {viewMode === "current" ? "Current Analysis" : "30-Day Forecast"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {riskData.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <RiskCategoryCard
                          category={category}
                          viewMode={viewMode}
                          isExpanded={selectedCategory === category.id}
                          onToggleExpand={() =>
                            setSelectedCategory(selectedCategory === category.id ? null : category.id)
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trend Analysis */}
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <TrendAnalysisChart
                data={riskData}
                location={`${county ? `${county}, ` : ""}${state}`}
                viewMode={viewMode}
              />
            </motion.div>

            {/* Benchmark Comparison */}
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <BenchmarkComparison
                currentScores={riskData.map((cat) => ({
                  category: cat.name,
                  score: cat.averageScore,
                  nationalAverage: Math.floor(Math.random() * 20) + 50,
                  peerAverage: Math.floor(Math.random() * 15) + 55,
                }))}
                location={`${county ? `${county}, ` : ""}${state}`}
              />
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Insights Panel */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              {aiInsights && (
                <AIInsightsPanel insights={aiInsights} location={`${county ? `${county}, ` : ""}${state}`} />
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-red-400">
                        {riskData.filter((cat) => cat.averageScore > 70).length}
                      </div>
                      <div className="text-xs text-gray-400">High Risk Categories</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-400">
                        {riskData.reduce((acc, cat) => acc + cat.factors.length, 0)}
                      </div>
                      <div className="text-xs text-gray-400">Total Risk Factors</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Climate Risk</span>
                      <span className="text-red-400 font-medium">Critical</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Infrastructure</span>
                      <span className="text-orange-400 font-medium">High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Public Health</span>
                      <span className="text-yellow-400 font-medium">Moderate</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Economic</span>
                      <span className="text-green-400 font-medium">Low</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Updates */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm text-white font-medium">Flood Risk Increased</div>
                      <div className="text-xs text-gray-400">2 hours ago</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Heavy rainfall forecast has elevated flood risk by 15%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm text-white font-medium">Infrastructure Alert</div>
                      <div className="text-xs text-gray-400">6 hours ago</div>
                      <div className="text-xs text-gray-300 mt-1">Power grid capacity concerns during peak demand</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm text-white font-medium">Emergency Response</div>
                      <div className="text-xs text-gray-400">1 day ago</div>
                      <div className="text-xs text-gray-300 mt-1">
                        New evacuation routes established, improving response time
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
