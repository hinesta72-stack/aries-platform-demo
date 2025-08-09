import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { code: string; countyName: string } }) {
  const { code, countyName } = params

  // Enhanced ZIP code data by county
  const zipCodeData: { [key: string]: { [key: string]: any } } = {
    pa: {
      allegheny: {
        name: "Allegheny County",
        state: "Pennsylvania",
        resilienceIndex: 68,
        population: 1250578,
        zipCodes: [
          { code: "15201", name: "Lawrenceville", resilienceIndex: 72, population: 8420, riskLevel: "Low" },
          { code: "15213", name: "Oakland", resilienceIndex: 69, population: 12350, riskLevel: "Medium" },
          { code: "15232", name: "Shadyside", resilienceIndex: 75, population: 9180, riskLevel: "Low" },
          { code: "15224", name: "East Liberty", resilienceIndex: 61, population: 7890, riskLevel: "High" },
          { code: "15206", name: "East End", resilienceIndex: 66, population: 11200, riskLevel: "Medium" },
          { code: "15222", name: "Downtown", resilienceIndex: 58, population: 3450, riskLevel: "High" },
          { code: "15217", name: "Squirrel Hill", resilienceIndex: 73, population: 14560, riskLevel: "Low" },
          { code: "15208", name: "Point Breeze", resilienceIndex: 70, population: 6780, riskLevel: "Low" },
          { code: "15219", name: "Hill District", resilienceIndex: 54, population: 8920, riskLevel: "High" },
          { code: "15212", name: "Allegheny", resilienceIndex: 63, population: 9340, riskLevel: "Medium" },
        ],
      },
      philadelphia: {
        name: "Philadelphia County",
        state: "Pennsylvania",
        resilienceIndex: 62,
        population: 1584064,
        zipCodes: [
          { code: "19102", name: "Center City", resilienceIndex: 65, population: 12450, riskLevel: "Medium" },
          { code: "19103", name: "Rittenhouse Square", resilienceIndex: 78, population: 8920, riskLevel: "Low" },
          { code: "19104", name: "University City", resilienceIndex: 67, population: 15670, riskLevel: "Medium" },
          { code: "19106", name: "Old City", resilienceIndex: 71, population: 6780, riskLevel: "Low" },
          { code: "19107", name: "Society Hill", resilienceIndex: 74, population: 5430, riskLevel: "Low" },
          { code: "19111", name: "Fox Chase", resilienceIndex: 69, population: 18920, riskLevel: "Medium" },
          { code: "19114", name: "Pennypack", resilienceIndex: 66, population: 22340, riskLevel: "Medium" },
          { code: "19120", name: "Olney", resilienceIndex: 58, population: 28450, riskLevel: "High" },
          { code: "19124", name: "Frankford", resilienceIndex: 55, population: 31200, riskLevel: "High" },
          { code: "19134", name: "Kensington", resilienceIndex: 52, population: 24680, riskLevel: "High" },
          { code: "19140", name: "Nicetown", resilienceIndex: 54, population: 19870, riskLevel: "High" },
          { code: "19145", name: "South Philadelphia", resilienceIndex: 61, population: 26540, riskLevel: "High" },
        ],
      },
      montgomery: {
        name: "Montgomery County",
        state: "Pennsylvania",
        resilienceIndex: 72,
        population: 856553,
        zipCodes: [
          { code: "19401", name: "Norristown", resilienceIndex: 68, population: 34450, riskLevel: "Medium" },
          { code: "19403", name: "Norristown", resilienceIndex: 70, population: 28920, riskLevel: "Low" },
          { code: "19426", name: "Collegeville", resilienceIndex: 76, population: 12340, riskLevel: "Low" },
          { code: "19428", name: "Conshohocken", resilienceIndex: 74, population: 8760, riskLevel: "Low" },
          { code: "19446", name: "Lansdale", resilienceIndex: 72, population: 16890, riskLevel: "Low" },
          { code: "19462", name: "Plymouth Meeting", resilienceIndex: 77, population: 6540, riskLevel: "Low" },
          { code: "19468", name: "Royersford", resilienceIndex: 71, population: 4890, riskLevel: "Low" },
          { code: "19473", name: "Schwenksville", resilienceIndex: 73, population: 3210, riskLevel: "Low" },
        ],
      },
      bucks: {
        name: "Bucks County",
        state: "Pennsylvania",
        resilienceIndex: 70,
        population: 646538,
        zipCodes: [
          { code: "18901", name: "Doylestown", resilienceIndex: 75, population: 8340, riskLevel: "Low" },
          { code: "18902", name: "Doylestown", resilienceIndex: 74, population: 12560, riskLevel: "Low" },
          { code: "18914", name: "Chalfont", resilienceIndex: 73, population: 4120, riskLevel: "Low" },
          { code: "18936", name: "Furlong", resilienceIndex: 76, population: 2890, riskLevel: "Low" },
          { code: "18940", name: "Newtown", resilienceIndex: 72, population: 11450, riskLevel: "Low" },
          { code: "19020", name: "Bensalem", resilienceIndex: 67, population: 60427, riskLevel: "Medium" },
        ],
      },
      chester: {
        name: "Chester County",
        state: "Pennsylvania",
        resilienceIndex: 74,
        population: 534413,
        zipCodes: [
          { code: "19301", name: "Paoli", resilienceIndex: 78, population: 5670, riskLevel: "Low" },
          { code: "19312", name: "Berwyn", resilienceIndex: 79, population: 3450, riskLevel: "Low" },
          { code: "19320", name: "Coatesville", resilienceIndex: 65, population: 13100, riskLevel: "Medium" },
          { code: "19335", name: "Downingtown", resilienceIndex: 76, population: 7891, riskLevel: "Low" },
          { code: "19348", name: "Kennett Square", resilienceIndex: 72, population: 6072, riskLevel: "Low" },
          { code: "19380", name: "West Chester", resilienceIndex: 77, population: 18461, riskLevel: "Low" },
        ],
      },
      delaware: {
        name: "Delaware County",
        state: "Pennsylvania",
        resilienceIndex: 65,
        population: 576830,
        zipCodes: [
          { code: "19008", name: "Broomall", resilienceIndex: 71, population: 10890, riskLevel: "Low" },
          { code: "19010", name: "Bryn Mawr", resilienceIndex: 78, population: 4380, riskLevel: "Low" },
          { code: "19018", name: "Clifton Heights", resilienceIndex: 62, population: 6780, riskLevel: "High" },
          { code: "19023", name: "Darby", resilienceIndex: 58, population: 10687, riskLevel: "High" },
          { code: "19029", name: "Essington", resilienceIndex: 60, population: 4719, riskLevel: "High" },
          { code: "19063", name: "Media", resilienceIndex: 74, population: 5327, riskLevel: "Low" },
          { code: "19064", name: "Springfield", resilienceIndex: 73, population: 23677, riskLevel: "Low" },
          { code: "19081", name: "Swarthmore", resilienceIndex: 79, population: 6194, riskLevel: "Low" },
          { code: "19086", name: "Upper Darby", resilienceIndex: 64, population: 82795, riskLevel: "Medium" },
          { code: "19094", name: "Swarthmore", resilienceIndex: 77, population: 3456, riskLevel: "Low" },
        ],
      },
      lancaster: {
        name: "Lancaster County",
        state: "Pennsylvania",
        resilienceIndex: 69,
        population: 552984,
        zipCodes: [
          { code: "17601", name: "Lancaster", resilienceIndex: 66, population: 59322, riskLevel: "Medium" },
          { code: "17602", name: "Lancaster", resilienceIndex: 68, population: 28450, riskLevel: "Medium" },
          { code: "17603", name: "Lancaster", resilienceIndex: 70, population: 31200, riskLevel: "Low" },
          { code: "17543", name: "Lititz", resilienceIndex: 74, population: 9369, riskLevel: "Low" },
          { code: "17545", name: "Manheim", resilienceIndex: 71, population: 4858, riskLevel: "Low" },
          { code: "17554", name: "Mount Joy", resilienceIndex: 72, population: 8054, riskLevel: "Low" },
          { code: "17566", name: "Paradise", resilienceIndex: 69, population: 1129, riskLevel: "Medium" },
        ],
      },
      york: {
        name: "York County",
        state: "Pennsylvania",
        resilienceIndex: 67,
        population: 456438,
        zipCodes: [
          { code: "17401", name: "York", resilienceIndex: 63, population: 43718, riskLevel: "Medium" },
          { code: "17402", name: "York", resilienceIndex: 65, population: 28920, riskLevel: "Medium" },
          { code: "17403", name: "York", resilienceIndex: 68, population: 22340, riskLevel: "Medium" },
          { code: "17404", name: "York", resilienceIndex: 66, population: 31450, riskLevel: "Medium" },
          { code: "17406", name: "York", resilienceIndex: 69, population: 18760, riskLevel: "Medium" },
          { code: "17408", name: "York", resilienceIndex: 64, population: 24680, riskLevel: "Medium" },
          { code: "17325", name: "Hanover", resilienceIndex: 70, population: 15289, riskLevel: "Low" },
          { code: "17331", name: "Red Lion", resilienceIndex: 68, population: 6373, riskLevel: "Medium" },
        ],
      },
    },
  }

  const stateData = zipCodeData[code.toLowerCase()]
  if (!stateData) {
    return NextResponse.json({ error: "State not found" }, { status: 404 })
  }

  const countyData = stateData[countyName.toLowerCase()]
  if (!countyData) {
    return NextResponse.json({ error: "County not found" }, { status: 404 })
  }

  return NextResponse.json(countyData)
}
