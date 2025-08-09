"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import RiskGauge from "@/components/RiskGauge"
import RecommendationsList from "@/components/RecommendationsList"
import CboList from "@/components/CboList"
import CountyZipCodeMap from "@/components/CountyZipCodeMap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Users, AlertTriangle } from "lucide-react"

interface ZipCodeData {
  code: string
  name: string
  resilienceIndex: number
  population: number
  riskLevel: string
}

interface CountyData {
  name: string
  state: string
  resilienceIndex: number
  population: number
  zipCodes: ZipCodeData[]
}

export default function CountyOverview() {
  const params = useParams()
  const router = useRouter()
  const [countyData, setCountyData] = useState<CountyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountyData = async () => {
      try {
        const response = await fetch(`/api/state/${params.code}/county/${params.countyName}`)
        if (response.ok) {
          const data = await response.json()
          setCountyData(data)
        } else {
          throw new Error("County not found")
        }
      } catch (error) {
        console.error("Error fetching county data:", error)
        // Fallback data
        setCountyData({
          name: (params.countyName as string).replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          state: (params.code as string).toUpperCase(),
          resilienceIndex: Math.floor(Math.random() * 35) + 50,
          population: Math.floor(Math.random() * 1000000) + 100000,
          zipCodes: [
            { code: "12345", name: "Sample Area", resilienceIndex: 65, population: 15000, riskLevel: "Medium" },
            { code: "12346", name: "Sample Area", resilienceIndex: 70, population: 18000, riskLevel: "Low" },
            { code: "12347", name: "Sample Area", resilienceIndex: 60, population: 12000, riskLevel: "High" },
            { code: "12348", name: "Sample Area", resilienceIndex: 72, population: 20000, riskLevel: "Low" },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCountyData()
  }, [params.code, params.countyName])

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading county data...</div>
      </div>
    )
  }

  if (!countyData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">County not found</div>
      </div>
    )
  }

  const highRiskZips = countyData.zipCodes.filter((zip) => zip.riskLevel.toLowerCase() === "high")
  const mediumRiskZips = countyData.zipCodes.filter((zip) => zip.riskLevel.toLowerCase() === "medium")
  const lowRiskZips = countyData.zipCodes.filter((zip) => zip.riskLevel.toLowerCase() === "low")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900"
    >
      <NavBar />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button
            onClick={() => router.push(`/state/${params.code}`)}
            variant="outline"
            className="mb-4 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {(params.code as string).toUpperCase()} Overview
          </Button>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-white mb-2"
          >
            {countyData.name}
          </motion.h1>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-6 text-gray-300"
          >
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span className="text-xl">
                Resilience Index: <span className="text-orange-400 font-bold">{countyData.resilienceIndex}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>
                Population: <span className="text-blue-400 font-bold">{countyData.population.toLocaleString()}</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{countyData.zipCodes.length}</div>
                  <div className="text-sm text-gray-400">Total ZIP Codes</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{highRiskZips.length}</div>
                  <div className="text-sm text-gray-400">High Risk</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{mediumRiskZips.length}</div>
                  <div className="text-sm text-gray-400">Medium Risk</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{lowRiskZips.length}</div>
                  <div className="text-sm text-gray-400">Low Risk</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <RiskGauge score={countyData.resilienceIndex} location={countyData.name} />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <RecommendationsList stateCode={params.code as string} />
            <CboList stateCode={params.code as string} />
          </motion.div>
        </div>

        {/* ZIP Code Map */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
          <CountyZipCodeMap
            countyName={countyData.name}
            stateCode={params.code as string}
            zipCodes={countyData.zipCodes}
          />
        </motion.div>

        {/* ZIP Codes Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>ZIP Codes in {countyData.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countyData.zipCodes.map((zip, index) => (
                  <motion.div
                    key={zip.code}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push(`/state/${params.code}/zip/${zip.code}`)}
                    className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition-all cursor-pointer border border-slate-600 hover:border-slate-500"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-lg font-bold text-white">{zip.code}</div>
                        <div className="text-sm text-gray-400">{zip.name}</div>
                      </div>
                      <Badge className={getRiskBadgeColor(zip.riskLevel)}>{zip.riskLevel}</Badge>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Resilience Index:</span>
                        <span className="text-orange-400 font-bold">{zip.resilienceIndex}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Population:</span>
                        <span className="text-blue-400">{zip.population.toLocaleString()}</span>
                      </div>
                    </div>

                    {zip.riskLevel.toLowerCase() === "high" && (
                      <div className="mt-2 flex items-center space-x-1 text-red-400 text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Requires immediate attention</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
