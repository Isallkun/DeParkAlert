'use client'

import { LayoutDashboard, Camera, Map, Trophy, User, ChevronRight, LogOut } from 'lucide-react'
import { WalletCard } from './WalletCard'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isMobileOpen: boolean
  onMobileToggle: (open: boolean) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'report', label: 'Lapor', icon: Camera },
  { id: 'map', label: 'Peta', icon: Map },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'profile', label: 'Profile', icon: User },
]

export function Sidebar({ activeTab, onTabChange, isMobileOpen, onMobileToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => onMobileToggle(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:static top-0 left-0 z-50 h-full w-72 flex-shrink-0',
          'bg-[#0a0a0f]/80 backdrop-blur-xl border-r border-white/5',
          'flex flex-col p-6 transition-transform duration-300 ease-in-out',
          'shadow-2xl lg:shadow-none',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 text-white">
            <svg
              fill="none"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20V6H4V4ZM4 18H13V20H4V18ZM15 18H20V20H15V18ZM4 11H9V13H4V11ZM11 11H20V13H11V11Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">DeParkAlert</h1>
            <p className="text-xs text-slate-400">Decentralized Traffic</p>
          </div>
        </div>

        {/* Wallet Connection */}
        <WalletCard />

        {/* Navigation Menu */}
        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  onMobileToggle(false)
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl',
                  'transition-all duration-300 group relative overflow-hidden',
                  isActive
                    ? 'bg-white/10 text-white border border-white/10 shadow-lg shadow-purple-500/5'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:border-white/5 border border-transparent'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-l-xl" />
                )}
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-violet-400'
                  )}
                />
                <span className="font-medium text-sm tracking-wide">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-white/20" />}
              </button>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group text-left">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[2px]">
              <img
                alt="User avatar"
                className="w-full h-full rounded-full bg-[#0a0a0f]"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="font-semibold text-sm text-white truncate group-hover:text-violet-300 transition-colors">
                Guest User
              </p>
              <p className="text-xs text-slate-500 truncate">guest@depark.io</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
          </button>
        </div>
      </aside>
    </>
  )
}
