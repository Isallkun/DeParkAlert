"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-background">DP</span>
          </div>
          <span className="text-xl font-bold text-foreground">DeParkAlert</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition">
            How It Works
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition">
            Docs
          </Link>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition">
            Connect Wallet
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden flex flex-col p-4 gap-4">
            <Link href="#features" className="text-foreground hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-foreground hover:text-primary">
              How It Works
            </Link>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full w-full">Connect Wallet</button>
          </div>
        )}
      </nav>
    </header>
  )
}
