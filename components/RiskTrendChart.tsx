"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

export default function RiskTrendChart() {
  const data = [
    { x: 2, y: 85 },
    { x: 3, y: 82 },
    { x: 4, y: 78 },
    { x: 5, y: 75 },
    { x: 6, y: 72 },
    { x: 7, y: 68 },
    { x: 8, y: 65 },
  ]

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
          <YAxis hide />
          <Line type="monotone" dataKey="y" stroke="#22d3ee" strokeWidth={3} dot={false} strokeDasharray="0" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
