"use client"

import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, TrendingUp, Shield, Target, Calculator, PieChartIcon } from "lucide-react"

export default function ResilienceROI() {
  const roiData = [
    { year: 2020, investment: 5.2, savings: 2.1, roi: 40 },
    { year: 2021, investment: 8.7, savings: 4.8, roi: 55 },
    { year: 2022, investment: 12.3, savings: 8.9, roi: 72 },
    { year: 2023, investment: 15.8, savings: 14.2, roi: 90 },
    { year: 2024, investment: 18.5, savings: 22.1, roi: 119 },
  ]

  const investmentBreakdown = [
    { name: "Infrastructure", value: 45, amount: 8.3, color: "#3b82f6" },
    { name: "Emergency Preparedness", value: 25, amount: 4.6, color: "#ef4444" },
    { name: "Healthcare", value: 15, amount: 2.8, color: "#22c55e" },
    { name: "Economic Programs", value: 10, amount: 1.9, color: "#f59e0b" },
    { name: "Community Training", value: 5, amount: 0.9, color: "#8b5cf6" },
  ]

  const savingsCategories = [
    {
      category: "Disaster Avoidance",
      amount: 12.5,
      description: "Prevented losses from early warning and mitigation",
      icon: Shield,
      color: "text-green-400",
    },
    {
      category: "Healthcare Savings",
      amount: 4.8,
      description: "Reduced emergency care and improved preventive health",
      icon: Target,
      color: "text-blue-400",
    },
    {
      category: "Economic Benefits",
      amount: 3.2,
      description: "Job creation and increased economic activity",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
    {
      category: "Infrastructure Efficiency",
      amount: 1.6,
      description: "Reduced maintenance and operational costs",
      icon: Calculator,
      color: "text-purple-400",
    },
  ]

  const projectedROI = [
    { year: 2025, conservative: 145, optimistic: 180, investment: 22.1 },
    { year: 2026, conservative: 165, optimistic: 220, investment: 25.8 },
    { year: 2027, conservative: 185, optimistic: 265, investment: 29.2 },
    { year: 2028, conservative: 205, optimistic: 315, investment: 32.5 },
    { year: 2029, conservative: 225, optimistic: 370, investment: 35.9 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900"
    >
      <NavBar />

      <div className="container mx-auto px-6 py-8">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Resilience ROI Analysis</h1>
          <p className="text-xl text-gray-300">Financial impact and return on investment for resilience initiatives</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">$22.1M</div>
              <div className="text-sm text-gray-400">Total Savings (2024)</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">119%</div>
              <div className="text-sm text-gray-400">Current ROI</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">$18.5M</div>
              <div className="text-sm text-gray-400">Total Investment</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">225%</div>
              <div className="text-sm text-gray-400">Projected ROI (2029)</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ROI Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">ROI Trend Analysis</CardTitle>
              <CardDescription>Historical and projected return on investment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[...roiData, ...projectedROI]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Line
                      type="monotone"
                      dataKey="roi"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                      strokeDasharray={roiData.length > 0 ? "0" : "5 5"}
                    />
                    <Line
                      type="monotone"
                      dataKey="conservative"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="optimistic"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-green-500 rounded" />
                  <span className="text-gray-300">Historical ROI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-blue-500 rounded border-dashed border-t-2 border-blue-500" />
                  <span className="text-gray-300">Conservative Projection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-yellow-500 rounded border-dashed border-t-2 border-yellow-500" />
                  <span className="text-gray-300">Optimistic Projection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Investment Breakdown */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-blue-400" />
                  <span>Investment Allocation</span>
                </CardTitle>
                <CardDescription>How resilience funds are distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investmentBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {investmentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {investmentBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <div className="text-white font-medium">
                        ${item.amount}M ({item.value}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Savings Categories */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Savings Breakdown</CardTitle>
                <CardDescription>Sources of financial benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savingsCategories.map((category, index) => {
                    const IconComponent = category.icon
                    const percentage = (category.amount / 22.1) * 100

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="bg-slate-700/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 ${category.color}`} />
                            <span className="text-white font-medium">{category.category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">${category.amount}M</div>
                            <div className="text-xs text-gray-400">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{category.description}</p>
                        <Progress value={percentage} className="h-2" />
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Cost-Benefit Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Cost-Benefit Analysis</CardTitle>
              <CardDescription>Investment vs. savings comparison over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Bar dataKey="investment" fill="#ef4444" name="Investment" />
                    <Bar dataKey="savings" fill="#22c55e" name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-red-500 rounded" />
                  <span className="text-gray-300">Annual Investment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-green-500 rounded" />
                  <span className="text-gray-300">Annual Savings</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
