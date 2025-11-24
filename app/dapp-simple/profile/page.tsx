'use client'

import { Award, Trophy, Camera, Loader2, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useWalletConnection } from '@/hooks/use-wallet-connection'
import type { UserStats, Report } from '@/lib/mock-data'

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  requirement: number
}

export default function ProfilePage() {
  const { address, isConnected } = useWalletConnection()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [userReports, setUserReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!address) {
        setLoading(false)
        return
      }

      try {
        // Fetch user stats
        const statsRes = await fetch(`/api/users/${address}`)
        const statsData = await statsRes.json()
        if (statsData.success) {
          setStats(statsData.data)
        }

        // Fetch all reports and filter by user address
        const reportsRes = await fetch('/api/reports')
        const reportsData = await reportsRes.json()
        if (reportsData.success) {
          const filtered = reportsData.data
            .filter((r: Report) => r.walletAddress === address)
            .sort((a: Report, b: Report) => 
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            )
          setUserReports(filtered)
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [address])

  const calculateAchievements = (): Achievement[] => {
    if (!stats) return []

    return [
      {
        id: 1,
        name: 'First Report',
        description: 'Submit your first report',
        icon: '🎯',
        unlocked: stats.totalReports >= 1,
        progress: stats.totalReports,
        requirement: 1,
      },
      {
        id: 2,
        name: 'Verified Reporter',
        description: 'Get 10 reports verified',
        icon: '✅',
        unlocked: stats.verifiedReports >= 10,
        progress: stats.verifiedReports,
        requirement: 10,
      },
      {
        id: 3,
        name: 'Community Hero',
        description: 'Submit 50 reports',
        icon: '🦸',
        unlocked: stats.totalReports >= 50,
        progress: stats.totalReports,
        requirement: 50,
      },
      {
        id: 4,
        name: 'Master Reporter',
        description: 'Submit 100 reports',
        icon: '👑',
        unlocked: stats.totalReports >= 100,
        progress: stats.totalReports,
        requirement: 100,
      },
      {
        id: 5,
        name: 'Parking Expert',
        description: 'Reach 90+ reputation',
        icon: '🅿️',
        unlocked: stats.reputation >= 90,
        progress: stats.reputation,
        requirement: 90,
      },
      {
        id: 6,
        name: 'Early Adopter',
        description: 'Join in first month',
        icon: '🚀',
        unlocked: true,
        progress: 1,
        requirement: 1,
      },
      {
        id: 7,
        name: 'Token Collector',
        description: 'Earn 100 $DPARK',
        icon: '💰',
        unlocked: stats.totalRewards >= 100,
        progress: stats.totalRewards,
        requirement: 100,
      },
      {
        id: 8,
        name: 'Top 10',
        description: 'Reach top 10 leaderboard',
        icon: '🏆',
        unlocked: stats.rank <= 10,
        progress: stats.rank <= 10 ? 1 : 0,
        requirement: 1,
      },
    ]
  }

  const achievements = calculateAchievements()
  const unlockedCount = achievements.filter(a => a.unlocked).length

  const formatTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Award className="w-16 h-16 text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
        <p className="text-slate-400">Please connect your wallet to view your profile</p>
      </div>
    )
  }
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm">
        {/* Background Banner */}
        <div className="relative h-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 to-indigo-900/80"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
        </div>
        
        {/* Profile Info Section */}
        <div className="relative px-8 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12">
            <div className="w-24 h-24 rounded-full border-4 border-[#0a0a0f] bg-slate-800 shadow-xl overflow-hidden flex-shrink-0">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full bg-slate-700" />
            </div>
            <div className="text-center sm:text-left mb-2 flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Anonymous'}
              </h2>
              <p className="text-violet-300 text-sm">
                Joined {stats ? new Date(stats.joinedAt).toLocaleDateString() : '2024'}
              </p>
            </div>
            <div className="flex gap-4 text-center">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-white">{stats?.totalReports || 0}</p>
                <p className="text-xs text-slate-400">Reports</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-emerald-400">{stats?.verifiedReports || 0}</p>
                <p className="text-xs text-slate-400">Verified</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-violet-400">#{stats?.rank || '999'}</p>
                <p className="text-xs text-slate-400">Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Rep */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="text-yellow-500" /> Reputation
            </h3>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-400">Reputation</span>
              <span className="text-white font-bold">{stats?.reputation.toFixed(0) || 0} / 100</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-500"
                style={{ width: `${stats?.reputation || 0}%` }}
              ></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">Rewards:</span>
                <span className="text-white font-bold">{stats?.totalRewards.toFixed(1) || 0} $DPARK</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-slate-400">Pending:</span>
                <span className="text-white font-bold">{stats?.pendingReports || 0}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Achievements</h3>
              <span className="text-sm text-slate-400">{unlockedCount}/8</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`aspect-square rounded-lg flex items-center justify-center border text-2xl relative group cursor-pointer transition-all ${
                    achievement.unlocked
                      ? 'bg-violet-500/20 border-violet-500/50 hover:scale-110'
                      : 'bg-white/5 border-white/5 grayscale opacity-50'
                  }`}
                  title={achievement.name}
                >
                  {achievement.icon}
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10">
                    <p className="text-xs font-bold text-white">{achievement.name}</p>
                    <p className="text-xs text-slate-400">{achievement.description}</p>
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <p className="text-xs text-violet-400 mt-1">
                        {achievement.progress}/{achievement.requirement}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {userReports.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No reports yet</p>
                <p className="text-slate-600 text-sm">Submit your first report to get started!</p>
              </div>
            ) : (
              userReports.slice(0, 5).map((report) => {
                const StatusIcon = 
                  report.status === 'verified' ? CheckCircle :
                  report.status === 'pending' ? Clock :
                  XCircle
                
                const statusColor =
                  report.status === 'verified' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                  report.status === 'pending' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
                  'text-red-400 bg-red-500/10 border-red-500/20'

                return (
                  <div 
                    key={report.id} 
                    className="flex gap-4 items-start p-4 rounded-xl bg-black/20 hover:bg-black/40 transition-colors border border-transparent hover:border-white/5 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={report.imageUrl} alt="Report" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-white font-medium truncate">
                          {report.type === 'parking' ? '🅿️' : '🚗'} {report.category} - {report.location.address.split(',')[0]}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded border flex items-center gap-1 whitespace-nowrap ${statusColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {report.status}
                        </span>
                      </div>
                      {report.description && (
                        <p className="text-slate-400 text-sm mt-1 truncate">{report.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-slate-600 text-xs">{formatTimeAgo(report.timestamp)}</p>
                        {report.reward && (
                          <p className="text-violet-400 text-xs font-semibold">
                            +{report.reward.toFixed(1)} $DPARK
                          </p>
                        )}
                        {report.aiConfidence && (
                          <p className="text-slate-500 text-xs">
                            AI: {report.aiConfidence.toFixed(0)}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
