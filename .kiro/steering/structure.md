# Project Structure & Conventions

## Directory Organization

```
app/                    # Next.js App Router pages
├── dapp-simple/       # DApp interface pages
│   ├── layout.tsx     # DApp layout with sidebar
│   ├── page.tsx       # Dashboard
│   ├── report/        # Report submission
│   ├── map/           # Interactive map
│   ├── leaderboard/   # Rankings
│   └── profile/       # User profile
├── layout.tsx         # Root layout
├── page.tsx           # Landing page
└── globals.css        # Global styles

components/            # React components
├── dapp/             # DApp-specific components
│   ├── dashboard/    # Dashboard components
│   ├── layout/       # Layout components
│   └── shared/       # Shared DApp components
├── ui/               # shadcn/ui components
└── *.tsx             # Landing page components

hooks/                # Custom React hooks
lib/                  # Utility functions
public/               # Static assets
docs/                 # Project documentation
```

## Code Conventions

### Component Structure

- Use **'use client'** directive for client components
- Functional components with TypeScript interfaces
- Props interface defined above component

```typescript
interface ComponentProps {
  children: React.ReactNode
  className?: string
}

export function Component({ children, className }: ComponentProps) {
  // implementation
}
```

### Styling Patterns

- **Glassmorphism**: `bg-white/5 border border-white/10 backdrop-blur-md`
- **Gradients**: `from-violet-600 to-indigo-600` for primary actions
- **Hover states**: Always include smooth transitions
- **Dark theme**: Primary background `#08080c`, secondary `#0a0a0f`

### Ambient Effects

Use blur orbs for ambient lighting:
```typescript
<div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
```

### Utility Usage

- Use `cn()` from `@/lib/utils` for conditional classes
- Combine with `clsx` and `tailwind-merge`

### Component Patterns

- **GlassCard**: Reusable glassmorphism container
- **StatusBadge**: Consistent badge styling
- **GradientButton**: Primary action buttons
- **AmbientBackground**: Blur orb effects

## File Naming

- Components: PascalCase (e.g., `GlassCard.tsx`)
- Utilities: kebab-case (e.g., `use-mobile.ts`)
- Pages: lowercase (e.g., `page.tsx`)

## Import Order

1. React/Next.js imports
2. Third-party libraries
3. Local components
4. Utilities
5. Types

## Responsive Design

- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Sidebar collapses on mobile with overlay
- Touch-friendly button sizes (min 44x44px)

## State Management

- Use React hooks (useState, useEffect)
- Client-side routing with `useRouter`, `usePathname`
- No global state library yet (planned for later)

## TON Integration

- TonConnect provider wraps app in root layout
- Wallet connection UI in sidebar
- Mock data used until real integration complete
