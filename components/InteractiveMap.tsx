"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ZoomIn, ZoomOut, Home, MapPin, Layers } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  type: "state" | "county" | "city" | "address"
  coordinates: [number, number]
  resilienceScore: number
  population?: number
  parentId?: string
}

interface InteractiveMapProps {
  onLocationSelect: (location: MapLocation) => void
  selectedLocation?: MapLocation | null
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
const countiesUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"

export default function InteractiveMap({ onLocationSelect, selectedLocation }: InteractiveMapProps) {
  const [position, setPosition] = useState({ coordinates: [-96, 40] as [number, number], zoom: 1 })
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<MapLocation[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showCounties, setShowCounties] = useState(false)
  const [showCities, setShowCities] = useState(false)
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null)
  const [mapLocations, setMapLocations] = useState<MapLocation[]>([])

  // Mock data for different location types
  const mockLocations: MapLocation[] = [
    // States
    {
      id: "PA",
      name: "Pennsylvania",
      type: "state",
      coordinates: [-77.5, 40.8],
      resilienceScore: 72,
      population: 12800000,
    },
    {
      id: "NY",
      name: "New York",
      type: "state",
      coordinates: [-74.0, 42.5],
      resilienceScore: 68,
      population: 19500000,
    },
    {
      id: "CA",
      name: "California",
      type: "state",
      coordinates: [-119.4, 36.8],
      resilienceScore: 75,
      population: 39500000,
    },

    // Counties (Pennsylvania)
    {
      id: "PA-PHIL",
      name: "Philadelphia County",
      type: "county",
      coordinates: [-75.1652, 39.9526],
      resilienceScore: 78,
      population: 1580000,
      parentId: "PA",
    },
    {
      id: "PA-ALLE",
      name: "Allegheny County",
      type: "county",
      coordinates: [-79.9959, 40.4406],
      resilienceScore: 74,
      population: 1230000,
      parentId: "PA",
    },
    {
      id: "PA-MONT",
      name: "Montgomery County",
      type: "county",
      coordinates: [-75.3, 40.2],
      resilienceScore: 71,
      population: 830000,
      parentId: "PA",
    },

    // Cities
    {
      id: "PHIL-CITY",
      name: "Philadelphia",
      type: "city",
      coordinates: [-75.1652, 39.9526],
      resilienceScore: 76,
      population: 1580000,
      parentId: "PA-PHIL",
    },
    {
      id: "PITT-CITY",
      name: "Pittsburgh",
      type: "city",
      coordinates: [-79.9959, 40.4406],
      resilienceScore: 73,
      population: 300000,
      parentId: "PA-ALLE",
    },

    // Addresses
    {
      id: "ADDR-1",
      name: "1600 Market St, Philadelphia",
      type: "address",
      coordinates: [-75.1652, 39.9526],
      resilienceScore: 82,
      parentId: "PHIL-CITY",
    },
    {
      id: "ADDR-2",
      name: "Liberty Bell Center",
      type: "address",
      coordinates: [-75.1503, 39.9496],
      resilienceScore: 79,
      parentId: "PHIL-CITY",
    },
  ]

  const colorScale = scaleLinear<string>()
    .domain([50, 60, 70, 80, 90])
    .range(["#3b82f6", "#22d3ee", "#eab308", "#f97316", "#ef4444"])

  const getLocationColor = (score: number) => colorScale(score)

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API search
    await new Promise((resolve) => setTimeout(resolve, 500))

    const results = mockLocations
      .filter((location) => location.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)

