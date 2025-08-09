"use client"

import ZoomableUSMap from "./ZoomableUSMap"

interface USMapProps {
  onStateClick: (stateCode: string) => void
  highlightedStates?: string[]
  showRiskColors?: boolean
}

export default function USMap(props: USMapProps) {
  return <ZoomableUSMap {...props} />
}
