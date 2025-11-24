# 5 Hour MVP Sprint Plan 🚀

**Goal:** Buat MVP yang bisa demo untuk hackathon dengan fitur core yang working

**Status Awal:**
- ✅ Frontend UI complete (landing + DApp pages)
- ✅ Wallet connection working
- ❌ Backend belum ada
- ❌ AI classification belum ada
- ❌ Blockchain integration belum ada

---

## 🎯 Prioritas: Demo-able Features

### Hour 1: NetworkBadge & Error Handling (60 min) ✅ DONE
**Goal:** Polish wallet experience

#### Tasks:
- [x] **NetworkBadge Component** (20 min)
  - `components/dapp/shared/NetworkBadge.tsx`
  - Show mainnet/testnet indicator
  - Green badge for mainnet, orange for testnet
  - Add to WalletCard

- [x] **Toast Notifications** (20 min)
  - Setup toast system (sudah ada di `hooks/use-toast.ts`)
  - Add success toast on wallet connect
  - Add error toast on connection failure
  - Add copy address toast

- [x] **Copy Address Feature** (20 min)
  - Add copy button to WalletCard
  - Show tooltip on hover
  - Toast notification on copy

**Output:** Wallet experience yang polished ✨

---

### Hour 2: Mock Backend API (60 min) ✅ DONE
**Goal:** Simulate backend dengan mock data

#### Tasks:
- [x] **Create Mock API Routes** (40 min)
  - `app/api/reports/route.ts` - GET all reports, POST new report
  - `app/api/reports/[id]/route.ts` - GET single report
  - `app/api/users/[address]/route.ts` - GET user stats
  - `app/api/leaderboard/route.ts` - GET leaderboard
  - Return hardcoded JSON data

- [x] **Mock Data File** (20 min)
  - `lib/mock-data.ts`
  - 25 sample reports dengan Jakarta coordinates
  - User stats data
  - Leaderboard data (20 entries)
  - Helper functions

**Output:** API endpoints yang bisa dipanggil ✅

---

### Hour 3: Connect Dashboard to Mock API (60 min) ✅ DONE
**Goal:** Dashboard show real data dari API

#### Tasks:
- [x] **Fetch Reports on Dashboard** (30 min)
  - Update `app/dapp-simple/page.tsx`
  - Fetch dari `/api/reports`
  - Show loading state
  - Display recent reports table with real data
  - Format timestamps (time ago)

- [x] **Fetch User Stats** (20 min)
  - Fetch dari `/api/users/[address]`
  - Update stats cards (Total Laporan, Token, Reputasi)
  - Show real wallet address stats
  - Loading states

- [x] **Leaderboard Real Data** (10 min)
  - Update `app/dapp-simple/leaderboard/page.tsx`
  - Fetch dari `/api/leaderboard`
  - Show real rankings with avatars
  - Trend indicators (up/down/same)

**Output:** Dashboard dengan data yang dynamic 📊

---

### Hour 4: Photo Upload & Report Submission (60 min) ✅ DONE
**Goal:** User bisa submit report (frontend only)

#### Tasks:
- [x] **Photo Upload Handler** (30 min)
  - Update `app/dapp-simple/report/page.tsx`
  - Handle file selection with drag & drop UI
  - Image preview with remove button
  - Client-side validation (max 5MB, jpg/png only)
  - Base64 conversion for demo

- [x] **Report Form Submission** (30 min)
  - Collect form data (photo, location, type, category, description)
  - POST to `/api/reports` (mock endpoint)
  - Show success/error toast notifications
  - Redirect to dashboard after success
  - Loading states during submission
  - Geolocation API integration
  - Wallet connection check

**Output:** Working report submission flow 📸

---

### Hour 5: Map Integration & Polish (60 min) ✅ DONE
**Goal:** Interactive map dengan markers

#### Tasks:
- [x] **Simple Map with Leaflet** (40 min)
  - Install: `npm install leaflet react-leaflet @types/leaflet --legacy-peer-deps`
  - Create `components/dapp/map/MapView.tsx`
  - Update `app/dapp-simple/map/page.tsx`
  - Show map centered on Jakarta
  - Add markers dari mock reports (25 reports)
  - Color-coded markers (green/orange/red)
  - Click marker to show popup with details
  - Filter buttons (All/Parkir/Traffic)
  - Dynamic import to avoid SSR issues
  - Custom marker icons
  - Styled popups with glassmorphism

- [x] **Final Polish** (20 min)
  - All flows working end-to-end
  - Loading states everywhere
  - Toast notifications
  - Responsive design
  - Smooth transitions

