# DeParkAlert Backend API

Express.js backend server for DeParkAlert platform.

## Features

- ✅ REST API endpoints
- ✅ Report management
- ✅ User statistics
- ✅ Leaderboard
- ✅ Hash generation
- ✅ In-memory storage
- ✅ CORS enabled

## Installation

```bash
cd backend
npm install
```

## Running

```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /api/health
```

### Reports
```
GET /api/reports?limit=10&status=verified&type=parking
POST /api/reports
GET /api/reports/:id
```

### Users
```
GET /api/users/:address
```

### Leaderboard
```
GET /api/leaderboard?limit=20
```

### Blockchain
```
GET /api/blockchain/contract
```

### Statistics
```
GET /api/stats
```

## Environment Variables

```bash
PORT=3001
CONTRACT_ADDRESS=EQC...
```

## Testing

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Get reports
curl http://localhost:3001/api/reports?limit=5

# Get stats
curl http://localhost:3001/api/stats
```

## Integration with Frontend

Update `.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Production Deployment

### Option 1: Railway
1. Push to GitHub
2. Connect Railway to repo
3. Deploy backend folder
4. Set environment variables

### Option 2: Render
1. Create new Web Service
2. Connect GitHub repo
3. Set root directory to `backend`
4. Deploy

### Option 3: Vercel (Serverless)
Convert to serverless functions in `/api` folder

## Notes

- Currently using in-memory storage
- For production, add MongoDB/PostgreSQL
- Add authentication middleware
- Add rate limiting
- Add request validation
