'use client'

import { Upload, TrendingUp, Wallet, ShieldCheck, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWalletConnection } from '@/hooks/use-wallet-connection'
import type { Report, UserStats } from '@/lib/mock-data'

export default function DAppPage() {
  const router = useRouter()
  const { address, isConnected } = useWalletConnection()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [recentReports, setRecentReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch user stats if wallet connected
        if (address) {
          const statsRes = await fetch(`/api/users/${address}`)
          const statsData = await statsRes.json()
          if (statsData.success) {
            setStats(statsData.data)
          }
        }

        // Fetch recent reports
        const reportsRes = await fetch('/api/reports?limit=5')
        const reportsData = await reportsRes.json()
        if (reportsData.success) {
          setRecentReports(reportsData.data)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [address])

  const formatTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Selamat Datang,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Contributor
            </span>
          </h2>
          <p className="text-slate-400">Pantau kondisi lalu lintas dan dapatkan reward token $DPARK.</p>
        </div>
        <button 
          onClick={() => router.push('/dapp-simple/report')}
          className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2 active:scale-95"
        >
          <Upload size={18} />
          Quick Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : (
          [
            { 
              label: 'Total Laporan', 
              value: stats?.totalReports.toString() || '0', 
              icon: TrendingUp, 
              color: 'text-blue-400', 
              bg: 'bg-blue-500/10' 
            },
            { 
              label: 'Token Reward', 
              value: `${stats?.totalRewards.toFixed(1) || '0'} $DPARK`, 
              icon: Wallet, 
              color: 'text-violet-400', 
              bg: 'bg-violet-500/10' 
            },
            { 
              label: 'Reputasi', 
              value: `${stats?.reputation.toFixed(0) || '0'}/100`, 
              icon: ShieldCheck, 
              color: 'text-emerald-400', 
              bg: 'bg-emerald-500/10' 
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group hover:border-white/20 transition-all"
            >
              <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Aktivitas Terbaru</h3>
            <button 
              onClick={() => router.push('/dapp-simple/map')}
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Lihat Semua
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Lokasi</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Waktu</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center">
                      <Loader2 className="w-6 h-6 text-violet-400 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : recentReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">
                      Belum ada laporan
                    </td>
                  </tr>
                ) : (
                  recentReports.map((report) => {
                    const statusColor = 
                      report.status === 'verified' ? 'text-emerald-400' :
                      report.status === 'pending' ? 'text-orange-400' :
                      'text-red-400'
                    
                    const categoryColor =
                      report.category === 'Tersedia' || report.category === 'Lancar' ? 'text-emerald-400' :
                      report.category === 'Padat' ? 'text-orange-400' :
                      'text-red-400'

                    return (
                      <tr key={report.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-white font-medium truncate max-w-[200px]">
                          {report.location.address}
                        </td>
                        <td className={`p-4 font-medium ${categoryColor}`}>
                          {report.category}
                        </td>
                        <td className="p-4 text-slate-400 text-sm">
                          {formatTimeAgo(report.timestamp)}
                        </td>
                        <td className="p-4">
                          {report.reward ? (
                            <span className="text-violet-400 font-medium">
                              +{report.reward.toFixed(1)} DPARK
                            </span>
                          ) : (
                            <span className={`text-xs font-semibold uppercase ${statusColor}`}>
                              {report.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini Map Placeholder */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Live Map Preview</h3>
          <div className="w-full h-[300px] rounded-2xl bg-[#1a1a24] border border-white/10 relative overflow-hidden group">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #7c3aed 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            ></div>
            {/* Pulsing Dots */}
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-75"></div>
            <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-emerald-500 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => router.push('/dapp-simple/map')}
                className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 active:scale-95 transition-all"
              >
                Buka Peta Lengkap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}