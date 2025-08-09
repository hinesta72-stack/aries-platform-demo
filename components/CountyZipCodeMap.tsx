"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle } from "lucide-react"

interface ZipCodeData {
  code: string
  name: string
  resilienceIndex: number
  population: number
  riskLevel: string
  coordinates: [number, number]
}

interface CountyZipCodeMapProps {
  countyName: string
  stateCode: string
  zipCodes: ZipCodeData[]
}

export default function CountyZipCodeMap({ countyName, stateCode, zipCodes }: CountyZipCodeMapProps) {
  const router = useRouter()
  const [hoveredZip, setHoveredZip] = useState<ZipCodeData | null>(null)

  // Generate coordinates for ZIP codes based on county
  const getZipCoordinates = (zipCode: string, index: number): [number, number] => {
    const baseCoords: { [key: string]: [number, number] } = {
      allegheny: [150, 120],
      philadelphia: [200, 180],
      montgomery: [180, 160],
      bucks: [220, 140],
      chester: [160, 200],
      delaware: [200, 200],
      lancaster: [140, 220],
      york: [120, 240],
    }

    const countyKey = countyName.toLowerCase().replace(" county", "")
    const base = baseCoords[countyKey] || [150, 150]

    // Distribute ZIP codes around the county center
    const angle = (index * 2 * Math.PI) / zipCodes.length
    const radius = 40 + (index % 3) * 15

    return [base[0] + Math.cos(angle) * radius, base[1] + Math.sin(angle) * radius]
  }

  const getZipColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return "#22c55e"
      case "medium":
        return "#eab308"
      case "high":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

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

  const handleZipClick = (zipCode: ZipCodeData) => {
    router.push(`/state/${stateCode}/zip/${zipCode.code}`)
  }

  const zipCodesWithCoords = zipCodes.map((zip, index) => ({
    ...zip,
    coordinates: getZipCoordinates(zip.code, index),
  }))

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>{countyName} ZIP Code Map</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Low Risk</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-slate-900/30 rounded-lg overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 320" className="w-full h-full">
            {/* County boundary outline */}
            <rect
              x="50"
              y="50"
              width="300"
              height="220"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="5,5"
              rx="10"
            />

            {/* County label */}
            <text x="200" y="40" textAnchor="middle" className="fill-gray-400 text-sm font-medium">
              {countyName}
            </text>

            {/* ZIP code circles */}
            {zipCodesWithCoords.map((zip, index) => (
              <g key={zip.code}>
                <circle
                  cx={zip.coordinates[0]}
                  cy={zip.coordinates[1]}
                  r="12"
                  fill={getZipColor(zip.riskLevel)}
                  stroke="#1e293b"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:stroke-cyan-400 hover:stroke-3 hover:r-14"
                  onMouseEnter={() => setHoveredZip(zip)}
                  onMouseLeave={() => setHoveredZip(null)}
                  onClick={() => handleZipClick(zip)}
                />

                {/* ZIP code labels */}
                <text
                  x={zip.coordinates[0]}
                  y={zip.coordinates[1] + 4}
                  textAnchor="middle"
                  className="fill-white text-xs font-bold pointer-events-none"
                  style={{ fontSize: "8px" }}
                >
                  {zip.code.slice(-2)}
                </text>
              </g>
            ))}

            {/* Connection lines to show relationships */}
            {zipCodesWithCoords.map((zip, index) => {
              if (index === 0) return null
              const prevZip = zipCodesWithCoords[index - 1]
              return (
                <line
                  key={`line-${zip.code}`}
                  x1={prevZip.coordinates[0]}
                  y1={prevZip.coordinates[1]}
                  x2={zip.coordinates[0]}
                  y2={zip.coordinates[1]}
                  stroke="#374151"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.3"
                />
              )
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredZip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-slate-700 z-10 min-w-64"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-lg">{hoveredZip.code}</div>
                  <div className="text-sm text-gray-400">{hoveredZip.name}</div>
                </div>
                <Badge className={getRiskBadgeColor(hoveredZip.riskLevel)}>{hoveredZip.riskLevel}</Badge>
              </div>

              <div className="space-y-1 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Resilience Index:</span>
                  <span className="text-orange-400 font-bold">{hoveredZip.resilienceIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span>Population:</span>
                  <span className="text-blue-400">{hoveredZip.population.toLocaleString()}</span>
                </div>
              </div>

              {hoveredZip.riskLevel.toLowerCase() === "high" && (
                <div className="mt-2 flex items-center space-x-1 text-red-400 text-xs">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Requires immediate attention</span>
                </div>
              )}

              <div className="text-xs text-gray-400 mt-2 italic">Click to view details</div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
