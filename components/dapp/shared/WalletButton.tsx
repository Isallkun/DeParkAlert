'use client';

import { Wallet, Loader2 } from 'lucide-react';
import { useWalletConnection } from '@/hooks/use-wallet-connection';
import { cn } from '@/lib/utils';

interface WalletButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showIcon?: boolean;
  className?: string;
}

export function WalletButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  showIcon = true,
  className
}: WalletButtonProps) {
  const { isConnected, isConnecting, address, formatAddress, connect, disconnect } = useWalletConnection();

  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-95',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20',
    outline: 'bg-transparent border-2 border-violet-500 text-violet-400 hover:bg-violet-500/10'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleClick = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isConnecting}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        isConnecting && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {isConnecting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : isConnected ? (
        <>
          {showIcon && <Wallet className="w-5 h-5" />}
          <span className="font-mono">{address ? formatAddress(address) : 'Connected'}</span>
        </>
      ) : (
        <>
          {showIcon && <Wallet className="w-5 h-5" />}
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
}
