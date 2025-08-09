"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Heart,
  Truck,
  Shield,
  Search,
  Calendar,
  Target,
  TrendingUp,
  UserPlus,
  Activity,
} from "lucide-react"

interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  coordinates: [number, number]
  skills: string[]
  availability: "available" | "busy" | "offline"
  rating: number
  completedTasks: number
  joinDate: string
  languages: string[]
  transportation: boolean
  emergencyContact: boolean
  backgroundCheck: boolean
  lastActive: string
  currentAssignment?: {
    id: string
    type: string
    location: string
    estimatedCompletion: string
  }
}

interface Task {
  id: string
  type: "wellness_check" | "food_delivery" | "transportation" | "emergency_response" | "social_support"
  title: string
  description: string
  location: string
  coordinates: [number, number]
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled"
  assignedVolunteer?: string
  requestedBy: string
  createdAt: string
  estimatedDuration: number
  requiredSkills: string[]
  completedAt?: string
}

export default function VolunteerTracker() {
  const [activeTab, setActiveTab] = useState("volunteers")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const volunteers: Volunteer[] = [
    {
      id: "vol-1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      address: "123 Helper St, Philadelphia, PA",
      coordinates: [-75.1652, 39.9526],
      skills: ["Health Support", "Language Translation", "Emergency Response"],
      availability: "available",
      rating: 4.9,
      completedTasks: 47,
      joinDate: "2023-08-15",
      languages: ["English", "Spanish"],
      transportation: true,
      emergencyContact: true,
      backgroundCheck: true,
      lastActive: "2024-01-16T09:30:00Z",
    },
    {
      id: "vol-2",
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 987-6543",
      address: "456 Community Ave, Philadelphia, PA",
      coordinates: [-75.1625, 39.935],
      skills: ["Food Services", "Transportation", "Technology Support"],
      availability: "busy",
      rating: 4.7,
      completedTasks: 32,
      joinDate: "2023-09-22",
      languages: ["English", "Mandarin"],
      transportation: true,
      emergencyContact: false,
      backgroundCheck: true,
      lastActive: "2024-01-16T08:15:00Z",
      currentAssignment: {
        id: "task-3",
        type: "food_delivery",
        location: "789 Pine St",
        estimatedCompletion: "2024-01-16T12:00:00Z",
      },
    },
    {
      id: "vol-3",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "(555) 456-7890",
      address: "789 Service Blvd, Philadelphia, PA",
      coordinates: [-75.158, 39.948],
      skills: ["Social Support", "Childcare", "Mental Health"],
      availability: "available",
      rating: 4.8,
      completedTasks: 28,
      joinDate: "2023-10-10",
      languages: ["English", "Spanish"],
      transportation: false,
      emergencyContact: true,
      backgroundCheck: true,
      lastActive: "2024-01-16T10:45:00Z",
    },
    {
      id: "vol-4",
      name: "David Kim",
      email: "d.kim@email.com",
      phone: "(555) 234-5678",
      address: "321 Volunteer Way, Philadelphia, PA",
      coordinates: [-75.145, 39.949],
      skills: ["Emergency Response", "Medical Support", "Crisis Intervention"],
      availability: "offline",
      rating: 4.9,
      completedTasks: 56,
      joinDate: "2023-07-03",
      languages: ["English", "Korean"],
      transportation: true,
      emergencyContact: true,
      backgroundCheck: true,
      lastActive: "2024-01-15T18:30:00Z",
    },
    {
      id: "vol-5",
      name: "Lisa Thompson",
      email: "lisa.t@email.com",
      phone: "(555) 345-6789",
      address: "654 Helper Lane, Philadelphia, PA",
      coordinates: [-75.148, 39.947],
      skills: ["Housing Support", "Legal Aid", "Administrative"],
      availability: "available",
      rating: 4.6,
      completedTasks: 19,
      joinDate: "2023-11-28",
      languages: ["English"],
      transportation: false,
      emergencyContact: false,
      backgroundCheck: true,
      lastActive: "2024-01-16T07:20:00Z",
    },
  ]

  const tasks: Task[] = [
    {
      id: "task-1",
      type: "wellness_check",
      title: "Weekly Wellness Check",
      description: "Check on elderly resident, ensure medication compliance and general wellbeing",
      location: "1234 Market St, Philadelphia, PA",
      coordinates: [-75.1652, 39.9526],
      priority: "medium",
      status: "pending",
      requestedBy: "Community Health Worker",
      createdAt: "2024-01-16T08:00:00Z",
      estimatedDuration: 45,
      requiredSkills: ["Health Support", "Social Support"],
    },
    {
      id: "task-2",
      type: "food_delivery",
      title: "Emergency Food Delivery",
      description: "Deliver emergency food supplies to family with young children",
      location: "567 Broad St, Philadelphia, PA",
      coordinates: [-75.1625, 39.935],
      priority: "high",
      status: "assigned",
      assignedVolunteer: "vol-2",
      requestedBy: "Food Bank Coordinator",
      createdAt: "2024-01-16T07:30:00Z",
      estimatedDuration: 60,
      requiredSkills: ["Transportation", "Food Services"],
    },
    {
      id: "task-3",
      type: "transportation",
      title: "Medical Appointment Transport",
      description: "Transport senior to dialysis appointment and back home",
      location: "890 Pine St, Philadelphia, PA",
      coordinates: [-75.158, 39.948],
      priority: "high",
      status: "in_progress",
      assignedVolunteer: "vol-1",
      requestedBy: "Case Manager",
      createdAt: "2024-01-16T06:00:00Z",
      estimatedDuration: 180,
      requiredSkills: ["Transportation", "Health Support"],
    },
    {
      id: "task-4",
      type: "social_support",
      title: "Companionship Visit",
      description: "Provide social interaction and emotional support to isolated resident",
      location: "321 Chestnut St, Philadelphia, PA",
      coordinates: [-75.145, 39.949],
      priority: "low",
      status: "completed",
      assignedVolunteer: "vol-3",
      requestedBy: "Social Worker",
      createdAt: "2024-01-15T14:00:00Z",
      estimatedDuration: 90,
      requiredSkills: ["Social Support"],
      completedAt: "2024-01-15T16:30:00Z",
    },
    {
      id: "task-5",
      type: "emergency_response",
      title: "Emergency Supply Distribution",
      description: "Distribute emergency supplies to households affected by power outage",
      location: "654 Walnut St, Philadelphia, PA",
      coordinates: [-75.148, 39.947],
      priority: "urgent",
      status: "pending",
      requestedBy: "Emergency Coordinator",
      createdAt: "2024-01-16T10:00:00Z",
      estimatedDuration: 120,
      requiredSkills: ["Emergency Response", "Transportation"],
    },
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "text-green-400 bg-green-500/20"
      case "busy":
        return "text-yellow-400 bg-yellow-500/20"
      case "offline":
        return "text-gray-400 bg-gray-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-400 bg-red-500/20 border-red-500"
      case "high":
        return "text-orange-400 bg-orange-500/20 border-orange-500"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500"
      case "low":
        return "text-green-400 bg-green-500/20 border-green-500"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-500/20"
      case "in_progress":
        return "text-blue-400 bg-blue-500/20"
      case "assigned":
        return "text-purple-400 bg-purple-500/20"
      case "pending":
        return "text-yellow-400 bg-yellow-500/20"
      case "cancelled":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "wellness_check":
        return <Heart className="w-4 h-4" />
      case "food_delivery":
        return <Truck className="w-4 h-4" />
      case "transportation":
        return <MapPin className="w-4 h-4" />
      case "emergency_response":
        return <Shield className="w-4 h-4" />
      case "social_support":
        return <Users className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = filterStatus === "all" || volunteer.availability === filterStatus

    return matchesSearch && matchesStatus
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || task.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const volunteerStats = {
    total: volunteers.length,
    available: volunteers.filter((v) => v.availability === "available").length,
    busy: volunteers.filter((v) => v.availability === "busy").length,
    offline: volunteers.filter((v) => v.availability === "offline").length,
    avgRating: Math.round((volunteers.reduce((sum, v) => sum + v.rating, 0) / volunteers.length) * 10) / 10,
    totalTasks: volunteers.reduce((sum, v) => sum + v.completedTasks, 0),
  }

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    assigned: tasks.filter((t) => t.status === "assigned").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    urgent: tasks.filter((t) => t.priority === "urgent").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-3 text-green-400" />
              Volunteer & Workforce Tracker
            </div>
            <div className="flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Recruit Volunteers
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Target className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
          </CardTitle>
          <div className="text-sm text-gray-400">
            Real-time volunteer tracking • Task assignment • Performance analytics
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-400">{volunteerStats.available}</div>
            <div className="text-xs text-gray-400">Available</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-yellow-400">{volunteerStats.busy}</div>
            <div className="text-xs text-gray-400">Busy</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-red-400">{taskStats.urgent}</div>
            <div className="text-xs text-gray-400">Urgent Tasks</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-blue-400">{taskStats.pending}</div>
            <div className="text-xs text-gray-400">Pending</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-purple-400">{volunteerStats.avgRating}</div>
            <div className="text-xs text-gray-400">Avg Rating</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-cyan-400">{taskStats.completed}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="volunteers" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Volunteers ({volunteerStats.total})</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Tasks ({taskStats.total})</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers" className="mt-6">
          <div className="space-y-4">
            {/* Search and Filter */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search volunteers by name or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Volunteers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVolunteers.map((volunteer) => (
                <motion.div
                  key={volunteer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-slate-800 border-slate-700 hover:border-green-500/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{volunteer.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(volunteer.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">({volunteer.completedTasks} tasks)</span>
                          </div>
                        </div>
                        <Badge className={`${getAvailabilityColor(volunteer.availability)} border-0`}>
                          {volunteer.availability.charAt(0).toUpperCase() + volunteer.availability.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Current Assignment */}
                      {volunteer.currentAssignment && (
                        <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
                          <div className="flex items-center mb-1">
                            <Activity className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-sm font-medium text-blue-400">Current Assignment</span>
                          </div>
                          <p className="text-xs text-gray-300">
                            {volunteer.currentAssignment.type} at {volunteer.currentAssignment.location}
                          </p>
                          <p className="text-xs text-gray-400">
                            ETA: {new Date(volunteer.currentAssignment.estimatedCompletion).toLocaleTimeString()}
                          </p>
                        </div>
                      )}

                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs border-slate-600 text-gray-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Languages & Capabilities */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-400">Languages:</span>
                          <div className="text-white">{volunteer.languages.join(", ")}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Capabilities:</span>
                          <div className="flex space-x-1 mt-1">
                            {volunteer.transportation && (
                              <Badge className="bg-green-500 text-white text-xs">Transport</Badge>
                            )}
                            {volunteer.emergencyContact && (
                              <Badge className="bg-red-500 text-white text-xs">Emergency</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-1 pt-2 border-t border-slate-600 text-xs text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3 h-3 text-blue-400" />
                          <span>{volunteer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3 text-green-400" />
                          <span>{volunteer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-purple-400" />
                          <span>Last active: {new Date(volunteer.lastActive).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={volunteer.availability !== "available"}
                        >
                          <Target className="w-3 h-3 mr-1" />
                          Assign Task
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-slate-600 bg-transparent">
                          <Phone className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <div className="space-y-4">
            {/* Search and Filter */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search tasks by title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-lg ${getPriorityColor(task.priority).includes("red") ? "bg-red-500" : getPriorityColor(task.priority).includes("orange") ? "bg-orange-500" : getPriorityColor(task.priority).includes("yellow") ? "bg-yellow-500" : "bg-green-500"}`}
                          >
                            {getTaskIcon(task.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-white">{task.title}</h3>
                              <Badge className={`${getPriorityColor(task.priority)} border text-xs`}>
                                {task.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{task.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{task.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{task.estimatedDuration} min</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(task.status)} border-0`}>
                            {task.status.replace("_", " ").toUpperCase()}
                          </Badge>
                          {task.assignedVolunteer && (
                            <div className="text-xs text-gray-400">
                              Assigned to: {volunteers.find((v) => v.id === task.assignedVolunteer)?.name}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Required Skills */}
                      <div className="mt-3 pt-3 border-t border-slate-600">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-gray-400 mr-2">Required Skills:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {task.requiredSkills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs border-slate-600 text-gray-300">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {task.status === "pending" && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Users className="w-3 h-3 mr-1" />
                                Assign
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                              <MapPin className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Volunteer Performance */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Volunteer Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteers.slice(0, 5).map((volunteer) => (
                    <div
                      key={volunteer.id}
                      className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {volunteer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{volunteer.name}</div>
                          <div className="text-xs text-gray-400">{volunteer.completedTasks} tasks completed</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(volunteer.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{volunteer.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Task Completion Trends */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Task Completion Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">This Week</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <span className="text-sm text-white">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Last Week</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-sm text-white">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">This Month</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                      <span className="text-sm text-white">82%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-600">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">{taskStats.completed}</div>
                        <div className="text-xs text-gray-400">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {taskStats.inProgress + taskStats.assigned}
                        </div>
                        <div className="text-xs text-gray-400">In Progress</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
