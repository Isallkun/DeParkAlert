# Backend & Blockchain Implementation Progress

**Status:** ✅ Backend Complete, Smart Contract Ready  
**Time Spent:** ~1 hour  
**Remaining:** Smart contract deployment (requires testnet setup)

---

## ✅ Completed

### Backend API (Express)
- [x] Server setup with Express
- [x] CORS configuration
- [x] In-memory storage
- [x] Hash generation utility
- [x] 7 API endpoints:
  - GET /api/health
  - GET /api/reports
  - POST /api/reports
  - GET /api/reports/:id
  - GET /api/users/:address
  - GET /api/leaderboard
  - GET /api/blockchain/contract
  - GET /api/stats
- [x] Mock data initialization (10 reports)
- [x] Error handling
- [x] README documentation

### Smart Contract (Tact)
- [x] Contract code written
- [x] Report struct defined
- [x] Submit report function
- [x] Verify report function (owner only)
- [x] Query functions
- [x] README documentation
- [ ] Deployment (pending testnet setup)

### Frontend Integration
- [x] Blockchain utilities (`lib/blockchain.ts`)
- [x] Environment variables setup
- [x] Helper functions:
  - submitReportToBlockchain()
  - getReportFromBlockchain()
  - getContractInfo()
  - getContractExplorerUrl()
  - getTransactionExplorerUrl()
  - checkBackendHealth()

---

## 🚀 How to Run

### Start Backend

```bash
cd backend
npm install
npm start
```

Server runs on: `http://localhost:3001`

### Test Backend

```bash
# Health check
curl http://localhost:3001/api/health

# Get reports
curl http://localhost:3001/api/reports?limit=5

# Get stats
curl http://localhost:3001/api/stats

# Get contract info
curl http://localhost:3001/api/blockchain/contract
```

### Start Frontend

```bash
# Make sure backend is running first
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 📊 API Endpoints

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "success": true,
  "message": "Backend API is running",
  "timestamp": "2025-11-24T..."
}
```

### GET /api/reports
Get all reports with optional filters

**Query Params:**
- `limit` - Number of reports to return
- `status` - Filter by status (verified/pending/rejected)
- `type` - Filter by type (parking/traffic)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 10
}
```

### POST /api/reports
Submit new report

**Body:**
```json
{
  "walletAddress": "UQ...",
  "type": "parking",
  "category": "Penuh",
  "location": {
    "lat": -6.2088,
    "lng": 106.8456,
    "address": "Jl. Sudirman"
  },
  "description": "...",
  "imageUrl": "..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "id": "report-...",
    "hash": "abc123...",
    "txHash": "0x...",
    ...
  }
}
```

### GET /api/users/:address
Get user statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "walletAddress": "UQ...",
    "totalReports": 5,
    "verifiedReports": 4,
    "pendingReports": 1,
    "totalRewards": 8.5,
    "reputation": 40,
    "rank": 1
  }
}
```

### GET /api/leaderboard
Get leaderboard rankings

**Query Params:**
- `limit` - Number of entries to return

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "walletAddress": "UQ...",
      "username": "Reporter1",
      "totalReports": 10,
      "verifiedReports": 9,
      "reputation": 90,
      "rewards": 15.5,
      "trend": "up"
    },
    ...
  ]
}
```

### GET /api/blockchain/contract
Get smart contract information

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "EQC...",
    "network": "testnet",
    "explorer": "https://testnet.tonscan.org/address/..."
  }
}
```

### GET /api/stats
Get platform statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "totalReports": 25,
    "verifiedReports": 20,
    "pendingReports": 3,
    "totalRewards": 45.5,
    "activeUsers": 10,
    "citiesCovered": 1
  }
}
```

---

## 🔗 Smart Contract

### Contract Address
```
EQC_mock_contract_address_testnet
```
(Will be updated after deployment)

### Explorer
```
https://testnet.tonscan.org/address/EQC...
```

### Functions

**submitReport(hash: String)**
- Submit new report hash to blockchain
- Gas: ~0.05 TON
- Public function

**verifyReport(id: Int)**
- Verify a report (owner only)
- Gas: ~0.03 TON
- Owner-only function

**getReport(id: Int): Report?**
- Query report by ID
- Free (getter function)

**getReportCount(): Int**
- Get total number of reports
- Free (getter function)

---

## 🎯 Integration Status

### Frontend → Backend
- ✅ API calls working
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications

### Backend → Blockchain
- ⏳ Pending contract deployment
- ✅ Hash generation ready
- ✅ Transaction mock ready
- ✅ Explorer links ready

### Complete Flow
```
User → Frontend → Backend API → Smart Contract
                      ↓
                  Generate Hash
                      ↓
                Store on Blockchain
                      ↓
                Return TX Hash
```

---

## 📝 Next Steps

### To Deploy Smart Contract:

1. **Install TON Tools**
```bash
npm install -g @ton/blueprint
```

2. **Get Testnet TON**
- Visit: https://t.me/testgiver_ton_bot
- Request testnet TON

3. **Deploy Contract**
```bash
cd contracts
blueprint create ReportRegistry
# Copy ReportRegistry.tact
blueprint build
blueprint run
```

4. **Update Environment**
```bash
# Update .env.local with real contract address
NEXT_PUBLIC_CONTRACT_ADDRESS=EQC_real_address
```

5. **Test Integration**
- Submit report from frontend
- Check transaction on explorer
- Verify hash on blockchain

---

## 🚨 Important Notes

### Current Limitations
- Backend uses in-memory storage (data lost on restart)
- Smart contract not yet deployed (using mock)
- Transaction hashes are mocked
- No real blockchain writes yet

### For Production
- [ ] Add MongoDB/PostgreSQL
- [ ] Deploy smart contract to mainnet
- [ ] Add authentication
- [ ] Add rate limiting
- [ ] Add request validation
- [ ] Add logging
- [ ] Add monitoring
- [ ] Deploy backend to cloud

---

## 🎬 Demo Points

### What to Show

1. **Backend API**
   - Show Postman/curl requests
   - Show JSON responses
   - Show hash generation

2. **Smart Contract Code**
   - Show Tact code
   - Explain functions
   - Show security features

3. **Integration**
   - Submit report from frontend
   - Show API call in Network tab
   - Show response with hash & txHash
   - Show explorer link (even if mock)

### What to Say

> "We have a complete backend API with 7 endpoints handling reports, users, and leaderboard. The backend generates cryptographic hashes for each report. We've also written a smart contract in Tact language for TON blockchain that will store these hashes immutably. The contract is ready to deploy - we just need testnet TON to deploy it."

---

## ✅ Success Criteria

- [x] Backend server running
- [x] All API endpoints working
- [x] Hash generation working
- [x] Smart contract code complete
- [x] Frontend integration ready
- [ ] Contract deployed (optional for demo)
- [x] Documentation complete

---

**Status:** 🟢 Ready for Demo (with or without deployed contract)

