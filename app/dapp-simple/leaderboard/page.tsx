'use client'

import { Trophy, TrendingUp, Medal, Award } from 'lucide-react'

export default function LeaderboardPage() {
  return (
    <div className="animate-fade-in pt-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-2">Top Kontributor</h2>
        <p className="text-slate-400">Pahlawan jalanan yang membantu kota lebih tertib.</p>
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-6 md:gap-10 mb-16">
        {/* Rank 2 */}
        <div className="flex flex-col items-center gap-3 w-28 md:w-36">
          {/* Medal Icon */}
          <div className="mb-2">
            <Medal className="w-10 h-10 text-slate-400" />
          </div>
          {/* Avatar */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-400 bg-black/40 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-slate-500"></div>
          </div>
          {/* Name */}
          <p className="text-slate-300 font-bold text-sm md:text-base truncate w-full text-center">NightOwl</p>
          {/* Podium */}
          <div className="w-full h-32 bg-gradient-to-t from-slate-900/80 to-slate-800/40 border-t-2 border-slate-600 rounded-t-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
            <span className="text-3xl font-bold text-slate-400">#2</span>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="flex flex-col items-center gap-3 w-32 md:w-40">
          {/* Trophy Icon */}
          <div className="mb-2">
            <Trophy className="w-12 h-12 text-yellow-400 animate-bounce drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
          </div>
          {/* Avatar */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-yellow-400 bg-black/40 p-1 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
            <div className="w-full h-full rounded-full bg-yellow-500"></div>
          </div>
          {/* Name */}
          <p className="text-yellow-400 font-bold text-base md:text-lg truncate w-full text-center">CyberDriver</p>
          {/* Podium */}
          <div className="w-full h-48 bg-gradient-to-t from-yellow-900/40 to-yellow-600/20 border-t-4 border-yellow-500 rounded-t-xl flex items-center justify-center backdrop-blur-sm relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
            <span className="text-5xl font-bold text-yellow-400 relative z-10">#1</span>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="flex flex-col items-center gap-3 w-28 md:w-36">
          {/* Award Icon */}
          <div className="mb-2">
            <Award className="w-10 h-10 text-amber-700" />
          </div>
          {/* Avatar */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-700 bg-black/40 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-amber-800"></div>
          </div>
          {/* Name */}
          <p className="text-amber-600 font-bold text-sm md:text-base truncate w-full text-center">JakParkir</p>
          {/* Podium */}
          <div className="w-full h-24 bg-gradient-to-t from-amber-950/80 to-amber-900/40 border-t-2 border-amber-800 rounded-t-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
            <span className="text-3xl font-bold text-amber-700">#3</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        {[4, 5, 6, 7].map((rank) => (
          <div
            key={rank}
            className="flex items-center justify-between p-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 text-center text-slate-500 font-bold text-lg">{rank}</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10"></div>
              <span className="text-white font-medium">User_00{rank}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-violet-400 font-bold">{1500 - rank * 50} Pts</span>
              <div className="text-emerald-500 flex items-center text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
