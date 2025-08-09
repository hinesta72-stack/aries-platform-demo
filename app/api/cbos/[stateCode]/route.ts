import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { stateCode: string } }) {
  const { stateCode } = params

  const cboData: { [key: string]: any } = {
    pa: {
      organizations: [
        {
          id: "pa-red-cross",
          name: "Pennsylvania Red Cross",
          description:
            "Provides emergency assistance, disaster relief, and preparedness education throughout Pennsylvania.",
          services: [
            "Emergency shelter and food assistance",
            "Disaster preparedness training",
            "Blood donation services",
            "First aid and CPR certification",
            "Emergency communication services",
            "Volunteer coordination",
          ],
          contact: {
            phone: "(717) 234-2500",
            email: "info@redcross-pa.org",
            website: "www.redcross.org/pa",
            address: "2151 N Front St, Harrisburg, PA 17110",
          },
          focus: ["Emergency Response", "Disaster Relief", "Community Preparedness", "Health Services"],
          established: 1881,
          volunteers: 2500,
        },
        {
          id: "pa-emergency-mgmt",
          name: "PA Emergency Management Agency",
          description:
            "State agency coordinating emergency preparedness, response, and recovery efforts across Pennsylvania.",
          services: [
            "Emergency planning and coordination",
            "Hazard mitigation programs",
            "Public warning systems",
            "Emergency training and exercises",
            "Grant administration",
            "Interagency coordination",
          ],
          contact: {
            phone: "(717) 651-2001",
            email: "info@pema.pa.gov",
            website: "www.pema.pa.gov",
            address: "2605 Interstate Dr, Harrisburg, PA 17110",
          },
          focus: ["Emergency Management", "Public Safety", "Hazard Mitigation", "Training"],
          established: 1950,
          volunteers: 500,
        },
        {
          id: "salvation-army-pa",
          name: "Salvation Army Pennsylvania",
          description:
            "Faith-based organization providing social services and emergency assistance to communities in need.",
          services: [
            "Emergency food and shelter",
            "Disaster relief services",
            "Social services programs",
            "Youth and family programs",
            "Addiction recovery services",
            "Community outreach",
          ],
          contact: {
            phone: "(717) 787-2600",
            email: "pa.division@use.salvationarmy.org",
            website: "www.salvationarmypa.org",
            address: "700 N High St, Harrisburg, PA 17102",
          },
          focus: ["Social Services", "Emergency Relief", "Community Support", "Faith-Based"],
          established: 1865,
          volunteers: 1800,
        },
        {
          id: "pa-community-orgs",
          name: "PA Association of Community Organizations",
          description:
            "Network of community-based organizations working to strengthen neighborhoods and build resilience.",
          services: [
            "Community organizing and advocacy",
            "Neighborhood development programs",
            "Leadership training",
            "Policy advocacy",
            "Resource coordination",
            "Capacity building",
          ],
          contact: {
            phone: "(215) 423-9711",
            email: "info@paco.org",
            website: "www.paco.org",
            address: "1315 Walnut St, Philadelphia, PA 19107",
          },
          focus: ["Community Development", "Advocacy", "Leadership", "Neighborhood Building"],
          established: 1970,
          volunteers: 3200,
        },
      ],
    },
    default: {
      organizations: [
        {
          id: "local-emergency",
          name: "Local Emergency Services",
          description: "Community-based emergency response and preparedness organization.",
          services: ["Emergency response", "Community preparedness", "Volunteer training", "Public education"],
          contact: {
            phone: "(555) 123-4567",
            email: "info@localemergency.org",
            website: "www.localemergency.org",
            address: "123 Main St, Anytown, USA",
          },
          focus: ["Emergency Response", "Community Preparedness"],
          established: 2000,
          volunteers: 100,
        },
      ],
    },
  }

  const data = cboData[stateCode.toLowerCase()] || cboData.default

  return NextResponse.json(data)
}
