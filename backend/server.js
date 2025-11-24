const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage
let reports = [];
const users = new Map();

// Mock contract address (will be replaced with real one)
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || 'EQC_mock_contract_address_testnet';

// Generate hash for report
function generateHash(reportData) {
  const data = JSON.stringify({
    location: reportData.location,
    category: reportData.category,
    type: reportData.type,
    timestamp: Date.now(),
  });
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Initialize with some mock data
function initializeMockData() {
  const jakartaLocations = [
    { lat: -6.2088, lng: 106.8456, address: 'Jl. Sudirman, Jakarta Pusat' },
    { lat: -6.1751, lng: 106.8650, address: 'Jl. Thamrin, Jakarta Pusat' },
    { lat: -6.2297, lng: 106.8177, address: 'Jl. Gatot Subroto, Jakarta Selatan' },
  ];

  for (let i = 0; i < 10; i++) {
    const location = jakartaLocations[i % jakartaLocations.length];
    const isParking = i % 3 !== 0;
    const report = {
      id: `report-${i + 1}`,
      userId: `user-${(i % 5) + 1}`,
      walletAddress: `UQ${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
      type: isParking ? 'parking' : 'traffic',
      category: isParking ? ['Tersedia', 'Penuh', 'Ilegal'][i % 3] : ['Lancar', 'Padat', 'Macet Total'][i % 3],
      location,
      description: `Mock report ${i + 1}`,
      imageUrl: `https://picsum.photos/seed/${i}/400/300`,
      status: i % 5 === 0 ? 'pending' : i % 7 === 0 ? 'rejected' : 'verified',
      aiConfidence: 75 + Math.random() * 20,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      verifiedAt: i % 5 !== 0 ? new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString() : null,
      reward: i % 5 !== 0 ? 1 + Math.random() * 2 : null,
      txHash: i % 5 !== 0 ? `0x${Math.random().toString(16).substring(2, 15)}...${Math.random().toString(16).substring(2, 6)}` : null,
      hash: null,
    };
    report.hash = generateHash(report);
    reports.push(report);
  }
}

initializeMockData();

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/reports', (req, res) => {
  const { limit, status, type } = req.query;
  let filtered = [...reports];
  
  if (status) {
    filtered = filtered.filter(r => r.status === status);
  }
  
  if (type) {
    filtered = filtered.filter(r => r.type === type);
  }
  
  // Sort by timestamp (newest first)
  filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
});

app.post('/api/reports', async (req, res) => {
  try {
    const reportData = req.body;
    
    // Generate hash
    const hash = generateHash(reportData);
    
    // Mock blockchain transaction
    const txHash = `0x${crypto.randomBytes(16).toString('hex')}`;
    
    // Create report
    const report = {
      id: `report-${Date.now()}`,
      ...reportData,
      hash,
      status: 'pending',
      aiConfidence: 85 + Math.random() * 10,
      timestamp: new Date().toISOString(),
      txHash,
      verifiedAt: null,
      reward: null,
    };
    
    reports.unshift(report);
    
    res.json({
      success: true,
      message: 'Report submitted successfully',
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get('/api/reports/:id', (req, res) => {
  const report = reports.find(r => r.id === req.params.id);
  
  if (!report) {
    return res.status(404).json({
      success: false,
      message: 'Report not found',
    });
  }
  
  res.json({
    success: true,
    data: report,
  });
});

app.get('/api/users/:address', (req, res) => {
  const address = req.params.address;
  const userReports = reports.filter(r => r.walletAddress === address);
  
  const stats = {
    walletAddress: address,
    totalReports: userReports.length,
    verifiedReports: userReports.filter(r => r.status === 'verified').length,
    pendingReports: userReports.filter(r => r.status === 'pending').length,
    rejectedReports: userReports.filter(r => r.status === 'rejected').length,
    totalRewards: userReports
      .filter(r => r.reward)
      .reduce((sum, r) => sum + r.reward, 0),
    reputation: Math.min(100, userReports.filter(r => r.status === 'verified').length * 10),
    rank: 1,
    joinedAt: new Date().toISOString(),
  };
  
  res.json({
    success: true,
    data: stats,
  });
});

app.get('/api/leaderboard', (req, res) => {
  const { limit } = req.query;
  
  // Generate leaderboard from reports
  const userStats = new Map();
  
  reports.forEach(report => {
    if (!userStats.has(report.walletAddress)) {
      userStats.set(report.walletAddress, {
        walletAddress: report.walletAddress,
        totalReports: 0,
        verifiedReports: 0,
        rewards: 0,
      });
    }
    
    const stats = userStats.get(report.walletAddress);
    stats.totalReports++;
    if (report.status === 'verified') {
      stats.verifiedReports++;
      stats.rewards += report.reward || 0;
    }
  });
  
  let leaderboard = Array.from(userStats.values())
    .sort((a, b) => b.verifiedReports - a.verifiedReports)
    .map((user, index) => ({
      rank: index + 1,
      ...user,
      username: `Reporter${index + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.walletAddress}`,
      reputation: user.verifiedReports * 10,
      trend: index % 3 === 0 ? 'up' : index % 5 === 0 ? 'down' : 'same',
    }));
  
  if (limit) {
    leaderboard = leaderboard.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    data: leaderboard,
    total: leaderboard.length,
  });
});

app.get('/api/blockchain/contract', (req, res) => {
  res.json({
    success: true,
    data: {
      address: CONTRACT_ADDRESS,
      network: 'testnet',
      explorer: `https://testnet.tonscan.org/address/${CONTRACT_ADDRESS}`,
    },
  });
});

app.get('/api/stats', (req, res) => {
  const totalReports = reports.length;
  const verifiedReports = reports.filter(r => r.status === 'verified').length;
  const totalRewards = reports
    .filter(r => r.reward)
    .reduce((sum, r) => sum + r.reward, 0);
  const activeUsers = new Set(reports.map(r => r.walletAddress)).size;
  
  res.json({
    success: true,
    data: {
      totalReports,
      verifiedReports,
      pendingReports: reports.filter(r => r.status === 'pending').length,
      totalRewards,
      activeUsers,
      citiesCovered: 1,
    },
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📝 Contract address: ${CONTRACT_ADDRESS}`);
  console.log(`📊 Loaded ${reports.length} mock reports`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
});
