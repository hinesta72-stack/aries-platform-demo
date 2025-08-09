"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import ZoomableUSMap from "@/components/ZoomableUSMap"
import ResilienceFactorsBreakdown from "@/components/ResilienceFactorsBreakdown"
import PredictiveChart from "@/components/PredictiveChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("PA")
  const [selectedRegionType, setSelectedRegionType] = useState<"state" | "county" | "zip">("state")

  const handleStateClick = (stateCode: string) => {
    setSelectedRegion(stateCode.toUpperCase())
    setSelectedRegionType("state")
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
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">ARIES™ Resilience Command Center</h1>
          <p className="text-xl text-gray-300">Advanced predictive analytics and comprehensive resilience monitoring</p>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="predictive" className="data-[state=active]:bg-blue-600">
              Predictive
            </TabsTrigger>
            <TabsTrigger value="factors" className="data-[state=active]:bg-blue-600">
              Factor Analysis
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-blue-600">
              Scenarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Interactive Resilience Map</CardTitle>
                <CardDescription>Click on states to drill down, search addresses for detailed analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ZoomableUSMap onStateClick={handleStateClick} showRiskColors={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <PredictiveChart region={selectedRegion} regionType={selectedRegionType} />
          </TabsContent>

          <TabsContent value="factors" className="space-y-6">
            <ResilienceFactorsBreakdown region={selectedRegion} regionType={selectedRegionType} />
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Scenario Comparison</CardTitle>
                <CardDescription>Compare baseline vs disaster impact vs mitigation scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <PredictiveChart region={selectedRegion} regionType={selectedRegionType} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}
