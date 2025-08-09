"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Users,
  Home,
  Heart,
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
  Award,
  Target,
  BarChart3,
  Globe,
  MapPin,
  Download,
  Share,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"

interface CommunityStats {
  totalHouseholds: number
  totalResidents: number
  highRiskHouseholds: number
  activeServices: number
  neighborhoods: number
  coveragePercent: number
  avgResilienceScore: number
  completedAssessments: number
  activeVolunteers: number
  micrograntsDistributed: number
}

interface CommunityDashboardProps {
  stats: CommunityStats
}

export default function CommunityDashboard({ stats }: CommunityDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  // Mock demographic data
  const demographicData = [
    { category: "Age 65+", count: 892, percentage: 23, trend: "up" },
    { category: "Families with Children", count: 1456, percentage: 37, trend: "stable" },
    { category: "Single Adults", count: 1234, percentage: 32, trend: "up" },
    { category: "Disabled Individuals", count: 309, percentage: 8, trend: "stable" },
  ]

  // Mock service utilization data
  const serviceData = [
    { service: "Food Assistance", users: 456, capacity: 600, utilization: 76 },
    { service: "Health Services", users: 234, capacity: 300, utilization: 78 },
    { service: "Transportation", users: 123, capacity: 200, utilization: 62 },
    { service: "Housing Support", users: 89, capacity: 150, utilization: 59 },
    { service: "Social Support", users: 345, capacity: 400, utilization: 86 },
  ]

  // Mock neighborhood data
  const neighborhoodData = [
    { name: "North Philadelphia", households: 234, resilienceScore: 68, riskLevel: "medium" },
    { name: "South Philadelphia", households: 189, resilienceScore: 72, riskLevel: "medium" },
    { name: "West Philadelphia", households: 298, resilienceScore: 65, riskLevel: "high" },
    { name: "Center City", households: 156, resilienceScore: 82, riskLevel: "low" },
    { name: "Northeast Philadelphia", households: 370, resilienceScore: 74, riskLevel: "medium" },
  ]

  // Mock equity metrics
  const equityMetrics = [
    { metric: "Service Access Equity", score: 78, target: 85, trend: "improving" },
    { metric: "Language Accessibility", score: 82, target: 90, trend: "stable" },
    { metric: "Geographic Coverage", score: 94, target: 95, trend: "improving" },
    { metric: "Income-Based Fairness", score: 71, target: 80, trend: "improving" },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-400 bg-green-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "high":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-400" />
      case "down":
        return <TrendingDown className="w-3 h-3 text-red-400" />
      case "stable":
        return <Activity className="w-3 h-3 text-gray-400" />
      case "improving":
        return <TrendingUp className="w-3 h-3 text-green-400" />
      default:
        return <Activity className="w-3 h-3 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-6 h-6 mr-3 text-blue-400" />
              Community Public Dashboard
              <Badge className="ml-3 bg-green-500 text-white">
                <Eye className="w-3 h-3 mr-1" />
                Public View
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Share className="w-4 h-4 mr-2" />
                Share Dashboard
              </Button>
            </div>
          </CardTitle>
          <div className="text-sm text-gray-400">
            Aggregate, anonymized community statistics • Updated in real-time • Privacy-protected data
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Home className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{stats.totalHouseholds.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Households Tracked</div>
            <div className="text-xs text-green-400 mt-1">
              {Math.round((stats.completedAssessments / stats.totalHouseholds) * 100)}% assessed
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{stats.totalResidents.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Community Members</div>
            <div className="text-xs text-blue-400 mt-1">{stats.activeVolunteers} active volunteers</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-400">{stats.avgResilienceScore}</div>
            <div className="text-xs text-gray-400">Avg Resilience Score</div>
            <div className="text-xs text-green-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +3.2 this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{stats.coveragePercent}%</div>
            <div className="text-xs text-gray-400">Service Coverage</div>
            <div className="text-xs text-green-400 mt-1">{stats.activeServices} active services</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{stats.micrograntsDistributed}</div>
            <div className="text-xs text-gray-400">Micro-grants Issued</div>
            <div className="text-xs text-green-400 mt-1">$11,500 distributed</div>
          </CardContent>
        </Card>
      </div>

      {/* Demographics Breakdown */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Community Demographics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {demographicData.map((demo, index) => (
              <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{demo.category}</h4>
                  {getTrendIcon(demo.trend)}
                </div>
                <div className="text-2xl font-bold text-blue-400 mb-1">{demo.count.toLocaleString()}</div>
                <div className="text-sm text-gray-400">{demo.percentage}% of community</div>
                <Progress value={demo.percentage} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Utilization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Service Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceData.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{service.service}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">
                      {service.users}/{service.capacity} users
                    </span>
                    <Badge
                      className={`${service.utilization > 80 ? "bg-red-500" : service.utilization > 60 ? "bg-yellow-500" : "bg-green-500"} text-white`}
                    >
                      {service.utilization}%
                    </Badge>
                  </div>
                </div>
                <Progress value={service.utilization} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Neighborhood Breakdown */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Neighborhood Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {neighborhoodData.map((neighborhood, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{neighborhood.name}</h4>
                  <Badge className={`${getRiskColor(neighborhood.riskLevel)} border-0`}>
                    {neighborhood.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Households:</span>
                    <span className="text-white">{neighborhood.households}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Resilience Score:</span>
                    <span className="text-cyan-400 font-bold">{neighborhood.resilienceScore}</span>
                  </div>
                  <Progress value={neighborhood.resilienceScore} className="h-2 mt-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equity Metrics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Equity & Fairness Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equityMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{metric.metric}</h4>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(metric.trend)}
                    <span className="text-sm text-gray-400">Target: {metric.target}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Score</span>
                    <span
                      className={`font-bold ${metric.score >= metric.target ? "text-green-400" : "text-yellow-400"}`}
                    >
                      {metric.score}/100
                    </span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                  <div className="text-xs text-gray-400">
                    {metric.score >= metric.target ? (
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Target achieved
                      </div>
                    ) : (
                      <div className="flex items-center text-yellow-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {metric.target - metric.score} points to target
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Achievements */}
      <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-400" />
            Community Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-800/30 rounded-lg border border-green-600/50">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">Resilience Champion</div>
              <div className="text-sm text-gray-300">Top 10% improvement in community resilience score</div>
            </div>

            <div className="text-center p-4 bg-blue-800/30 rounded-lg border border-blue-600/50">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">Community Engagement</div>
              <div className="text-sm text-gray-300">85% household participation in assessments</div>
            </div>

            <div className="text-center p-4 bg-purple-800/30 rounded-lg border border-purple-600/50">
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">Volunteer Excellence</div>
              <div className="text-sm text-gray-300">45 active volunteers serving the community</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Transparency Notice */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-1">Data Privacy & Transparency</h4>
              <p className="text-sm text-gray-300">
                All data shown is aggregated and anonymized to protect individual privacy. Personal information is never
                shared publicly. Data is updated in real-time and reflects community-wide trends and patterns only.
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                <span>Last updated: {new Date().toLocaleString()}</span>
                <span>•</span>
                <span>Data retention: 90 days</span>
                <span>•</span>
                <span>Privacy compliant</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
