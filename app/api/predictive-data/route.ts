import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get("level") || "national"
  const location = searchParams.get("location") || "United States"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock predictive data based on level
  const mockData = {
    national: {
      topRiskFactors: [
        {
          name: "Climate Change Impact",
          impact: 85,
          trend: "increasing",
          category: "environmental",
          description: "Rising temperatures and extreme weather events affecting infrastructure and agriculture",
          confidence: 92,
        },
        {
          name: "Healthcare System Strain",
          impact: 78,
          trend: "increasing",
          category: "health",
          description: "Aging population and resource constraints impacting healthcare delivery capacity",
          confidence: 88,
        },
        {
          name: "Infrastructure Aging",
          impact: 72,
          trend: "stable",
          category: "infrastructure",
          description: "Critical infrastructure reaching end-of-life requiring significant investment",
          confidence: 85,
        },
        {
          name: "Economic Inequality",
          impact: 68,
          trend: "increasing",
          category: "economic",
          description: "Growing wealth gap affecting community resilience and social stability",
          confidence: 82,
        },
        {
          name: "Social Fragmentation",
          impact: 64,
          trend: "stable",
          category: "social",
          description: "Declining social cohesion and community engagement levels",
          confidence: 79,
        },
      ],
      recommendations: [
        {
          id: "rec-1",
          title: "Climate Adaptation Infrastructure",
          description:
            "Invest in climate-resilient infrastructure including flood barriers, upgraded drainage systems, and renewable energy grid modernization",
          priority: "high",
          timeframe: "12-18 months",
          costAvoidance: 15200000,
          confidence: 89,
          category: "infrastructure",
          actionItems: [
            "Conduct comprehensive climate vulnerability assessment",
            "Develop climate adaptation master plan",
            "Secure federal and state funding for infrastructure upgrades",
            "Begin implementation of priority flood protection measures",
          ],
          expectedImpact: 25,
        },
        {
          id: "rec-2",
          title: "Healthcare System Capacity Building",
          description:
            "Expand healthcare workforce, improve telemedicine capabilities, and strengthen emergency medical response systems",
          priority: "high",
          timeframe: "6-12 months",
          costAvoidance: 8900000,
          confidence: 85,
          category: "health",
          actionItems: [
            "Launch healthcare workforce recruitment and training programs",
            "Implement comprehensive telemedicine platform",
            "Upgrade emergency medical equipment and facilities",
            "Establish regional healthcare coordination protocols",
          ],
          expectedImpact: 22,
        },
        {
          id: "rec-3",
          title: "Economic Diversification Initiative",
          description:
            "Support small business development, attract new industries, and create job training programs for emerging sectors",
          priority: "medium",
          timeframe: "18-24 months",
          costAvoidance: 12400000,
          confidence: 78,
          category: "economic",
          actionItems: [
            "Establish small business incubator programs",
            "Create tax incentives for new industry attraction",
            "Develop workforce retraining programs",
            "Build public-private partnerships for economic development",
          ],
          expectedImpact: 18,
        },
      ],
      narrative: {
        summary:
          "The United States faces a complex resilience landscape characterized by accelerating climate impacts, healthcare system pressures, and infrastructure challenges. Current resilience index of 74 reflects moderate preparedness with significant regional variations. AI analysis indicates declining trajectory without immediate intervention, with potential 6.8% decrease over next 90 days.",
        keyFindings: [
          "Climate change impacts are accelerating faster than adaptation measures, particularly affecting coastal and wildfire-prone regions",
          "Healthcare system capacity is approaching critical thresholds in 23 states, with rural areas most vulnerable",
          "Infrastructure investment gap of $2.6 trillion creates cascading vulnerabilities across multiple resilience domains",
          "Economic inequality is reducing community-level resilience, with 40% of households lacking emergency savings",
          "Social cohesion metrics show concerning decline in civic engagement and community preparedness",
        ],
        riskAssessment:
          "Current risk profile indicates heightened vulnerability to compound disasters. Primary concerns include simultaneous climate events overwhelming response capacity, healthcare system collapse during peak demand periods, and economic disruption from infrastructure failures. Regional disparities create uneven resilience landscape with Southern and Western states showing highest vulnerability scores.",
        recommendations:
          "Immediate focus required on climate adaptation infrastructure, healthcare capacity building, and economic diversification. Federal coordination essential for addressing cross-state vulnerabilities. Community-level interventions should prioritize social cohesion and local preparedness capabilities. Investment in predictive analytics and early warning systems critical for proactive response.",
        outlook:
          "Without intervention, resilience index projected to decline to 67 within 90 days, reaching critical threshold. Implementation of high-priority recommendations could stabilize index at 72-75 range. Long-term trajectory depends on sustained investment in adaptation measures and community resilience building. Climate impacts will continue accelerating, requiring adaptive management approaches.",
        confidence: 88,
        lastUpdated: "2 hours ago",
      },
    },
  }

  return NextResponse.json(mockData[level as keyof typeof mockData] || mockData.national)
}
