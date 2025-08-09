"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, TrendingUp, TrendingDown } from "lucide-react"

interface BenchmarkData {
  category: string
  score: number
  nationalAverage: number
  peerAverage: number
}

interface BenchmarkComparisonProps {
  currentScores: BenchmarkData[]
  location: string
}

export default function BenchmarkComparison({ currentScores, location }: BenchmarkComparisonProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-300 text-sm">{entry.name}</span>
              </div>
              <span className="text-white font-medium">{Math.round(entry.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const getPerformanceIndicator = (current: number, benchmark: number) => {
    const diff = current - benchmark
    if (Math.abs(diff) < 2) return { icon: null, color: "text-gray-400", text: "Similar" }
    if (diff > 0)
      return {
        icon: <TrendingUp className="w-4 h-4" />,
        color: "text-red-400",
        text: `+${Math.round(diff)}`,
      }
    return {
      icon: <TrendingDown className="w-4 h-4" />,
      color: "text-green-400",
      text: `${Math.round(diff)}`,
    }
  }

  const handleExport = () => {
    console.log("Exporting benchmark data...")
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Benchmark Comparison
              <Badge className="ml-3 bg-purple-500 text-white">{location}</Badge>
            </CardTitle>
            <p className="text-gray-400 text-sm mt-1">Compare risk scores against national and peer averages</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="border-slate-600 text-gray-300 hover:text-white bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentScores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9ca3af" fontSize={12} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#9ca3af" }} />

              <Bar dataKey="score" name={location} fill="#3b82f6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="nationalAverage" name="National Average" fill="#6b7280" radius={[2, 2, 0, 0]} />
              <Bar dataKey="peerAverage" name="Peer Average" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Comparison Table */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Performance vs Benchmarks</h4>
          <div className="space-y-2">
            {currentScores.map((item, index) => {
              const nationalComp = getPerformanceIndicator(item.score, item.nationalAverage)
              const peerComp = getPerformanceIndicator(item.score, item.peerAverage)

              return (
                <div key={index} className="bg-slate-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{item.category}</span>
                    <span className="text-2xl font-bold text-blue-400">{item.score}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">vs National</span>
                      <div className={`flex items-center space-x-1 ${nationalComp.color}`}>
                        {nationalComp.icon}
                        <span>{nationalComp.text}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">vs Peers</span>
                      <div className={`flex items-center space-x-1 ${peerComp.color}`}>
                        {peerComp.icon}
                        <span>{peerComp.text}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">
              {Math.round(currentScores.reduce((acc, item) => acc + item.score, 0) / currentScores.length)}
            </div>
            <div className="text-xs text-gray-400">Your Average</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-400">
              {Math.round(currentScores.reduce((acc, item) => acc + item.nationalAverage, 0) / currentScores.length)}
            </div>
            <div className="text-xs text-gray-400">National Avg</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">
              {Math.round(currentScores.reduce((acc, item) => acc + item.peerAverage, 0) / currentScores.length)}
            </div>
            <div className="text-xs text-gray-400">Peer Avg</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
