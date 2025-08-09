"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Thermometer, Droplets, Heart, Utensils, Home, Users, AlertTriangle, Eye, EyeOff } from "lucide-react"

interface HeatMapControlsProps {
  activeLayer: string
  onLayerChange: (layer: string) => void
  opacity: number
  onOpacityChange: (opacity: number) => void
  showHeatMap: boolean
  onToggleHeatMap: (show: boolean) => void
}

export default function HeatMapControls({
  activeLayer,
  onLayerChange,
  opacity,
  onOpacityChange,
  showHeatMap,
  onToggleHeatMap,
}: HeatMapControlsProps) {
  const heatMapLayers = [
    {
      id: "vulnerability",
      name: "Vulnerability Index",
      description: "Overall household vulnerability score",
      icon: AlertTriangle,
      color: "text-red-400",
      gradient: "from-green-500 to-red-500",
    },
    {
      id: "health",
      name: "Health Risk",
      description: "Medical needs and health vulnerabilities",
      icon: Heart,
      color: "text-pink-400",
      gradient: "from-blue-500 to-pink-500",
    },
    {
      id: "food_security",
      name: "Food Security",
      description: "Food access and nutritional needs",
      icon: Utensils,
      color: "text-orange-400",
      gradient: "from-green-500 to-orange-500",
    },
    {
      id: "water_access",
      name: "Water Access",
      description: "Clean water availability and quality",
      icon: Droplets,
      color: "text-blue-400",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "housing",
      name: "Housing Stability",
      description: "Housing conditions and stability",
      icon: Home,
      color: "text-purple-400",
      gradient: "from-green-500 to-purple-500",
    },
    {
      id: "social",
      name: "Social Support",
      description: "Community connections and support networks",
      icon: Users,
      color: "text-green-400",
      gradient: "from-red-500 to-green-500",
    },
  ]

  return (
    <Card className="bg-slate-800/95 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-orange-400" />
            <span>Heat Map Controls</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onToggleHeatMap(!showHeatMap)}
              className={`border-slate-600 ${showHeatMap ? "bg-blue-600 text-white" : "text-gray-300 bg-transparent"}`}
            >
              {showHeatMap ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Layer Selection */}
        <div>
          <div className="text-sm text-gray-400 mb-3">Data Layer</div>
          <div className="grid grid-cols-1 gap-2">
            {heatMapLayers.map((layer) => {
              const IconComponent = layer.icon
              return (
                <motion.button
                  key={layer.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onLayerChange(layer.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    activeLayer === layer.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-5 h-5 ${layer.color}`} />
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{layer.name}</div>
                      <div className="text-gray-400 text-xs">{layer.description}</div>
                    </div>
                    {activeLayer === layer.id && (
                      <Badge variant="outline" className="border-blue-500 text-blue-400">
                        Active
                      </Badge>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Opacity Control */}
        {showHeatMap && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Heat Map Opacity</span>
              <span className="text-sm text-white">{Math.round(opacity * 100)}%</span>
            </div>
            <Slider
              value={[opacity * 100]}
              onValueChange={(value) => onOpacityChange(value[0] / 100)}
              max={100}
              min={10}
              step={10}
              className="w-full"
            />
          </div>
        )}

        {/* Legend */}
        {showHeatMap && (
          <div>
            <div className="text-sm text-gray-400 mb-2">Intensity Scale</div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Low</span>
              <div
                className={`h-3 flex-1 rounded-full bg-gradient-to-r ${
                  heatMapLayers.find((l) => l.id === activeLayer)?.gradient || "from-green-500 to-red-500"
                }`}
              />
              <span className="text-xs text-gray-500">High</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
