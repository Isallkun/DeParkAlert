// Mock data for MVP demo

export interface Report {
  id: string;
  userId: string;
  walletAddress: string;
  type: 'parking' | 'traffic';
  category: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  imageUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  aiConfidence: number;
  timestamp: string;
  verifiedAt?: string;
  reward?: number;
  txHash?: string;
}

export interface UserStats {
  walletAddress: string;
  totalReports: number;
  verifiedReports: number;
  pendingReports: number;
  rejectedReports: number;
  totalRewards: number;
  reputation: number;
  rank: number;
  joinedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  walletAddress: string;
  username: string;
  avatar: string;
  totalReports: number;
  verifiedReports: number;
  reputation: number;
  rewards: number;
  trend: 'up' | 'down' | 'same';
}

// Jakarta coordinates
const jakartaLocations = [
  { lat: -6.2088, lng: 106.8456, address: 'Jl. Sudirman, Jakarta Pusat' },
  { lat: -6.1751, lng: 106.8650, address: 'Jl. Thamrin, Jakarta Pusat' },
  { lat: -6.2297, lng: 106.8177, address: 'Jl. Gatot Subroto, Jakarta Selatan' },
  { lat: -6.2615, lng: 106.7810, address: 'Jl. TB Simatupang, Jakarta Selatan' },
  { lat: -6.1944, lng: 106.8229, address: 'Jl. Rasuna Said, Jakarta Selatan' },
  { lat: -6.1862, lng: 106.8063, address: 'Jl. Senopati, Jakarta Selatan' },
  { lat: -6.2215, lng: 106.8446, address: 'Jl. Casablanca, Jakarta Selatan' },
  { lat: -6.1754, lng: 106.8272, address: 'Jl. Menteng, Jakarta Pusat' },
  { lat: -6.2382, lng: 106.8342, address: 'Jl. Pancoran, Jakarta Selatan' },
  { lat: -6.1862, lng: 106.8341, address: 'Jl. Kuningan, Jakarta Selatan' },
];

const parkingCategories = ['Tersedia', 'Penuh', 'Ilegal'];
const trafficCategories = ['Lancar', 'Padat', 'Macet Total'];

// Generate mock reports
export const mockReports: Report[] = Array.from({ length: 25 }, (_, i) => {
  const isParking = i % 3 !== 0;
  const location = jakartaLocations[i % jakartaLocations.length];
  const status = i % 5 === 0 ? 'pending' : i % 7 === 0 ? 'rejected' : 'verified';
  
  return {
    id: `report-${i + 1}`,
    userId: `user-${(i % 10) + 1}`,
    walletAddress: `UQ${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
    type: isParking ? 'parking' : 'traffic',
    category: isParking 
      ? parkingCategories[i % parkingCategories.length]
      : trafficCategories[i % trafficCategories.length],
    location,
    description: isParking
      ? `Parkir ${parkingCategories[i % parkingCategories.length].toLowerCase()} di area ini`
      : `Kondisi lalu lintas ${trafficCategories[i % trafficCategories.length].toLowerCase()}`,
    imageUrl: `https://picsum.photos/seed/${i}/400/300`,
    status,
    aiConfidence: 75 + Math.random() * 20,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    verifiedAt: status === 'verified' 
      ? new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString()
      : undefined,
    reward: status === 'verified' ? 1 + Math.random() * 2 : undefined,
    txHash: status === 'verified' 
      ? `0x${Math.random().toString(16).substring(2, 15)}...${Math.random().toString(16).substring(2, 6)}`
      : undefined,
  };
});

// Generate mock user stats
export const mockUserStats: Record<string, UserStats> = {
  default: {
    walletAddress: 'UQxxx...xxxx',
    totalReports: 0,
    verifiedReports: 0,
    pendingReports: 0,
    rejectedReports: 0,
    totalRewards: 0,
    reputation: 0,
    rank: 999,
    joinedAt: new Date().toISOString(),
  },
};

// Generate stats for mock users
for (let i = 1; i <= 10; i++) {
  const userReports = mockReports.filter(r => r.userId === `user-${i}`);
  const verified = userReports.filter(r => r.status === 'verified');
  const pending = userReports.filter(r => r.status === 'pending');
  const rejected = userReports.filter(r => r.status === 'rejected');
  
  mockUserStats[`user-${i}`] = {
    walletAddress: `UQ${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
    totalReports: userReports.length,
    verifiedReports: verified.length,
    pendingReports: pending.length,
    rejectedReports: rejected.length,
    totalRewards: verified.reduce((sum, r) => sum + (r.reward || 0), 0),
    reputation: Math.min(100, verified.length * 10 + Math.random() * 20),
    rank: i,
    joinedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

// Generate leaderboard
export const mockLeaderboard: LeaderboardEntry[] = Array.from({ length: 20 }, (_, i) => {
  const userId = `user-${(i % 10) + 1}`;
  const stats = mockUserStats[userId];
  
  return {
    rank: i + 1,
    walletAddress: stats.walletAddress,
    username: `Reporter${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`,
    totalReports: stats.totalReports,
    verifiedReports: stats.verifiedReports,
    reputation: stats.reputation,
    rewards: stats.totalRewards,
    trend: i % 3 === 0 ? 'up' : i % 5 === 0 ? 'down' : 'same',
  };
});

// Helper function to get user stats by wallet address
export function getUserStats(walletAddress: string): UserStats {
  // Check if we have stats for this wallet
  const existingStats = Object.values(mockUserStats).find(
    stats => stats.walletAddress === walletAddress
  );
  
  if (existingStats) {
    return existingStats;
  }
  
  // Return default stats for new wallet
  return {
    ...mockUserStats.default,
    walletAddress,
  };
}

// Helper function to get recent reports
export function getRecentReports(limit: number = 10): Report[] {
  return mockReports
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

// Helper function to get reports by status
export function getReportsByStatus(status: Report['status']): Report[] {
  return mockReports.filter(r => r.status === status);
}

// Helper function to get reports by location (within radius)
export function getReportsByLocation(lat: number, lng: number, radiusKm: number = 5): Report[] {
  return mockReports.filter(report => {
    const distance = calculateDistance(
      lat, lng,
      report.location.lat, report.location.lng
    );
    return distance <= radiusKm;
  });
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
