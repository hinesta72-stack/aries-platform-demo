import { type NextRequest, NextResponse } from "next/server"

interface ResilienceFactors {
  healthSystemStress: {
    hospitalCapacity: number
    chronicDiseasePrevalence: number
    healthcareAccess: number
    score: number
  }
  economicVulnerability: {
    medianIncome: number
    unemploymentRate: number
    housingInstability: number
    povertyRate: number
    score: number
  }
  infrastructureRisk: {
    gridReliability: number
    transportationCondition: number
    waterSystemAge: number
    broadbandAccess: number
    score: number
  }
  environmentalRisk: {
    floodRisk: number
    droughtRisk: number
    wildfireRisk: number
    stormFrequency: number
    score: number
  }
  emergencyResponse: {
    emsResponseTime: number
    cboDensity: number
    emergencyPlanningScore: number
    communityPreparedness: number
    score: number
  }
}

interface ResilienceData {
  region: string
  regionType: "state" | "county" | "zip"
  compositeScore: number
  factors: ResilienceFactors
  lastUpdated: string
  dataQuality: "high" | "medium" | "low"
  trend: "improving" | "stable" | "declining"
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get("region")
  const type = searchParams.get("type") || "state"

  if (!region) {
    return NextResponse.json({ error: "Region parameter is required" }, { status: 400 })
  }

  // Mock comprehensive resilience data
  const mockData: ResilienceData = generateMockResilienceData(region, type as "state" | "county" | "zip")

  return NextResponse.json(mockData)
}

function generateMockResilienceData(region: string, type: "state" | "county" | "zip"): ResilienceData {
  // Base scores with regional variation
  const baseVariation = Math.random() * 20 - 10 // -10 to +10 variation

  const healthSystemStress = {
    hospitalCapacity: Math.max(0, Math.min(100, 75 + baseVariation + Math.random() * 10)),
    chronicDiseasePrevalence: Math.max(0, Math.min(100, 65 + baseVariation + Math.random() * 15)),
    healthcareAccess: Math.max(0, Math.min(100, 70 + baseVariation + Math.random() * 12)),
    score: 0,
  }
  healthSystemStress.score = Math.round(
    (healthSystemStress.hospitalCapacity +
      healthSystemStress.healthcareAccess +
      (100 - healthSystemStress.chronicDiseasePrevalence)) /
      3,
  )

  const economicVulnerability = {
    medianIncome: Math.max(25000, 55000 + baseVariation * 1000 + Math.random() * 20000),
    unemploymentRate: Math.max(2, Math.min(15, 6 + baseVariation * 0.3 + Math.random() * 3)),
    housingInstability: Math.max(5, Math.min(40, 15 + baseVariation * 0.5 + Math.random() * 8)),
    povertyRate: Math.max(5, Math.min(30, 12 + baseVariation * 0.4 + Math.random() * 6)),
    score: 0,
  }
  economicVulnerability.score = Math.round(
    100 -
      ((economicVulnerability.unemploymentRate * 2 +
        economicVulnerability.housingInstability +
        economicVulnerability.povertyRate) /
        4) *
        2,
  )

  const infrastructureRisk = {
    gridReliability: Math.max(60, Math.min(95, 80 + baseVariation + Math.random() * 8)),
    transportationCondition: Math.max(50, Math.min(90, 70 + baseVariation + Math.random() * 10)),
    waterSystemAge: Math.max(40, Math.min(85, 65 + baseVariation + Math.random() * 12)),
    broadbandAccess: Math.max(70, Math.min(98, 85 + baseVariation + Math.random() * 6)),
    score: 0,
  }
  infrastructureRisk.score = Math.round(
    (infrastructureRisk.gridReliability +
      infrastructureRisk.transportationCondition +
      infrastructureRisk.waterSystemAge +
      infrastructureRisk.broadbandAccess) /
      4,
  )

  const environmentalRisk = {
    floodRisk: Math.max(10, Math.min(90, 35 + baseVariation + Math.random() * 20)),
    droughtRisk: Math.max(10, Math.min(80, 30 + baseVariation + Math.random() * 15)),
    wildfireRisk: Math.max(5, Math.min(85, 25 + baseVariation + Math.random() * 25)),
    stormFrequency: Math.max(15, Math.min(75, 40 + baseVariation + Math.random() * 18)),
    score: 0,
  }
  environmentalRisk.score = Math.round(
    100 -
      (environmentalRisk.floodRisk +
        environmentalRisk.droughtRisk +
        environmentalRisk.wildfireRisk +
        environmentalRisk.stormFrequency) /
        4,
  )

  const emergencyResponse = {
    emsResponseTime: Math.max(4, Math.min(15, 8 + baseVariation * 0.2 + Math.random() * 3)),
    cboDensity: Math.max(2, Math.min(20, 8 + baseVariation * 0.3 + Math.random() * 4)),
    emergencyPlanningScore: Math.max(40, Math.min(95, 70 + baseVariation + Math.random() * 12)),
    communityPreparedness: Math.max(45, Math.min(90, 65 + baseVariation + Math.random() * 10)),
    score: 0,
  }
  emergencyResponse.score = Math.round(
    (100 -
      emergencyResponse.emsResponseTime * 5 +
      emergencyResponse.cboDensity * 3 +
      emergencyResponse.emergencyPlanningScore +
      emergencyResponse.communityPreparedness) /
      4,
  )

  const compositeScore = Math.round(
    (healthSystemStress.score +
      economicVulnerability.score +
      infrastructureRisk.score +
      environmentalRisk.score +
      emergencyResponse.score) /
      5,
  )

  return {
    region,
    regionType: type,
    compositeScore,
    factors: {
      healthSystemStress,
      economicVulnerability,
      infrastructureRisk,
      environmentalRisk,
      emergencyResponse,
    },
    lastUpdated: new Date().toISOString(),
    dataQuality: compositeScore > 70 ? "high" : compositeScore > 50 ? "medium" : "low",
    trend: compositeScore > 65 ? "improving" : compositeScore > 45 ? "stable" : "declining",
  }
}
