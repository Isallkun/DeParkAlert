'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'destructive'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-6 shadow-lg transition-all',
        'bg-white/10 backdrop-blur-xl border-white/20',
        variant === 'destructive' && 'border-red-500/50 bg-red-500/10',
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = 'Toast'

const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-white/10',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = 'ToastAction'

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-slate-400 opacity-0 transition-opacity hover:text-white focus:opacity-100 focus:outline-none group-hover:opacity-100',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
))
ToastClose.displayName = 'ToastClose'

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm font-semibold text-white', className)}
    {...props}
  />
))
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-slate-300', className)}
    {...props}
  />
))
ToastDescription.displayName = 'ToastDescription'

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
}
