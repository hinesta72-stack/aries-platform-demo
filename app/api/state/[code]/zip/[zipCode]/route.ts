import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { code: string; zipCode: string } }) {
  const { code, zipCode } = params

  const mockData = {
    zipCode,
    state: code.toUpperCase(),
    resilienceIndex: Math.floor(Math.random() * 35) + 50,
    population: Math.floor(Math.random() * 50000) + 10000,
  }

  return NextResponse.json(mockData)
}
