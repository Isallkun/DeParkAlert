import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger' | 'info' | 'pending'
  children: React.ReactNode
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, children, size = 'md' }: StatusBadgeProps) {
  const statusClasses = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        statusClasses[status],
        sizeClasses[size]
      )}
    >
      {children}
    </span>
  )
}
