import { GlassCard } from '../shared/GlassCard'
import { Map as MapIcon } from 'lucide-react'

export function MiniMap() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Live Map Preview</h3>
      
      <GlassCard padding="none" className="relative overflow-hidden group">
        <div className="w-full h-[300px] bg-[#1a1a24] relative">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #7c3aed 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Pulsing Dots */}
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full" />
          
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-75" />
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-emerald-500 rounded-full" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
              <MapIcon className="w-4 h-4" />
              Buka Peta Lengkap
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
