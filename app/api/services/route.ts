import { type NextRequest, NextResponse } from "next/server"

interface ServiceProvider {
  id: string
  name: string
  type: "food" | "health" | "transportation" | "utilities" | "social"
  services: string[]
  coverage: string[]
  capacity: number
  currentLoad: number
  contact: {
    phone: string
    email: string
    address: string
  }
  availability: {
    days: string[]
    hours: string
    emergency: boolean
  }
}

interface ServiceRequest {
  id: string
  householdId: string
  serviceType: string
  priority: "low" | "medium" | "high" | "emergency"
  status: "requested" | "assigned" | "in_progress" | "completed" | "cancelled"
  requestedDate: string
  scheduledDate?: string
  assignedProvider?: string
  notes?: string
  estimatedDuration?: number
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const area = searchParams.get("area")

  if (type === "providers") {
    const mockProviders: ServiceProvider[] = [
      {
        id: "provider-1",
        name: "Community Kitchen Network",
        type: "food",
        services: ["Meal delivery", "Food pantry", "Nutrition counseling"],
        coverage: ["Philadelphia", "Camden", "Chester"],
        capacity: 500,
        currentLoad: 342,
        contact: {
          phone: "(555) 123-4567",
          email: "info@communitykitchen.org",
          address: "123 Service St, Philadelphia, PA",
        },
        availability: {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          hours: "8:00 AM - 6:00 PM",
          emergency: false,
        },
      },
      {
        id: "provider-2",
        name: "Mobile Health Services",
        type: "health",
        services: ["Home health visits", "Medication management", "Health screenings"],
        coverage: ["Philadelphia County"],
        capacity: 200,
        currentLoad: 156,
        contact: {
          phone: "(555) 987-6543",
          email: "dispatch@mobilehealthservices.org",
          address: "456 Health Ave, Philadelphia, PA",
        },
        availability: {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          hours: "7:00 AM - 8:00 PM",
          emergency: true,
        },
      },
      {
        id: "provider-3",
        name: "Community Transport",
        type: "transportation",
        services: ["Medical appointments", "Grocery shopping", "Social services"],
        coverage: ["Greater Philadelphia"],
        capacity: 100,
        currentLoad: 78,
        contact: {
          phone: "(555) 456-7890",
          email: "rides@communitytransport.org",
          address: "789 Transit Blvd, Philadelphia, PA",
        },
        availability: {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          hours: "6:00 AM - 10:00 PM",
          emergency: false,
        },
      },
    ]

    return NextResponse.json({
      providers: mockProviders.filter((p) => !type || p.type === type),
      total: mockProviders.length,
    })
  }

  // Return service requests
  const mockRequests: ServiceRequest[] = [
    {
      id: "req-1",
      householdId: "household-1",
      serviceType: "meal_delivery",
      priority: "high",
      status: "assigned",
      requestedDate: "2024-01-15T09:00:00Z",
      scheduledDate: "2024-01-16T12:00:00Z",
      assignedProvider: "provider-1",
      notes: "Diabetic-friendly meals required",
      estimatedDuration: 30,
    },
    {
      id: "req-2",
      householdId: "household-2",
      serviceType: "wellness_check",
      priority: "medium",
      status: "in_progress",
      requestedDate: "2024-01-15T10:30:00Z",
      scheduledDate: "2024-01-15T14:00:00Z",
      assignedProvider: "provider-2",
      estimatedDuration: 45,
    },
    {
      id: "req-3",
      householdId: "household-3",
      serviceType: "transportation",
      priority: "low",
      status: "requested",
      requestedDate: "2024-01-15T11:15:00Z",
      notes: "Medical appointment transport needed",
    },
  ]

  return NextResponse.json({
    requests: mockRequests,
    total: mockRequests.length,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { householdId, serviceType, priority, notes, requestedDate } = body

  const newRequest: ServiceRequest = {
    id: `req-${Date.now()}`,
    householdId,
    serviceType,
    priority: priority || "medium",
    status: "requested",
    requestedDate: requestedDate || new Date().toISOString(),
    notes,
    estimatedDuration: 60,
  }

  return NextResponse.json({
    success: true,
    request: newRequest,
    message: "Service request submitted successfully",
  })
}
