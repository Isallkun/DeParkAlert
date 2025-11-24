'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Daily Commuter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
    content: 'DeParkAlert sangat membantu saya menemukan parkir kosong di Jakarta. Sekarang saya tidak perlu buang waktu keliling cari parkir lagi!',
    rating: 5,
  },
  {
    name: 'Sarah Wijaya',
    role: 'Ride-hailing Driver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'Sebagai driver ojol, info real-time tentang kemacetan sangat berguna. Plus dapat token reward setiap submit laporan. Win-win!',
    rating: 5,
  },
  {
    name: 'Ahmad Rizki',
    role: 'Web3 Enthusiast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
    content: 'Konsep decentralized traffic intelligence ini brilliant! Kombinasi AI dan blockchain untuk solve real-world problem. Impressed!',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a0f] to-[#08080c] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Users <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Say</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Join thousands of satisfied users making cities smarter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-white/10"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
