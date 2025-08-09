"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MapPin,
  Heart,
  Utensils,
  Droplets,
  Building,
  UserCheck,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Pill,
  Truck,
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
}

interface HouseholdDetailsProps {
  household: Household | null
}

export default function HouseholdDetails({ household }: HouseholdDetailsProps) {
  if (!household) {
    return (
      <Card className="bg-slate-800 border-slate-700 h-fit">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Household Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Select a household on the map to view detailed information</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-400"
    if (score >= 60) return "text-orange-400"
    if (score >= 40) return "text-yellow-400"
    return "text-green-400"
  }

  const mockResidents = [
    {
      name: "Maria Rodriguez",
      age: 67,
      conditions: ["Diabetes", "Hypertension"],
      medications: ["Metformin", "Lisinopril"],
    },
    { name: "Carlos Rodriguez", age: 45, conditions: ["Asthma"], medications: ["Albuterol"] },
    { name: "Sofia Rodriguez", age: 12, conditions: [], medications: [] },
  ]

  const mockServices = [
    { name: "Meal Delivery", status: "active", nextDate: "2024-01-17", provider: "Community Kitchen" },
    { name: "Health Check", status: "scheduled", nextDate: "2024-01-20", provider: "Mobile Health Unit" },
    { name: "Medication Management", status: "active", nextDate: "2024-01-18", provider: "Pharmacy Partners" },
    { name: "Transportation", status: "pending", nextDate: "2024-01-22", provider: "Community Transport" },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Header Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Household Profile
            </div>
            <Badge className={`${getRiskColor(household.riskLevel)} text-white`}>
              {household.riskLevel.toUpperCase()} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-blue-400 mt-1" />
            <div>
              <p className="text-white text-sm font-medium">{household.address}</p>
              <p className="text-gray-400 text-xs">{household.residents} residents</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 text-sm">Last Contact: {household.lastContact}</span>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Overall Vulnerability</span>
              <span className={`text-sm font-bold ${getScoreColor(household.vulnerabilityScore)}`}>
                {household.vulnerabilityScore}/100
              </span>
            </div>
            <Progress value={household.vulnerabilityScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">Health Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${getScoreColor(household.healthRisk)}`}>
                  {household.healthRisk}
                </span>
                <Progress value={household.healthRisk} className="w-20 h-2" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Utensils className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">Food Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${getScoreColor(100 - household.foodSecurity)}`}>
                  {household.foodSecurity}
                </span>
                <Progress value={household.foodSecurity} className="w-20 h-2" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Water Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${getScoreColor(100 - household.waterAccess)}`}>
                  {household.waterAccess}
                </span>
                <Progress value={household.waterAccess} className="w-20 h-2" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">Housing Stability</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${getScoreColor(100 - household.housingStability)}`}>
                  {household.housingStability}
                </span>
                <Progress value={household.housingStability} className="w-20 h-2" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-gray-300">Social Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${getScoreColor(100 - household.socialSupport)}`}>
                  {household.socialSupport}
                </span>
                <Progress value={household.socialSupport} className="w-20 h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Residents */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center">
            <User className="w-5 h-5 mr-2" />
            Residents ({mockResidents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockResidents.map((resident, index) => (
              <div key={index} className="border-l-2 border-blue-400 pl-3 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{resident.name}</p>
                    <p className="text-gray-400 text-sm">Age: {resident.age}</p>
                  </div>
                </div>
                {resident.conditions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Health Conditions:</p>
                    <div className="flex flex-wrap gap-1">
                      {resident.conditions.map((condition, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-red-400 text-red-400">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {resident.medications.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Medications:</p>
                    <div className="flex flex-wrap gap-1">
                      {resident.medications.map((med, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-blue-400 text-blue-400">
                          <Pill className="w-3 h-3 mr-1" />
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Services */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center">
            <Truck className="w-5 h-5 mr-2" />
            Services ({mockServices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      service.status === "active"
                        ? "bg-green-400"
                        : service.status === "scheduled"
                          ? "bg-blue-400"
                          : "bg-yellow-400"
                    }`}
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{service.name}</p>
                    <p className="text-gray-400 text-xs">{service.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {service.status === "active" && <CheckCircle className="w-3 h-3 text-green-400" />}
                    {service.status === "scheduled" && <Clock className="w-3 h-3 text-blue-400" />}
                    {service.status === "pending" && <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                    <span className="text-xs text-gray-300 capitalize">{service.status}</span>
                  </div>
                  <p className="text-xs text-gray-400">Next: {service.nextDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Phone className="w-4 h-4 mr-2" />
          Contact
        </Button>
        <Button className="flex-1 bg-green-600 hover:bg-green-700">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule
        </Button>
      </div>
    </motion.div>
  )
}
