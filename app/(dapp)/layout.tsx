'use client'

import { useState } from 'react'
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Car,
  Map,
  Upload,
  Trophy,
  User,
  Menu,
  X,
  Wallet,
  Home
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dapp', icon: Home },
  { name: 'Lapor', href: '/dapp/report', icon: Upload },
  { name: 'Peta', href: '/dapp/map', icon: Map },
  { name: 'Leaderboard', href: '/dapp/leaderboard', icon: Trophy },
  { name: 'Profile', href: '/dapp/profile', icon: User },
]

export default function DAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const wallet = useTonWallet()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">DeParkAlert</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">DApp Mode</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Wallet Connection */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            {wallet ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {wallet.account.chain === '-1' ? 'TESTNET' : 'MAINNET'}
                  </Badge>
                </div>
                <TonConnectButton className="!w-full" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-red-600">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-medium">Wallet Not Connected</span>
                </div>
                <TonConnectButton className="!w-full" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Connect your TON wallet to access all features
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Stats */}
          {wallet && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white">
                <div className="text-xs opacity-90">Your Stats</div>
                <div className="flex justify-between items-center mt-1">
                  <div>
                    <div className="text-lg font-bold">12</div>
                    <div className="text-xs opacity-75">Reports</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">85</div>
                    <div className="text-xs opacity-75">Reputation</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                🚗 DeParkAlert v1.0.0
              </Badge>

              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/dapp/report">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Quick Report
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}