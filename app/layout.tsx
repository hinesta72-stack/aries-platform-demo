import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css";
import LeafletStyles from "@/components/LeafletMap"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ARIESâ„¢ Resilience Index Platform",
  description: "AMERESERVE Resilience Command Center",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white min-h-screen`}>
        <LeafletStyles />
        {children}
      </body>
    </html>
  )
}
