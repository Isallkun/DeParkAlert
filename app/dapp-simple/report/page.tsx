'use client'

import { useState } from 'react'
import { Camera, Navigation, ParkingCircle, Car } from 'lucide-react'

export default function ReportPage() {
  const [reportType, setReportType] = useState<'parking' | 'traffic'>('parking')

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Buat Laporan Baru</h2>
        <p className="text-slate-400">Pilih jenis laporan untuk membantu pengguna lain.</p>
      </div>

      {/* Mode Switcher */}
      <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex">
        <button
          onClick={() => setReportType('parking')}
          className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
            reportType === 'parking'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ParkingCircle size={20} />
          Lapor Parkir
        </button>
        <button
          onClick={() => setReportType('traffic')}
          className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
            reportType === 'traffic'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Car size={20} />
          Lapor Macet
        </button>
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-8">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${
            reportType === 'parking'
              ? 'border-violet-500/20 hover:border-violet-500/50 hover:bg-violet-500/5'
              : 'border-orange-500/20 hover:border-orange-500/50 hover:bg-orange-500/5'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Camera className={`w-8 h-8 ${reportType === 'parking' ? 'text-violet-400' : 'text-orange-400'}`} />
          </div>
          <h3 className="text-lg font-semibold text-white">Ambil Foto Situasi</h3>
          <p className="text-sm text-slate-500 mt-1">
            AI akan memverifikasi apakah ini {reportType === 'parking' ? 'lahan parkir' : 'kemacetan lalu lintas'}.
          </p>
        </div>

        {/* Form Fields - Dynamic based on Type */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Lokasi</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Deteksi lokasi otomatis..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors"
              />
              <Navigation className="absolute right-4 top-3.5 w-5 h-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {reportType === 'parking' ? (
            // --- PARKING SPECIFIC FIELDS ---
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Jenis Parkir</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors appearance-none cursor-pointer">
                  <option>Parkir Resmi (Gedung/Lahan)</option>
                  <option>Parkir Pinggir Jalan (On-street)</option>
                  <option className="text-red-400">Parkir Liar / Ilegal</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Kapasitas</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Kosong', 'Tersedia', 'Penuh'].map((level) => (
                    <button
                      key={level}
                      className="py-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-violet-600 hover:text-white hover:border-transparent transition-all"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // --- TRAFFIC SPECIFIC FIELDS ---
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Penyebab (Jika Tahu)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Volume Kendaraan', 'Kecelakaan', 'Lampu Merah', 'Perbaikan Jalan'].map((cause) => (
                    <button
                      key={cause}
                      className="py-2 px-3 text-sm rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-orange-600 hover:text-white hover:border-transparent transition-all text-left"
                    >
                      {cause}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Tingkat Kemacetan</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Padat Merayap', 'Macet', 'Stuck Total'].map((level) => (
                    <button
                      key={level}
                      className="py-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-red-600 hover:text-white hover:border-transparent transition-all"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Catatan Tambahan</label>
            <textarea
              rows={2}
              placeholder={
                reportType === 'parking'
                  ? 'Contoh: Parkir memakan bahu jalan...'
                  : 'Contoh: Ada mobil mogok di jalur kanan...'
              }
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        <button
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-all text-white ${
            reportType === 'parking'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-600/20 hover:shadow-violet-600/40'
              : 'bg-gradient-to-r from-orange-500 to-red-600 shadow-orange-600/20 hover:shadow-orange-600/40'
          }`}
        >
          Kirim Laporan {reportType === 'parking' ? 'Parkir' : 'Lalu Lintas'}
        </button>
      </div>
    </div>
  )
}
