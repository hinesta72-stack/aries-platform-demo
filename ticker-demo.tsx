"use client"

import Ticker from "./ticker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TickerDemo() {
  const newsItems = [
    "🎯 Breaking: New AI breakthrough announced",
    "💰 Market closes at record high",
    "🌍 Global climate summit begins tomorrow",
    "🚀 SpaceX launches successful mission",
    "📊 Tech stocks surge 8% in morning trading",
    "🏆 Innovation awards ceremony tonight",
    "🔬 Scientists discover new treatment method",
    "📈 Economic growth exceeds expectations",
  ]

  const stockItems = [
    "AAPL: $185.23 (+2.1%)",
    "GOOGL: $142.56 (+1.8%)",
    "MSFT: $378.91 (+0.9%)",
    "TSLA: $248.42 (+3.2%)",
    "AMZN: $151.94 (+1.5%)",
    "META: $331.05 (+2.7%)",
    "NVDA: $875.28 (+4.1%)",
    "NFLX: $445.67 (+1.2%)",
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticker Component Demo</CardTitle>
            <CardDescription>Scrolling ticker displays for news, announcements, and real-time data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">News Ticker</h3>
              <Ticker items={newsItems} speed={40} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Stock Ticker</h3>
              <Ticker items={stockItems} speed={30} className="bg-gradient-to-r from-green-600 to-emerald-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Fast Ticker</h3>
              <Ticker
                items={["⚡ Fast updates", "🔥 Real-time data", "💨 Lightning speed", "🚀 Instant notifications"]}
                speed={15}
                className="bg-gradient-to-r from-red-600 to-orange-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Slow Ticker</h3>
              <Ticker
                items={["🐌 Slow and steady", "📚 Educational content", "🎯 Focus on details", "💭 Take your time"]}
                speed={80}
                className="bg-gradient-to-r from-indigo-600 to-blue-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-lg">
              <code className="text-sm">
                {`<Ticker 
  items={["Item 1", "Item 2", "Item 3"]} 
  speed={50} 
  className="custom-styles"
/>`}
              </code>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Props:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>items</code>: Array of strings to display
                </li>
                <li>
                  <code>speed</code>: Animation duration in seconds (lower = faster)
                </li>
                <li>
                  <code>className</code>: Additional CSS classes
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
