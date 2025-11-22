'use client'

import { Search, Filter } from 'lucide-react'

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-8rem)] relative rounded-3xl border border-white/10 overflow-hidden bg-[#12121a] animate-fade-in group">
      {/* Map Background (Placeholder) */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/106.8272,-6.1751,13,0/800x600?access_token=pk.example')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>

      {/* Interactive Overlay Grids for Mockup */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Floating UI: Search */}
      <div className="absolute top-6 left-6 right-6 z-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari lokasi parkir..."
            className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-violet-500"
          />
        </div>
        <button className="px-6 py-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl text-white flex items-center gap-2 hover:bg-white/10">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
          <span className="text-sm text-slate-300">Tersedia (&gt;50%)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
          <span className="text-sm text-slate-300">Hampir Penuh</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
          <span className="text-sm text-slate-300">Penuh / Ilegal</span>
        </div>
      </div>

      {/* Mock Pins */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative group/pin cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50"></div>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
            Parkir Ilegal Terdeteksi
          </div>
        </div>
      </div>
    </div>
  )
}
