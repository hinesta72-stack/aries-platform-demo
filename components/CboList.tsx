"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Phone, Mail, Globe, MapPin, ChevronDown, ChevronUp } from "lucide-react"

interface CBO {
  id: string
  name: string
  description: string
  services: string[]
  contact: {
    phone: string
    email: string
    website: string
    address: string
  }
  focus: string[]
  established: number
  volunteers: number
}

interface CboListProps {
  stateCode: string
}

export default function CboList({ stateCode }: CboListProps) {
  const [cbos, setCbos] = useState<CBO[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchCbos = async () => {
      try {
        const response = await fetch(`/api/cbos/${stateCode}`)
        if (response.ok) {
          const data = await response.json()
          setCbos(data.organizations || [])
        }
      } catch (error) {
        console.error("Error fetching CBOs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCbos()
  }, [stateCode])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  if (loading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Community Organizations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-400">Loading organizations...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Building2 className="w-5 h-5" />
          <span>Community Organizations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cbos.map((cbo, index) => (
          <motion.div
            key={cbo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-700 rounded-lg border border-slate-600"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-semibold">{cbo.name}</h3>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Est. {cbo.established}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{cbo.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {cbo.focus.slice(0, 3).map((focus, focusIndex) => (
                      <Badge key={focusIndex} className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {focus}
                      </Badge>
                    ))}
                    {cbo.focus.length > 3 && (
                      <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                        +{cbo.focus.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(cbo.id)}
                  className="text-gray-400 hover:text-white"
                >
                  {expandedItems.has(cbo.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>

              {expandedItems.has(cbo.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-slate-600 space-y-3"
                >
                  <div>
                    <h4 className="text-white font-medium mb-2">Services:</h4>
                    <ul className="space-y-1">
                      {cbo.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span>{cbo.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Mail className="w-4 h-4 text-green-400" />
                        <span>{cbo.contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Globe className="w-4 h-4 text-orange-400" />
                        <span>{cbo.contact.website}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-red-400 mt-0.5" />
                        <span>{cbo.contact.address}</span>
                      </div>
                      <div className="text-gray-400">
                        <span className="font-medium">{cbo.volunteers}</span> active volunteers
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
