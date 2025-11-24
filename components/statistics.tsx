'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Users, MapPin, Award } from 'lucide-react'

export function Statistics() {
  const [stats, setStats] = useState({
    totalReports: 0,
    totalRewards: 0,
    activeUsers: 0,
    citiesCovered: 1,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/reports')
        const data = await res.json()
        if (data.success) {
          setStats({
            totalReports: data.total,
            totalRewards: data.data.reduce((sum: number, r: any) => sum + (r.reward || 0), 0),
            activeUsers: new Set(data.data.map((r: any) => r.walletAddress)).size,
            citiesCovered: 1,
          })
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statsData = [
    {
      icon: TrendingUp,
      label: 'Total Reports',
      value: stats.totalReports.toLocaleString(),
      suffix: '+',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      icon: Award,
      label: 'Rewards Distributed',
      value: stats.totalRewards.toFixed(0),
      suffix: ' $DPARK',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Users,
      label: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      suffix: '+',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: MapPin,
      label: 'Cities Covered',
      value: stats.citiesCovered.toString(),
      suffix: '',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#08080c] to-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Statistics</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real-time data from our decentralized traffic intelligence network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <>
                      {stat.value}
                      <span className="text-xl">{stat.suffix}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
