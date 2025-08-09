import { type NextRequest, NextResponse } from "next/server"

interface HouseholdService {
  id: string
  type: "meal_delivery" | "medication_management" | "wellness_check" | "transportation" | "home_safety"
  status: "active" | "pending" | "scheduled" | "completed"
  provider: string
  nextScheduled?: string
  frequency: "daily" | "weekly" | "monthly" | "as_needed"
  notes?: string
}

interface HouseholdMember {
  id: string
  name: string
  age: number
  relationship: string
  healthConditions: string[]
  medications: string[]
  dietaryRestrictions: string[]
  mobilityNeeds: string[]
}

interface HouseholdData {
  id: string
  address: string
  coordinates: [number, number]
  members: HouseholdMember[]
  vulnerabilityScore: number
  riskFactors: {
    health: number
    food: number
    water: number
    housing: number
    social: number
  }
  services: HouseholdService[]
  emergencyContacts: Array<{
    name: string
    relationship: string
    phone: string
    email?: string
  }>
  accessibilityNeeds: string[]
  preferredLanguage: string
  lastAssessment: string
  nextVisit?: string
  caseWorker?: {
    name: string
    phone: string
    email: string
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const householdId = searchParams.get("id")
  const area = searchParams.get("area") // zip, county, etc.
  const riskLevel = searchParams.get("risk") // low, medium, high, critical

  if (householdId) {
    // Return specific household data
    const mockHousehold: HouseholdData = {
      id: householdId,
      address: "1234 Community St, Philadelphia, PA 19103",
      coordinates: [-75.1652, 39.9526],
      members: [
        {
          id: "member-1",
          name: "Maria Rodriguez",
          age: 67,
          relationship: "Head of Household",
          healthConditions: ["Type 2 Diabetes", "Hypertension", "Arthritis"],
          medications: ["Metformin 500mg", "Lisinopril 10mg", "Ibuprofen 200mg"],
          dietaryRestrictions: ["Low sodium", "Diabetic diet", "Lactose intolerant"],
          mobilityNeeds: ["Walker assistance", "Grab bars needed"],
        },
        {
          id: "member-2",
          name: "Carlos Rodriguez",
          age: 72,
          relationship: "Spouse",
          healthConditions: ["COPD", "Heart Disease"],
          medications: ["Albuterol inhaler", "Metoprolol 25mg"],
          dietaryRestrictions: ["Heart healthy", "Low fat"],
          mobilityNeeds: ["Oxygen tank", "Wheelchair accessible"],
        },
      ],
      vulnerabilityScore: 78,
      riskFactors: {
        health: 85,
        food: 72,
        water: 45,
        housing: 68,
        social: 55,
      },
      services: [
        {
          id: "service-1",
          type: "meal_delivery",
          status: "active",
          provider: "Community Kitchen Network",
          nextScheduled: "2024-01-16T12:00:00Z",
          frequency: "daily",
          notes: "Diabetic-friendly meals, low sodium",
        },
        {
          id: "service-2",
          type: "medication_management",
          status: "active",
          provider: "Home Health Services",
          frequency: "weekly",
          notes: "Pill organizer setup and monitoring",
        },
        {
          id: "service-3",
          type: "wellness_check",
          status: "scheduled",
          provider: "Community Health Worker",
          nextScheduled: "2024-01-18T10:00:00Z",
          frequency: "weekly",
        },
      ],
      emergencyContacts: [
        {
          name: "Ana Rodriguez",
          relationship: "Daughter",
          phone: "(555) 123-4567",
          email: "ana.rodriguez@email.com",
        },
        {
          name: "Dr. Sarah Johnson",
          relationship: "Primary Care Physician",
          phone: "(555) 987-6543",
          email: "s.johnson@healthcenter.org",
        },
      ],
      accessibilityNeeds: [
        "Wheelchair accessible entrance",
        "Large print materials",
        "Spanish language interpreter",
        "Hearing assistance",
      ],
      preferredLanguage: "Spanish",
      lastAssessment: "2024-01-10T14:30:00Z",
      nextVisit: "2024-01-20T11:00:00Z",
      caseWorker: {
        name: "Jennifer Martinez",
        phone: "(555) 456-7890",
        email: "j.martinez@communityservices.org",
      },
    }

    return NextResponse.json(mockHousehold)
  }

  // Return list of households based on filters
  const mockHouseholds = Array.from({ length: 50 }, (_, i) => ({
    id: `household-${i}`,
    address: `${1000 + i} ${["Main St", "Oak Ave", "Pine St", "Elm Dr", "Cedar Ln"][i % 5]}, Philadelphia, PA`,
    coordinates: [-75.1652 + (Math.random() - 0.5) * 0.1, 39.9526 + (Math.random() - 0.5) * 0.1] as [number, number],
    residents: Math.floor(Math.random() * 5) + 1,
    vulnerabilityScore: Math.floor(Math.random() * 40) + 50,
    riskLevel: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)],
    activeServices: Math.floor(Math.random() * 4),
    lastContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  return NextResponse.json({
    households: mockHouseholds,
    total: mockHouseholds.length,
    filters: { area, riskLevel },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { householdId, serviceType, scheduledDate, notes } = body

  // Mock service scheduling
  const newService: HouseholdService = {
    id: `service-${Date.now()}`,
    type: serviceType,
    status: "scheduled",
    provider: "Community Services",
    nextScheduled: scheduledDate,
    frequency: "as_needed",
    notes,
  }

  return NextResponse.json({
    success: true,
    service: newService,
    message: `${serviceType} scheduled successfully for ${scheduledDate}`,
  })
}
