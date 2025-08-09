import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get("state") || "Pennsylvania"
  const county = searchParams.get("county")
  const zipCode = searchParams.get("zip")

  // Mock data generation
  const generateRiskFactors = () => [
    {
      id: "flood-risk",
      name: "Flood Risk",
      score: Math.floor(Math.random() * 30) + 60,
      trend: "increasing" as const,
      trendValue: 5.2,
      confidence: 88,
      forecastScore: Math.floor(Math.random() * 30) + 70,
      lastUpdated: "2024-01-15T10:30:00Z",
      sparklineData: [65, 68, 72, 75, 78, 82, 85],
      subFactors: [
        {
          name: "River Overflow",
          score: 75,
          impact: "high" as const,
          description: "Risk of river overflow during heavy rainfall",
        },
        {
          name: "Storm Drainage",
          score: 60,
          impact: "medium" as const,
          description: "Capacity of storm drainage systems",
        },
      ],
      recommendations: [
        {
          title: "Improve Drainage Infrastructure",
          description: "Upgrade storm drainage systems to handle increased rainfall",
          costAvoidance: 2500000,
          priority: "high" as const,
          timeframe: "6-12 months",
        },
      ],
    },
    {
      id: "wildfire-risk",
      name: "Wildfire Risk",
      score: Math.floor(Math.random() * 25) + 45,
      trend: "stable" as const,
      trendValue: 0.8,
      confidence: 92,
      forecastScore: Math.floor(Math.random() * 25) + 50,
      lastUpdated: "2024-01-15T10:30:00Z",
      sparklineData: [45, 47, 46, 48, 47, 49, 48],
      subFactors: [
        {
          name: "Vegetation Density",
          score: 55,
          impact: "medium" as const,
          description: "Density of flammable vegetation",
        },
      ],
      recommendations: [
        {
          title: "Vegetation Management",
          description: "Implement controlled burns and vegetation clearing",
          costAvoidance: 1800000,
          priority: "medium" as const,
          timeframe: "3-6 months",
        },
      ],
    },
  ]

  const riskCategories = [
    {
      id: "climate",
      name: "Climate Risk",
      icon: "cloud",
      color: "bg-red-500",
      averageScore: Math.floor(Math.random() * 30) + 65,
      factors: generateRiskFactors(),
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: "zap",
      color: "bg-orange-500",
      averageScore: Math.floor(Math.random() * 25) + 55,
      factors: generateRiskFactors(),
    },
    {
      id: "health",
      name: "Public Health",
      icon: "heart",
      color: "bg-yellow-500",
      averageScore: Math.floor(Math.random() * 20) + 45,
      factors: generateRiskFactors(),
    },
    {
      id: "economic",
      name: "Economic",
      icon: "dollar-sign",
      color: "bg-green-500",
      averageScore: Math.floor(Math.random() * 15) + 35,
      factors: generateRiskFactors(),
    },
    {
      id: "social",
      name: "Social",
      icon: "users",
      color: "bg-blue-500",
      averageScore: Math.floor(Math.random() * 20) + 40,
      factors: generateRiskFactors(),
    },
  ]

  const overallScore = Math.round(
    riskCategories.reduce((acc, cat) => acc + cat.averageScore, 0) / riskCategories.length,
  )

  const locationData = {
    state,
    county,
    zipCode,
    population: zipCode ? 25000 : county ? 1200000 : 12800000,
    area: zipCode ? "15.2 sq mi" : county ? "730 sq mi" : "46,055 sq mi",
  }

  const aiInsights = {
    summary: `Based on current data analysis, ${locationData.area} shows elevated risk levels in climate-related factors. The AI model predicts a 15% increase in flood risk over the next 30 days due to forecasted weather patterns. Infrastructure resilience scores indicate moderate vulnerability, particularly in storm drainage capacity.`,
    riskDistribution: [
      { name: "Climate", value: 35, color: "#ef4444" },
      { name: "Infrastructure", value: 25, color: "#f97316" },
      { name: "Health", value: 20, color: "#eab308" },
      { name: "Economic", value: 12, color: "#22c55e" },
      { name: "Social", value: 8, color: "#3b82f6" },
    ],
    keyInsights: [
      {
        id: "insight-1",
        type: "warning",
        title: "Elevated Flood Risk",
        description: "Heavy rainfall patterns indicate 65% probability of flooding in low-lying areas within 30 days.",
        confidence: 88,
        impact: "high",
        timeframe: "30 days",
      },
      {
        id: "insight-2",
        type: "trend",
        title: "Infrastructure Aging",
        description: "Critical infrastructure shows 12% degradation over past year, requiring immediate attention.",
        confidence: 92,
        impact: "medium",
        timeframe: "6 months",
      },
      {
        id: "insight-3",
        type: "opportunity",
        title: "Emergency Response Improvement",
        description: "Recent upgrades to emergency systems show 25% improvement in response times.",
        confidence: 85,
        impact: "medium",
        timeframe: "Current",
      },
    ],
    recommendations: [
      {
        id: "rec-1",
        type: "recommendation",
        title: "Implement Early Warning System",
        description: "Deploy IoT sensors for real-time flood monitoring and automated alerts.",
        confidence: 90,
        impact: "high",
        timeframe: "3-6 months",
        actionItems: [
          "Install water level sensors at 15 key locations",
          "Integrate with emergency alert system",
          "Train emergency response teams",
          "Conduct community awareness campaign",
        ],
      },
      {
        id: "rec-2",
        type: "recommendation",
        title: "Infrastructure Resilience Program",
        description: "Systematic upgrade of critical infrastructure to improve disaster resilience.",
        confidence: 85,
        impact: "high",
        timeframe: "12-18 months",
        actionItems: [
          "Assess current infrastructure vulnerabilities",
          "Prioritize upgrades based on risk assessment",
          "Secure funding for critical improvements",
          "Implement phased upgrade schedule",
        ],
      },
    ],
    predictions: {
      shortTerm: "Increased precipitation likely to elevate flood risk by 15-20% in vulnerable areas.",
      mediumTerm: "Infrastructure stress expected to increase due to aging systems and climate pressures.",
      longTerm: "Overall resilience improvement anticipated with planned infrastructure investments.",
    },
  }

  return NextResponse.json({
    categories: riskCategories,
    overallScore,
    location: locationData,
    aiInsights,
  })
}