    setSearchResults(results)
    setIsSearching(false)
  }, [])

  const handleLocationClick = (location: MapLocation) => {
    onLocationSelect(location)

    // Zoom to location based on type
    let newZoom = 1
    switch (location.type) {
      case "state":
        newZoom = 4
        setShowCounties(true)
        break
      case "county":
        newZoom = 6
        setShowCities(true)
        break
      case "city":
        newZoom = 8
        break
      case "address":
        newZoom = 12
        break
    }

    setPosition({
      coordinates: location.coordinates,
      zoom: newZoom,
    })

    // Update visible locations based on zoom level
    updateVisibleLocations(location, newZoom)
    setSearchQuery("")
    setSearchResults([])
  }

  const updateVisibleLocations = (selectedLocation: MapLocation, zoom: number) => {
    let locations: MapLocation[] = []

    if (zoom >= 4 && zoom < 6) {
      // Show counties for selected state
      locations = mockLocations.filter((loc) => loc.type === "county" && loc.parentId === selectedLocation.id)
    } else if (zoom >= 6 && zoom < 8) {
      // Show cities for selected county
      locations = mockLocations.filter((loc) => loc.type === "city" && loc.parentId === selectedLocation.id)
    } else if (zoom >= 8) {
      // Show addresses for selected city
      locations = mockLocations.filter((loc) => loc.type === "address" && loc.parentId === selectedLocation.id)
    }

    setMapLocations(locations)
  }

  const handleZoomIn = () => {
    setPosition((prev) => ({ ...prev, zoom: Math.min(prev.zoom * 1.5, 12) }))
  }

  const handleZoomOut = () => {
    setPosition((prev) => ({ ...prev, zoom: Math.max(prev.zoom / 1.5, 1) }))
  }

  const handleReset = () => {
    setPosition({ coordinates: [-96, 40], zoom: 1 })
    setShowCounties(false)
    setShowCities(false)
    setMapLocations([])
    setSearchQuery("")
    setSearchResults([])
  }

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchQuery, handleSearch])

  return (
    <div className="relative w-full h-[600px] bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700/50">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-20 w-80">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search states, counties, cities, or addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-900/95 border-slate-600 text-white placeholder-gray-400 pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg shadow-xl z-30"
              >
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleLocationClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors border-b border-slate-700/30 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">{result.name}</div>
                        <div className="text-sm text-gray-400 capitalize">{result.type}</div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          result.resilienceScore >= 75
                            ? "border-green-500 text-green-400"
                            : result.resilienceScore >= 65
                              ? "border-yellow-500 text-yellow-400"
                              : "border-red-500 text-red-400"
                        }`}
                      >
                        {result.resilienceScore}
                      </Badge>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        <Button onClick={handleZoomIn} size="sm" className="bg-slate-700/90 hover:bg-slate-600">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button onClick={handleZoomOut} size="sm" className="bg-slate-700/90 hover:bg-slate-600">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button onClick={handleReset} size="sm" className="bg-slate-700/90 hover:bg-slate-600">
          <Home className="w-4 h-4" />
        </Button>
      </div>

      {/* Map */}
      <div className="w-full h-full" style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.2))" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={800}
          height={500}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={setPosition}>
            {/* States */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateLocation = mockLocations.find(
                    (loc) =>
                      loc.type === "state" && geo.properties.NAME?.toLowerCase().includes(loc.name.toLowerCase()),
                  )

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={stateLocation ? getLocationColor(stateLocation.resilienceScore) : "#374151"}
                      stroke="#22d3ee"
                      strokeWidth={position.zoom > 2 ? 1 : 0.5}
                      style={{
                        default: { outline: "none", transition: "all 0.2s ease-in-out" },
                        hover: {
                          fill: stateLocation ? getLocationColor(stateLocation.resilienceScore) : "#374151",
                          stroke: "#22d3ee",
                          strokeWidth: 2,
                          outline: "none",
                          filter: "brightness(1.2)",
                          cursor: "pointer",
                        },
                      }}
                      onMouseEnter={() => stateLocation && setHoveredLocation(stateLocation)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      onClick={() => stateLocation && handleLocationClick(stateLocation)}
                    />
                  )
                })
              }
            </Geographies>

            {/* Counties (when zoomed in) */}
            {showCounties && position.zoom >= 4 && (
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
                          cursor: "pointer",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            )}

            {/* Dynamic Location Markers */}
            {mapLocations.map((location) => (
              <Marker key={location.id} coordinates={location.coordinates}>
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleLocationClick(location)}
                  className="cursor-pointer"
                >
                  <circle
                    r={location.type === "address" ? 4 : location.type === "city" ? 6 : 8}
                    fill={getLocationColor(location.resilienceScore)}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="drop-shadow-lg"
                  />
                  {location.type === "address" && <MapPin className="w-3 h-3 text-white" x={-6} y={-6} />}
                </motion.g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-slate-700">
        <div className="text-xs">
          <div className="flex items-center space-x-2">
            <Layers className="w-3 h-3" />
            <span>
              {position.zoom < 2
                ? "Country View"
                : position.zoom < 4
                  ? "State View"
                  : position.zoom < 6
                    ? "County View"
                    : position.zoom < 8
                      ? "City View"
                      : "Address View"}
            </span>
          </div>
          <div className="text-gray-400">Zoom: {position.zoom.toFixed(1)}x</div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm text-white p-4 rounded-lg border border-slate-700">
        <h4 className="font-semibold mb-2 text-sm">Resilience Score</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-blue-500 rounded"></div>
            <span>50-59 (Low)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-cyan-400 rounded"></div>
            <span>60-69 (Fair)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-yellow-500 rounded"></div>
            <span>70-79 (Good)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-orange-500 rounded"></div>
            <span>80-89 (High)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-red-500 rounded"></div>
            <span>90+ (Excellent)</span>
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white p-4 rounded-lg border border-slate-700 z-10"
          >
            <div className="text-center">
              <div className="font-semibold">{hoveredLocation.name}</div>
              <div className="text-sm text-gray-400 capitalize">{hoveredLocation.type}</div>
              <div className="text-lg font-bold text-orange-400 mt-1">Score: {hoveredLocation.resilienceScore}</div>
              {hoveredLocation.population && (
                <div className="text-xs text-gray-400">Population: {hoveredLocation.population.toLocaleString()}</div>
              )}
              <div className="text-xs text-blue-400 mt-1">Click to explore</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
