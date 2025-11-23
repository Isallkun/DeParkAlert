# Implementation Plan

- [x] 1. Setup TonConnect Provider in root layout





  - Wrap the application with TonConnectUIProvider in `app/layout.tsx`
  - Configure manifest URL from environment variable
  - Add TonConnect UI styles import
  - Test that provider is accessible throughout the app
  - _Requirements: 4.1_

- [-] 2. Create custom wallet connection hook


  - [x] 2.1 Implement useWalletConnection hook



    - Create `hooks/use-wallet-connection.ts`
    - Integrate useTonConnect, useTonAddress, useTonWallet from @tonconnect/ui-react
    - Implement connection state management (isConnected, isConnecting, wallet, address)
    - Implement connect() and disconnect() functions
    - Add address formatting utility (first 6 + last 4 chars)
    - Add network detection logic
    - Add copy address to clipboard functionality
    - _Requirements: 4.2, 4.3_

  - [ ] 2.2 Write property test for address formatting





    - **Property 6: Address formatting and display**
    - **Validates: Requirements 2.1, 2.3**

  - [ ]* 2.3 Write property test for state synchronization
    - **Property 8: State synchronization across components**
    - **Validates: Requirements 4.2**

- [x] 3. Create WalletButton component
  - [x] 3.1 Implement WalletButton component
    - Create `components/dapp/shared/WalletButton.tsx`
    - Add 'use client' directive
    - Use useWalletConnection hook
    - Implement connect button UI (when disconnected)
    - Implement disconnect button UI (when connected)
    - Show loading state during connection
    - Display shortened address when connected
    - Add glassmorphism styling consistent with design system
    - Add hover effects and transitions
    - _Requirements: 1.1, 1.2, 3.1, 3.3_

  - [ ]* 3.2 Write unit tests for WalletButton
    - Test button renders "Connect Wallet" when disconnected
    - Test button shows address when connected
    - Test loading state during connection
    - Test click handlers
    - _Requirements: 1.1, 3.1_

  - [ ]* 3.3 Write property test for connect button behavior
    - **Property 1: Connect button triggers wallet provider selection**
    - **Validates: Requirements 1.1**

- [ ] 4. Create NetworkBadge component
  - [ ] 4.1 Implement NetworkBadge component
    - Create `components/dapp/shared/NetworkBadge.tsx`
    - Display network type (mainnet/testnet)
    - Add color coding (green for mainnet, orange for testnet)
    - Add warning state for wrong network
    - Use badge styling from existing StatusBadge pattern
    - _Requirements: 2.4, 5.5_

  - [ ]* 4.2 Write unit tests for NetworkBadge
    - Test mainnet display
    - Test testnet display
    - Test warning state
    - _Requirements: 2.4, 5.5_

  - [ ]* 4.3 Write property test for network validation
    - **Property 12: Network validation warning**
    - **Validates: Requirements 5.5**

- [x] 5. Update WalletCard component with real connection
  - [x] 5.1 Refactor WalletCard to use real wallet data
    - Update `components/dapp/layout/WalletCard.tsx` (if exists) or create new
    - Remove mock wallet address and state
    - Use useWalletConnection hook
    - Display real wallet address with formatting
    - Add NetworkBadge component (pending)
    - Show connection status indicator with pulse animation
    - Add tooltip for full address on hover (pending)
    - Integrate WalletButton component
    - Add loading state UI
    - _Requirements: 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 5.4_

  - [ ]* 5.2 Write property test for connected state UI
    - **Property 3: Connected state UI consistency**
    - **Validates: Requirements 1.3, 2.2, 2.4, 2.5**

  - [ ]* 5.3 Write property test for loading state
    - **Property 9: Loading state feedback**
    - **Validates: Requirements 5.1**

- [x] 6. Update DApp layout to use real wallet
  - [x] 6.1 Update dapp-simple layout
    - Modify `app/dapp-simple/layout.tsx`
    - Remove mock wallet state
    - Ensure WalletCard uses real connection
    - Test wallet display in sidebar
    - Verify mobile responsive behavior
    - _Requirements: 2.5_

- [ ] 7. Implement error handling and user feedback
  - [ ] 7.1 Add error handling to wallet operations
    - Create error type definitions
    - Add try-catch blocks in connect/disconnect functions
    - Implement error message display (toast notifications)
    - Add success notifications for operations
    - Handle user rejection gracefully
    - Handle network errors with retry option
    - _Requirements: 1.4, 5.2, 5.3_

  - [ ]* 7.2 Write property test for connection failure handling
    - **Property 4: Connection failure handling**
    - **Validates: Requirements 1.4**

  - [ ]* 7.3 Write property test for operation feedback
    - **Property 10: Operation feedback**
    - **Validates: Requirements 5.2, 5.3**

- [ ] 8. Implement session persistence
  - [ ] 8.1 Add session persistence logic
    - Verify TonConnect auto-reconnect works on page refresh
    - Test connection restoration after browser refresh
    - Ensure wallet state persists in localStorage via TonConnect
    - _Requirements: 1.5, 4.4_

  - [ ]* 8.2 Write property test for session persistence
    - **Property 5: Session persistence**
    - **Validates: Requirements 1.5, 4.4**

- [ ] 9. Implement disconnection cleanup
  - [ ] 9.1 Add comprehensive disconnect logic
    - Ensure disconnect clears all UI state
    - Verify localStorage is cleaned up
    - Test that connect button reappears after disconnect
    - Verify all components update after disconnect
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ]* 9.2 Write property test for disconnection cleanup
    - **Property 7: Disconnection cleanup**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**

- [ ] 10. Add mobile wallet support
  - [ ] 10.1 Implement mobile detection and deep links
    - Add mobile environment detection
    - Configure TonConnect for mobile deep links
    - Test mobile wallet connection flow
    - Add fallback for wallet not installed
    - Provide install links for popular wallets
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 10.2 Write property test for mobile environment detection
    - **Property 13: Mobile environment detection**
    - **Validates: Requirements 6.1, 6.2**

  - [ ]* 10.3 Write property test for mobile wallet fallback
    - **Property 14: Mobile wallet installation fallback**
    - **Validates: Requirements 6.3**

  - [ ]* 10.4 Write property test for mobile flow completion
    - **Property 15: Mobile connection flow completion**
    - **Validates: Requirements 6.4**

- [ ] 11. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Polish and final testing
  - [ ] 12.1 Final integration testing
    - Test complete connection flow end-to-end
    - Test disconnection flow end-to-end
    - Test session persistence across page reloads
    - Test error scenarios (network errors, user rejection)
    - Test mobile wallet connection
    - Verify all UI states (disconnected, connecting, connected, error)
    - Test with real wallet (Tonkeeper recommended)
    - _Requirements: All_

  - [ ]* 12.2 Write integration tests
    - Test full connection flow from button to connected state
    - Test full disconnection flow
    - Test session recovery
    - _Requirements: All_

- [ ] 13. Update documentation
  - [ ] 13.1 Update project documentation
    - Update DEVELOPMENT_CONTEXT.md with wallet integration status
    - Update ROADMAP.md to mark wallet integration as complete
    - Add wallet connection guide for users
    - Document environment variables needed
    - _Requirements: All_
