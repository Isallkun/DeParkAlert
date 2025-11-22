import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface GradientButtonProps {
  children: React.ReactNode
  onClick?: () => void
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
}

export function GradientButton({
  children,
  onClick,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className
}: GradientButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-95',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20',
    outline: 'bg-transparent border-2 border-violet-500 text-violet-400 hover:bg-violet-500/10'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        disabled && disabledClasses,
        className
      )}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  )
}
