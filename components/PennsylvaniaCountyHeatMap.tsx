"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CountyData {
  id: string
  name: string
  resilienceIndex: number
  population: number
  highRiskZips: number
  coordinates: [number, number][]
}

export default function PennsylvaniaCountyHeatMap() {
  const router = useRouter()
  const [hoveredCounty, setHoveredCounty] = useState<CountyData | null>(null)

  // Pennsylvania counties with simplified coordinate data
  const countyData: { [key: string]: CountyData } = {
    philadelphia: {
      id: "philadelphia",
      name: "Philadelphia",
      resilienceIndex: 62,
      population: 1584064,
      highRiskZips: 18,
      coordinates: [
        [200, 180],
        [240, 180],
        [240, 220],
        [200, 220],
      ],
    },
    allegheny: {
      id: "allegheny",
      name: "Allegheny",
      resilienceIndex: 68,
      population: 1250578,
      highRiskZips: 12,
      coordinates: [
        [80, 140],
        [120, 140],
        [120, 180],
        [80, 180],
      ],
    },
    montgomery: {
      id: "montgomery",
      name: "Montgomery",
      resilienceIndex: 72,
      population: 856553,
      highRiskZips: 8,
      coordinates: [
        [180, 160],
        [220, 160],
        [220, 200],
        [180, 200],
      ],
    },
    bucks: {
      id: "bucks",
      name: "Bucks",
      resilienceIndex: 70,
      population: 646538,
      highRiskZips: 6,
      coordinates: [
        [220, 140],
        [260, 140],
        [260, 180],
        [220, 180],
      ],
    },
    chester: {
      id: "chester",
      name: "Chester",
      resilienceIndex: 74,
      population: 534413,
      highRiskZips: 4,
      coordinates: [
        [160, 200],
        [200, 200],
        [200, 240],
        [160, 240],
      ],
    },
    delaware: {
      id: "delaware",
      name: "Delaware",
      resilienceIndex: 65,
      population: 576830,
      highRiskZips: 10,
      coordinates: [
        [200, 200],
        [240, 200],
        [240, 240],
        [200, 240],
      ],
    },
    lancaster: {
      id: "lancaster",
      name: "Lancaster",
      resilienceIndex: 69,
      population: 552984,
      highRiskZips: 7,
      coordinates: [
        [140, 220],
        [180, 220],
        [180, 260],
        [140, 260],
      ],
    },
    york: {
      id: "york",
      name: "York",
      resilienceIndex: 67,
      population: 456438,
      highRiskZips: 9,
      coordinates: [
        [120, 240],
        [160, 240],
        [160, 280],
        [120, 280],
      ],
    },
    dauphin: {
      id: "dauphin",
      name: "Dauphin",
      resilienceIndex: 66,
      population: 286401,
      highRiskZips: 8,
      coordinates: [
        [140, 180],
        [180, 180],
        [180, 220],
        [140, 220],
      ],
    },
    lehigh: {
      id: "lehigh",
      name: "Lehigh",
      resilienceIndex: 63,
      population: 374557,
      highRiskZips: 11,
      coordinates: [
        [240, 120],
        [280, 120],
        [280, 160],
        [240, 160],
      ],
    },
    northampton: {
      id: "northampton",
      name: "Northampton",
      resilienceIndex: 64,
      population: 312951,
      highRiskZips: 9,
      coordinates: [
        [260, 100],
        [300, 100],
        [300, 140],
        [260, 140],
      ],
    },
    erie: {
      id: "erie",
      name: "Erie",
      resilienceIndex: 59,
      population: 270876,
      highRiskZips: 14,
      coordinates: [
        [40, 60],
        [80, 60],
        [80, 100],
        [40, 100],
      ],
    },
    luzerne: {
      id: "luzerne",
      name: "Luzerne",
      resilienceIndex: 60,
      population: 325594,
      highRiskZips: 13,
      coordinates: [
        [280, 140],
        [320, 140],
        [320, 180],
        [280, 180],
      ],
    },
    lackawanna: {
      id: "lackawanna",
      name: "Lackawanna",
      resilienceIndex: 58,
      population: 215896,
      highRiskZips: 15,
      coordinates: [
        [300, 120],
        [340, 120],
        [340, 160],
        [300, 160],
      ],
    },
    berks: {
      id: "berks",
      name: "Berks",
      resilienceIndex: 65,
      population: 428849,
      highRiskZips: 10,
      coordinates: [
        [180, 180],
        [220, 180],
        [220, 220],
        [180, 220],
      ],
    },
    cumberland: {
      id: "cumberland",
      name: "Cumberland",
      resilienceIndex: 71,
      population: 259469,
      highRiskZips: 5,
      coordinates: [
        [100, 200],
        [140, 200],
        [140, 240],
        [100, 240],
      ],
    },
    butler: {
      id: "butler",
      name: "Butler",
      resilienceIndex: 68,
      population: 193763,
      highRiskZips: 7,
      coordinates: [
        [80, 100],
        [120, 100],
        [120, 140],
        [80, 140],
      ],
    },
    westmoreland: {
      id: "westmoreland",
      name: "Westmoreland",
      resilienceIndex: 64,
      population: 354663,
      highRiskZips: 11,
      coordinates: [
        [120, 160],
        [160, 160],
        [160, 200],
        [120, 200],
      ],
    },
    washington: {
      id: "washington",
      name: "Washington",
      resilienceIndex: 62,
      population: 209349,
      highRiskZips: 12,
      coordinates: [
        [60, 180],
        [100, 180],
        [100, 220],
        [60, 220],
      ],
    },
    armstrong: {
      id: "armstrong",
      name: "Armstrong",
      resilienceIndex: 61,
      population: 65558,
      highRiskZips: 8,
      coordinates: [
        [120, 120],
        [160, 120],
        [160, 160],
        [120, 160],
      ],
    },
  }

  const getCountyColor = (resilienceIndex: number) => {
    if (resilienceIndex >= 75) return "#22c55e" // Green - Very Low Risk
    if (resilienceIndex >= 70) return "#eab308" // Yellow - Low Risk
    if (resilienceIndex >= 65) return "#f97316" // Orange - Medium Risk
    return "#ef4444" // Red - High Risk
  }

  const handleCountyClick = (county: CountyData) => {
    const countySlug = county.name.toLowerCase().replace(/\s+/g, "-")
    router.push(`/state/pa/county/${countySlug}`)
  }

  const handleCountyHover = (county: CountyData) => {
    setHoveredCounty(county)
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Pennsylvania County Heat Map
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-300">High Risk (55-65)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-gray-300">Medium Risk (65-70)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Low Risk (70-75)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300">Very Low Risk (75+)</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-slate-900/30 rounded-lg overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 320" className="w-full h-full">
            {/* Pennsylvania state outline */}
            <path
              d="M 20 80 L 380 80 L 380 100 L 360 120 L 340 140 L 340 280 L 20 280 L 20 200 L 40 180 L 40 120 Z"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* County polygons */}
            {Object.values(countyData).map((county) => (
              <polygon
                key={county.id}
                points={county.coordinates.map((coord) => coord.join(",")).join(" ")}
                fill={getCountyColor(county.resilienceIndex)}
                stroke="#1e293b"
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200 hover:stroke-cyan-400 hover:stroke-2 hover:brightness-110"
                onMouseEnter={() => handleCountyHover(county)}
                onMouseLeave={() => setHoveredCounty(null)}
                onClick={() => handleCountyClick(county)}
              />
            ))}

            {/* County labels */}
            {Object.values(countyData).map((county) => {
              const centerX = county.coordinates.reduce((sum, coord) => sum + coord[0], 0) / county.coordinates.length
              const centerY = county.coordinates.reduce((sum, coord) => sum + coord[1], 0) / county.coordinates.length

              return (
                <text
                  key={`${county.id}-label`}
                  x={centerX}
                  y={centerY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-xs font-medium pointer-events-none"
                  style={{ fontSize: "10px" }}
                >
                  {county.name}
                </text>
              )
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredCounty && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-slate-700 z-10 min-w-64"
            >
              <div className="font-bold text-lg">{hoveredCounty.name} County</div>
              <div className="space-y-1 text-sm text-gray-300 mt-2">
                <div className="flex justify-between">
                  <span>Resilience Index:</span>
                  <span className="text-orange-400 font-bold">{hoveredCounty.resilienceIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span>Population:</span>
                  <span className="text-blue-400">{hoveredCounty.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>High-Risk ZIP Codes:</span>
                  <span className="text-red-400">{hoveredCounty.highRiskZips}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2 italic">Click to view ZIP codes</div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
