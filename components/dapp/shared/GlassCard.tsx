import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function GlassCard({ 
  children, 
  className, 
  hover = false,
  padding = 'md' 
}: GlassCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div
      className={cn(
        'rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md',
        'transition-all duration-300',
        hover && 'hover:border-white/20 hover:bg-white/[0.07]',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
