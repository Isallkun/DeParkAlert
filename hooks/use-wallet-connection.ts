'use client';

import { useTonConnectUI, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import { useState, useCallback, useEffect } from 'react';

export interface WalletConnectionState {
  // Connection state
  wallet: ReturnType<typeof useTonWallet>;
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  
  // Network info
  network: 'mainnet' | 'testnet' | null;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  
  // Utilities
  formatAddress: (address: string) => string;
  copyAddress: () => Promise<void>;
}

export function useWalletConnection(): WalletConnectionState {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();
  const [isConnecting, setIsConnecting] = useState(false);

  // Determine if connected
  const isConnected = !!wallet && !!address;

  // Detect network (mainnet = -239, testnet = -3)
  const network = wallet?.account?.chain 
    ? (wallet.account.chain === '-239' ? 'mainnet' : 'testnet')
    : null;

  // Connect function
  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      await tonConnectUI.openModal();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [tonConnectUI]);

  // Disconnect function
  const disconnect = useCallback(async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  }, [tonConnectUI]);

  // Format address utility (first 6 + last 4 chars)
  const formatAddress = useCallback((addr: string): string => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }, []);

  // Copy address to clipboard
  const copyAddress = useCallback(async () => {
    if (!address) return;
    
    try {
      await navigator.clipboard.writeText(address);
    } catch (error) {
      console.error('Failed to copy address:', error);
      throw error;
    }
  }, [address]);

  // Reset connecting state when wallet connects/disconnects
  useEffect(() => {
    if (wallet) {
      setIsConnecting(false);
    }
  }, [wallet]);

  return {
    wallet,
    address,
    isConnected,
    isConnecting,
    network,
    connect,
    disconnect,
    formatAddress,
    copyAddress,
  };
}
