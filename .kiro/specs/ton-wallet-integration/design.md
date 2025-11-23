# Design Document: TON Wallet Integration

## Overview

This design implements real TON wallet integration for the DeParkAlert DApp using the TonConnect SDK. The implementation will replace the current mock wallet connection with a fully functional wallet system that allows users to connect their TON wallets, view their wallet information, and prepare for future blockchain transactions.

The design follows a React hooks-based architecture, leveraging the `@tonconnect/ui-react` library that is already installed in the project. The wallet state will be managed centrally and accessible throughout the application via custom hooks and context providers.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     DApp Application                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              TonConnectUIProvider                      │  │
│  │  (Wraps entire app in app/layout.tsx)                │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         Custom Hooks Layer                    │   │  │
│  │  │  - useTonConnect()                           │   │  │
│  │  │  - useTonAddress()                           │   │  │
│  │  │  - useTonWallet()                            │   │  │
│  │  │  - useWalletConnection()                     │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         UI Components                         │   │  │
│  │  │  - WalletButton (Connect/Disconnect)         │   │  │
│  │  │  - WalletInfo (Address Display)              │   │  │
│  │  │  - WalletCard (Sidebar Component)            │   │  │
│  │  │  - NetworkBadge (Network Indicator)          │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │  TonConnect SDK  │
                  └──────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │  Wallet Providers│
                  │  (Tonkeeper, etc)│
                  └──────────────────┘
```

### Component Hierarchy

```
app/layout.tsx (Root)
├── TonConnectUIProvider
    └── app/dapp-simple/layout.tsx
        ├── Sidebar
        │   └── WalletCard
        │       ├── WalletButton
        │       ├── WalletInfo
        │       └── NetworkBadge
        └── Page Content
```

## Components and Interfaces

### 1. TonConnect Provider Setup

**Location**: `app/layout.tsx`

The root layout will be wrapped with `TonConnectUIProvider` to make wallet functionality available throughout the app.

```typescript
interface TonConnectConfig {
  manifestUrl: string;
  actionsConfiguration?: {
    twaReturnUrl?: string;
  };
}
```

### 2. Custom Hooks

**Location**: `hooks/use-wallet-connection.ts`

A custom hook that combines TonConnect hooks and provides a unified interface:

```typescript
interface WalletConnectionState {
  // Connection state
  wallet: Wallet | null;
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  
  // Network info
  network: 'mainnet' | 'testnet' | null;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  
  // Utilities
  formatAddress: (address: string) => string;
  copyAddress: () => Promise<void>;
}
```

### 3. Wallet Button Component

**Location**: `components/dapp/shared/WalletButton.tsx`

```typescript
interface WalletButtonProps {
  variant?: 'default' | 'compact';
  className?: string;
}
```

Displays "Connect Wallet" when disconnected, shows address when connected.

### 4. Wallet Card Component

**Location**: `components/dapp/layout/WalletCard.tsx`

```typescript
interface WalletCardProps {
  className?: string;
}
```

Enhanced version of the existing wallet card in the sidebar with real connection functionality.

### 5. Network Badge Component

**Location**: `components/dapp/shared/NetworkBadge.tsx`

```typescript
interface NetworkBadgeProps {
  network: 'mainnet' | 'testnet' | null;
  className?: string;
}
```

Displays the current network with appropriate styling.

## Data Models

### Wallet State

```typescript
interface Wallet {
  device: {
    appName: string;
    appVersion: string;
    platform: string;
  };
  provider: string;
  account: {
    address: string;
    chain: string;
    publicKey: string;
  };
}
```

### Connection Status

```typescript
type ConnectionStatus = 
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error';

