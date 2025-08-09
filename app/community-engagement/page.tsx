"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import CommunityEngagementMap from "@/components/CommunityEngagementMap"
import HouseholdDetails from "@/components/HouseholdDetails"
import CommunityDashboard from "@/components/CommunityDashboard"
import CBODirectory from "@/components/CBODirectory"
import VolunteerTracker from "@/components/VolunteerTracker"
import SupplyChainDashboard from "@/components/SupplyChainDashboard"
import HouseholdSelfAssessment from "@/components/HouseholdSelfAssessment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Home,
  Truck,
  MapPin,
  Activity,
  Bell,
  MessageSquare,
  Award,
  TrendingUp,
  Shield,
  AlertTriangle,
  DollarSign,
  Zap,
  Target,
  Globe,
  BarChart3,
  Calendar,
  Phone,
  Mail,
} from "lucide-react"

interface Household {
  id: string
  address: string
  coordinates: [number, number]
  residents: number
  vulnerabilityScore: number
  healthRisk: number
  foodSecurity: number
  waterAccess: number
  housingStability: number
  socialSupport: number
  lastContact: string
  services: string[]
  riskLevel: "low" | "medium" | "high" | "critical"
  resilienceScore?: number
  selfAssessmentComplete?: boolean
  engagementLevel?: "high" | "medium" | "low"
  micrograntEligible?: boolean
  volunteerMatch?: boolean
}

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

