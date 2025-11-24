'use client';

import { useWalletConnection } from '@/hooks/use-wallet-connection';
import { cn } from '@/lib/utils';
import { Wifi, WifiOff } from 'lucide-react';

interface NetworkBadgeProps {
  className?: string;
  showIcon?: boolean;
}

export function NetworkBadge({ className, showIcon = true }: NetworkBadgeProps) {
  const { network, isConnected } = useWalletConnection();

  if (!isConnected || !network) {
    return null;
  }

  const isMainnet = network === 'mainnet';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all',
        isMainnet
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
        className
      )}
    >
      {showIcon && (
        isMainnet ? (
          <Wifi className="w-3 h-3" />
        ) : (
          <WifiOff className="w-3 h-3" />
        )
      )}
      <span className="uppercase tracking-wider">
        {isMainnet ? 'Mainnet' : 'Testnet'}
      </span>
    </div>
  );
}
