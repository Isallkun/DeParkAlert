'use client'

import { Trophy, TrendingUp, Medal, Award, Loader2, ChevronUp, ChevronDown, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LeaderboardEntry } from '@/lib/mock-data'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard')
        const data = await res.json()
        if (data.success) {
          setLeaderboard(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const topThree = leaderboard.slice(0, 3)
  const restOfLeaderboard = leaderboard.slice(3, 10)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
      </div>
    )
  }
  return (
    <div className="animate-fade-in pt-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-2">Top Kontributor</h2>
        <p className="text-slate-400">Pahlawan jalanan yang membantu kota lebih tertib.</p>
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-6 md:gap-10 mb-16">
        {topThree[1] && (
          <div className="flex flex-col items-center gap-3 w-28 md:w-36">
            <div className="mb-2">
              <Medal className="w-10 h-10 text-slate-400" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-400 bg-black/40 p-1 shadow-lg">
              <img src={topThree[1].avatar} alt={topThree[1].username} className="w-full h-full rounded-full" />
            </div>
            <p className="text-slate-300 font-bold text-sm md:text-base truncate w-full text-center">
              {topThree[1].username}
            </p>
            <div className="w-full h-32 bg-gradient-to-t from-slate-900/80 to-slate-800/40 border-t-2 border-slate-600 rounded-t-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
              <span className="text-3xl font-bold text-slate-400">#2</span>
            </div>
          </div>
        )}

        {topThree[0] && (
          <div className="flex flex-col items-center gap-3 w-32 md:w-40">
            <div className="mb-2">
              <Trophy className="w-12 h-12 text-yellow-400 animate-bounce drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-yellow-400 bg-black/40 p-1 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
              <img src={topThree[0].avatar} alt={topThree[0].username} className="w-full h-full rounded-full" />
            </div>
            <p className="text-yellow-400 font-bold text-base md:text-lg truncate w-full text-center">
              {topThree[0].username}
            </p>
            <div className="w-full h-48 bg-gradient-to-t from-yellow-900/40 to-yellow-600/20 border-t-4 border-yellow-500 rounded-t-xl flex items-center justify-center backdrop-blur-sm relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
              <span className="text-5xl font-bold text-yellow-400 relative z-10">#1</span>
            </div>
          </div>
        )}

        {topThree[2] && (
          <div className="flex flex-col items-center gap-3 w-28 md:w-36">
            <div className="mb-2">
              <Award className="w-10 h-10 text-amber-700" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-700 bg-black/40 p-1 shadow-lg">
              <img src={topThree[2].avatar} alt={topThree[2].username} className="w-full h-full rounded-full" />
            </div>
            <p className="text-amber-600 font-bold text-sm md:text-base truncate w-full text-center">
              {topThree[2].username}
            </p>
            <div className="w-full h-24 bg-gradient-to-t from-amber-950/80 to-amber-900/40 border-t-2 border-amber-800 rounded-t-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
              <span className="text-3xl font-bold text-amber-700">#3</span>
            </div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        {restOfLeaderboard.map((entry) => {
          const TrendIcon = entry.trend === 'up' ? ChevronUp : entry.trend === 'down' ? ChevronDown : Minus
          const trendColor = entry.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 
                            entry.trend === 'down' ? 'text-red-500 bg-red-500/10 border-red-500/20' : 
                            'text-slate-500 bg-slate-500/10 border-slate-500/20'
          
          return (
            <div
              key={entry.rank}
              className="flex items-center justify-between p-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center text-slate-500 font-bold text-lg">#{entry.rank}</span>
                <img src={entry.avatar} alt={entry.username} className="w-10 h-10 rounded-full border border-white/10" />
                <div>
                  <p className="text-white font-medium">{entry.username}</p>
                  <p className="text-xs text-slate-400">{entry.verifiedReports} verified</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-violet-400 font-bold">{entry.reputation.toFixed(0)} Pts</p>
                  <p className="text-xs text-slate-400">{entry.rewards.toFixed(1)} $DPARK</p>
                </div>
                <div className={`flex items-center text-xs px-2 py-1 rounded border ${trendColor}`}>
                  <TrendIcon className="w-3 h-3" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
