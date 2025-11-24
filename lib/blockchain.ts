// Blockchain utilities for TON integration

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'EQC_mock_contract_address_testnet';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

/**
 * Generate cryptographic hash for report data
 */
export function generateReportHash(reportData: any): string {
  const data = JSON.stringify({
    location: reportData.location,
    category: reportData.category,
    type: reportData.type,
    timestamp: Date.now(),
  });
  
  // In browser, we'll let backend generate the hash
  // This is just for reference
  return `hash_${Date.now()}`;
}

/**
 * Submit report to blockchain via backend
 */
export async function submitReportToBlockchain(reportData: any) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to submit report');
    }
    
    return {
      success: true,
      report: data.data,
      txHash: data.data.txHash,
      explorerUrl: `https://testnet.tonscan.org/tx/${data.data.txHash}`,
    };
  } catch (error) {
    console.error('Blockchain submission error:', error);
    throw error;
  }
}

/**
 * Get report from blockchain
 */
export async function getReportFromBlockchain(reportId: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/reports/${reportId}`);
    const data = await response.json();
    
    if (!data.success) {
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('Blockchain query error:', error);
    return null;
  }
}

/**
 * Get contract information
 */
export async function getContractInfo() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/blockchain/contract`);
    const data = await response.json();
    
    if (!data.success) {
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('Contract info error:', error);
    return null;
  }
}

/**
 * Get contract explorer URL
 */
export function getContractExplorerUrl(): string {
  return `https://testnet.tonscan.org/address/${CONTRACT_ADDRESS}`;
}

/**
 * Get transaction explorer URL
 */
export function getTransactionExplorerUrl(txHash: string): string {
  return `https://testnet.tonscan.org/tx/${txHash}`;
}

/**
 * Format TON amount
 */
export function formatTON(amount: number): string {
  return `${amount.toFixed(2)} TON`;
}

/**
 * Check if backend is available
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    return false;
  }
}
