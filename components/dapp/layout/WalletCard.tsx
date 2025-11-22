'use client'

import { Wallet } from 'lucide-react'
import { GradientButton } from '../shared/GradientButton'

interface WalletCardProps {
  isConnected?: boolean
  address?: string
  onConnect?: () => void
  onDisconnect?: () => void
}

export function WalletCard({ 
  isConnected = false, 
  address,
  onConnect,
  onDisconnect 
}: WalletCardProps) {
  return (
    <div className="rounded-2xl p-5 mb-8 bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
        <Wallet className="w-12 h-12 text-violet-500 -rotate-12" />
      </div>
      
      <div className="relative z-10">
        {isConnected ? (
          <>
            <div className="flex items-center mb-3 gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Connected
              </p>
            </div>
            <div className="mb-3 p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Wallet Address</p>
              <p className="text-sm font-mono text-white truncate">
                {address || '0x1234...5678'}
              </p>
            </div>
            <button
              onClick={onDisconnect}
              className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all border border-white/10"
            >
              Disconnect
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center mb-3 gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                Not Connected
              </p>
            </div>
            <GradientButton
              onClick={onConnect}
              fullWidth
              size="md"
              className="mb-3"
            >
              Connect Wallet
            </GradientButton>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Connect TON wallet to access features.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
