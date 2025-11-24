'use client'

import { Search, Filter, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { Report } from '@/lib/mock-data'

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(
  () => import('@/components/dapp/map/MapView').then((mod) => mod.MapView),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1a24] rounded-2xl">
        <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
      </div>
    )
  }
)

export default function MapPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'parking' | 'traffic'>('all')

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch('/api/reports')
        const data = await res.json()
        if (data.success) {
          setReports(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true
    return report.type === filter
  })
  return (
    <div className="h-[calc(100vh-8rem)] relative rounded-3xl border border-white/10 overflow-hidden bg-[#12121a] animate-fade-in">
      {/* Map Container */}
      <div className="absolute inset-0">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
          </div>
        ) : (
          <MapView reports={filteredReports} />
        )}
      </div>

      {/* Floating UI: Search */}
      <div className="absolute top-6 left-6 right-6 z-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari jalan atau area parkir..."
            className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-3 backdrop-blur-md border rounded-xl text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-black/60 border-white/20 text-slate-400 hover:bg-white/10'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('parking')}
            className={`px-4 py-3 backdrop-blur-md border rounded-xl text-sm font-medium transition-all ${
              filter === 'parking'
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-black/60 border-white/20 text-slate-400 hover:bg-white/10'
            }`}
          >
            Parkir
          </button>
          <button
            onClick={() => setFilter('traffic')}
            className={`px-4 py-3 backdrop-blur-md border rounded-xl text-sm font-medium transition-all ${
              filter === 'traffic'
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-black/60 border-white/20 text-slate-400 hover:bg-white/10'
            }`}
          >
            Traffic
          </button>
        </div>
      </div>

      {/* Legend - Updated for both Traffic and Parking */}
      <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 space-y-4 min-w-[200px]">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Parkir (Titik)</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <span className="text-sm text-slate-300">Tersedia</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
              <span className="text-sm text-slate-300">Penuh / Ilegal</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 w-full"></div>

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Lalu Lintas (Jalur)</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1.5 rounded-full bg-emerald-500/50 border border-emerald-500"></span>
              <span className="text-sm text-slate-300">Lancar</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-1.5 rounded-full bg-orange-500/50 border border-orange-500"></span>
              <span className="text-sm text-slate-300">Padat</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-1.5 rounded-full bg-red-600/50 border border-red-600 animate-pulse"></span>
              <span className="text-sm text-slate-300">Macet Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Badge */}
      <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl">
        <p className="text-xs text-slate-400">
          Showing <span className="text-white font-bold">{filteredReports.length}</span> reports
        </p>
      </div>
    </div>
  )
}
