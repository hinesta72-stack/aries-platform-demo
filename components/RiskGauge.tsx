"use client"

import { motion } from "framer-motion"

interface RiskGaugeProps {
  score: number
  location: string
  showLarge?: boolean
}

export default function RiskGauge({ score, location, showLarge = false }: RiskGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "#ef4444"
    if (score >= 65) return "#f97316"
    if (score >= 55) return "#eab308"
    return "#22c55e"
  }

  const percentage = (score / 100) * 100
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  if (showLarge) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 h-full flex flex-col items-center justify-center">
        <div className="text-lg text-gray-300 mb-2">{location}</div>
        <div className="relative w-48 h-48 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle cx="100" cy="100" r="90" stroke="#374151" strokeWidth="12" fill="none" />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              stroke={getScoreColor(score)}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="gauge-glow"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-6xl font-bold text-white"
              >
                {score}
              </motion.div>
              <div className="text-lg text-gray-400">Resilience Index</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-slate-800/50 rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-4">Resilience Index</h3>
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#374151" strokeWidth="8" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke={getScoreColor(score)}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percentage / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="gauge-glow"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-3xl font-bold text-white"
              >
                {score}
              </motion.div>
            </div>
          </div>
        </div>
        <h4 className="text-lg font-medium text-white">{location}</h4>
      </div>
    </motion.div>
  )
}
