"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Droplets,
  Utensils,
  Pill,
  Zap,
  Shield,
  Brain,
  BarChart3,
  Calendar,
  Target,
  Activity,
} from "lucide-react"

interface SupplyItem {
  id: string
  name: string
  category: "food" | "water" | "medical" | "power" | "emergency"
  currentStock: number
  optimalStock: number
  criticalLevel: number
  demandForecast: number[]
  lastRestocked: string
  supplier: string
  leadTime: number
  cost: number
  trend: "increasing" | "decreasing" | "stable"
}

interface Forecast {
  item: string
  category: string
  currentDemand: number
  predictedDemand: number
  confidence: number
  timeframe: string
  factors: string[]
}

export default function SupplyChainDashboard() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [forecastData, setForecastData] = useState<Forecast[]>([])

  const supplyItems: SupplyItem[] = [
    {
      id: "food-001",
      name: "Emergency Food Kits",
      category: "food",
      currentStock: 245,
      optimalStock: 500,
      criticalLevel: 100,
      demandForecast: [180, 220, 280, 320, 290, 250, 200],
      lastRestocked: "2024-01-10T10:00:00Z",
      supplier: "Community Food Bank",
      leadTime: 3,
      cost: 25.5,
      trend: "increasing",
    },
    {
      id: "water-001",
      name: "Water Purification Tablets",
      category: "water",
      currentStock: 89,
      optimalStock: 200,
      criticalLevel: 50,
      demandForecast: [45, 60, 85, 120, 95, 70, 55],
      lastRestocked: "2024-01-08T14:30:00Z",
      supplier: "Emergency Supply Co",
      leadTime: 5,
      cost: 12.75,
      trend: "increasing",
    },
    {
      id: "medical-001",
      name: "First Aid Supplies",
      category: "medical",
      currentStock: 156,
      optimalStock: 300,
      criticalLevel: 75,
      demandForecast: [90, 110, 130, 150, 140, 120, 100],
      lastRestocked: "2024-01-12T09:15:00Z",
      supplier: "Medical Supply Partners",
      leadTime: 2,
      cost: 45.0,
      trend: "stable",
    },
    {
      id: "power-001",
      name: "Portable Generators",
      category: "power",
      currentStock: 12,
      optimalStock: 25,
      criticalLevel: 5,
      demandForecast: [8, 12, 18, 22, 15, 10, 8],
      lastRestocked: "2024-01-05T16:45:00Z",
      supplier: "Power Solutions Inc",
      leadTime: 7,
      cost: 450.0,
      trend: "decreasing",
    },
    {
      id: "medical-002",
      name: "Prescription Medications",
      category: "medical",
      currentStock: 78,
      optimalStock: 150,
      criticalLevel: 30,
      demandForecast: [65, 80, 95, 110, 100, 85, 70],
      lastRestocked: "2024-01-14T11:20:00Z",
      supplier: "Pharmacy Network",
      leadTime: 1,
      cost: 125.0,
      trend: "increasing",
    },
    {
      id: "emergency-001",
      name: "Emergency Blankets",
      category: "emergency",
      currentStock: 320,
      optimalStock: 400,
      criticalLevel: 100,
      demandForecast: [150, 180, 220, 280, 250, 200, 160],
      lastRestocked: "2024-01-11T13:00:00Z",
      supplier: "Emergency Supplies LLC",
      leadTime: 4,
      cost: 8.5,
      trend: "stable",
    },
  ]

  const mockForecasts: Forecast[] = [
    {
      item: "Emergency Food Kits",
      category: "food",
      currentDemand: 180,
      predictedDemand: 320,
      confidence: 87,
      timeframe: "Next 30 days",
      factors: ["Weather forecast", "Population density", "Historical patterns"],
    },
    {
      item: "Water Purification Tablets",
      category: "water",
      currentDemand: 45,
      predictedDemand: 120,
      confidence: 92,
      timeframe: "Next 30 days",
      factors: ["Infrastructure alerts", "Seasonal patterns", "Emergency predictions"],
    },
    {
      item: "Prescription Medications",
      category: "medical",
      currentDemand: 65,
      predictedDemand: 110,
      confidence: 78,
      timeframe: "Next 30 days",
      factors: ["Health system capacity", "Chronic conditions", "Supply chain disruptions"],
    },
  ]

  useEffect(() => {
    setForecastData(mockForecasts)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Utensils className="w-4 h-4" />
      case "water":
        return <Droplets className="w-4 h-4" />
      case "medical":
        return <Pill className="w-4 h-4" />
      case "power":
        return <Zap className="w-4 h-4" />
      case "emergency":
        return <Shield className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food":
        return "bg-green-500"
      case "water":
        return "bg-blue-500"
      case "medical":
        return "bg-red-500"
      case "power":
        return "bg-yellow-500"
      case "emergency":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStockLevel = (item: SupplyItem): "critical" | "low" | "optimal" | "overstocked" => {
    const percentage = (item.currentStock / item.optimalStock) * 100
    if (item.currentStock <= item.criticalLevel) return "critical"
    if (percentage < 50) return "low"
    if (percentage <= 100) return "optimal"
    return "overstocked"
  }

  const getStockLevelColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-400 bg-red-500/20"
      case "low":
        return "text-orange-400 bg-orange-500/20"
      case "optimal":
        return "text-green-400 bg-green-500/20"
      case "overstocked":
        return "text-blue-400 bg-blue-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-3 h-3 text-red-400" />
      case "decreasing":
        return <TrendingDown className="w-3 h-3 text-green-400" />
      case "stable":
        return <Activity className="w-3 h-3 text-gray-400" />
      default:
        return <Activity className="w-3 h-3 text-gray-400" />
    }
  }

  const filteredItems =
    selectedCategory === "all" ? supplyItems : supplyItems.filter((item) => item.category === selectedCategory)

  const inventoryStats = {
    totalItems: supplyItems.length,
    criticalItems: supplyItems.filter((item) => getStockLevel(item) === "critical").length,
    lowItems: supplyItems.filter((item) => getStockLevel(item) === "low").length,
    optimalItems: supplyItems.filter((item) => getStockLevel(item) === "optimal").length,
    totalValue: supplyItems.reduce((sum, item) => sum + item.currentStock * item.cost, 0),
    avgLeadTime: Math.round(supplyItems.reduce((sum, item) => sum + item.leadTime, 0) / supplyItems.length),
  }

  const categories = [
    { id: "all", label: "All Categories", count: supplyItems.length },
    { id: "food", label: "Food", count: supplyItems.filter((i) => i.category === "food").length },
    { id: "water", label: "Water", count: supplyItems.filter((i) => i.category === "water").length },
    { id: "medical", label: "Medical", count: supplyItems.filter((i) => i.category === "medical").length },
    { id: "power", label: "Power", count: supplyItems.filter((i) => i.category === "power").length },
    { id: "emergency", label: "Emergency", count: supplyItems.filter((i) => i.category === "emergency").length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Truck className="w-6 h-6 mr-3 text-blue-400" />
              Supply Chain Readiness Dashboard
            </div>
            <div className="flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Package className="w-4 h-4 mr-2" />
                Restock Alert
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Brain className="w-4 h-4 mr-2" />
                AI Forecast
              </Button>
            </div>
          </CardTitle>
          <div className="text-sm text-gray-400">
            AI-powered demand forecasting • Real-time inventory tracking • Automated restock alerts
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Package className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-blue-400">{inventoryStats.totalItems}</div>
            <div className="text-xs text-gray-400">Total Items</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-red-400">{inventoryStats.criticalItems}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingDown className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-orange-400">{inventoryStats.lowItems}</div>
            <div className="text-xs text-gray-400">Low Stock</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-400">{inventoryStats.optimalItems}</div>
            <div className="text-xs text-gray-400">Optimal</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-purple-400">{inventoryStats.avgLeadTime}</div>
            <div className="text-xs text-gray-400">Avg Lead Time</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-cyan-400">${(inventoryStats.totalValue / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-400">Total Value</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="inventory" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>AI Forecasting</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-6">
          <div className="space-y-4">
            {/* Category Filter */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center space-x-2"
                    >
                      {category.id !== "all" && getCategoryIcon(category.id)}
                      <span>{category.label}</span>
                      <Badge className="bg-blue-500 text-white">{category.count}</Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const stockLevel = getStockLevel(item)
                const stockPercentage = (item.currentStock / item.optimalStock) * 100

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                              {getCategoryIcon(item.category)}
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">{item.name}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={`${getStockLevelColor(stockLevel)} border-0 text-xs`}>
                                  {stockLevel.toUpperCase()}
                                </Badge>
                                {getTrendIcon(item.trend)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Stock Level */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Current Stock</span>
                            <span className="text-white font-bold">
                              {item.currentStock} / {item.optimalStock}
                            </span>
                          </div>
                          <Progress value={stockPercentage} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Critical: {item.criticalLevel}</span>
                            <span>{Math.round(stockPercentage)}%</span>
                          </div>
                        </div>

                        {/* Demand Forecast Mini Chart */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-white">7-Day Demand Forecast</h4>
                          <div className="flex items-end space-x-1 h-16">
                            {item.demandForecast.map((demand, index) => {
                              const maxDemand = Math.max(...item.demandForecast)
                              const height = (demand / maxDemand) * 100
                              return (
                                <div
                                  key={index}
                                  className="flex-1 bg-blue-500 rounded-t"
                                  style={{ height: `${height}%` }}
                                  title={`Day ${index + 1}: ${demand} units`}
                                />
                              )
                            })}
                          </div>
                          <div className="text-xs text-gray-400 text-center">
                            Peak demand: {Math.max(...item.demandForecast)} units
                          </div>
                        </div>

                        {/* Supply Details */}
                        <div className="space-y-2 pt-2 border-t border-slate-600 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Supplier:</span>
                            <span className="text-white">{item.supplier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Lead Time:</span>
                            <span className="text-white">{item.leadTime} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Unit Cost:</span>
                            <span className="text-white">${item.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Restocked:</span>
                            <span className="text-white">{new Date(item.lastRestocked).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button
                            size="sm"
                            className={`flex-1 ${
                              stockLevel === "critical" || stockLevel === "low"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            <Package className="w-3 h-3 mr-1" />
                            {stockLevel === "critical" || stockLevel === "low" ? "Urgent Restock" : "Restock"}
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                            <BarChart3 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="mt-6">
          <div className="space-y-6">
            {/* AI Forecasting Header */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  AI-Powered Demand Forecasting
                  <Badge className="ml-3 bg-purple-500 text-white">Machine Learning</Badge>
                </CardTitle>
                <div className="text-sm text-gray-300">
                  Predictive analytics using weather patterns, population data, and historical consumption
                </div>
              </CardHeader>
            </Card>

            {/* Forecast Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {forecastData.map((forecast, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${getCategoryColor(forecast.category)}`}>
                            {getCategoryIcon(forecast.category)}
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">{forecast.item}</CardTitle>
                            <div className="text-sm text-gray-400">{forecast.timeframe}</div>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">{forecast.confidence}% Confidence</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Demand Comparison */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Current Demand</span>
                          <span className="text-white font-bold">{forecast.currentDemand} units</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Predicted Demand</span>
                          <span className="text-orange-400 font-bold">{forecast.predictedDemand} units</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Change</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-bold">
                              +
                              {Math.round(
                                ((forecast.predictedDemand - forecast.currentDemand) / forecast.currentDemand) * 100,
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Influencing Factors */}
                      <div className="pt-3 border-t border-slate-600">
                        <h4 className="text-sm font-medium text-white mb-2">Key Factors</h4>
                        <div className="space-y-1">
                          {forecast.factors.map((factor, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-gray-300">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-700/50">
                        <div className="flex items-center mb-1">
                          <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                          <span className="text-sm font-medium text-orange-400">AI Recommendation</span>
                        </div>
                        <p className="text-xs text-gray-300">
                          Increase stock by {forecast.predictedDemand - forecast.currentDemand} units within
                          {Math.ceil(forecast.predictedDemand / 50)} days to meet predicted demand surge.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Scenario Planning */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  "What If" Scenario Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Scenario: 10% Resource Increase</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Food Security Improvement</span>
                        <span className="text-green-400 font-bold">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Water Access Improvement</span>
                        <span className="text-green-400 font-bold">+12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Medical Supply Coverage</span>
                        <span className="text-green-400 font-bold">+8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Overall Vulnerability Reduction</span>
                        <span className="text-green-400 font-bold">-11%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Cost-Benefit Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Additional Investment</span>
                        <span className="text-white font-bold">$125,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Households Served</span>
                        <span className="text-blue-400 font-bold">+340</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cost per Household</span>
                        <span className="text-white font-bold">$368</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">ROI (Crisis Avoidance)</span>
                        <span className="text-green-400 font-bold">285%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <div className="space-y-4">
            {/* Critical Alerts */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Critical Supply Alerts
                  <Badge className="ml-3 bg-red-500 text-white">{inventoryStats.criticalItems} Critical</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supplyItems
                    .filter((item) => getStockLevel(item) === "critical")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-700/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                            {getCategoryIcon(item.category)}
                          </div>
                          <div>
                            <div className="font-medium text-white">{item.name}</div>
                            <div className="text-sm text-gray-300">
                              Only {item.currentStock} units remaining (Critical: {item.criticalLevel})
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Package className="w-3 h-3 mr-1" />
                            Emergency Restock
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                            <MapPin className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Shortages */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                  Predicted Shortages (Next 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {forecastData.map((forecast, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(forecast.category)}`}>
                          {getCategoryIcon(forecast.category)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{forecast.item}</div>
                          <div className="text-sm text-gray-300">
                            Demand surge predicted: {forecast.predictedDemand} units ({forecast.confidence}% confidence)
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          Schedule Restock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
