"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import RiskGauge from "@/components/RiskGauge"
import RecommendationsList from "@/components/RecommendationsList"
import CboList from "@/components/CboList"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ZipOverview() {
  const params = useParams()
  const router = useRouter()
  const [zipData, setZipData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchZipData = async () => {
      try {
        const response = await fetch(`/api/state/${params.code}/zip/${params.zipCode}`)
        const data = await response.json()
        setZipData(data)
      } catch (error) {
        console.error("Error fetching ZIP data:", error)
        // Fallback data
        setZipData({
          zipCode: params.zipCode,
          state: params.code,
          resilienceIndex: Math.floor(Math.random() * 35) + 50,
          population: Math.floor(Math.random() * 50000) + 10000,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchZipData()
  }, [params.code, params.zipCode])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading ZIP code data...</div>
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

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button
            onClick={() => router.push(`/state/${params.code}`)}
            variant="outline"
            className="mb-4 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {params.code} Overview
          </Button>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-white mb-2"
          >
            ZIP Code {params.zipCode}
          </motion.h1>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            Current Resilience Index: <span className="text-orange-400 font-bold">{zipData?.resilienceIndex}</span>
          </motion.p>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Population: {zipData?.population?.toLocaleString()}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <RiskGauge score={zipData?.resilienceIndex} location={`ZIP ${params.zipCode}`} />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <RecommendationsList stateCode={params.code as string} />
            <CboList stateCode={params.code as string} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