interface ConnectionError {
  code: string;
  message: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing all testable properties from the prework, I've identified opportunities to consolidate redundant properties:

**Consolidations:**
- Properties 1.3, 2.2, 2.5 all test that connected state displays correct UI elements - can be combined into one comprehensive "connected state UI consistency" property
- Properties 3.2, 3.3, 3.4 all test disconnection cleanup - can be combined into one "disconnection cleanup" property
- Properties 5.2 and 5.3 both test operation feedback - can be combined into one "operation feedback" property
- Properties 2.1 and 2.3 both test address display - can be combined into one "address display" property

This reduces redundancy while maintaining comprehensive coverage.

### Correctness Properties

Property 1: Connect button triggers wallet provider selection
*For any* disconnected wallet state, clicking the connect button should display the available wallet providers
**Validates: Requirements 1.1**

Property 2: Provider selection initiates connection
*For any* selected wallet provider, the system should call the appropriate connection method for that provider
**Validates: Requirements 1.2**

Property 3: Connected state UI consistency
*For any* successful wallet connection, the system should display the wallet address, show "Connected" status, display the wallet card in sidebar, and show the network type
**Validates: Requirements 1.3, 2.2, 2.4, 2.5**

Property 4: Connection failure handling
*For any* failed connection attempt, the system should display an error message and keep the connect button available for retry
**Validates: Requirements 1.4**

Property 5: Session persistence
*For any* connected wallet, refreshing the page should restore the same connection state with the same wallet address
**Validates: Requirements 1.5, 4.4**

Property 6: Address formatting and display
*For any* valid wallet address, the shortened display should show first 6 and last 4 characters, and hovering should reveal the full address
**Validates: Requirements 2.1, 2.3**

Property 7: Disconnection cleanup
*For any* connected wallet, clicking disconnect should terminate the connection, clear all wallet UI state, show the connect button, and remove data from local storage
**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

Property 8: State synchronization across components
*For any* wallet state change, all components displaying wallet information should update to reflect the new state
**Validates: Requirements 4.2**

Property 9: Loading state feedback
*For any* wallet connection attempt in progress, the system should display a loading indicator
**Validates: Requirements 5.1**

Property 10: Operation feedback
*For any* wallet operation (connect, disconnect), the system should display appropriate feedback (success notification or error message with reason)
**Validates: Requirements 5.2, 5.3**

Property 11: Connected state visual indicator
*For any* connected wallet, the connection indicator should display a pulse animation
**Validates: Requirements 5.4**

Property 12: Network validation warning
*For any* wallet connected to an unexpected network, the system should display a warning message
**Validates: Requirements 5.5**

Property 13: Mobile environment detection
*For any* mobile device, the system should correctly detect the mobile environment and provide mobile-specific connection flows
**Validates: Requirements 6.1, 6.2**

Property 14: Mobile wallet installation fallback
*For any* mobile device without a wallet app installed, the system should provide a link to install a wallet
**Validates: Requirements 6.3**

Property 15: Mobile connection flow completion
*For any* mobile user returning from a wallet app, the system should automatically complete the connection flow
**Validates: Requirements 6.4**

## Error Handling

### Connection Errors

```typescript
enum WalletErrorCode {
  USER_REJECTED = 'USER_REJECTED_CONNECTION',
  WALLET_NOT_FOUND = 'WALLET_NOT_FOUND',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'CONNECTION_TIMEOUT',
  UNKNOWN = 'UNKNOWN_ERROR'
}

interface WalletError {
  code: WalletErrorCode;
  message: string;
  details?: unknown;
}
```

**Error Handling Strategy:**

1. **User Rejection**: Display friendly message, allow immediate retry
2. **Wallet Not Found**: Suggest wallet installation, provide links
3. **Network Error**: Show retry button, check internet connection
4. **Timeout**: Automatic retry with exponential backoff
5. **Unknown Error**: Log to console, show generic error message

### State Recovery

If the app detects an inconsistent state (e.g., wallet connected in TonConnect but not in UI):
1. Attempt to sync state from TonConnect
2. If sync fails, disconnect wallet and reset to clean state
3. Log the inconsistency for debugging

## Testing Strategy

### Unit Testing

**Framework**: Jest + React Testing Library

**Test Coverage:**

1. **Hook Tests** (`use-wallet-connection.test.ts`)
   - Test wallet connection flow
   - Test disconnection flow
   - Test address formatting utility
   - Test error handling

2. **Component Tests**
   - `WalletButton.test.tsx`: Test button states and click handlers
   - `WalletCard.test.tsx`: Test card display with different wallet states
   - `NetworkBadge.test.tsx`: Test network display logic

3. **Integration Tests**
   - Test full connection flow from button click to connected state
   - Test disconnection flow
   - Test session persistence across page reloads

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Configuration**: Each property test should run a minimum of 100 iterations.

**Test Tagging**: Each property-based test must include a comment with this format:
```typescript
// **Feature: ton-wallet-integration, Property {number}: {property_text}**
```

**Property Tests:**

1. **Address Formatting Property** (Property 6)
   - Generate random valid TON addresses
   - Verify shortened format is always first 6 + "..." + last 4 characters
   - Verify full address is preserved

2. **State Consistency Property** (Property 8)
   - Generate random wallet state changes
   - Verify all components reflect the same state
   - Verify no stale data in any component

3. **Disconnection Cleanup Property** (Property 7)
   - Generate random connected wallet states
   - Perform disconnect
   - Verify all state is cleared (UI, storage, memory)

4. **Session Persistence Property** (Property 5)
   - Generate random wallet connections
   - Simulate page refresh
   - Verify connection state is restored correctly

## Implementation Details

### File Structure

```
app/
├── layout.tsx                          # Add TonConnectUIProvider
└── dapp-simple/
    └── layout.tsx                      # Update to use real wallet hooks

components/dapp/
├── layout/
│   └── WalletCard.tsx                  # Update with real connection
└── shared/
    ├── WalletButton.tsx                # New component
    └── NetworkBadge.tsx                # New component

hooks/
└── use-wallet-connection.ts            # New custom hook

public/
└── tonconnect-manifest.json            # Already exists
```

### TonConnect Manifest

The manifest file already exists at `public/tonconnect-manifest.json`. It should contain:

```json
{
  "url": "https://deparkalert.vercel.app",
  "name": "DeParkAlert",
  "iconUrl": "https://deparkalert.vercel.app/icon.svg"
}
```

### Environment Variables

```env
NEXT_PUBLIC_MANIFEST_URL=https://deparkalert.vercel.app/tonconnect-manifest.json
NEXT_PUBLIC_TON_NETWORK=testnet  # or mainnet
```

### Styling Considerations

- Maintain glassmorphism design system
- Use existing color palette (violet/indigo gradients)
- Ensure mobile responsiveness
- Add smooth transitions for state changes
- Use existing animation patterns (pulse, fade-in)

### Performance Considerations

1. **Lazy Loading**: TonConnect modal loads only when needed
2. **Memoization**: Wallet state and derived values are memoized
3. **Debouncing**: Address copy feedback debounced to prevent spam
4. **Optimistic Updates**: UI updates immediately, sync with blockchain async

### Security Considerations

1. **Never store private keys**: TonConnect handles all key management
2. **Validate addresses**: Always validate address format before display
3. **Secure manifest**: Serve manifest over HTTPS
4. **XSS Protection**: Sanitize all user-facing wallet data
5. **Network validation**: Warn users if on unexpected network

## Dependencies

All required dependencies are already installed:

```json
{
  "@tonconnect/ui-react": "^2.3.1",
  "@ton/core": "^0.62.0",
  "@ton/crypto": "^3.3.0",
  "@ton/ton": "^16.0.0",
  "ton": "^13.9.0"
}
```

No additional dependencies needed.

## Migration from Mock Implementation

### Current Mock Implementation

The current `app/dapp-simple/layout.tsx` has:
- Hardcoded wallet address: "UQD...abc123"
- Mock connection state
- Static "Connected" status

### Migration Steps

1. Wrap app with TonConnectUIProvider in root layout
2. Replace mock state with `useWalletConnection()` hook
3. Update WalletCard to use real wallet data
4. Remove hardcoded addresses
5. Add real connect/disconnect handlers
6. Test with real wallet (Tonkeeper recommended for testing)

### Backward Compatibility

- UI structure remains the same
- Component props remain compatible
- Styling is preserved
- No breaking changes to other features

## Future Enhancements

While not part of this spec, these enhancements are planned for future iterations:

1. **Transaction Signing**: Sign and submit blockchain transactions
2. **Balance Display**: Show user's TON balance
3. **Multi-wallet Support**: Allow switching between multiple connected wallets
4. **Wallet History**: Track connection history and frequently used wallets
5. **QR Code Connection**: Desktop QR code scanning for mobile wallets
