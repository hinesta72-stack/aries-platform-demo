import { type NextRequest, NextResponse } from "next/server"

interface PredictionPoint {
  date: string
  predicted: number
  confidence_lower: number
  confidence_upper: number
  factors: {
    seasonal: number
    trend: number
    external_events: number
  }
}

interface PredictionData {
  region: string
  regionType: "state" | "county" | "zip"
  current_score: number
  predictions: PredictionPoint[]
  model_info: {
    model_type: "Prophet" | "XGBoost"
    accuracy: number
    last_trained: string
    features_used: string[]
  }
  scenarios?: {
    baseline: PredictionPoint[]
    disaster_impact: PredictionPoint[]
    mitigation_applied: PredictionPoint[]
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get("region")
  const type = searchParams.get("type") || "state"
  const days = Number.parseInt(searchParams.get("days") || "30")
  const includeScenarios = searchParams.get("scenarios") === "true"

  if (!region) {
    return NextResponse.json({ error: "Region parameter is required" }, { status: 400 })
  }

  const mockData: PredictionData = generateMockPredictions(
    region,
    type as "state" | "county" | "zip",
    days,
    includeScenarios,
  )

  return NextResponse.json(mockData)
}

function generateMockPredictions(
  region: string,
  type: "state" | "county" | "zip",
  days: number,
  includeScenarios: boolean,
): PredictionData {
  const currentScore = Math.floor(Math.random() * 40) + 50 // 50-90 range
  const predictions: PredictionPoint[] = []

  const today = new Date()

  for (let i = 1; i <= days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    // Generate realistic prediction with trend and noise
    const trendFactor = -0.1 * Math.sin(i / 10) // Slight cyclical trend
    const seasonalFactor = 2 * Math.sin((i / 365) * 2 * Math.PI) // Seasonal variation
    const randomNoise = (Math.random() - 0.5) * 3
    const externalEvents = i === 15 ? -5 : i === 25 ? 3 : 0 // Simulated events

    const predicted = Math.max(
      30,
      Math.min(90, currentScore + trendFactor + seasonalFactor + randomNoise + externalEvents),
    )

    const confidence_range = 3 + (i / days) * 5 // Confidence decreases over time

    predictions.push({
      date: date.toISOString().split("T")[0],
      predicted: Math.round(predicted * 10) / 10,
      confidence_lower: Math.round((predicted - confidence_range) * 10) / 10,
      confidence_upper: Math.round((predicted + confidence_range) * 10) / 10,
      factors: {
        seasonal: Math.round(seasonalFactor * 10) / 10,
        trend: Math.round(trendFactor * 10) / 10,
        external_events: externalEvents,
      },
    })
  }

  let scenarios = undefined
  if (includeScenarios) {
    scenarios = {
      baseline: predictions,
      disaster_impact: predictions.map((p) => ({
        ...p,
        predicted: Math.max(20, p.predicted - 15 - Math.random() * 10),
        confidence_lower: Math.max(15, p.confidence_lower - 20),
        confidence_upper: Math.max(25, p.confidence_upper - 10),
      })),
      mitigation_applied: predictions.map((p) => ({
        ...p,
        predicted: Math.min(95, p.predicted + 8 + Math.random() * 5),
        confidence_lower: Math.min(90, p.confidence_lower + 5),
        confidence_upper: Math.min(100, p.confidence_upper + 12),
      })),
    }
  }

  return {
    region,
    regionType: type,
    current_score: currentScore,
    predictions,
    model_info: {
      model_type: Math.random() > 0.5 ? "Prophet" : "XGBoost",
      accuracy: Math.round((85 + Math.random() * 10) * 10) / 10,
      last_trained: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      features_used: [
        "Historical resilience scores",
        "Weather patterns",
        "Economic indicators",
        "Infrastructure age",
        "Population density",
        "Emergency response metrics",
      ],
    },
    scenarios,
  }
}
