"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface StateData {
  code: string
  name: string
  score: number
  color: string
}

export default function MapChart() {
  const router = useRouter()
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  // Mock state data with resilience scores
  const stateData: StateData[] = [
    { code: "CA", name: "California", score: 72, color: "#f97316" },
    { code: "TX", name: "Texas", score: 68, color: "#f97316" },
    { code: "FL", name: "Florida", score: 78, color: "#ef4444" },
    { code: "NY", name: "New York", score: 65, color: "#f97316" },
    { code: "PA", name: "Pennsylvania", score: 62, color: "#eab308" },
    { code: "IL", name: "Illinois", score: 58, color: "#3b82f6" },
    { code: "OH", name: "Ohio", score: 60, color: "#3b82f6" },
    { code: "GA", name: "Georgia", score: 70, color: "#f97316" },
    { code: "NC", name: "North Carolina", score: 66, color: "#f97316" },
    { code: "MI", name: "Michigan", score: 55, color: "#3b82f6" },
  ]

  const handleStateClick = (stateCode: string) => {
    router.push(`/state/${stateCode.toLowerCase()}`)
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "#ef4444" // red
    if (score >= 65) return "#f97316" // orange
    if (score >= 55) return "#eab308" // yellow
    return "#3b82f6" // blue
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800 rounded-lg p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">U.S. Resilience Risk Map</h3>

        {/* Legend */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Resilience Risk Index</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-xs text-gray-400">50</span>
            <div className="w-16 h-4 risk-gradient rounded"></div>
            <span className="text-xs text-gray-400">80</span>
            <div className="w-4 h-4 bg-red-500 rounded"></div>
          </div>
        </div>
      </div>

      <div className="relative bg-slate-700 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
        {/* Simplified US Map representation */}
        <div className="grid grid-cols-10 gap-2 max-w-4xl">
          {/* Row 1 - Northern states */}
          <div className="col-span-2"></div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("WA")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Washington - Score: 58"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("OR")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Oregon - Score: 62"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("ID")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Idaho - Score: 55"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("MT")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Montana - Score: 53"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("ND")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="North Dakota - Score: 52"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("MN")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Minnesota - Score: 57"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("WI")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Wisconsin - Score: 59"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("MI")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Michigan - Score: 55"
          />

          {/* Row 2 */}
          <div className="col-span-1"></div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("CA")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="California - Score: 72"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("NV")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Nevada - Score: 64"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("UT")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Utah - Score: 56"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("WY")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Wyoming - Score: 54"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("SD")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="South Dakota - Score: 53"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("IA")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Iowa - Score: 56"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("IL")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Illinois - Score: 58"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("IN")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Indiana - Score: 59"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("OH")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Ohio - Score: 60"
          />

          {/* Row 3 */}
          <div className="col-span-2"></div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("CO")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Colorado - Score: 63"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("NE")}
            className="w-12 h-8 bg-blue-500 rounded hover:bg-blue-400 transition-colors"
            title="Nebraska - Score: 55"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("KS")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Kansas - Score: 61"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("MO")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Missouri - Score: 62"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("KY")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Kentucky - Score: 63"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("WV")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="West Virginia - Score: 64"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("PA")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Pennsylvania - Score: 62"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("NY")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="New York - Score: 65"
          />

          {/* Row 4 - Southern states */}
          <div className="col-span-1"></div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("AZ")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="Arizona - Score: 69"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("NM")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="New Mexico - Score: 64"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("TX")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="Texas - Score: 68"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("OK")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="Oklahoma - Score: 67"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("AR")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Arkansas - Score: 64"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("TN")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Tennessee - Score: 63"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("NC")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="North Carolina - Score: 66"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("VA")}
            className="w-12 h-8 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors"
            title="Virginia - Score: 64"
          />
          <div className="col-span-1"></div>

          {/* Row 5 - Deep South */}
          <div className="col-span-3"></div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("LA")}
            className="w-12 h-8 bg-red-500 rounded hover:bg-red-400 transition-colors"
            title="Louisiana - Score: 76"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("MS")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="Mississippi - Score: 71"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("AL")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="Alabama - Score: 69"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("GA")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="Georgia - Score: 70"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("SC")}
            className="w-12 h-8 bg-orange-500 rounded hover:bg-orange-400 transition-colors"
            title="South Carolina - Score: 68"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleStateClick("FL")}
            className="w-12 h-8 bg-red-500 rounded hover:bg-red-400 transition-colors"
            title="Florida - Score: 78"
          />
          <div className="col-span-1"></div>
        </div>

        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 bg-slate-900 text-white p-3 rounded-lg shadow-lg"
          >
            <div className="font-semibold">{hoveredState}</div>
            <div className="text-sm text-gray-300">Click to view details</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
