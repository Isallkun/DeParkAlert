'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  Camera, 
  Map as MapIcon, 
  Trophy, 
  User, 
  Menu, 
  Bell, 
  ChevronRight,
  LogOut
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { WalletCard } from '@/components/dapp/layout/WalletCard'
import { WalletButton } from '@/components/dapp/shared/WalletButton'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dapp-simple' },
  { id: 'report', label: 'Lapor', icon: Camera, href: '/dapp-simple/report' },
  { id: 'map', label: 'Peta', icon: MapIcon, href: '/dapp-simple/map' },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, href: '/dapp-simple/leaderboard' },
  { id: 'profile', label: 'Profile', icon: User, href: '/dapp-simple/profile' },
]

export default function DAppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const getCurrentPage = () => {
    const item = menuItems.find(item => item.href === pathname)
    return item?.label || 'Dashboard'
  }

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-300 font-sans selection:bg-violet-500/30 overflow-hidden relative">
      {/* Ambient Lighting Effects (Blur Orbs) */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[20%] left-[40%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 z-50 h-full w-72 flex-shrink-0 bg-[#0a0a0f]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 text-white">
              <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20V6H4V4ZM4 18H13V20H4V18ZM15 18H20V20H15V18ZM4 11H9V13H4V11ZM11 11H20V13H11V11Z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">DeParkAlert</h1>
              <p className="text-xs text-slate-400">Decentralized Traffic</p>
            </div>
          </div>

          {/* Wallet Connection Box */}
          <WalletCard />

          {/* Navigation Menu */}
          <nav className="flex-grow space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    router.push(item.href)
                    setIsMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/10 shadow-lg shadow-purple-500/5'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white hover:border-white/5 border border-transparent'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-l-xl" />
                  )}
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-violet-400'
                    } transition-colors`}
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

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Top Navbar */}
          <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 bg-[#0a0a0f]/40 backdrop-blur-md sticky top-0 z-30">
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMobileOpen(true)}>
              <Menu size={24} />
            </button>

            {/* Breadcrumb / Title (Desktop only) */}
            <div className="hidden lg:flex items-center text-sm font-medium text-slate-500">
              <span>DApp</span>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-white capitalize">{getCurrentPage()}</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-white relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#0a0a0f]"></span>
              </button>

              <div className="hidden sm:block">
                <WalletButton variant="secondary" size="sm" />
              </div>
            </div>
          </header>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
