'use client'

import { Menu, Bell, Wallet, ChevronRight } from 'lucide-react'

interface TopBarProps {
  currentPage: string
  onMobileMenuToggle: () => void
}

export function TopBar({ currentPage, onMobileMenuToggle }: TopBarProps) {
  return (
    <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 bg-[#0a0a0f]/40 backdrop-blur-md sticky top-0 z-30">
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        onClick={onMobileMenuToggle}
      >
        <Menu size={24} />
      </button>

      {/* Breadcrumb / Title (Desktop only) */}
      <div className="hidden lg:flex items-center text-sm font-medium text-slate-500">
        <span>DApp</span>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-white capitalize">{currentPage}</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 text-slate-400 hover:text-white relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#0a0a0f]" />
        </button>

        {/* Wallet Button (Desktop) */}
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-violet-500/50 hover:bg-violet-500/10 transition-all group">
          <Wallet size={18} className="text-violet-400 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-white text-sm">0x12...8842</span>
        </button>
      </div>
    </header>
  )
}
