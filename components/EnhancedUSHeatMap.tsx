"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  ZoomIn,
  ZoomOut,
  Home,
  Layers,
  Activity,
  Users,
  TrendingUp,
  Shield,
  AlertTriangle,
  BarChart3,
  MapPin,
  Navigation,
  Filter,
  Clock,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import TimelineSlider from "./TimelineSlider"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
const countiesUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"

interface MapPosition {
  coordinates: [number, number]
  zoom: number
}

interface StateData {
  id: string
  name: string
  resilienceIndex: number
  riskLevel: "low" | "medium" | "high" | "critical"
  population: number
  economicStability: number
  healthSystemCapacity: number
  infrastructureQuality: number
  emergencyResponse: number
  socialCohesion: number
  environmentalPreparedness: number
  forecast30?: number
  forecast60?: number
  forecast90?: number
}

interface EnhancedUSHeatMapProps {
  onStateSelect?: (stateData: StateData) => void
  selectedState?: StateData | null
  timePoint?: "historical" | "current" | "forecast30" | "forecast60" | "forecast90"
  onTimePointChange?: (timePoint: string) => void
}

export default function EnhancedUSHeatMap({
  onStateSelect,
  selectedState,
  timePoint = "current",
  onTimePointChange,
}: EnhancedUSHeatMapProps) {
  const router = useRouter()
  const [position, setPosition] = useState<MapPosition>({ coordinates: [-96, 40], zoom: 1 })
  const [searchQuery, setSearchQuery] = useState("")
  const [heatMapLayer, setHeatMapLayer] = useState<"resilience" | "risk" | "population" | "economic">("resilience")
  const [heatMapOpacity, setHeatMapOpacity] = useState([0.8])
  const [showLabels, setShowLabels] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [hoveredState, setHoveredState] = useState<StateData | null>(null)
  const [showCounties, setShowCounties] = useState(false)
  const [viewLevel, setViewLevel] = useState<"national" | "state" | "county" | "street">("national")
  const [controlsCollapsed, setControlsCollapsed] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [forecastData, setForecastData] = useState<any>(null)

  // Complete state data with all 50 states and forecast values
  const stateData: StateData[] = [
    {
      id: "01",
      name: "Alabama",
      resilienceIndex: 65,
      riskLevel: "medium",
      population: 5024279,
      economicStability: 62,
      healthSystemCapacity: 58,
      infrastructureQuality: 60,
      emergencyResponse: 70,
      socialCohesion: 68,
      environmentalPreparedness: 55,
      forecast30: 63,
      forecast60: 61,
      forecast90: 64,
    },
    {
      id: "02",
      name: "Alaska",
      resilienceIndex: 72,
      riskLevel: "medium",
      population: 733391,
      economicStability: 75,
      healthSystemCapacity: 65,
      infrastructureQuality: 70,
      emergencyResponse: 85,
      socialCohesion: 72,
      environmentalPreparedness: 65,
      forecast30: 70,
      forecast60: 68,
      forecast90: 71,
    },
    {
      id: "04",
      name: "Arizona",
      resilienceIndex: 68,
      riskLevel: "medium",
      population: 7151502,
      economicStability: 70,
      healthSystemCapacity: 65,
      infrastructureQuality: 68,
      emergencyResponse: 72,
      socialCohesion: 65,
      environmentalPreparedness: 60,
      forecast30: 66,
      forecast60: 64,
      forecast90: 67,
    },
    {
      id: "05",
      name: "Arkansas",
      resilienceIndex: 63,
      riskLevel: "medium",
      population: 3011524,
      economicStability: 58,
      healthSystemCapacity: 60,
      infrastructureQuality: 62,
      emergencyResponse: 68,
      socialCohesion: 70,
      environmentalPreparedness: 58,
      forecast30: 61,
      forecast60: 59,
      forecast90: 62,
    },
    {
      id: "06",
      name: "California",
      resilienceIndex: 78,
      riskLevel: "high",
      population: 39538223,
      economicStability: 75,
      healthSystemCapacity: 82,
      infrastructureQuality: 75,
      emergencyResponse: 80,
      socialCohesion: 70,
      environmentalPreparedness: 85,
      forecast30: 76,
      forecast60: 74,
      forecast90: 77,
    },
    {
      id: "08",
      name: "Colorado",
      resilienceIndex: 82,
      riskLevel: "low",
      population: 5773714,
      economicStability: 85,
      healthSystemCapacity: 80,
      infrastructureQuality: 82,
      emergencyResponse: 85,
      socialCohesion: 78,
      environmentalPreparedness: 80,
      forecast30: 80,
      forecast60: 78,
      forecast90: 81,
    },
    {
      id: "09",
      name: "Connecticut",
      resilienceIndex: 85,
      riskLevel: "low",
      population: 3605944,
      economicStability: 88,
      healthSystemCapacity: 85,
      infrastructureQuality: 80,
      emergencyResponse: 82,
      socialCohesion: 85,
      environmentalPreparedness: 90,
      forecast30: 83,
      forecast60: 81,
      forecast90: 84,
    },
    {
      id: "10",
      name: "Delaware",
      resilienceIndex: 75,
      riskLevel: "low",
      population: 989948,
      economicStability: 78,
      healthSystemCapacity: 75,
      infrastructureQuality: 72,
      emergencyResponse: 75,
      socialCohesion: 80,
      environmentalPreparedness: 70,
      forecast30: 73,
      forecast60: 71,
      forecast90: 74,
    },
    {
      id: "12",
      name: "Florida",
      resilienceIndex: 70,
      riskLevel: "critical",
      population: 21538187,
      economicStability: 72,
      healthSystemCapacity: 68,
      infrastructureQuality: 65,
      emergencyResponse: 75,
      socialCohesion: 68,
      environmentalPreparedness: 72,
      forecast30: 65,
      forecast60: 62,
      forecast90: 68,
    },
    {
      id: "13",
      name: "Georgia",
      resilienceIndex: 72,
      riskLevel: "medium",
      population: 10711908,
      economicStability: 75,
      healthSystemCapacity: 70,
      infrastructureQuality: 68,
      emergencyResponse: 75,
      socialCohesion: 72,
      environmentalPreparedness: 70,
      forecast30: 70,
      forecast60: 68,
      forecast90: 71,
    },
    {
      id: "15",
      name: "Hawaii",
      resilienceIndex: 76,
      riskLevel: "medium",
      population: 1455271,
      economicStability: 70,
      healthSystemCapacity: 78,
      infrastructureQuality: 72,
      emergencyResponse: 80,
      socialCohesion: 85,
      environmentalPreparedness: 75,
      forecast30: 74,
      forecast60: 72,
      forecast90: 75,
    },
    {
      id: "16",
      name: "Idaho",
      resilienceIndex: 74,
      riskLevel: "low",
      population: 1839106,
      economicStability: 72,
      healthSystemCapacity: 70,
      infrastructureQuality: 75,
      emergencyResponse: 78,
      socialCohesion: 80,
      environmentalPreparedness: 70,
      forecast30: 72,
      forecast60: 70,
      forecast90: 73,
    },
    {
      id: "17",
      name: "Illinois",
      resilienceIndex: 75,
      riskLevel: "medium",
      population: 12812508,
      economicStability: 72,
      healthSystemCapacity: 78,
      infrastructureQuality: 70,
      emergencyResponse: 75,
      socialCohesion: 75,
      environmentalPreparedness: 80,
      forecast30: 73,
      forecast60: 71,
      forecast90: 74,
    },
    {
      id: "18",
      name: "Indiana",
      resilienceIndex: 70,
      riskLevel: "medium",
      population: 6785528,
      economicStability: 68,
      healthSystemCapacity: 70,
      infrastructureQuality: 72,
      emergencyResponse: 70,
      socialCohesion: 72,
      environmentalPreparedness: 68,
      forecast30: 68,
      forecast60: 66,
      forecast90: 69,
    },
    {
      id: "19",
      name: "Iowa",
      resilienceIndex: 78,
      riskLevel: "low",
      population: 3190369,
      economicStability: 80,
      healthSystemCapacity: 75,
      infrastructureQuality: 78,
      emergencyResponse: 80,
      socialCohesion: 82,
      environmentalPreparedness: 75,
      forecast30: 76,
      forecast60: 74,
      forecast90: 77,
    },
    {
      id: "20",
      name: "Kansas",
      resilienceIndex: 73,
      riskLevel: "medium",
      population: 2937880,
      economicStability: 70,
      healthSystemCapacity: 72,
      infrastructureQuality: 75,
      emergencyResponse: 75,
      socialCohesion: 78,
      environmentalPreparedness: 68,
      forecast30: 71,
      forecast60: 69,
      forecast90: 72,
    },
    {
      id: "21",
      name: "Kentucky",
      resilienceIndex: 68,
      riskLevel: "medium",
      population: 4505836,
      economicStability: 65,
      healthSystemCapacity: 68,
      infrastructureQuality: 70,
      emergencyResponse: 70,
      socialCohesion: 72,
      environmentalPreparedness: 65,
      forecast30: 66,
      forecast60: 64,
      forecast90: 67,
    },
    {
      id: "22",
      name: "Louisiana",
      resilienceIndex: 62,
      riskLevel: "critical",
      population: 4657757,
      economicStability: 58,
      healthSystemCapacity: 60,
      infrastructureQuality: 55,
      emergencyResponse: 70,
      socialCohesion: 65,
      environmentalPreparedness: 65,
      forecast30: 60,
      forecast60: 58,
      forecast90: 61,
    },
    {
      id: "23",
      name: "Maine",
      resilienceIndex: 80,
      riskLevel: "low",
      population: 1362359,
      economicStability: 75,
      healthSystemCapacity: 82,
      infrastructureQuality: 78,
      emergencyResponse: 80,
      socialCohesion: 85,
      environmentalPreparedness: 80,
      forecast30: 78,
      forecast60: 76,
      forecast90: 79,
    },
    {
      id: "24",
      name: "Maryland",
      resilienceIndex: 83,
      riskLevel: "low",
      population: 6177224,
      economicStability: 85,
      healthSystemCapacity: 85,
      infrastructureQuality: 80,
      emergencyResponse: 82,
      socialCohesion: 80,
      environmentalPreparedness: 85,
      forecast30: 81,
      forecast60: 79,
      forecast90: 82,
    },
    {
      id: "25",
      name: "Massachusetts",
      resilienceIndex: 88,
      riskLevel: "low",
      population: 7001399,
      economicStability: 90,
      healthSystemCapacity: 92,
      infrastructureQuality: 85,
      emergencyResponse: 88,
      socialCohesion: 85,
      environmentalPreparedness: 90,
      forecast30: 86,
      forecast60: 84,
      forecast90: 87,
    },
    {
      id: "26",
      name: "Michigan",
      resilienceIndex: 72,
      riskLevel: "medium",
      population: 10037261,
      economicStability: 68,
      healthSystemCapacity: 75,
      infrastructureQuality: 70,
      emergencyResponse: 75,
      socialCohesion: 72,
      environmentalPreparedness: 72,
      forecast30: 70,
      forecast60: 68,
      forecast90: 71,
    },
    {
      id: "27",
      name: "Minnesota",
      resilienceIndex: 85,
      riskLevel: "low",
      population: 5737915,
      economicStability: 88,
      healthSystemCapacity: 85,
      infrastructureQuality: 82,
      emergencyResponse: 85,
      socialCohesion: 88,
      environmentalPreparedness: 82,
      forecast30: 83,
      forecast60: 81,
      forecast90: 84,
    },
    {
      id: "28",
      name: "Mississippi",
      resilienceIndex: 58,
      riskLevel: "high",
      population: 2961279,
      economicStability: 52,
      healthSystemCapacity: 55,
      infrastructureQuality: 58,
      emergencyResponse: 65,
      socialCohesion: 62,
      environmentalPreparedness: 55,
      forecast30: 56,
      forecast60: 54,
      forecast90: 57,
    },
    {
      id: "29",
      name: "Missouri",
      resilienceIndex: 70,
      riskLevel: "medium",
      population: 6196010,
      economicStability: 68,
      healthSystemCapacity: 70,
      infrastructureQuality: 72,
      emergencyResponse: 72,
      socialCohesion: 70,
      environmentalPreparedness: 68,
      forecast30: 68,
      forecast60: 66,
      forecast90: 69,
    },
    {
      id: "30",
      name: "Montana",
      resilienceIndex: 75,
      riskLevel: "medium",
      population: 1084225,
      economicStability: 72,
      healthSystemCapacity: 70,
      infrastructureQuality: 78,
      emergencyResponse: 80,
      socialCohesion: 78,
      environmentalPreparedness: 72,
      forecast30: 73,
      forecast60: 71,
      forecast90: 74,
    },
    {
      id: "31",
      name: "Nebraska",
      resilienceIndex: 76,
      riskLevel: "low",
      population: 1961504,
      economicStability: 78,
      healthSystemCapacity: 75,
      infrastructureQuality: 75,
      emergencyResponse: 78,
      socialCohesion: 80,
      environmentalPreparedness: 70,
      forecast30: 74,
      forecast60: 72,
      forecast90: 75,
    },
    {
      id: "32",
      name: "Nevada",
      resilienceIndex: 68,
      riskLevel: "medium",
      population: 3104614,
      economicStability: 65,
      healthSystemCapacity: 68,
      infrastructureQuality: 70,
      emergencyResponse: 70,
      socialCohesion: 65,
      environmentalPreparedness: 70,
      forecast30: 66,
      forecast60: 64,
      forecast90: 67,
    },
    {
      id: "33",
      name: "New Hampshire",
      resilienceIndex: 82,
      riskLevel: "low",
      population: 1395231,
      economicStability: 85,
      healthSystemCapacity: 80,
      infrastructureQuality: 80,
      emergencyResponse: 82,
      socialCohesion: 85,
      environmentalPreparedness: 80,
      forecast30: 80,
      forecast60: 78,
      forecast90: 81,
    },
    {
      id: "34",
      name: "New Jersey",
      resilienceIndex: 80,
      riskLevel: "medium",
      population: 9288994,
      economicStability: 82,
      healthSystemCapacity: 82,
      infrastructureQuality: 75,
      emergencyResponse: 80,
      socialCohesion: 78,
      environmentalPreparedness: 83,
      forecast30: 78,
      forecast60: 76,
      forecast90: 79,
    },
    {
      id: "35",
      name: "New Mexico",
      resilienceIndex: 65,
      riskLevel: "medium",
      population: 2117522,
      economicStability: 60,
      healthSystemCapacity: 65,
      infrastructureQuality: 68,
      emergencyResponse: 70,
      socialCohesion: 68,
      environmentalPreparedness: 62,
      forecast30: 63,
      forecast60: 61,
      forecast90: 64,
    },
    {
      id: "36",
      name: "New York",
      resilienceIndex: 82,
      riskLevel: "medium",
      population: 20201249,
      economicStability: 80,
      healthSystemCapacity: 88,
      infrastructureQuality: 78,
      emergencyResponse: 85,
      socialCohesion: 80,
      environmentalPreparedness: 82,
      forecast30: 80,
      forecast60: 78,
      forecast90: 81,
    },
    {
      id: "37",
      name: "North Carolina",
      resilienceIndex: 73,
      riskLevel: "medium",
      population: 10439388,
      economicStability: 75,
      healthSystemCapacity: 72,
      infrastructureQuality: 70,
      emergencyResponse: 75,
      socialCohesion: 73,
      environmentalPreparedness: 73,
      forecast30: 71,
      forecast60: 69,
      forecast90: 72,
    },
    {
      id: "38",
      name: "North Dakota",
      resilienceIndex: 78,
      riskLevel: "low",
      population: 779094,
      economicStability: 85,
      healthSystemCapacity: 72,
      infrastructureQuality: 78,
      emergencyResponse: 80,
      socialCohesion: 75,
      environmentalPreparedness: 78,
      forecast30: 76,
      forecast60: 74,
      forecast90: 77,
    },
    {
      id: "39",
      name: "Ohio",
      resilienceIndex: 73,
      riskLevel: "medium",
      population: 11799448,
      economicStability: 70,
      healthSystemCapacity: 75,
      infrastructureQuality: 72,
      emergencyResponse: 75,
      socialCohesion: 73,
      environmentalPreparedness: 73,
      forecast30: 71,
      forecast60: 69,
      forecast90: 72,
    },
    {
      id: "40",
      name: "Oklahoma",
      resilienceIndex: 68,
      riskLevel: "high",
      population: 3959353,
      economicStability: 65,
      healthSystemCapacity: 68,
      infrastructureQuality: 70,
      emergencyResponse: 72,
      socialCohesion: 68,
      environmentalPreparedness: 65,
      forecast30: 66,
      forecast60: 64,
      forecast90: 67,
    },
    {
      id: "41",
      name: "Oregon",
      resilienceIndex: 78,
      riskLevel: "medium",
      population: 4237256,
      economicStability: 75,
      healthSystemCapacity: 80,
      infrastructureQuality: 78,
      emergencyResponse: 78,
      socialCohesion: 80,
      environmentalPreparedness: 77,
      forecast30: 76,
      forecast60: 74,
      forecast90: 77,
    },
    {
      id: "42",
      name: "Pennsylvania",
      resilienceIndex: 75,
      riskLevel: "medium",
      population: 13002700,
      economicStability: 72,
      healthSystemCapacity: 78,
      infrastructureQuality: 73,
      emergencyResponse: 75,
      socialCohesion: 75,
      environmentalPreparedness: 77,
      forecast30: 73,
      forecast60: 71,
      forecast90: 74,
    },
    {
      id: "44",
      name: "Rhode Island",
      resilienceIndex: 78,
      riskLevel: "low",
      population: 1097379,
      economicStability: 75,
      healthSystemCapacity: 82,
      infrastructureQuality: 75,
      emergencyResponse: 78,
      socialCohesion: 80,
      environmentalPreparedness: 78,
      forecast30: 76,
      forecast60: 74,
      forecast90: 77,
    },
    {
      id: "45",
      name: "South Carolina",
      resilienceIndex: 68,
      riskLevel: "high",
      population: 5118425,
      economicStability: 65,
      healthSystemCapacity: 68,
      infrastructureQuality: 70,
      emergencyResponse: 70,
      socialCohesion: 70,
      environmentalPreparedness: 67,
      forecast30: 66,
      forecast60: 64,
      forecast90: 67,
    },
    {
      id: "46",
      name: "South Dakota",
      resilienceIndex: 75,
      riskLevel: "low",
      population: 886667,
      economicStability: 78,
      healthSystemCapacity: 72,
      infrastructureQuality: 75,
      emergencyResponse: 78,
      socialCohesion: 78,
      environmentalPreparedness: 73,
      forecast30: 73,
      forecast60: 71,
      forecast90: 74,
    },
    {
      id: "47",
      name: "Tennessee",
      resilienceIndex: 70,
      riskLevel: "medium",
      population: 6910840,
      economicStability: 68,
      healthSystemCapacity: 70,
      infrastructureQuality: 72,
      emergencyResponse: 72,
      socialCohesion: 70,
      environmentalPreparedness: 68,
      forecast30: 68,
      forecast60: 66,
      forecast90: 69,
    },
    {
      id: "48",
      name: "Texas",
      resilienceIndex: 72,
      riskLevel: "high",
      population: 29145505,
      economicStability: 75,
      healthSystemCapacity: 70,
      infrastructureQuality: 68,
      emergencyResponse: 75,
      socialCohesion: 70,
      environmentalPreparedness: 74,
      forecast30: 70,
      forecast60: 68,
      forecast90: 73,
    },
    {
      id: "49",
      name: "Utah",
      resilienceIndex: 80,
      riskLevel: "low",
      population: 3271616,
      economicStability: 82,
      healthSystemCapacity: 78,
      infrastructureQuality: 80,
      emergencyResponse: 82,
      socialCohesion: 85,
      environmentalPreparedness: 73,
      forecast30: 78,
      forecast60: 76,
      forecast90: 79,
    },
    {
      id: "50",
      name: "Vermont",
      resilienceIndex: 83,
      riskLevel: "low",
      population: 643077,
      economicStability: 80,
      healthSystemCapacity: 85,
      infrastructureQuality: 82,
      emergencyResponse: 85,
      socialCohesion: 88,
      environmentalPreparedness: 80,
      forecast30: 81,
      forecast60: 79,
      forecast90: 82,
    },
    {
      id: "51",
      name: "Virginia",
      resilienceIndex: 78,
      riskLevel: "low",
      population: 8631393,
      economicStability: 80,
      healthSystemCapacity: 78,
      infrastructureQuality: 75,
      emergencyResponse: 80,
      socialCohesion: 78,
      environmentalPreparedness: 79,
      forecast30: 76,
      forecast60: 74,
      forecast90: 77,
    },
    {
      id: "53",
      name: "Washington",
      resilienceIndex: 82,
      riskLevel: "medium",
      population: 7705281,
      economicStability: 85,
      healthSystemCapacity: 82,
      infrastructureQuality: 80,
      emergencyResponse: 82,
      socialCohesion: 80,
      environmentalPreparedness: 83,
      forecast30: 80,
      forecast60: 78,
      forecast90: 81,
    },
    {
      id: "54",
      name: "West Virginia",
      resilienceIndex: 65,
      riskLevel: "medium",
      population: 1793716,
      economicStability: 58,
      healthSystemCapacity: 68,
      infrastructureQuality: 68,
      emergencyResponse: 70,
      socialCohesion: 70,
      environmentalPreparedness: 66,
      forecast30: 63,
      forecast60: 61,
      forecast90: 64,
    },
    {
      id: "55",
      name: "Wisconsin",
      resilienceIndex: 78,
      riskLevel: "low",
      population: 5893718,
      economicStability: 80,
      healthSystemCapacity: 78,
      infrastructureQuality: 78,
      emergencyResponse: 78,
      socialCohesion: 80,
      environmentalPreparedness: 76,
      forecast30: 76,
      forecast60: 74,
      forecast90: 77,
    },
    {
      id: "56",
      name: "Wyoming",
      resilienceIndex: 73,
      riskLevel: "low",
      population: 576851,
      economicStability: 75,
      healthSystemCapacity: 68,
      infrastructureQuality: 75,
      emergencyResponse: 78,
      socialCohesion: 75,
      environmentalPreparedness: 71,
      forecast30: 71,
      forecast60: 69,
      forecast90: 72,
    },
  ]

  const filterOptions = [
    { id: "health", label: "Health System", icon: Shield },
    { id: "economic", label: "Economic Stability", icon: TrendingUp },
    { id: "infrastructure", label: "Infrastructure", icon: Activity },
    { id: "population", label: "Population Vulnerability", icon: Users },
  ]

  const getStateValue = (state: StateData): number => {
    let baseValue: number

    // Get base value based on time point
    switch (timePoint) {
      case "forecast30":
        baseValue = state.forecast30 || state.resilienceIndex
        break
      case "forecast60":
        baseValue = state.forecast60 || state.resilienceIndex
        break
      case "forecast90":
        baseValue = state.forecast90 || state.resilienceIndex
        break
      case "historical":
        baseValue = state.resilienceIndex - 2 // Mock historical data
        break
      default:
        baseValue = state.resilienceIndex
    }

    // Apply layer-specific logic
    switch (heatMapLayer) {
      case "resilience":
        return baseValue
      case "risk":
        const riskValues = { low: 25, medium: 50, high: 75, critical: 100 }
        return riskValues[state.riskLevel]
      case "population":
        return Math.log10(state.population) * 10
      case "economic":
        return state.economicStability
      default:
        return baseValue
    }
  }

  const getStateColor = (state: StateData): string => {
    const value = getStateValue(state)
    let colorScale

    // Enhanced color schemes for better readability
    switch (heatMapLayer) {
      case "resilience":
        if (timePoint.startsWith("forecast")) {
          // Lighter, more muted colors for forecasts
          colorScale = scaleLinear<string>()
            .domain([0, 30, 50, 70, 85, 100])
            .range(["#7f1d1d", "#dc2626", "#f59e0b", "#10b981", "#059669", "#047857"])
        } else {
          colorScale = scaleLinear<string>()
            .domain([0, 30, 50, 70, 85, 100])
            .range(["#991b1b", "#dc2626", "#f59e0b", "#10b981", "#059669", "#047857"])
        }
        break
      case "risk":
        colorScale = scaleLinear<string>()
          .domain([0, 25, 50, 75, 100])
          .range(["#047857", "#10b981", "#f59e0b", "#dc2626", "#991b1b"])
        break
      case "population":
        colorScale = scaleLinear<string>()
          .domain([0, 20, 40, 60, 80])
          .range(["#1e293b", "#334155", "#64748b", "#94a3b8", "#e2e8f0"])
        break
      case "economic":
        colorScale = scaleLinear<string>()
          .domain([0, 30, 50, 70, 85, 100])
          .range(["#991b1b", "#dc2626", "#f59e0b", "#10b981", "#059669", "#047857"])
        break
      default:
        colorScale = scaleLinear<string>()
          .domain([0, 30, 50, 70, 85, 100])
          .range(["#991b1b", "#dc2626", "#f59e0b", "#10b981", "#059669", "#047857"])
    }

    return colorScale(value)
  }

  const handleStateClick = (geo: any) => {
    const state = stateData.find((s) => s.id === geo.id)
    if (state) {
      onStateSelect?.(state)
      setPosition({
        coordinates: [-96, 40],
        zoom: 4,
      })
      setViewLevel("state")
      setShowCounties(true)
      const stateCode = state.name.toLowerCase().replace(/\s+/g, "-")
      router.push(`/state/${stateCode}`)
    }
  }

  const handleStateHover = (geo: any) => {
    const state = stateData.find((s) => s.id === geo.id)
    setHoveredState(state || null)
  }

  const handleTimeChange = (newTimePoint: string) => {
    onTimePointChange?.(newTimePoint)
  }

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => (prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]))
  }

  const handleZoomIn = () => {
    const newZoom = Math.min(position.zoom * 1.5, 8)
    setPosition((prev) => ({ ...prev, zoom: newZoom }))
    if (newZoom > 4) {
      setShowCounties(true)
      setViewLevel("county")
    } else if (newZoom > 2) {
      setViewLevel("state")
    }
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(position.zoom / 1.5, 1)
    setPosition((prev) => ({ ...prev, zoom: newZoom }))
    if (newZoom <= 2) {
      setViewLevel("national")
      setShowCounties(false)
    } else if (newZoom <= 4) {
      setViewLevel("state")
    }
  }

  const handleReset = () => {
    setPosition({ coordinates: [-96, 40], zoom: 1 })
    setSearchQuery("")
    setHoveredState(null)
    setViewLevel("national")
    setShowCounties(false)
    onStateSelect?.(null)
  }

  // Load forecast data
  useEffect(() => {
    const loadForecastData = async () => {
      try {
        const response = await fetch("/api/predictive-data?level=national")
        const data = await response.json()
        setForecastData(data.forecast)
      } catch (error) {
        console.error("Failed to load forecast data:", error)
      }
    }
    loadForecastData()
  }, [])

  return (
    <div className="relative w-full h-[700px] bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700/50">
      {/* Top Controls Bar - Repositioned to not overlap */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        {/* Search */}
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search states..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 bg-slate-900/90 border-slate-600 text-white placeholder-gray-400"
          />
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Zoom and Filter Controls */}
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-slate-600 text-gray-300 hover:text-white"
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </Button>
          <Button size="sm" onClick={handleZoomIn} className="bg-slate-700/90 hover:bg-slate-600">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleZoomOut} className="bg-slate-700/90 hover:bg-slate-600">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleReset} className="bg-slate-700/90 hover:bg-slate-600">
            <Home className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Collapsible Left Side Controls - Repositioned and made smaller */}
      <div className={`absolute top-16 left-4 z-20 transition-all duration-300 ${controlsCollapsed ? "w-12" : "w-72"}`}>
        {/* Timeline Slider - Only show when expanded */}
        {!controlsCollapsed && (
          <div className="mb-4">
            <TimelineSlider onTimeChange={handleTimeChange} currentTime={timePoint} forecastData={forecastData} />
          </div>
        )}

        {/* Heat Map Layer Controls */}
        <Card className="bg-slate-900/95 backdrop-blur-sm border-slate-600">
          <CardHeader className="p-3">
            <div className="flex items-center justify-between">
              {!controlsCollapsed && (
                <CardTitle className="text-white flex items-center text-sm">
                  <Layers className="w-4 h-4 mr-2" />
                  Heat Map Layer
                  {timePoint.startsWith("forecast") && (
                    <Badge className="ml-2 bg-orange-500 text-white text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      AI
                    </Badge>
                  )}
                </CardTitle>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setControlsCollapsed(!controlsCollapsed)}
                className="text-gray-400 hover:text-white h-6 w-6 p-0"
              >
                {controlsCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
              </Button>
            </div>
          </CardHeader>

          <AnimatePresence>
            {!controlsCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <CardContent className="p-3 pt-0 space-y-3">
                  {/* Layer Selection */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={heatMapLayer === "resilience" ? "default" : "outline"}
                      onClick={() => setHeatMapLayer("resilience")}
                      className="text-xs justify-start h-8"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Resilience
                    </Button>
                    <Button
                      size="sm"
                      variant={heatMapLayer === "risk" ? "default" : "outline"}
                      onClick={() => setHeatMapLayer("risk")}
                      className="text-xs justify-start h-8"
                    >
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Risk
                    </Button>
                    <Button
                      size="sm"
                      variant={heatMapLayer === "population" ? "default" : "outline"}
                      onClick={() => setHeatMapLayer("population")}
                      className="text-xs justify-start h-8"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Population
                    </Button>
                    <Button
                      size="sm"
                      variant={heatMapLayer === "economic" ? "default" : "outline"}
                      onClick={() => setHeatMapLayer("economic")}
                      className="text-xs justify-start h-8"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Economic
                    </Button>
                  </div>

                  {/* Opacity Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-300">Opacity</label>
                      <span className="text-xs text-gray-400">{Math.round(heatMapOpacity[0] * 100)}%</span>
                    </div>
                    <Slider
                      value={heatMapOpacity}
                      onValueChange={setHeatMapOpacity}
                      max={1}
                      min={0.3}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Show Labels Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-300">Show State Labels</label>
                    <Switch checked={showLabels} onCheckedChange={setShowLabels} />
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Dynamic Filters - Only show when filters are enabled and controls not collapsed */}
        <AnimatePresence>
          {showFilters && !controlsCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-4"
            >
              <Card className="bg-slate-900/95 backdrop-blur-sm border-slate-600">
                <CardHeader className="p-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Risk Type Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-2">
                    {filterOptions.map((filter) => {
                      const IconComponent = filter.icon
                      const isActive = activeFilters.includes(filter.id)
                      return (
                        <Button
                          key={filter.id}
                          size="sm"
                          variant={isActive ? "default" : "outline"}
                          onClick={() => toggleFilter(filter.id)}
                          className="w-full justify-start text-xs h-8"
                        >
                          <IconComponent className="w-3 h-3 mr-2" />
                          {filter.label}
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Container - Adjusted to avoid overlap */}
      <div className="w-full h-full" style={{ paddingTop: "60px" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={975}
          height={550}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={setPosition}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const state = stateData.find((s) => s.id === geo.id)
                  if (!state) return null

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getStateColor(state)}
                      stroke="#1e293b"
                      strokeWidth={selectedState?.id === state.id ? 2 : 0.5}
                      opacity={heatMapOpacity[0]}
                      style={{
                        default: {
                          outline: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease-in-out",
                        },
                        hover: {
                          outline: "none",
                          filter: "brightness(1.3) saturate(1.2)",
                          cursor: "pointer",
                          stroke: "#22d3ee",
                          strokeWidth: 2,
                        },
                        pressed: {
                          outline: "none",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => handleStateClick(geo)}
                      onMouseEnter={() => handleStateHover(geo)}
                      onMouseLeave={() => setHoveredState(null)}
                    />
                  )
                })
              }
            </Geographies>

            {/* Counties */}
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
                      opacity={0.6}
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
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Enhanced Legend - Bottom Right */}
      <div className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl border border-slate-700 max-w-xs">
        <h4 className="font-semibold mb-2 text-sm flex items-center">
          <BarChart3 className="w-4 h-4 mr-2" />
          {heatMapLayer === "resilience" && "Resilience Index"}
          {heatMapLayer === "risk" && "Risk Level"}
          {heatMapLayer === "population" && "Population Density"}
          {heatMapLayer === "economic" && "Economic Stability"}
          {timePoint.startsWith("forecast") && (
            <Badge className="ml-2 bg-orange-500 text-white text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Forecast
            </Badge>
          )}
        </h4>
        <div className="space-y-1.5 text-xs">
          {/* Legend items based on current layer */}
          {heatMapLayer === "resilience" && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-red-800 rounded border border-red-600"></div>
                <span>Critical (0-30)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-red-600 rounded border border-red-500"></div>
                <span>Low (30-50)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-amber-500 rounded border border-amber-400"></div>
                <span>Moderate (50-70)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-emerald-500 rounded border border-emerald-400"></div>
                <span>Good (70-85)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-emerald-600 rounded border border-emerald-500"></div>
                <span>Excellent (85+)</span>
              </div>
            </>
          )}
          {heatMapLayer === "risk" && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-emerald-600 rounded border border-emerald-500"></div>
                <span>Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-emerald-500 rounded border border-emerald-400"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-amber-500 rounded border border-amber-400"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-red-600 rounded border border-red-500"></div>
                <span>Critical Risk</span>
              </div>
            </>
          )}
          {heatMapLayer === "population" && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-slate-700 rounded border border-slate-600"></div>
                <span>Low Density</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-slate-500 rounded border border-slate-400"></div>
                <span>Medium Density</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-slate-300 rounded border border-slate-200"></div>
                <span>High Density</span>
              </div>
            </>
          )}
          {heatMapLayer === "economic" && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-red-600 rounded border border-red-500"></div>
                <span>Unstable (0-50)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-amber-500 rounded border border-amber-400"></div>
                <span>Moderate (50-75)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-emerald-500 rounded border border-emerald-400"></div>
                <span>Stable (75+)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Hover Tooltip */}
      <AnimatePresence>
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-sm text-white p-4 rounded-lg border border-slate-700 z-10 pointer-events-none max-w-sm shadow-2xl"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h3 className="font-bold text-lg">{hoveredState.name}</h3>
                <Badge
                  className={`${
                    hoveredState.riskLevel === "low"
                      ? "bg-green-500"
                      : hoveredState.riskLevel === "medium"
                        ? "bg-yellow-500"
                        : hoveredState.riskLevel === "high"
                          ? "bg-orange-500"
                          : "bg-red-500"
                  } text-white text-xs`}
                >
                  {hoveredState.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-400">Current Index</div>
                  <div className="font-bold text-cyan-400">{hoveredState.resilienceIndex}</div>
                </div>
                <div>
                  <div className="text-gray-400">30-Day Forecast</div>
                  <div className="font-bold text-orange-400">{hoveredState.forecast30 || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-400">Population</div>
                  <div className="font-bold text-white">{hoveredState.population.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400">Economic</div>
                  <div className="font-bold text-green-400">{hoveredState.economicStability}</div>
                </div>
              </div>
              <div className="text-xs text-blue-400 mt-3 flex items-center justify-center">
                <Navigation className="w-3 h-3 mr-1" />
                Click for detailed analysis and AI insights →
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Level Indicator - Bottom Left */}
      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-slate-700">
        <div className="text-xs">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3 h-3" />
            <span>National Overview</span>
            {timePoint.startsWith("forecast") && (
              <Badge className="bg-orange-500 text-white text-xs">AI Forecast</Badge>
            )}
          </div>
          <div className="text-gray-400">
            Zoom: {position.zoom.toFixed(1)}x • {viewLevel} view
          </div>
        </div>
      </div>
    </div>
  )
}
