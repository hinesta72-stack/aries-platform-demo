import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { stateCode: string } }) {
  const { stateCode } = params

  const recommendationsData: { [key: string]: any } = {
    pa: {
      recommendations: [
        {
          id: "infra-hardening",
          title: "Critical Infrastructure Hardening",
          description:
            "Upgrade aging water and power infrastructure to withstand extreme weather events and cyber threats.",
          priority: "High",
          cost: "$2.5M - $5M",
          timeline: "12-18 months",
          impact: "+15 resilience points",
          category: "Infrastructure",
          actionItems: [
            "Conduct comprehensive infrastructure assessment",
            "Upgrade water treatment facilities with backup power systems",
            "Install smart grid technology for power distribution",
            "Implement cybersecurity measures for critical systems",
            "Create redundant communication networks",
            "Establish emergency response protocols",
          ],
        },
        {
          id: "emergency-preparedness",
          title: "Community Emergency Preparedness Program",
          description: "Establish neighborhood-level emergency response teams and communication networks.",
          priority: "High",
          cost: "$500K - $1M",
          timeline: "6-12 months",
          impact: "+12 resilience points",
          category: "Community",
          actionItems: [
            "Train community emergency response teams",
            "Install emergency communication systems",
            "Create neighborhood emergency supply caches",
            "Develop evacuation and shelter plans",
            "Conduct regular emergency drills",
            "Establish partnerships with local organizations",
          ],
        },
        {
          id: "flood-mitigation",
          title: "Flood Mitigation and Stormwater Management",
          description: "Implement green infrastructure and flood control measures to reduce flood risk.",
          priority: "Medium",
          cost: "$1M - $3M",
          timeline: "18-24 months",
          impact: "+10 resilience points",
          category: "Environment",
          actionItems: [
            "Install permeable pavement and rain gardens",
            "Upgrade stormwater drainage systems",
            "Create flood barriers and retention ponds",
            "Implement early warning systems",
            "Restore natural floodplains",
            "Educate residents on flood preparedness",
          ],
        },
        {
          id: "economic-diversification",
          title: "Economic Diversification Initiative",
          description: "Support local businesses and create economic resilience through diversification.",
          priority: "Medium",
          cost: "$750K - $2M",
          timeline: "12-36 months",
          impact: "+8 resilience points",
          category: "Economic",
          actionItems: [
            "Provide small business development grants",
            "Create business incubator programs",
            "Support local supply chain development",
            "Establish emergency business continuity funds",
            "Promote remote work capabilities",
            "Develop skills training programs",
          ],
        },
      ],
    },
    default: {
      recommendations: [
        {
          id: "general-preparedness",
          title: "General Emergency Preparedness",
          description: "Basic emergency preparedness measures for community resilience.",
          priority: "High",
          cost: "$100K - $500K",
          timeline: "6-12 months",
          impact: "+5 resilience points",
          category: "General",
          actionItems: [
            "Create emergency response plans",
            "Establish communication systems",
            "Train community volunteers",
            "Build emergency supply reserves",
          ],
        },
      ],
    },
  }

  const data = recommendationsData[stateCode.toLowerCase()] || recommendationsData.default

  return NextResponse.json(data)
}
