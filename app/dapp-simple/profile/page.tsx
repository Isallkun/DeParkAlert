'use client'

import { Award, Trophy, Camera } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="relative h-48 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 to-indigo-900/80"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
        <div className="absolute -bottom-10 left-8 flex items-end gap-6">
          <div className="w-24 h-24 rounded-full border-4 border-[#0a0a0f] bg-slate-800 shadow-xl overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full bg-slate-700" />
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white">Alex The Ranger</h2>
            <p className="text-violet-300 text-sm">Bergabung sejak 2024</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
        {/* Left Column: Stats & Rep */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="text-yellow-500" /> Reputation
            </h3>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-400">Level 5</span>
              <span className="text-white font-bold">1,250 / 2,000 XP</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center border ${
                    i <= 3 ? 'bg-violet-500/20 border-violet-500/50 text-violet-400' : 'bg-white/5 border-white/5 text-slate-600'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-6">Riwayat Kontribusi</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-black/20 hover:bg-black/40 transition-colors border border-transparent hover:border-white/5">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Camera className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-medium">Laporan Parkir Liar - Senayan</h4>
                    <span className="text-emerald-400 text-xs px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">Verified</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">Foto terverifikasi oleh 3 node validator.</p>
                  <p className="text-slate-600 text-xs mt-3">2 Hari yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
