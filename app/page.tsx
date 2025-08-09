import Ticker from "../ticker"

export default function Page() {
  const newsItems = [
    "🚀 Breaking: Revolutionary AI breakthrough announced at tech summit",
    "💰 Global markets surge as inflation shows signs of cooling",
    "🌍 Climate accord signed by 50+ nations at COP summit",
    "🏆 Tech startup raises $100M in Series A funding round",
    "📊 Unemployment drops to historic lows across major economies",
    "🔬 Scientists develop new cancer treatment with 95% success rate",
    "🎯 Major social platform announces privacy-first redesign",
    "📈 Renewable energy adoption hits 40% globally this quarter",
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

  const cryptoItems = [
    "BTC: $43,250 (+5.2%)",
    "ETH: $2,680 (+3.8%)",
    "BNB: $315 (+2.1%)",
    "SOL: $98 (+7.3%)",
    "ADA: $0.52 (+4.5%)",
    "DOT: $7.85 (+6.1%)",
    "MATIC: $0.89 (+8.2%)",
    "LINK: $15.40 (+3.9%)",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Live Ticker Demo</h1>
          <p className="text-gray-600 mt-2">Real-time scrolling tickers for news, stocks, and crypto</p>
        </div>
      </div>

      {/* News Ticker */}
      <Ticker items={newsItems} speed={45} className="bg-gradient-to-r from-blue-600 to-indigo-600" />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stock Market Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-green-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">📈 Stock Market</h2>
          </div>
          <Ticker items={stockItems} speed={35} className="bg-gradient-to-r from-green-600 to-emerald-600" />
        </div>

        {/* Crypto Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-orange-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-orange-800 flex items-center gap-2">₿ Cryptocurrency</h2>
          </div>
          <Ticker items={cryptoItems} speed={30} className="bg-gradient-to-r from-orange-600 to-red-600" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600 text-sm">Live data streaming with smooth animations and seamless scrolling.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Customizable</h3>
            <p className="text-gray-600 text-sm">Adjust speed, colors, and content to match your brand and needs.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Responsive</h3>
            <p className="text-gray-600 text-sm">Works perfectly on desktop, tablet, and mobile devices.</p>
          </div>
        </div>

        {/* Speed Demo */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Speed Variations</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Fast (15s)</p>
              <Ticker
                items={["🚀 Lightning fast", "⚡ Quick updates", "💨 Rapid fire", "🔥 High speed"]}
                speed={15}
                className="bg-gradient-to-r from-red-500 to-pink-500"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Medium (40s)</p>
              <Ticker
                items={["📊 Balanced speed", "⚖️ Perfect pace", "🎯 Just right", "✨ Optimal flow"]}
                speed={40}
                className="bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Slow (70s)</p>
              <Ticker
                items={["🐌 Take your time", "📚 Easy reading", "🧘 Relaxed pace", "💭 Thoughtful"]}
                speed={70}
                className="bg-gradient-to-r from-purple-500 to-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Ticker */}
      <div className="mt-12">
        <Ticker
          items={[
            "🎉 Thank you for trying our ticker component!",
            "💡 Perfect for news sites, dashboards, and real-time data",
            "🌟 Built with React, Next.js, and Tailwind CSS",
            "🚀 Ready to integrate into your project",
          ]}
          speed={50}
          className="bg-gradient-to-r from-gray-800 to-gray-900"
        />
      </div>
    </div>
  )
}
