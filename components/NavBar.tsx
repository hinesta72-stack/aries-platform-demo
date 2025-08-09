"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, User, Menu, X } from "lucide-react"

export default function NavBar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Overview", href: "/", active: pathname === "/" },
    { name: "Interventions", href: "/interventions", active: pathname === "/interventions" },
    { name: "Risk Factors", href: "/risk-factors", active: pathname === "/risk-factors" },
    { name: "Resilience ROI", href: "/resilience-roi", active: pathname === "/resilience-roi" },
    { name: "Community Solutions", href: "/community-solutions", active: pathname === "/community-solutions" },
    { name: "Community Engagement", href: "/community-engagement", active: pathname === "/community-engagement" },
  ]

  return (
    <nav className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand - Made Much Larger */}
          <div className="flex items-center space-x-6">
            <div className="relative w-16 h-16">
              <Image src="/images/amereserve-logo.png" alt="AMERESERVE Logo" fill className="object-contain" priority />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">ARIES™</h1>
              <p className="text-sm text-gray-400">Resilience Index Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    item.active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button size="sm" variant="ghost" className="relative text-gray-300 hover:text-white">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>

            {/* Settings */}
            <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
              <Settings className="w-5 h-5" />
            </Button>

            {/* User Profile */}
            <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              size="sm"
              variant="ghost"
              className="lg:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-700/50 py-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      item.active ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
