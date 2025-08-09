import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")

  // Simulate API response with mock data
  const mockScore = Math.floor(Math.random() * 35) + 50

  return NextResponse.json({
    location,
    score: mockScore,
    lastUpdated: new Date().toISOString(),
    riskFactors: ["Climate vulnerability", "Infrastructure age", "Economic stability", "Population density"],
  })
}
