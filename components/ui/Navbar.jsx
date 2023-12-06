import React from 'react'
import { Popcorn } from 'lucide-react';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-black text-slate-200">
    <div className="flex items-center space-x-2">
      <Popcorn className="h-6 w-6 text-red-500" />
      <span className="text-lg font-semibold text-red-500">Popcorn Time</span>
    </div>
    <nav className="space-x-4 hidden lg:block">
      <Link className="text-sm font-medium" href="#">
        Most Popular
      </Link>
      <Link className="text-sm font-medium" href="#">
        Upcoming
      </Link>
      <Link className="text-sm font-medium" href="#">
        Genres
      </Link>
    </nav>
    <Button className="hidden lg:block" variant="outline">
      Sign In
    </Button>
  </header>
  )
}
