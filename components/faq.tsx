'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Apa itu DeParkAlert?',
    answer: 'DeParkAlert adalah platform decentralized traffic intelligence yang menggunakan AI dan blockchain untuk memverifikasi laporan parkir dan lalu lintas. Pengguna mendapatkan reward token $DPARK untuk setiap laporan yang terverifikasi.',
  },
  {
    question: 'Bagaimana cara mendapatkan reward?',
    answer: 'Submit foto kondisi parkir atau lalu lintas melalui aplikasi. AI kami akan memverifikasi foto tersebut, dan jika valid, laporan akan disimpan di TON blockchain. Anda akan mendapatkan 1-3 $DPARK token per laporan yang terverifikasi.',
  },
  {
    question: 'Apakah data saya aman?',
    answer: 'Ya! Semua data disimpan secara terdesentralisasi di TON blockchain dan IPFS. Kami tidak menyimpan data pribadi Anda. Wallet address Anda adalah identitas anonim Anda di platform.',
  },
  {
    question: 'Bagaimana AI memverifikasi laporan?',
    answer: 'AI kami menggunakan computer vision untuk menganalisis foto yang Anda submit. Model AI dilatih untuk mendeteksi kondisi parkir (tersedia/penuh/ilegal) dan tingkat kemacetan lalu lintas dengan akurasi tinggi.',
  },
  {
    question: 'Wallet apa yang didukung?',
    answer: 'Kami mendukung semua wallet TON seperti Tonkeeper, MyTonWallet, OKX Wallet, dan wallet lainnya yang kompatibel dengan TON Connect protocol.',
  },
  {
    question: 'Apakah ada biaya untuk menggunakan platform?',
    answer: 'Tidak ada biaya untuk submit laporan. Anda hanya perlu membayar gas fee minimal untuk transaksi blockchain (biasanya <0.01 TON). Reward yang Anda dapatkan jauh lebih besar dari gas fee.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-6 bg-[#08080c] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about DeParkAlert
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-semibold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-violet-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@deparkalert.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-medium transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
