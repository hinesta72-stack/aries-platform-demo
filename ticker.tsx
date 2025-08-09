"use client"

import { useEffect, useState } from "react"

interface TickerProps {
  items?: string[]
  speed?: number
  className?: string
}

export default function Ticker({
  items = [
    "🚀 Welcome to our platform!",
    "📈 Stock prices are up 15% today",
    "🎉 New features released this week",
    "💡 Join our community of 10,000+ users",
    "🔥 Limited time offer - 50% off premium plans",
    "📱 Mobile app now available on iOS and Android",
    "🌟 Rated #1 by industry experts",
    "💼 Enterprise solutions now available",
  ],
  speed = 50,
  className = "",
}: TickerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const tickerContent = items.join(" • ")
  const duplicatedContent = `${tickerContent} • ${tickerContent}`

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 overflow-hidden ${className}`}>
      <div
        className="whitespace-nowrap animate-scroll"
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <span className="text-sm font-medium px-4">{duplicatedContent}</span>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation-name: scroll;
        }
      `}</style>
    </div>
  )
}
