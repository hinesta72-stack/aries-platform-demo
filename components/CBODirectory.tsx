"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Heart,
  Utensils,
  Home,
  Truck,
  Shield,
  CheckCircle,
  AlertTriangle,
  Star,
  Navigation,
  BarChart3,
} from "lucide-react"

interface CBO {
  id: string
  name: string
  type: "food" | "health" | "housing" | "transportation" | "social" | "emergency"
  description: string
  address: string
  phone: string
  email: string
  website?: string
  hours: string
  capacity: number
  currentLoad: number
  services: string[]
  languages: string[]
  eligibility: string[]
  rating: number
  reviews: number
  lastUpdated: string
  availability: "high" | "medium" | "low"
  coordinates: [number, number]
}

export default function CBODirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCBO, setSelectedCBO] = useState<CBO | null>(null)

  const cbos: CBO[] = [
    {
      id: "cbo-1",
      name: "Community Kitchen Network",
      type: "food",
      description: "Providing nutritious meals and food assistance to families in need across Philadelphia.",
      address: "123 Service St, Philadelphia, PA 19103",
      phone: "(555) 123-4567",
      email: "info@communitykitchen.org",
      website: "www.communitykitchen.org",
      hours: "Mon-Fri 8:00 AM - 6:00 PM",
      capacity: 500,
      currentLoad: 342,
      services: ["Meal delivery", "Food pantry", "Nutrition counseling", "Cooking classes"],
      languages: ["English", "Spanish", "Arabic"],
      eligibility: ["Income-based", "Seniors 65+", "Families with children"],
      rating: 4.8,
      reviews: 156,
      lastUpdated: "2024-01-16T10:30:00Z",
      availability: "medium",
      coordinates: [-75.1652, 39.9526],
    },
    {
      id: "cbo-2",
      name: "Mobile Health Services",
      type: "health",
      description: "Bringing healthcare directly to underserved communities with mobile clinics and home visits.",
      address: "456 Health Ave, Philadelphia, PA 19104",
      phone: "(555) 987-6543",
      email: "dispatch@mobilehealthservices.org",
      website: "www.mobilehealthservices.org",
      hours: "Mon-Sat 7:00 AM - 8:00 PM",
      capacity: 200,
      currentLoad: 156,
      services: ["Home health visits", "Medication management", "Health screenings", "Chronic care"],
      languages: ["English", "Spanish", "Mandarin"],
      eligibility: ["Uninsured", "Medicare/Medicaid", "Mobility limited"],
      rating: 4.9,
      reviews: 203,
      lastUpdated: "2024-01-16T09:15:00Z",
      availability: "high",
      coordinates: [-75.1625, 39.935],
    },
    {
      id: "cbo-3",
      name: "Community Transport",
      type: "transportation",
      description:
        "Reliable transportation services for medical appointments, grocery shopping, and essential errands.",
      address: "789 Transit Blvd, Philadelphia, PA 19105",
      phone: "(555) 456-7890",
      email: "rides@communitytransport.org",
      hours: "Mon-Fri 6:00 AM - 10:00 PM",
      capacity: 100,
      currentLoad: 78,
      services: ["Medical appointments", "Grocery shopping", "Social services", "Emergency transport"],
      languages: ["English", "Spanish"],
      eligibility: ["Seniors 60+", "Disabled individuals", "Low income"],
      rating: 4.6,
      reviews: 89,
      lastUpdated: "2024-01-16T08:45:00Z",
      availability: "high",
      coordinates: [-75.158, 39.948],
    },
    {
      id: "cbo-4",
      name: "Safe Harbor Housing",
      type: "housing",
      description: "Emergency shelter and transitional housing services with wraparound support programs.",
      address: "321 Shelter Way, Philadelphia, PA 19106",
      phone: "(555) 234-5678",
      email: "intake@safeharbor.org",
      website: "www.safeharbor.org",
      hours: "24/7 Emergency Intake",
      capacity: 150,
      currentLoad: 142,
      services: ["Emergency shelter", "Transitional housing", "Case management", "Job training"],
      languages: ["English", "Spanish", "French"],
      eligibility: ["Homeless individuals", "Families", "Veterans"],
      rating: 4.4,
      reviews: 67,
      lastUpdated: "2024-01-16T11:00:00Z",
      availability: "low",
      coordinates: [-75.145, 39.949],
    },
    {
      id: "cbo-5",
      name: "Neighborhood Support Circle",
      type: "social",
      description: "Building community connections through volunteer matching, social activities, and peer support.",
      address: "654 Community Blvd, Philadelphia, PA 19107",
      phone: "(555) 345-6789",
      email: "connect@neighborsupport.org",
      hours: "Mon-Fri 9:00 AM - 5:00 PM",
      capacity: 300,
      currentLoad: 189,
      services: ["Volunteer matching", "Social activities", "Peer support", "Community events"],
      languages: ["English", "Spanish", "Korean"],
      eligibility: ["All community members", "Seniors", "Isolated individuals"],
      rating: 4.7,
      reviews: 124,
      lastUpdated: "2024-01-16T07:30:00Z",
      availability: "high",
      coordinates: [-75.148, 39.947],
    },
    {
      id: "cbo-6",
      name: "Emergency Response Network",
      type: "emergency",
      description: "24/7 emergency assistance, disaster relief, and crisis intervention services.",
      address: "987 Emergency Dr, Philadelphia, PA 19108",
      phone: "(555) 911-HELP",
      email: "emergency@responsenetwork.org",
      hours: "24/7 Emergency Services",
      capacity: 50,
      currentLoad: 23,
      services: ["Crisis intervention", "Disaster relief", "Emergency supplies", "Evacuation assistance"],
      languages: ["English", "Spanish", "ASL"],
      eligibility: ["Emergency situations", "Disaster victims", "Crisis situations"],
      rating: 4.9,
      reviews: 78,
      lastUpdated: "2024-01-16T12:00:00Z",
      availability: "high",
      coordinates: [-75.155, 39.962],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "food":
        return <Utensils className="w-4 h-4" />
      case "health":
        return <Heart className="w-4 h-4" />
      case "housing":
        return <Home className="w-4 h-4" />
      case "transportation":
        return <Truck className="w-4 h-4" />
      case "social":
        return <Users className="w-4 h-4" />
      case "emergency":
        return <Shield className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "food":
        return "bg-green-500"
      case "health":
        return "bg-red-500"
      case "housing":
        return "bg-blue-500"
      case "transportation":
        return "bg-purple-500"
      case "social":
        return "bg-pink-500"
      case "emergency":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "high":
        return "text-green-400 bg-green-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "low":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getCapacityPercentage = (cbo: CBO) => {
    return Math.round((cbo.currentLoad / cbo.capacity) * 100)
  }

  const filteredCBOs = cbos.filter((cbo) => {
    const matchesSearch =
      cbo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cbo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cbo.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || cbo.type === selectedType

    return matchesSearch && matchesType
  })

  const cboTypes = [
    { id: "all", label: "All Services", count: cbos.length },
    { id: "food", label: "Food", count: cbos.filter((c) => c.type === "food").length },
    { id: "health", label: "Health", count: cbos.filter((c) => c.type === "health").length },
    { id: "housing", label: "Housing", count: cbos.filter((c) => c.type === "housing").length },
    { id: "transportation", label: "Transport", count: cbos.filter((c) => c.type === "transportation").length },
    { id: "social", label: "Social", count: cbos.filter((c) => c.type === "social").length },
    { id: "emergency", label: "Emergency", count: cbos.filter((c) => c.type === "emergency").length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-400" />
              Community-Based Organization Directory
            </div>
            <Badge className="bg-blue-500 text-white">{filteredCBOs.length} Organizations</Badge>
          </CardTitle>
          <div className="text-sm text-gray-400">
            Real-time availability • Service capacity • Multi-language support
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search organizations, services, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Service Type Tabs */}
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-7 bg-slate-800 border-slate-700">
          {cboTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id} className="flex flex-col items-center space-y-1">
              <span className="text-xs">{type.label}</span>
              <Badge className="bg-blue-500 text-white text-xs">{type.count}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedType} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCBOs.map((cbo) => (
              <motion.div
                key={cbo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${getTypeColor(cbo.type)}`}>{getTypeIcon(cbo.type)}</div>
                        <div>
                          <CardTitle className="text-white text-lg">{cbo.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(cbo.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">({cbo.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getAvailabilityColor(cbo.availability)} border-0`}>
                        {cbo.availability === "high" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {cbo.availability === "medium" && <Clock className="w-3 h-3 mr-1" />}
                        {cbo.availability === "low" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {cbo.availability.charAt(0).toUpperCase() + cbo.availability.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300">{cbo.description}</p>

                    {/* Capacity */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Capacity</span>
                        <span className="text-gray-300">
                          {cbo.currentLoad}/{cbo.capacity} ({getCapacityPercentage(cbo)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            getCapacityPercentage(cbo) > 90
                              ? "bg-red-500"
                              : getCapacityPercentage(cbo) > 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${getCapacityPercentage(cbo)}%` }}
                        />
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {cbo.services.slice(0, 3).map((service) => (
                          <Badge key={service} variant="outline" className="text-xs border-slate-600 text-gray-300">
                            {service}
                          </Badge>
                        ))}
                        {cbo.services.length > 3 && (
                          <Badge variant="outline" className="text-xs border-slate-600 text-gray-300">
                            +{cbo.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-1">
                        {cbo.languages.map((language) => (
                          <Badge key={language} className="bg-purple-500 text-white text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 pt-2 border-t border-slate-600">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>{cbo.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span>{cbo.hours}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-slate-600 bg-transparent">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                        <Navigation className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Network Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {cbos.filter((c) => c.availability === "high").length}
              </div>
              <div className="text-sm text-gray-400">High Availability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {cbos.reduce((sum, c) => sum + c.capacity, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{new Set(cbos.flatMap((c) => c.languages)).size}</div>
              <div className="text-sm text-gray-400">Languages Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round((cbos.reduce((sum, c) => sum + c.rating, 0) / cbos.length) * 10) / 10}
              </div>
              <div className="text-sm text-gray-400">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
