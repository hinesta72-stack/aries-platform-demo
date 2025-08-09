import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  const stateCode = params.code.toUpperCase()

  // Enhanced state mapping to handle both codes and full names
  const stateNames: { [key: string]: string } = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
    // Handle full state names in URLs
    PENNSYLVANIA: "Pennsylvania",
    CALIFORNIA: "California",
    TEXAS: "Texas",
    FLORIDA: "Florida",
    NEWYORK: "New York",
    "NEW YORK": "New York",
  }

  // Convert full state name to code if needed
  const getStateCode = (input: string): string => {
    const nameToCode: { [key: string]: string } = {
      PENNSYLVANIA: "PA",
      CALIFORNIA: "CA",
      TEXAS: "TX",
      FLORIDA: "FL",
      "NEW YORK": "NY",
      NEWYORK: "NY",
      ILLINOIS: "IL",
      OHIO: "OH",
      GEORGIA: "GA",
      "NORTH CAROLINA": "NC",
      NORTHCAROLINA: "NC",
      MICHIGAN: "MI",
    }
    return nameToCode[input.toUpperCase()] || input.toUpperCase()
  }

  const actualStateCode = getStateCode(params.code)
  const stateName = stateNames[actualStateCode] || stateNames[params.code.toUpperCase()] || "Unknown State"

  // Enhanced county data by state
  const countyData: { [key: string]: Array<{ name: string; resilienceIndex: number; highRiskZips: number }> } = {
    PA: [
      { name: "Allegheny County", resilienceIndex: 68, highRiskZips: 12 },
      { name: "Philadelphia County", resilienceIndex: 62, highRiskZips: 18 },
      { name: "Montgomery County", resilienceIndex: 72, highRiskZips: 8 },
      { name: "Bucks County", resilienceIndex: 70, highRiskZips: 6 },
      { name: "Chester County", resilienceIndex: 74, highRiskZips: 4 },
      { name: "Delaware County", resilienceIndex: 65, highRiskZips: 10 },
      { name: "Lancaster County", resilienceIndex: 69, highRiskZips: 7 },
      { name: "York County", resilienceIndex: 67, highRiskZips: 9 },
      { name: "Dauphin County", resilienceIndex: 66, highRiskZips: 8 },
      { name: "Lehigh County", resilienceIndex: 63, highRiskZips: 11 },
      { name: "Northampton County", resilienceIndex: 64, highRiskZips: 9 },
      { name: "Erie County", resilienceIndex: 59, highRiskZips: 14 },
      { name: "Luzerne County", resilienceIndex: 60, highRiskZips: 13 },
      { name: "Lackawanna County", resilienceIndex: 58, highRiskZips: 15 },
      { name: "Berks County", resilienceIndex: 65, highRiskZips: 10 },
      { name: "Cumberland County", resilienceIndex: 71, highRiskZips: 5 },
      { name: "Butler County", resilienceIndex: 68, highRiskZips: 7 },
      { name: "Westmoreland County", resilienceIndex: 64, highRiskZips: 11 },
      { name: "Washington County", resilienceIndex: 62, highRiskZips: 12 },
      { name: "Armstrong County", resilienceIndex: 61, highRiskZips: 8 },
    ],
    CA: [
      { name: "Los Angeles County", resilienceIndex: 58, highRiskZips: 45 },
      { name: "San Diego County", resilienceIndex: 64, highRiskZips: 22 },
      { name: "Orange County", resilienceIndex: 66, highRiskZips: 18 },
      { name: "Riverside County", resilienceIndex: 61, highRiskZips: 28 },
      { name: "San Bernardino County", resilienceIndex: 59, highRiskZips: 32 },
      { name: "Santa Clara County", resilienceIndex: 71, highRiskZips: 15 },
    ],
    TX: [
      { name: "Harris County", resilienceIndex: 59, highRiskZips: 38 },
      { name: "Dallas County", resilienceIndex: 62, highRiskZips: 25 },
      { name: "Tarrant County", resilienceIndex: 64, highRiskZips: 20 },
      { name: "Bexar County", resilienceIndex: 61, highRiskZips: 22 },
      { name: "Travis County", resilienceIndex: 67, highRiskZips: 16 },
      { name: "Collin County", resilienceIndex: 69, highRiskZips: 12 },
    ],
  }

  const mockData = {
    name: stateName,
    code: actualStateCode,
    resilienceIndex: Math.floor(Math.random() * 25) + 55,
    trend: (Math.random() - 0.5) * 6, // -3 to +3
    confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
    riskFactors: [
      "Extreme Weather Events",
      "Infrastructure Vulnerability",
      "Economic Instability",
      "Population Density",
      "Climate Change Impact",
    ],
    counties: countyData[actualStateCode] || [
      { name: "County A", resilienceIndex: 65, highRiskZips: 8 },
      { name: "County B", resilienceIndex: 58, highRiskZips: 12 },
      { name: "County C", resilienceIndex: 71, highRiskZips: 5 },
      { name: "County D", resilienceIndex: 63, highRiskZips: 9 },
    ],
  }

  return NextResponse.json(mockData)
}
