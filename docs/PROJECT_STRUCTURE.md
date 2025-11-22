# DeParkAlert - Project Structure

## 📋 Overview
**DeParkAlert** — Real-Time Traffic Intelligence on Decentralized Infrastructure

Sistem monitoring parkir dan lalu lintas terdesentralisasi yang menggabungkan AI-based image classification, blockchain verification (TON Network), dan decentralized storage untuk menciptakan ekosistem pelaporan lalu lintas yang transparan dan terverifikasi.

## 🏗️ Teknologi Stack
- **Framework**: Next.js 16.0.0
- **Frontend**: React 19.2.0
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI, Lucide React
- **TypeScript**: 5.x
- **Package Manager**: npm/pnpm

## 📁 Struktur Proyek

```
DeParkAlert/
├── 📁 app/                          # Next.js App Router
│   ├── 📄 globals.css              # Global styles
│   ├── 📄 layout.tsx               # Root layout component
│   └── 📄 page.tsx                 # Homepage
│
├── 📁 components/                   # React components
│   ├── 📄 cta.tsx                  # Call-to-action section
│   ├── 📄 dashboard-preview.tsx    # Dashboard preview component
│   ├── 📄 features.tsx             # Features showcase
│   ├── 📄 footer.tsx               # Footer component
│   ├── 📄 hero.tsx                 # Hero section
│   ├── 📄 how-it-works.tsx         # How it works section
│   ├── 📄 navbar.tsx               # Navigation bar
│   ├── 📄 platform-dashboard.tsx   # Main dashboard platform
│   │
│   └── 📁 ui/                      # UI components (shadcn/ui)
│       ├── 📄 badge.tsx            # Badge component
│       ├── 📄 button.tsx           # Button component
│       ├── 📄 card.tsx             # Card component
│       ├── 📄 input.tsx            # Input component
│       ├── 📄 label.tsx            # Label component
│       └── 📄 tabs.tsx             # Tabs component
│
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 use-mobile.tsx           # Mobile detection hook
│   └── 📄 use-toast.tsx            # Toast notification hook
│
├── 📁 lib/                          # Utility libraries
│   └── 📄 utils.ts                 # Utility functions
│
├── 📁 public/                       # Static assets
│   ├── 🖼️ apple-icon.png           # Apple touch icon
│   ├── 🖼️ icon.svg                 # Main icon
│   ├── 🖼️ icon-dark-32x32.png      # Dark mode icon
│   ├── 🖼️ icon-light-32x32.png     # Light mode icon
│   ├── 🖼️ placeholder.jpg          # Placeholder image
│   ├── 🖼️ placeholder.svg          # Placeholder SVG
│   ├── 🖼️ placeholder-logo.png     # Placeholder logo
│   ├── 🖼️ placeholder-logo.svg     # Placeholder logo SVG
│   └── 🖼️ placeholder-user.jpg     # User avatar placeholder
│
├── 📁 .claude/                      # Claude Code configuration
│   └── 📄 settings.local.json      # Local settings
│
├── 📁 .next/                        # Next.js build output (generated)
├── 📁 node_modules/                 # Dependencies (generated)
│
├── 📄 .gitignore                    # Git ignore rules
├── 📄 components.json               # shadcn/ui configuration
├── 📄 next.config.mjs              # Next.js configuration
├── 📄 next-env.d.ts                # Next.js TypeScript definitions
├── 📄 package.json                 # Project dependencies & scripts
├── 📄 package-lock.json            # npm lock file
├── 📄 pnpm-lock.yaml               # pnpm lock file
├── 📄 postcss.config.mjs           # PostCSS configuration
└── 📄 tsconfig.json                # TypeScript configuration
```

## 🚀 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Component Hierarchy

### Main Pages
- **Homepage** (`app/page.tsx`) - Landing page dengan hero, features, dan CTA
- **Layout** (`app/layout.tsx`) - Root layout dengan navbar dan footer

### Key Components
- **Navbar** - Navigation dengan tema dark/light mode
- **Hero** - Hero section utama dengan headline dan CTA
- **Features** - Showcase fitur-fitur aplikasi
- **HowItWorks** - Penjelasan cara kerja sistem
- **PlatformDashboard** - Dashboard monitoring parkir
- **DashboardPreview** - Preview dashboard untuk landing page

### UI Components
- **Button** - Komponen button dengan berbagai variants
- **Card** - Card container untuk content
- **Badge** - Badge untuk status atau labels
- **Input** - Form input components
- **Tabs** - Tab navigation component

## 🔧 Configuration Files

- **`components.json`** - Konfigurasi shadcn/ui
- **`next.config.mjs`** - Konfigurasi Next.js
- **`tailwind.config.js`** - Konfigurasi Tailwind CSS
- **`tsconfig.json`** - Konfigurasi TypeScript
- **`postcss.config.mjs`** - Konfigurasi PostCSS

## 📦 Dependencies Utama

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - React library
- `tailwindcss` - CSS framework
- `lucide-react` - Icon library

### UI Libraries
- `@radix-ui/react-*` - Primitif UI components
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Utility classes

### Additional Libraries
- `next-themes` - Theme management
- `@vercel/analytics` - Analytics
- `vaul` - Drawer/modal component

## 🎯 Fitur Utama

1. **Real-time Parking Monitoring** - Monitoring tempat parkir real-time
2. **Interactive Dashboard** - Dashboard interaktif dengan statistik
3. **Mobile Responsive** - Desain responsif untuk mobile
4. **Dark/Light Theme** - Tema yang dapat diubah
5. **Alert System** - Sistem notifikasi dan alert

---

*Generated on November 8, 2025*