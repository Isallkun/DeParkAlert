# Technical Stack

## Core Framework

- **Next.js 16.0.0** with App Router
- **React 19.2.0** with TypeScript 5.x
- **Node.js 18+** required

## Styling & UI

- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Icon library
- **next-themes** - Dark/light theme management

## Blockchain

- **TON Blockchain** - Primary blockchain network
- **@tonconnect/ui-react** - Wallet connection
- **@ton/core, @ton/crypto, @ton/ton** - TON SDK

## Package Manager

Use **npm** or **pnpm** (both lock files present)

## Common Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000
pnpm dev            # Alternative with pnpm

# Production
npm run build       # Build for production
npm run start       # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## Path Aliases

Use `@/` for imports from project root:
```typescript
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
```

## Build Configuration

- TypeScript strict mode enabled
- Build errors ignored in next.config.mjs (temporary for MVP)
- Images unoptimized (temporary setting)

## Planned Backend Stack

- Express.js for API server
- MongoDB for database
- TensorFlow.js for AI classification
- IPFS/Cloudinary for image storage
