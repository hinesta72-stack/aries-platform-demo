"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import InteractiveMap from "@/components/InteractiveMap"
import LocationDetails from "@/components/LocationDetails"
import { Card, CardContent } from "@/components/ui/card"

interface MapLocation {
  id: string
  name: string
  type: "state" | "county" | "city" | "address"
  coordinates: [number, number]
  resilienceScore: number
  population?: number
  parentId?: string
}

export default function PADrilldown() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>({
    id: "PA",
    name: "Pennsylvania",
    type: "state",
    coordinates: [-77.5, 40.8],
    resilienceScore: 72,
    population: 12800000,
  })

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
          <h1 className="text-4xl font-bold text-white mb-2">Pennsylvania Deep Dive</h1>
          <p className="text-xl text-gray-300">
            Comprehensive resilience analysis for Pennsylvania with county, city, and address-level insights
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">72</div>
              <div className="text-sm text-gray-400">State Score</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">67</div>
              <div className="text-sm text-gray-400">Counties</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">2,560</div>
              <div className="text-sm text-gray-400">Cities</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">12.8M</div>
              <div className="text-sm text-gray-400">Population</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <InteractiveMap onLocationSelect={setSelectedLocation} selectedLocation={selectedLocation} />
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <LocationDetails location={selectedLocation} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
