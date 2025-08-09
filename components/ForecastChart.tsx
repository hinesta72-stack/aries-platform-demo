"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface ForecastChartProps {
  type: "current-vs-predictive" | "predicted-2weeks"
}

export default function ForecastChart({ type }: ForecastChartProps) {
  const currentVsPredictiveData = [
    { x: 1, current: 61, predicted: null },
    { x: 2, current: 63, predicted: null },
    { x: 3, current: 62, predicted: null },
    { x: 4, current: 64, predicted: null },
    { x: 5, current: 63, predicted: null },
    { x: 6, current: null, predicted: 65 },
    { x: 7, current: null, predicted: 67 },
    { x: 8, current: null, predicted: 66 },
    { x: 9, current: null, predicted: 68 },
    { x: 10, current: null, predicted: 69 },
  ]

  const predicted2WeeksData = [
    { x: 1, value: 65 },
    { x: 2, value: 67 },
    { x: 3, value: 66 },
    { x: 4, value: 68 },
    { x: 5, value: 70 },
    { x: 6, value: 69 },
    { x: 7, value: 71 },
    { x: 8, value: 72 },
    { x: 9, value: 70 },
    { x: 10, value: 73 },
  ]

  const data = type === "current-vs-predictive" ? currentVsPredictiveData : predicted2WeeksData

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-slate-800 rounded-lg p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-4">Resilience Index Forecast</h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} height={60} />
            <YAxis stroke="#9CA3AF" fontSize={12} domain={[45, 80]} />
            {type === "current-vs-predictive" ? (
              <>
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  strokeDasharray="8 8"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: "#22d3ee", strokeWidth: 2, r: 4 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {type === "current-vs-predictive" && (
        <div className="mt-4 flex justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-orange-500"></div>
            <span className="text-gray-300">Current Index</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-blue-500 border-dashed border-t-2 border-blue-500"></div>
            <span className="text-gray-300">Predicted Index</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