**Output:** Demo-ready MVP! 🎉

---

## 📋 Checklist Summary

### Must Have (Core Demo)
- [x] Wallet connection working
- [ ] NetworkBadge & toast notifications
- [ ] Mock API endpoints
- [ ] Dashboard with real data
- [ ] Report submission form working
- [ ] Interactive map with markers

### Nice to Have (If Time Left)
- [ ] Profile page with real stats
- [ ] Filter reports by type
- [ ] Search location on map
- [ ] Mobile responsive testing
- [ ] Dark mode polish

### Skip for Now (Post-Hackathon)
- ❌ Real backend server
- ❌ AI classification
- ❌ Smart contract deployment
- ❌ IPFS storage
- ❌ Real blockchain transactions
- ❌ Token rewards distribution

---

## 🎬 Demo Script (5 min presentation)

### 1. Landing Page (30 sec)
- Show hero section
- Explain value proposition
- Click "Launch DApp"

### 2. Wallet Connection (30 sec)
- Click "Connect Wallet"
- Show wallet modal
- Connect with Tonkeeper/MyTonWallet
- Show connected state with address

### 3. Dashboard (1 min)
- Show user stats (reports, tokens, reputation)
- Show recent reports table
- Explain real-time updates

### 4. Submit Report (1.5 min)
- Click "Lapor" menu
- Upload photo (drag & drop)
- Fill location & description
- Submit report
- Show success notification
- Redirect to dashboard

### 5. Map View (1 min)
- Click "Peta" menu
- Show interactive map
- Explain color-coded markers
- Click marker to see details
- Show filter options

### 6. Leaderboard (30 sec)
- Show top contributors
- Explain gamification
- Show rewards system

### 7. Future Plans (30 sec)
- AI classification
- Blockchain verification
- Token rewards
- Mobile app

---

## 🛠️ Quick Commands

```bash
# Install dependencies (if needed)
npm install leaflet react-leaflet
npm install -D @types/leaflet

# Development
npm run dev

# Build & test
npm run build
npm run start

# Deploy
git add .
git commit -m "MVP features complete"
git push origin main
# Auto-deploy di Vercel
```

---

## 📸 Screenshots Needed for Demo

1. Landing page hero
2. Wallet connection modal
3. Connected dashboard
4. Report submission form
5. Map with markers
6. Leaderboard
7. Profile page

---

## 🚨 Troubleshooting

### If Time Running Out
**Priority order:**
1. ✅ Wallet connection (DONE)
2. Mock API + Dashboard data
3. Report submission form
4. Map with markers
5. Polish & screenshots

### If Stuck
- Skip AI classification (use mock "verified" status)
- Skip blockchain (use mock transaction hash)
- Skip real storage (use base64 for images)
- Focus on UI/UX flow

---

## 💡 Pro Tips

1. **Use Mock Data Liberally**
   - Hardcode everything for demo
   - Make it look real
   - Add realistic timestamps

2. **Focus on User Flow**
   - Smooth transitions
   - Loading states
   - Success/error feedback
   - Clear CTAs

3. **Polish What's Visible**
   - Animations
   - Hover effects
   - Toast notifications
   - Responsive design

4. **Prepare Backup Plan**
   - Record video demo
   - Screenshots ready
   - Localhost backup if Vercel down

---

## 🎯 Success Criteria

### Minimum Viable Demo
- ✅ User can connect wallet
- ✅ User can see dashboard with data
- ✅ User can submit report (mock)
- ✅ User can see reports on map
- ✅ UI looks polished

### Bonus Points
- Real-time updates simulation
- Smooth animations
- Mobile responsive
- Error handling
- Loading states

---

## 📊 Time Allocation

| Hour | Focus | Output |
|------|-------|--------|
| 1 | Wallet Polish | NetworkBadge, Toast, Copy |
| 2 | Mock API | 3 API routes + mock data |
| 3 | Dashboard Data | Real data from API |
| 4 | Report Form | Photo upload + submission |
| 5 | Map + Polish | Leaflet map + final touches |

---

## 🚀 Post-5-Hour Roadmap

### Week 1 (After Hackathon)
- Real backend API (Express + MongoDB)
- AI classification service
- IPFS storage integration

### Week 2
- Smart contract development
- Blockchain integration
- Token rewards system

### Week 3
- Testing & bug fixes
- Performance optimization
- Security audit

### Week 4
- Production deployment
- Marketing materials
- User onboarding

---

**Last Updated:** Now  
**Next Review:** After Hour 2 (check progress)

**LET'S GO! 🔥**
