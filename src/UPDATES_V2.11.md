# MINIFI v2.11 Update - Wallet-Gated Creature Access

## Overview
Fixed the application flow to require wallet connection before minting and properly gate creature access based on wallet connection status. All data is now wallet-specific.

## Critical Flow Fixes

### 1. **Wallet-Required Minting**
- Users MUST connect wallet before minting any creatures
- Both random mint and dedicated mint buttons check wallet connection
- Error toast shown if user attempts to mint without wallet
- Wallet connect modal triggered automatically

### 2. **Wallet-Specific Data Storage**
All user data is now stored with wallet-specific keys:
- `minifi-creatures-${walletAddress}` - Array of minted creature names
- `minifi-creatures-data-${walletAddress}` - Full creature stats and data
- `minifi-random-mint-count-${walletAddress}` - Random mint counter (for free first mint)

### 3. **Wallet Disconnect Behavior**
When user disconnects wallet:
- All creature data cleared from state (but preserved in localStorage)
- Redirected to mint page
- Dashboard becomes inaccessible
- Menu hides "My Creature" option

### 4. **Wallet Reconnect Behavior**
When user reconnects wallet (or connects a different wallet):
- Loads creature data specific to that wallet address
- Each wallet has its own separate creature collection
- Mint counter resets per wallet (first mint always free)
- Stats and progress are wallet-specific

## Updated Data Flow

### Initial Load
1. Check if intro has been seen
2. Check for saved wallet in localStorage
3. If wallet exists, auto-connect and load its creatures
4. Display appropriate page (mint if no creatures, dashboard if has creatures)

### Minting Flow
1. User must connect wallet first
2. Choose random mint (free first time per wallet, then 1 USDC) or dedicated mint (3 USDC)
3. Creature added to wallet-specific storage
4. Redirect to dashboard to view/care for creature

### Multi-Creature Navigation
- Only appears when user owns 2+ creatures
- All creatures must belong to the connected wallet
- Swipe/click to switch between creatures
- Each creature maintains individual stats

## Data Persistence

### Per-Wallet Storage Keys
```
minifi-wallet                           // Currently connected wallet
minifi-creatures-${wallet}              // Array of creature names for wallet
minifi-creatures-data-${wallet}         // Full creature data with stats
minifi-random-mint-count-${wallet}      // Mint counter per wallet
```

### Global Storage Keys
```
minifi-seen-intro                       // Has user seen intro animation
```

## Security & Privacy

### Wallet Isolation
- Each wallet address has completely separate data
- Switching wallets shows different creatures
- No cross-contamination between wallet states
- Mint counters are per-wallet (fair for new users)

### Data Access Control
- Creature dashboard requires active wallet connection
- No creatures visible without wallet
- Dashboard tab hidden in menu when no creatures
- Automatic redirect to mint page on disconnect

## Component Updates

### App.tsx
- Added `loadCreaturesForWallet()` function
- Updated wallet connect/disconnect handlers
- Added wallet validation in `handleMintComplete()`
- Pass `walletAddress` to all child components

### MintingPage.tsx
- Added `walletAddress` prop
- Updated random mint counter to be wallet-specific
- Enforced wallet connection before minting
- Better error messaging for wallet requirements

### CreatureDashboard.tsx
- Added `walletAddress` prop (required)
- Updated creature data loading to be wallet-specific
- Updated creature data saving to be wallet-specific
- No breaking changes to UI/UX

### MobileHeader.tsx
- Already correctly hides dashboard when `hasCreature` is false
- Wallet button shows connection status
- Menu displays connected wallet address
- Disconnect option in menu when connected

## User Experience Improvements

### Clear Wallet Requirements
- Cannot mint without wallet
- Dashboard hidden until first mint
- Toast notifications guide user
- Wallet button prominently displayed in header

### Multi-Wallet Support
- Switch wallets to access different creature collections
- Each wallet maintains separate progress
- Fair "first mint free" per wallet address
- No data loss when switching wallets

### Data Integrity
- No orphaned creatures
- All data properly scoped to wallet
- LocalStorage organized by wallet address
- Easy to debug/clear per-wallet data

## Technical Implementation

### Wallet Address Validation
```typescript
if (!isWalletConnected || !walletAddress) {
  toast.error("Please connect your wallet first");
  return;
}
```

### Wallet-Specific Storage
```typescript
const storageKey = `minifi-creatures-${walletAddress}`;
localStorage.setItem(storageKey, JSON.stringify(data));
```

### Creature Loading
```typescript
const loadCreaturesForWallet = (wallet: string) => {
  const storageKey = `minifi-creatures-${wallet}`;
  const savedCreatures = localStorage.getItem(storageKey);
  // Load and set creatures...
}
```

## Migration Notes

### Legacy Data Support
- Old non-wallet-specific data is NOT automatically migrated
- Users will need to re-mint creatures after this update
- This ensures clean wallet-gated implementation
- Previous localStorage keys can be manually cleared

## Benefits

1. **Proper Web3 Flow** - Wallet required for all minting/ownership
2. **Multi-Wallet Support** - Different wallets = different collections
3. **Data Isolation** - No data leakage between wallets
4. **Fair Economics** - First mint free per wallet (not per device)
5. **Better UX** - Clear requirements and guided flow
6. **Scalability** - Ready for real blockchain integration

---

**Version**: 2.11  
**Date**: October 14, 2025  
**Focus**: Wallet-Gated Access & Wallet-Specific Data Storage
