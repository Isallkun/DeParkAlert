# 🚗 DeParkAlert - Decentralized Traffic Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TON](https://img.shields.io/badge/TON-Blockchain-0088CC?style=flat-square&logo=telegram)](https://ton.org/)

> **Real-time traffic monitoring powered by AI and blockchain technology**

DeParkAlert adalah sistem monitoring parkir dan lalu lintas terdesentralisasi yang menggabungkan AI-based image classification, blockchain verification (TON Network), dan decentralized storage untuk menciptakan ekosistem pelaporan lalu lintas yang transparan dan terverifikasi.

## ✨ Features

### 🎯 Core Features
- **🤖 AI-Powered Classification** - Automatic parking condition detection
- **🔗 Blockchain Verification** - Immutable reports on TON Network
- **💰 Token Rewards** - Earn $DPARK tokens for verified reports
- **🗺️ Interactive Map** - Real-time traffic visualization
- **🏆 Gamification** - Leaderboard and achievement system
- **📱 Mobile Responsive** - Works seamlessly on all devices

### 🎨 Design Features
- **Glassmorphism UI** - Modern semi-transparent design
- **Dark Mode** - Optimized for Web3 aesthetic
- **Ambient Lighting** - Beautiful blur orb effects
- **Smooth Animations** - 60fps transitions and micro-interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/DeParkAlert.git
cd DeParkAlert

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Application Structure

### Landing Page (`/`)
- Hero section with value proposition
- Features showcase
- How it works explanation
- Platform dashboard preview
- Call-to-action

### DApp Interface (`/dapp-simple`)
- **Dashboard** - Overview and statistics
- **Report** - Submit parking reports with photos
- **Map** - Interactive traffic map
- **Leaderboard** - Top contributors ranking
- **Profile** - User statistics and achievements

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript 5

### Blockchain
- **Network**: TON Blockchain
- **Wallet**: TonConnect SDK
- **Smart Contracts**: Tact/TypeScript

### Backend (Planned)
- **Runtime**: Node.js 22
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Engine**: TensorFlow.js
- **Storage**: IPFS / Cloudinary

## 🎨 Design System

### Color Palette
```css
Primary: Violet (#7c3aed, #8b5cf6)
Secondary: Indigo (#4f46e5, #6366f1)
Accent: Fuchsia (#d946ef, #e879f9)
Success: Emerald (#10b981, #34d399)
Warning: Orange (#f97316, #fb923c)
Danger: Red (#ef4444, #f87171)
Background: #08080c, #0a0a0f
```

### Typography
- **Font**: Geist Sans
- **Headings**: Bold, 24-48px
- **Body**: Regular, 14-16px

## 📂 Project Structure

```
DeParkAlert/
├── 📁 app/                     # Next.js App Router
│   ├── 📄 layout.tsx          # Root layout
│   ├── 📄 page.tsx            # Landing page
│   ├── 📄 globals.css         # Global styles
│   └── 📁 dapp-simple/        # DApp pages
│       ├── 📄 layout.tsx      # DApp layout with sidebar
│       ├── 📄 page.tsx        # Dashboard
│       ├── 📁 report/         # Report submission
│       ├── 📁 map/            # Interactive map
│       ├── 📁 leaderboard/    # Rankings
│       └── 📁 profile/        # User profile
│
├── 📁 components/              # React components
│   ├── 📁 dapp/               # DApp-specific components
│   │   ├── 📁 layout/         # Layout components
│   │   ├── 📁 dashboard/      # Dashboard components
│   │   └── 📁 shared/         # Shared components
│   └── 📁 ui/                 # shadcn/ui components
│
├── 📁 hooks/                   # Custom React hooks
├── 📁 lib/                     # Utility libraries
├── 📁 public/                  # Static assets
└── 📁 docs/                    # Documentation
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📊 Current Status

### ✅ Completed (MVP Phase 1)
- [x] Landing page with glassmorphism design
- [x] DApp layout with sidebar navigation
- [x] Dashboard with statistics cards
- [x] Report submission UI
- [x] Interactive map placeholder
- [x] Leaderboard with podium display
- [x] User profile with achievements
- [x] Mobile responsive design
- [x] TON Connect dependencies

### 🚧 In Progress
- [ ] Real wallet connection (TonConnect)
- [ ] Backend API development
- [ ] AI model integration
- [ ] Smart contract deployment

### 📋 Planned Features
- [ ] Photo upload with AI classification
- [ ] Real-time map with live data
- [ ] Blockchain transaction handling
- [ ] Token reward distribution
- [ ] Community verification system

## 🎯 Roadmap

### Phase 1: MVP Foundation (Current)
- ✅ Frontend UI/UX implementation
- 🔄 Wallet integration
- 📋 Backend API development
- 📋 AI model integration

### Phase 2: Blockchain Integration
- 📋 Smart contract development
- 📋 TON Network integration
- 📋 Transaction handling
- 📋 Reward system

### Phase 3: Advanced Features
- 📋 Real-time map integration
- 📋 Community verification
- 📋 Mobile app (React Native)
- 📋 Advanced analytics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Documentation

Detailed documentation is available in the `/docs` folder:

- [📋 Project Structure](docs/PROJECT_STRUCTURE.md)
- [🏗️ Architecture Guide](docs/DEPARK_ALERT_ARCHITECTURE.md)
- [🚀 Development Context](docs/DEVELOPMENT_CONTEXT.md)
- [🗺️ Roadmap](docs/ROADMAP.md)
- [✅ Implementation Status](docs/DAPP_IMPLEMENTATION_COMPLETE.md)

## 🔗 Links

- **Demo**: [https://deparkalert.vercel.app](https://deparkalert.vercel.app)
- **Documentation**: [/docs](./docs/)
- **TON Network**: [https://ton.org](https://ton.org)
- **TonConnect**: [https://docs.ton.org/develop/dapps/ton-connect](https://docs.ton.org/develop/dapps/ton-connect)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TON Foundation** for blockchain infrastructure
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **Lucide** for beautiful icons

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@deparkalert.com
- 💬 Discord: [Join our community](https://discord.gg/deparkalert)
- 🐦 Twitter: [@DeParkAlert](https://twitter.com/deparkalert)
- 📖 Documentation: [/docs](./docs/)

---

<div align="center">
  <p><strong>Built with ❤️ for the decentralized future</strong></p>
  <p>© 2025 DeParkAlert. All rights reserved.</p>
</div>
