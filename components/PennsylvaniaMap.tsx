"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

// Pennsylvania counties TopoJSON URL
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"

export default function PennsylvaniaMap() {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null)

  const countyRiskData: { [key: string]: { risk: number; name: string } } = {
    "42101": { risk: 78, name: "Philadelphia" },
    "42003": { risk: 72, name: "Allegheny" },
    "42091": { risk: 68, name: "Montgomery" },
    "42017": { risk: 65, name: "Bucks" },
    "42029": { risk: 63, name: "Chester" },
    "42045": { risk: 70, name: "Delaware" },
    "42071": { risk: 62, name: "Lancaster" },
    "42133": { risk: 64, name: "York" },
    "42043": { risk: 66, name: "Dauphin" },
    "42077": { risk: 61, name: "Lehigh" },
    "42095": { risk: 63, name: "Northampton" },
    "42049": { risk: 59, name: "Erie" },
    "42079": { risk: 60, name: "Luzerne" },
    "42069": { risk: 58, name: "Lackawanna" },
  }

  const colorScale = scaleLinear<string>().domain([55, 65, 75, 85]).range(["#3b82f6", "#eab308", "#f97316", "#ef4444"])

  const getCountyColor = (geoId: string) => {
    const risk = countyRiskData[geoId]?.risk || 60
    return colorScale(risk)
  }

  const handleCountyHover = (geo: any) => {
    const countyData = countyRiskData[geo.id]
    if (countyData) {
      setHoveredCounty(countyData.name)
    }
  }

  return (
    <div className="relative w-full h-96 bg-slate-800/30 rounded-lg overflow-hidden">
      <div
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
        }}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 8000,
            center: [-77.5, 40.8], // Center on Pennsylvania
          }}
          width={800}
          height={500}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.id.startsWith("42")) // Pennsylvania counties start with 42
                  .map((geo) => {
                    const countyData = countyRiskData[geo.id]

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={countyData ? getCountyColor(geo.id) : "#374151"}
                        stroke="#22d3ee"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none",
                            transition: "all 0.2s ease-in-out",
                          },
                          hover: {
                            fill: countyData ? getCountyColor(geo.id) : "#374151",
                            stroke: "#22d3ee",
                            strokeWidth: 2,
                            outline: "none",
                            filter: "brightness(1.2)",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: countyData ? getCountyColor(geo.id) : "#374151",
                            stroke: "#22d3ee",
                            strokeWidth: 2,
                            outline: "none",
                          },
                        }}
                        onMouseEnter={() => handleCountyHover(geo)}
                        onMouseLeave={() => setHoveredCounty(null)}
                      />
                    )
                  })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-xl border border-slate-700">
        <h3 className="text-lg font-semibold">Pennsylvania Counties</h3>
      </div>

      {/* Hover tooltip */}
      {hoveredCounty && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-16 left-4 bg-slate-900/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl border border-slate-700 z-10"
        >
          <div className="font-semibold">{hoveredCounty} County</div>
          <div className="text-sm text-gray-300">
            Risk Index:{" "}
            <span className="text-orange-400 font-bold">
              {Object.values(countyRiskData).find((county) => county.name === hoveredCounty)?.risk || "N/A"}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
