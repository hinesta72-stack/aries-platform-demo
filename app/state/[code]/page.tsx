"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import RiskGauge from "@/components/RiskGauge"
import RecommendationsList from "@/components/RecommendationsList"
import CboList from "@/components/CboList"
import PennsylvaniaCountyHeatMap from "@/components/PennsylvaniaCountyHeatMap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, MapPin, TrendingUp, TrendingDown } from "lucide-react"

interface StateData {
  name: string
  code: string
  resilienceIndex: number
  trend?: number
  confidence?: number
  riskFactors: string[]
  counties: Array<{
    name: string
    resilienceIndex: number
    highRiskZips: number
  }>
}

export default function StateOverview() {
  const params = useParams()
  const router = useRouter()
  const [stateData, setStateData] = useState<StateData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await fetch(`/api/state/${params.code}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setStateData(data)
      } catch (error) {
        console.error("Error fetching state data:", error)
        // Enhanced fallback data
        const fallbackData: StateData = {
          name: params.code === "pa" || params.code === "pennsylvania" ? "Pennsylvania" : "Unknown State",
          code: (params.code as string).toUpperCase(),
          resilienceIndex: 64,
          trend: 1.2,
          confidence: 87,
          riskFactors: [
            "Extreme Weather Events",
            "Infrastructure Vulnerability",
            "Economic Instability",
            "Population Density",
            "Climate Change Impact",
          ],
          counties: [
            { name: "Allegheny County", resilienceIndex: 68, highRiskZips: 12 },
            { name: "Philadelphia County", resilienceIndex: 62, highRiskZips: 18 },
            { name: "Montgomery County", resilienceIndex: 72, highRiskZips: 8 },
            { name: "Bucks County", resilienceIndex: 70, highRiskZips: 6 },
          ],
        }
        setStateData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchStateData()
  }, [params.code])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl flex items-center space-x-3"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
          <span>Loading state data...</span>
        </motion.div>
      </div>
    )
  }

  if (!stateData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">State data not found</div>
      </div>
    )
  }

  const isPennsylvania = stateData.code === "PA" || params.code === "pa" || params.code === "pennsylvania"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900"
    >
      <NavBar />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-gray-400 hover:text-white">
                  Overview
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-500" />
              <BreadcrumbItem>
                <span className="text-white font-medium">{stateData.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Header Section */}
        <div className="mb-8">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="mb-4 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center space-x-4 mb-4"
          >
            <MapPin className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">{stateData.name}</h1>
          </motion.div>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-6"
          >
            <p className="text-xl text-gray-300">
              Current Resilience Index: <span className="text-orange-400 font-bold">{stateData.resilienceIndex}</span>
            </p>
            {stateData.trend !== undefined && (
              <div className="flex items-center space-x-2">
                {stateData.trend > 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
                <span className={`font-semibold ${stateData.trend > 0 ? "text-green-400" : "text-red-400"}`}>
                  {stateData.trend > 0 ? "+" : ""}
                  {stateData.trend.toFixed(1)}
                </span>
              </div>
            )}
            {stateData.confidence && (
              <div className="text-sm text-gray-400">
                Confidence: <span className="text-blue-400 font-semibold">{stateData.confidence}%</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Pennsylvania County Heat Map */}
        {isPennsylvania && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <PennsylvaniaCountyHeatMap />
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Risk Gauge and Factors */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <RiskGauge score={stateData.resilienceIndex} location={stateData.name} />

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Key Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {stateData.riskFactors.map((factor, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      {factor}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Recommendations and CBOs */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            <RecommendationsList stateCode={stateData.code} />
            <CboList stateCode={stateData.code} />
          </motion.div>
        </div>

        {/* Counties Section */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Counties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {stateData.counties.map((county, index) => (
                  <motion.button
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      const countySlug = county.name.toLowerCase().replace(/\s+/g, "-").replace(" county", "")
                      router.push(`/state/${stateData.code.toLowerCase()}/county/${countySlug}`)
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-all duration-200 text-left"
                  >
                    <div className="font-semibold text-lg mb-2">{county.name}</div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Resilience Index:</span>
                        <span className="text-orange-400 font-bold">{county.resilienceIndex}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High-Risk ZIPs:</span>
                        <span className="text-red-400">{county.highRiskZips}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
