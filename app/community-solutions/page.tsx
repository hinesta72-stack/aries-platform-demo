"use client"

import { motion } from "framer-motion"
import NavBar from "@/components/NavBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Phone, Globe, Mail, Star, ExternalLink } from "lucide-react"

export default function CommunitySolutions() {
  const organizations = [
    {
      id: 1,
      name: "Pennsylvania Emergency Management Agency",
      type: "Government",
      location: "Harrisburg, PA",
      focus: ["Emergency Response", "Disaster Preparedness", "Public Safety"],
      rating: 4.8,
      contact: {
        phone: "(717) 651-2001",
        email: "info@pema.pa.gov",
        website: "https://www.pema.pa.gov",
      },
      services: [
        "Emergency planning and coordination",
        "Disaster response and recovery",
        "Public education and outreach",
        "Hazard mitigation planning",
      ],
      coverage: "Statewide",
      established: 1979,
    },
    {
      id: 2,
      name: "American Red Cross Eastern Pennsylvania",
      type: "Non-Profit",
      location: "Philadelphia, PA",
      focus: ["Disaster Relief", "Emergency Assistance", "Community Preparedness"],
      rating: 4.6,
      contact: {
        phone: "(215) 299-4000",
        email: "info@redcross-ep.org",
        website: "https://www.redcross.org/local/pennsylvania/eastern-pennsylvania",
      },
      services: [
        "Emergency shelter and food",
        "Disaster relief services",
        "First aid and CPR training",
        "Blood donation services",
      ],
      coverage: "Eastern PA",
      established: 1881,
    },
    {
      id: 3,
      name: "Community Resilience Network",
      type: "Community Organization",
      location: "Pittsburgh, PA",
      focus: ["Community Building", "Resilience Training", "Local Preparedness"],
      rating: 4.4,
      contact: {
        phone: "(412) 555-0123",
        email: "connect@crn-pgh.org",
        website: "https://www.communityresilience-pgh.org",
      },
      services: [
        "Neighborhood preparedness workshops",
        "Community resilience assessments",
        "Volunteer coordination",
        "Resource sharing networks",
      ],
      coverage: "Allegheny County",
      established: 2015,
    },
    {
      id: 4,
      name: "PA Rural Health Network",
      type: "Healthcare",
      location: "State College, PA",
      focus: ["Healthcare Access", "Rural Health", "Emergency Medical Services"],
      rating: 4.7,
      contact: {
        phone: "(814) 863-8214",
        email: "info@paruralhealth.org",
        website: "https://www.paruralhealth.org",
      },
      services: [
        "Rural healthcare coordination",
        "Emergency medical planning",
        "Health system resilience",
        "Telehealth services",
      ],
      coverage: "Rural PA",
      established: 1992,
    },
    {
      id: 5,
      name: "Salvation Army Pennsylvania Division",
      type: "Faith-Based",
      location: "Harrisburg, PA",
      focus: ["Social Services", "Emergency Assistance", "Community Support"],
      rating: 4.5,
      contact: {
        phone: "(717) 236-8584",
        email: "pa_division@use.salvationarmy.org",
        website: "https://www.salvationarmypa.org",
      },
      services: [
        "Emergency assistance programs",
        "Food and shelter services",
        "Disaster response",
        "Community outreach",
      ],
      coverage: "Statewide",
      established: 1865,
    },
    {
      id: 6,
      name: "United Way of Pennsylvania",
      type: "Non-Profit",
      location: "Harrisburg, PA",
      focus: ["Community Development", "Social Services", "Volunteer Coordination"],
      rating: 4.3,
      contact: {
        phone: "(717) 238-7365",
        email: "info@uwp.org",
        website: "https://www.uwp.org",
      },
      services: [
        "Community needs assessment",
        "Volunteer mobilization",
        "Funding coordination",
        "Social service programs",
      ],
      coverage: "Statewide",
      established: 1887,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Government":
        return "border-blue-500 text-blue-400 bg-blue-500/10"
      case "Non-Profit":
        return "border-green-500 text-green-400 bg-green-500/10"
      case "Community Organization":
        return "border-purple-500 text-purple-400 bg-purple-500/10"
      case "Healthcare":
        return "border-red-500 text-red-400 bg-red-500/10"
      case "Faith-Based":
        return "border-yellow-500 text-yellow-400 bg-yellow-500/10"
      default:
        return "border-gray-500 text-gray-400 bg-gray-500/10"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
      />
    ))
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
          <h1 className="text-4xl font-bold text-white mb-2">Community Solutions</h1>
          <p className="text-xl text-gray-300">
            Connect with local organizations and resources for community resilience
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
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{organizations.length}</div>
              <div className="text-sm text-gray-400">Partner Organizations</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">67</div>
              <div className="text-sm text-gray-400">Counties Covered</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">4.5</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 text-center">
              <Phone className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-gray-400">Emergency Support</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {organizations.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white mb-2">{org.name}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(org.type)}>{org.type}</Badge>
                        <div className="flex items-center space-x-1">
                          {renderStars(org.rating)}
                          <span className="text-sm text-gray-400 ml-1">({org.rating})</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {org.location} • Est. {org.established}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Focus Areas */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Focus Areas</div>
                    <div className="flex flex-wrap gap-1">
                      {org.focus.map((area, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Key Services</div>
                    <ul className="space-y-1">
                      {org.services.slice(0, 3).map((service, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                      {org.services.length > 3 && (
                        <li className="text-sm text-gray-400">+{org.services.length - 3} more services</li>
                      )}
                    </ul>
                  </div>

                  {/* Coverage */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Coverage Area</div>
                    <div className="text-sm text-white">{org.coverage}</div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Phone className="w-4 h-4 mr-2 text-blue-400" />
                      {org.contact.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Mail className="w-4 h-4 mr-2 text-green-400" />
                      {org.contact.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Globe className="w-4 h-4 mr-2 text-purple-400" />
                      <a
                        href={org.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-gray-300 bg-transparent"
                      onClick={() => window.open(org.contact.website, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
