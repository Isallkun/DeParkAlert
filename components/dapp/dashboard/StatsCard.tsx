import { LucideIcon } from 'lucide-react'
import { GlassCard } from '../shared/GlassCard'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string
  icon: LucideIcon
  color: string
  bgColor: string
}

export function StatsCard({ label, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <GlassCard hover className="relative overflow-hidden group">
      <div className={cn('absolute top-0 right-0 p-3 rounded-bl-2xl', bgColor)}>
        <Icon className={cn('w-6 h-6', color)} />
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </GlassCard>
  )
}
