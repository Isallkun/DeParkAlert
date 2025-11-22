'use client'

import { Camera, Navigation } from 'lucide-react'

export default function ReportPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Lapor Kondisi Parkir</h2>
        <p className="text-slate-400">Kontribusi data real-time dan dapatkan reward.</p>
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-8">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8 text-slate-400 group-hover:text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Ambil atau Upload Foto</h3>
          <p className="text-sm text-slate-500 mt-1">Mendukung JPG, PNG. AI akan memverifikasi foto.</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Lokasi</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Deteksi lokasi otomatis..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <Navigation className="absolute right-4 top-3.5 w-5 h-5 text-violet-500 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Deskripsi Situasi</label>
            <textarea
              rows={3}
              placeholder="Contoh: Parkir liar memakan badan jalan..."
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Kepadatan (Estimasi)</label>
            <div className="grid grid-cols-3 gap-3">
              {['Sepi', 'Ramai', 'Penuh'].map((level) => (
                <button
                  key={level}
                  className="py-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-violet-600 hover:text-white hover:border-transparent transition-all"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 hover:scale-[1.02] transition-all">
          Kirim Laporan
        </button>
      </div>
    </div>
  )
}
