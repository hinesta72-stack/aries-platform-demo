"use client"

import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, Users } from "lucide-react"

export default function AlertsPanel() {
  const alerts = [
    {
      type: "Severe Weather",
      level: "High",
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      type: "Supply Chain Disruption",
      level: "Medium",
      icon: TrendingUp,
      color: "text-orange-400",
    },
    {
      type: "Staffing Shortages",
      level: "High",
      icon: Users,
      color: "text-red-400",
    },
  ]

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 h-full">
      <h3 className="text-xl font-semibold text-white mb-6">Active Alerts</h3>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50"
          >
            <div className="flex items-center space-x-3">
              <alert.icon className={`w-5 h-5 ${alert.color}`} />
              <div>
                <div className="text-white font-medium">{alert.type}</div>
                <div className={`text-sm ${alert.color}`}>{alert.level}</div>
              </div>
            </div>
            <div
              className={`w-3 h-3 rounded-full alert-badge ${alert.level === "High" ? "bg-red-400" : "bg-orange-400"}`}
            ></div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