export default function CommunityEngagement() {
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null)
  const [activeTab, setActiveTab] = useState("map")
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    totalHouseholds: 1247,
    totalResidents: 3891,
    highRiskHouseholds: 156,
    activeServices: 89,
    neighborhoods: 23,
    coveragePercent: 94,
    avgResilienceScore: 74,
    completedAssessments: 892,
    activeVolunteers: 45,
    micrograntsDistributed: 23,
  })
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "Weather Alert",
      message: "Severe weather expected in North Philadelphia. Emergency resources activated.",
      timestamp: "2024-01-16T10:30:00Z",
      priority: "high",
    },
    {
      id: 2,
      type: "resource",
      title: "Food Distribution",
      message: "Mobile food pantry available at Community Center, 2-6 PM today.",
      timestamp: "2024-01-16T08:00:00Z",
      priority: "medium",
    },
    {
      id: 3,
      type: "success",
      title: "Volunteer Match",
      message: "5 new volunteer matches made in your area this week.",
      timestamp: "2024-01-15T16:45:00Z",
      priority: "low",
    },
  ])

  // Check if coming from state selection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const state = urlParams.get("state")
    if (state) {
      setSelectedState(state)
    }
  }, [])

  const handleHouseholdSelect = (household: Household | null) => {
    setSelectedHousehold(household)
    if (household) {
      setActiveTab("household")
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "resource":
        return <Truck className="w-4 h-4 text-blue-400" />
      case "success":
        return <Award className="w-4 h-4 text-green-400" />
      default:
        return <Bell className="w-4 h-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-500/10"
      case "medium":
        return "border-yellow-500 bg-yellow-500/10"
      case "low":
        return "border-green-500 bg-green-500/10"
      default:
        return "border-gray-500 bg-gray-500/10"
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <Users className="w-8 h-8 mr-3 text-purple-400" />
                Community Engagement Platform
                {selectedState && (
                  <Badge className="ml-4 bg-blue-500 text-white">
                    <MapPin className="w-3 h-3 mr-1" />
                    {selectedState}
                  </Badge>
                )}
              </h1>
              <p className="text-xl text-gray-300">
                Household-level resilience mapping • Community self-assessment • Real-time resource coordination
              </p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Community Chat
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Award className="w-4 h-4 mr-2" />
                Resilience Rewards
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Community Stats Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Home className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-400">{communityStats.totalHouseholds.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Households</div>
              <div className="text-xs text-green-400 mt-1">{communityStats.completedAssessments} assessed</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-400">{communityStats.totalResidents.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Residents</div>
              <div className="text-xs text-blue-400 mt-1">{communityStats.activeVolunteers} volunteers</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Shield className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-cyan-400">{communityStats.avgResilienceScore}</div>
              <div className="text-xs text-gray-400">Avg Resilience</div>
              <div className="text-xs text-green-400 mt-1">+3.2 this month</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-yellow-400">{communityStats.micrograntsDistributed}</div>
              <div className="text-xs text-gray-400">Micro-grants</div>
              <div className="text-xs text-green-400 mt-1">$11,500 distributed</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-400">{communityStats.coveragePercent}%</div>
              <div className="text-xs text-gray-400">Coverage</div>
              <div className="text-xs text-green-400 mt-1">{communityStats.activeServices} active services</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center text-lg">
                <Bell className="w-5 h-5 mr-2" />
                Community Notifications
                <Badge className="ml-2 bg-red-500 text-white">{notifications.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border ${getPriorityColor(notification.priority)}`}
                  >
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white text-sm">{notification.title}</h4>
                        <span className="text-xs text-gray-400">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-slate-800 border-slate-700">
              <TabsTrigger value="map" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Map</span>
              </TabsTrigger>
              <TabsTrigger value="household" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Household</span>
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="volunteers" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Volunteers</span>
              </TabsTrigger>
              <TabsTrigger value="supply" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Supply Chain</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Dashboard</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2"
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Home className="w-5 h-5 mr-2" />
                        Household-Level Heat Map
                        <Badge className="ml-3 bg-purple-500 text-white">
                          <Zap className="w-3 h-3 mr-1" />
                          Real-time
                        </Badge>
                      </CardTitle>
                      <div className="text-sm text-gray-400">
                        Drill down to individual households. Heat map shows vulnerability across health, food security,
                        water access, and social support dimensions.
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CommunityEngagementMap
                        onHouseholdSelect={handleHouseholdSelect}
                        selectedHousehold={selectedHousehold}
                        selectedState={selectedState}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-1"
                >
                  <HouseholdDetails household={selectedHousehold} />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="household" className="mt-6">
              {selectedHousehold ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <HouseholdDetails household={selectedHousehold} expanded={true} />
                  <div className="space-y-6">
                    {/* Household Actions */}
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Zap className="w-5 h-5 mr-2" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Household
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700 w-full">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                          <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Visit
                          </Button>
                          <Button className="bg-yellow-600 hover:bg-yellow-700 w-full">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Micro-grant
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Resilience Improvement Plan */}
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Resilience Improvement Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 bg-green-900/30 rounded-lg border border-green-700/50">
                            <div className="flex items-center mb-2">
                              <Award className="w-4 h-4 text-green-400 mr-2" />
                              <span className="text-sm font-medium text-green-400">Next Milestone</span>
                            </div>
                            <p className="text-xs text-gray-300">
                              Complete emergency supply kit assessment to earn +5 resilience points and unlock
                              AMERESERVE benefits.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-white">Recommended Actions:</h4>
                            <ul className="space-y-1 text-xs text-gray-300">
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                Update health information and medication list
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                                Connect with neighborhood volunteer network
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                Complete food security assessment
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="text-center py-12">
                    <Home className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Household Selected</h3>
                    <p className="text-gray-400 mb-6">
                      Select a household from the map to view detailed information and engagement tools.
                    </p>
                    <Button onClick={() => setActiveTab("map")} className="bg-blue-600 hover:bg-blue-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Go to Map
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="assessment" className="mt-6">
              <HouseholdSelfAssessment />
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <CBODirectory />
            </TabsContent>

            <TabsContent value="volunteers" className="mt-6">
              <VolunteerTracker />
            </TabsContent>

            <TabsContent value="supply" className="mt-6">
              <SupplyChainDashboard />
            </TabsContent>

            <TabsContent value="dashboard" className="mt-6">
              <CommunityDashboard stats={communityStats} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}
