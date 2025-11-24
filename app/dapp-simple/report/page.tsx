'use client'

import { useState, useRef } from 'react'
import { Camera, Navigation, ParkingCircle, Car, Upload, Loader2, X, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useWalletConnection } from '@/hooks/use-wallet-connection'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function ReportPage() {
  const router = useRouter()
  const { address, isConnected } = useWalletConnection()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [reportType, setReportType] = useState<'parking' | 'traffic'>('parking')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [gettingLocation, setGettingLocation] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran file maksimal 5MB",
        variant: "destructive",
      })
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Format file tidak valid",
        description: "Hanya file gambar yang diperbolehkan",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation tidak didukung",
        description: "Browser Anda tidak mendukung geolocation",
        variant: "destructive",
      })
      return
    }

    setGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mock reverse geocoding (in real app, use Google Maps API)
        const mockAddress = `Jl. Sudirman No. ${Math.floor(Math.random() * 100)}, Jakarta`
        setLocation(mockAddress)
        setGettingLocation(false)
        toast({
          title: "Lokasi terdeteksi",
          description: mockAddress,
        })
      },
      (error) => {
        setGettingLocation(false)
        toast({
          title: "Gagal mendapatkan lokasi",
          description: "Pastikan Anda mengizinkan akses lokasi",
          variant: "destructive",
        })
      }
    )
  }

  const handleSubmit = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet belum terhubung",
        description: "Silakan hubungkan wallet terlebih dahulu",
        variant: "destructive",
      })
      return
    }

    if (!selectedFile || !location || !category) {
      toast({
        title: "Form belum lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Convert image to base64 (in real app, upload to IPFS/Cloudinary)
      const imageUrl = previewUrl || 'https://picsum.photos/400/300'

      // Submit report
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          type: reportType,
          category,
          location: {
            lat: -6.2088 + (Math.random() - 0.5) * 0.1,
            lng: 106.8456 + (Math.random() - 0.5) * 0.1,
            address: location,
          },
          description,
          imageUrl,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Laporan berhasil dikirim! 🎉",
          description: "Laporan Anda sedang diverifikasi oleh AI",
        })

        // Reset form
        setSelectedFile(null)
        setPreviewUrl(null)
        setLocation('')
        setCategory('')
        setDescription('')

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dapp-simple')
        }, 2000)
      } else {
        throw new Error(data.message || 'Failed to submit report')
      }
    } catch (error) {
      toast({
        title: "Gagal mengirim laporan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        
        {previewUrl ? (
          <div className="relative rounded-2xl overflow-hidden border-2 border-white/10">
            <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-red-500 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
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
            <p className="text-xs text-slate-600 mt-2">Max 5MB • JPG, PNG</p>
          </div>
        )}

        {/* Form Fields - Dynamic based on Type */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Lokasi</label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Deteksi lokasi otomatis..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                onClick={handleGetLocation}
                disabled={gettingLocation}
                className="absolute right-4 top-3.5 text-slate-500 hover:text-white transition-colors disabled:opacity-50"
              >
                {gettingLocation ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
              </button>
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
                  {['Tersedia', 'Penuh', 'Ilegal'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setCategory(level)}
                      className={`py-2 rounded-lg border transition-all ${
                        category === level
                          ? 'bg-violet-600 text-white border-transparent'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-violet-600/50 hover:text-white'
                      }`}
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
                  {['Lancar', 'Padat', 'Macet Total'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setCategory(level)}
                      className={`py-2 rounded-lg border transition-all ${
                        category === level
                          ? 'bg-red-600 text-white border-transparent'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-red-600/50 hover:text-white'
                      }`}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                reportType === 'parking'
                  ? 'Contoh: Parkir memakan bahu jalan...'
                  : 'Contoh: Ada mobil mogok di jalur kanan...'
              }
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !selectedFile || !location || !category}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ${
            reportType === 'parking'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-600/20 hover:shadow-violet-600/40'
              : 'bg-gradient-to-r from-orange-500 to-red-600 shadow-orange-600/20 hover:shadow-orange-600/40'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Kirim Laporan {reportType === 'parking' ? 'Parkir' : 'Lalu Lintas'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
