"use client"

import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Server, Database, Activity, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SystemInfo() {
  const router = useRouter()

  const systemMetrics = [
    { label: "API Status", value: "Operational", icon: Activity, color: "text-green-400" },
    { label: "Database", value: "Connected", icon: Database, color: "text-green-400" },
    { label: "Last Data Sync", value: "2 minutes ago", icon: Clock, color: "text-blue-400" },
    { label: "Server Load", value: "23%", icon: Server, color: "text-yellow-400" },
  ]

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
            onClick={() => router.push("/")}
            variant="outline"
            className="mb-4 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-white mb-2"
          >
            System Information
          </motion.h1>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            ARIES™ Platform Status & Metrics
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-slate-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                <span className={`text-sm font-medium ${metric.color}`}>{metric.value}</span>
              </div>
              <h3 className="text-white font-semibold">{metric.label}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Platform Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Version Information</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Platform Version:</span>
                  <span className="text-orange-400">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span>API Version:</span>
                  <span className="text-orange-400">v1.3.2</span>
                </div>
                <div className="flex justify-between">
                  <span>Build:</span>
                  <span className="text-orange-400">#2024.01.15</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">Data Sources</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>NOAA Climate Data:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>FEMA Risk Index:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Census Demographics:</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
