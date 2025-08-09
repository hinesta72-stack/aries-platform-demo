"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (location: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location.trim())
    }
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-slate-800 rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Search Location</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter address, zip code, county or state"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-orange-400"
          />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
          <Search className="w-4 h-4 mr-2" />
          Submit
        </Button>
      </form>
    </motion.div>
  )
}
