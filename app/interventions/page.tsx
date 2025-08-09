"use client"

import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Zap, Heart, DollarSign, Users, TrendingUp } from "lucide-react"

export default function Interventions() {
  const interventions = [
    {
      id: 1,
      title: "Emergency Response Network",
      description: "Strengthen emergency response capabilities through improved coordination and resource allocation",
      category: "Emergency Preparedness",
      impact: "High",
      cost: "$2.5M",
      timeline: "12 months",
      roi: "340%",
      progress: 75,
      icon: Shield,
      color: "text-red-400",
      locations: ["Philadelphia", "Pittsburgh", "Allentown"],
    },
    {
      id: 2,
      title: "Smart Grid Infrastructure",
      description: "Modernize electrical grid with smart technology and renewable energy integration",
      category: "Infrastructure",
      impact: "High",
      cost: "$15M",
      timeline: "24 months",
      roi: "280%",
      progress: 45,
      icon: Zap,
      color: "text-blue-400",
      locations: ["Statewide"],
    },
    {
      id: 3,
      title: "Community Health Hubs",
      description: "Establish resilient healthcare facilities in underserved communities",
      category: "Healthcare",
      impact: "Medium",
      cost: "$8M",
      timeline: "18 months",
      roi: "220%",
      progress: 30,
      icon: Heart,
      color: "text-green-400",
      locations: ["Rural PA", "Chester County", "Erie County"],
    },
    {
      id: 4,
      title: "Economic Resilience Program",
      description: "Support local businesses and create economic diversification strategies",
      category: "Economic",
      impact: "Medium",
      cost: "$5M",
      timeline: "36 months",
      roi: "195%",
      progress: 60,
      icon: DollarSign,
      color: "text-yellow-400",
      locations: ["Manufacturing Belt", "Coal Regions"],
    },
    {
      id: 5,
      title: "Community Preparedness Training",
      description: "Train community leaders and residents in disaster preparedness and response",
      category: "Social",
      impact: "High",
      cost: "$1.2M",
      timeline: "6 months",
      roi: "450%",
      progress: 85,
      icon: Users,
      color: "text-purple-400",
      locations: ["All Counties"],
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "border-red-500 text-red-400"
      case "Medium":
        return "border-yellow-500 text-yellow-400"
      default:
        return "border-green-500 text-green-400"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-yellow-500"
    if (progress >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

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
          <h1 className="text-4xl font-bold text-white mb-2">Resilience Interventions</h1>
          <p className="text-xl text-gray-300">
            Strategic interventions to improve community resilience and disaster preparedness
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">5</div>
              <div className="text-sm text-gray-400">Active Programs</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">$31.7M</div>
              <div className="text-sm text-gray-400">Total Investment</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">297%</div>
              <div className="text-sm text-gray-400">Average ROI</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">59%</div>
              <div className="text-sm text-gray-400">Avg Progress</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interventions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {interventions.map((intervention, index) => {
            const IconComponent = intervention.icon

            return (
              <motion.div
                key={intervention.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-6 h-6 ${intervention.color}`} />
                        <div>
                          <CardTitle className="text-white">{intervention.title}</CardTitle>
                          <CardDescription>{intervention.category}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className={getImpactColor(intervention.impact)}>
                        {intervention.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">{intervention.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{intervention.progress}%</span>
                      </div>
                      <Progress value={intervention.progress} className="h-2" />
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-400">Investment</div>
                        <div className="text-white font-medium">{intervention.cost}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Timeline</div>
                        <div className="text-white font-medium">{intervention.timeline}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">ROI</div>
                        <div className="text-green-400 font-medium flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {intervention.roi}
                        </div>
                      </div>
                    </div>

                    {/* Locations */}
                    <div className="mb-4">
                      <div className="text-gray-400 text-sm mb-2">Target Locations</div>
                      <div className="flex flex-wrap gap-1">
                        {intervention.locations.map((location, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-gray-300 bg-transparent">
                        Track Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
