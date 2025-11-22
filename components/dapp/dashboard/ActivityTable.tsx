import { GlassCard } from '../shared/GlassCard'
import { cn } from '@/lib/utils'

interface Activity {
  location: string
  status: string
  time: string
  reward: string
  statusColor: string
}

const activities: Activity[] = [
  {
    location: 'Mall Grand Indonesia',
    status: 'Penuh',
    time: '2 min ago',
    reward: '+5 DPARK',
    statusColor: 'text-red-400',
  },
  {
    location: 'Stasiun Sudirman',
    status: 'Tersedia',
    time: '15 min ago',
    reward: '+5 DPARK',
    statusColor: 'text-emerald-400',
  },
  {
    location: 'Pasar Tanah Abang',
    status: 'Macet',
    time: '1 hr ago',
    reward: '+10 DPARK',
    statusColor: 'text-orange-400',
  },
  {
    location: 'Gelora Bung Karno',
    status: 'Ilegal',
    time: '2 hrs ago',
    reward: '+15 DPARK',
    statusColor: 'text-red-400',
  },
]

export function ActivityTable() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Aktivitas Terbaru</h3>
        <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
          Lihat Semua
        </button>
      </div>

      <GlassCard padding="none" className="overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Lokasi</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Waktu</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Reward</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activities.map((activity, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white font-medium">{activity.location}</td>
                <td className={cn('p-4 font-medium', activity.statusColor)}>{activity.status}</td>
                <td className="p-4 text-slate-400 text-sm">{activity.time}</td>
                <td className="p-4 text-violet-400 font-medium">{activity.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
