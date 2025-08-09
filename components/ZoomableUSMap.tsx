"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ZoomIn, ZoomOut, Home, MapPin } from "lucide-react"

interface ZoomableUSMapProps {
  onStateClick: (stateCode: string) => void
  highlightedStates?: string[]
  showRiskColors?: boolean
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
const countiesUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"

interface MapPosition {
  coordinates: [number, number]
  zoom: number
}

interface AddressMarker {
  coordinates: [number, number]
  name: string
  address: string
  riskScore: number
}

export default function ZoomableUSMap({
  onStateClick,
  highlightedStates = [],
  showRiskColors = true,
}: ZoomableUSMapProps) {
  const router = useRouter()
  const [position, setPosition] = useState<MapPosition>({ coordinates: [-96, 40], zoom: 1 })
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [addressMarkers, setAddressMarkers] = useState<AddressMarker[]>([])
  const [showCounties, setShowCounties] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const stateRiskData: { [key: string]: { risk: number; name: string } } = {
    "01": { risk: 69, name: "Alabama" },
    "02": { risk: 55, name: "Alaska" },
    "04": { risk: 69, name: "Arizona" },
    "05": { risk: 64, name: "Arkansas" },
    "06": { risk: 72, name: "California" },
    "08": { risk: 63, name: "Colorado" },
    "09": { risk: 61, name: "Connecticut" },
    "10": { risk: 67, name: "Delaware" },
    "12": { risk: 78, name: "Florida" },
    "13": { risk: 70, name: "Georgia" },
    "15": { risk: 59, name: "Hawaii" },
    "16": { risk: 55, name: "Idaho" },
    "17": { risk: 58, name: "Illinois" },
    "18": { risk: 59, name: "Indiana" },
    "19": { risk: 56, name: "Iowa" },
    "20": { risk: 61, name: "Kansas" },
    "21": { risk: 63, name: "Kentucky" },
    "22": { risk: 76, name: "Louisiana" },
    "23": { risk: 57, name: "Maine" },
    "24": { risk: 66, name: "Maryland" },
    "25": { risk: 62, name: "Massachusetts" },
    "26": { risk: 55, name: "Michigan" },
    "27": { risk: 57, name: "Minnesota" },
    "28": { risk: 71, name: "Mississippi" },
    "29": { risk: 62, name: "Missouri" },
    "30": { risk: 53, name: "Montana" },
    "31": { risk: 55, name: "Nebraska" },
    "32": { risk: 64, name: "Nevada" },
    "33": { risk: 58, name: "New Hampshire" },
    "34": { risk: 67, name: "New Jersey" },
    "35": { risk: 64, name: "New Mexico" },
    "36": { risk: 65, name: "New York" },
    "37": { risk: 66, name: "North Carolina" },
    "38": { risk: 52, name: "North Dakota" },
    "39": { risk: 60, name: "Ohio" },
    "40": { risk: 67, name: "Oklahoma" },
    "41": { risk: 62, name: "Oregon" },
    "42": { risk: 72, name: "Pennsylvania" },
    "44": { risk: 63, name: "Rhode Island" },
    "45": { risk: 68, name: "South Carolina" },
    "46": { risk: 53, name: "South Dakota" },
    "47": { risk: 63, name: "Tennessee" },
    "48": { risk: 68, name: "Texas" },
    "49": { risk: 56, name: "Utah" },
    "50": { risk: 58, name: "Vermont" },
    "51": { risk: 64, name: "Virginia" },
    "53": { risk: 58, name: "Washington" },
    "54": { risk: 64, name: "West Virginia" },
    "55": { risk: 59, name: "Wisconsin" },
    "56": { risk: 54, name: "Wyoming" },
  }

  const colorScale = scaleLinear<string>().domain([50, 60, 70, 80]).range(["#3b82f6", "#eab308", "#f97316", "#ef4444"])

  const getStateColor = (geoId: string) => {
    if (!showRiskColors) return "#1e40af"
    const stateCode = geoId.padStart(2, "0")
    const risk = stateRiskData[stateCode]?.risk || 50
    if (highlightedStates.some((code) => getStateCodeFromFips(stateCode) === code)) {
      return "#22d3ee"
    }
    return colorScale(risk)
  }

  const getStateCodeFromFips = (fipsCode: string): string => {
    const fipsToState: { [key: string]: string } = {
      "01": "AL",
      "02": "AK",
      "04": "AZ",
      "05": "AR",
      "06": "CA",
      "08": "CO",
      "09": "CT",
      "10": "DE",
      "12": "FL",
      "13": "GA",
      "15": "HI",
      "16": "ID",
      "17": "IL",
      "18": "IN",
      "19": "IA",
      "20": "KS",
      "21": "KY",
      "22": "LA",
      "23": "ME",
      "24": "MD",
      "25": "MA",
      "26": "MI",
      "27": "MN",
      "28": "MS",
      "29": "MO",
      "30": "MT",
      "31": "NE",
      "32": "NV",
      "33": "NH",
      "34": "NJ",
      "35": "NM",
      "36": "NY",
      "37": "NC",
      "38": "ND",
      "39": "OH",
      "40": "OK",
      "41": "OR",
      "42": "PA",
      "44": "RI",
      "45": "SC",
      "46": "SD",
      "47": "TN",
      "48": "TX",
      "49": "UT",
      "50": "VT",
      "51": "VA",
      "53": "WA",
      "54": "WV",
      "55": "WI",
      "56": "WY",
    }
    return fipsToState[fipsCode] || fipsCode
  }

  // Mock geocoding function (in production, use a real geocoding service)
  const geocodeAddress = async (
    address: string,
  ): Promise<{ lat: number; lng: number; formattedAddress: string } | null> => {
    setIsSearching(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock geocoding results for demonstration
    const mockResults: { [key: string]: { lat: number; lng: number; formattedAddress: string } } = {
      philadelphia: { lat: 39.9526, lng: -75.1652, formattedAddress: "Philadelphia, PA, USA" },
      "new york": { lat: 40.7128, lng: -74.006, formattedAddress: "New York, NY, USA" },
      "los angeles": { lat: 34.0522, lng: -118.2437, formattedAddress: "Los Angeles, CA, USA" },
      chicago: { lat: 41.8781, lng: -87.6298, formattedAddress: "Chicago, IL, USA" },
      houston: { lat: 29.7604, lng: -95.3698, formattedAddress: "Houston, TX, USA" },
      miami: { lat: 25.7617, lng: -80.1918, formattedAddress: "Miami, FL, USA" },
      seattle: { lat: 47.6062, lng: -122.3321, formattedAddress: "Seattle, WA, USA" },
      denver: { lat: 39.7392, lng: -104.9903, formattedAddress: "Denver, CO, USA" },
      "1600 pennsylvania avenue": {
        lat: 38.8977,
        lng: -77.0365,
        formattedAddress: "1600 Pennsylvania Avenue NW, Washington, DC, USA",
      },
      "times square": { lat: 40.758, lng: -73.9855, formattedAddress: "Times Square, New York, NY, USA" },
    }

    const key = address.toLowerCase()
    const result =
      mockResults[key] || Object.values(mockResults).find((r) => r.formattedAddress.toLowerCase().includes(key))

    setIsSearching(false)
    return result || null
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    const result = await geocodeAddress(searchQuery)
    if (result) {
      // Calculate risk score for the address (mock calculation)
      const riskScore = Math.floor(Math.random() * 40) + 50

      // Zoom to address location
      setPosition({
        coordinates: [result.lng, result.lat],
        zoom: 8,
      })

      // Add address marker
      const newMarker: AddressMarker = {
        coordinates: [result.lng, result.lat],
        name: searchQuery,
        address: result.formattedAddress,
        riskScore,
      }

      setAddressMarkers([newMarker])
      setShowCounties(true)
    } else {
      alert("Address not found. Try searching for: Philadelphia, New York, Los Angeles, etc.")
    }
  }

  const handleZoomIn = () => {
    setPosition((prev) => ({ ...prev, zoom: Math.min(prev.zoom * 1.5, 8) }))
  }

  const handleZoomOut = () => {
    setPosition((prev) => ({ ...prev, zoom: Math.max(prev.zoom / 1.5, 1) }))
  }

  const handleReset = () => {
    setPosition({ coordinates: [-96, 40], zoom: 1 })
    setAddressMarkers([])
    setShowCounties(false)
    setSearchQuery("")
  }

  const handleStateClick = (geo: any) => {
    const fipsCode = geo.id.padStart(2, "0")
    const stateCode = getStateCodeFromFips(fipsCode)

    // Zoom to state
    const bounds = geo.geometry
    if (bounds) {
      setPosition({
        coordinates: [-96, 40], // Simplified - in production, calculate centroid
        zoom: 4,
      })
      setShowCounties(true)
    }

    onStateClick(stateCode)
    router.push(`/state/${stateCode.toLowerCase()}`)
  }

  useEffect(() => {
    if (position.zoom > 4) {
      setShowCounties(true)
    } else {
      setShowCounties(false)
    }
  }, [position.zoom])

  return (
    <div className="relative w-full h-96 bg-slate-800/30 rounded-lg overflow-hidden">
      {/* Search Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search address, city, or ZIP code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-64 bg-slate-900/90 border-slate-600 text-white placeholder-gray-400"
          />
          <Button onClick={handleSearch} disabled={isSearching} className="bg-blue-600 hover:bg-blue-700">
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        <Button onClick={handleZoomIn} size="sm" className="bg-slate-700 hover:bg-slate-600">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button onClick={handleZoomOut} size="sm" className="bg-slate-700 hover:bg-slate-600">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button onClick={handleReset} size="sm" className="bg-slate-700 hover:bg-slate-600">
          <Home className="w-4 h-4" />
        </Button>
      </div>

      {/* Map */}
      <div
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
        }}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000,
          }}
          width={800}
          height={500}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={setPosition}>
            {/* States */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fipsCode = geo.id.padStart(2, "0")
                  const stateData = stateRiskData[fipsCode]

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getStateColor(geo.id)}
                      stroke="#22d3ee"
                      strokeWidth={position.zoom > 2 ? 1 : 0.5}
                      style={{
                        default: { outline: "none", transition: "all 0.2s ease-in-out" },
                        hover: {
                          fill: getStateColor(geo.id),
                          stroke: "#22d3ee",
                          strokeWidth: 2,
                          outline: "none",
                          filter: "brightness(1.2)",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: getStateColor(geo.id),
                          stroke: "#22d3ee",
                          strokeWidth: 2,
                          outline: "none",
                        },
                      }}
                      onMouseEnter={() => {
                        if (stateData) setHoveredState(stateData.name)
                      }}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => handleStateClick(geo)}
                    />
                  )
                })
              }
            </Geographies>

            {/* Counties (shown when zoomed in) */}
            {showCounties && (
              <Geographies geography={countiesUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="transparent"
                      stroke="#22d3ee"
                      strokeWidth={0.3}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: "rgba(34, 211, 238, 0.1)",
                          stroke: "#22d3ee",
                          strokeWidth: 1,
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            )}

            {/* Address Markers */}
            {addressMarkers.map((marker, index) => (
              <Marker key={index} coordinates={marker.coordinates}>
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
                  <circle r={8} fill="#ef4444" stroke="#ffffff" strokeWidth={2} className="drop-shadow-lg" />
                  <circle r={3} fill="#ffffff" />
                </motion.g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-slate-700">
        <h4 className="font-semibold mb-2 text-sm">Resilience Risk Index</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-blue-500 rounded"></div>
            <span>50-59 (Low Risk)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-yellow-500 rounded"></div>
            <span>60-69 (Medium Risk)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-orange-500 rounded"></div>
            <span>70-79 (High Risk)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-red-500 rounded"></div>
            <span>80+ (Critical Risk)</span>
          </div>
        </div>
        {position.zoom > 4 && (
          <div className="mt-2 pt-2 border-t border-slate-600">
            <div className="flex items-center space-x-2 text-xs">
              <MapPin className="w-3 h-3 text-red-400" />
              <span>Address Markers</span>
            </div>
          </div>
        )}
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-xl border border-slate-700">
        <div className="text-xs">
          <div>Zoom: {position.zoom.toFixed(1)}x</div>
          <div className="text-gray-400">
            {position.zoom < 2
              ? "Country View"
              : position.zoom < 4
                ? "State View"
                : position.zoom < 6
                  ? "County View"
                  : "Address View"}
          </div>
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredState && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-20 left-4 bg-slate-900/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl border border-slate-700 z-10"
        >
          <div className="font-semibold">{hoveredState}</div>
          <div className="text-sm text-gray-300">
            Risk Index:{" "}
            <span className="text-orange-400 font-bold">
              {Object.values(stateRiskData).find((state) => state.name === hoveredState)?.risk || "N/A"}
            </span>
          </div>
          <div className="text-xs text-blue-400">Click to view details</div>
        </motion.div>
      )}

      {/* Address Details */}
      {addressMarkers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 right-4 bg-slate-900/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-slate-700 max-w-xs"
        >
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <div className="font-semibold text-sm">{addressMarkers[0].address}</div>
              <div className="text-xs text-gray-300 mt-1">
                Risk Score: <span className="text-orange-400 font-bold">{addressMarkers[0].riskScore}</span>
              </div>
              <div className="text-xs text-blue-400 mt-1">
                Coordinates: {addressMarkers[0].coordinates[1].toFixed(4)},{" "}
                {addressMarkers[0].coordinates[0].toFixed(4)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
