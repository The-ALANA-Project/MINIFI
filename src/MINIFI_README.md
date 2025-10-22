# MINIFI - Cosmic Creatures Mini App

**Feed. Grow. Save.**

A mobile-first Farcaster mini app for minting and nurturing unique blockchain creatures while generating DeFi yield.

## 🌟 Overview

MINIFI (Mini Finance) is a web-based mobile application that combines digital pet ownership with DeFi yield generation. Users can mint unique creatures as Unlock Protocol NFTs, feed them with UP tokens, and watch them grow while their investments automatically generate yield through Aave Protocol integration.

**It's not just about caring for your creature — it's about building savings while having fun.**

## 📱 Mobile-First Design

### Desktop Experience
- App displayed in a realistic mobile phone frame
- Centered on screen with subtle cosmic glow
- Scales responsively on smaller desktop screens
- Complete mobile simulation with notch and buttons

### Mobile Experience  
- Full-screen native app feel
- Optimized touch targets (44px minimum)
- Safe area support for notched devices
- Smooth scrolling and touch interactions
- Pull-to-refresh disabled for app-like feel
- Hidden scrollbars for cleaner UI
- Haptic-friendly touch feedback

### Performance Optimizations
- Hardware-accelerated animations
- Touch-optimized card interactions
- Prevents zoom on input focus (iOS)
- Dynamic viewport height support
- Image optimization and drag prevention
- Smooth 60fps animations

## ✨ Features

### Star Wars-Style Intro
- Cinematic scrolling text introduction
- Skippable with option to replay
- Introduces the "Feed. Grow. Save." concept
- Explains Aave Protocol integration

### Minting Page
- **Random Mint**: 
  - First mint is FREE! 🎉
  - Subsequent random mints: 1 USDC each
  - Surprise creature selection
- **Dedicated Mint**: Choose your specific creature for 3 USDC
- Wallet connection required for all minting
- 10 unique creature types with different rarities:
  - 🐉 Cosmic Dragon (Legendary)
  - 🔥 Star Phoenix (Epic)
  - 🐺 Moon Wolf (Rare)
  - 🐱 Nebula Cat (Rare)
  - 🐍 Void Serpent (Epic)
  - 🐻 Galaxy Bear (Common)
  - 🦊 Astral Fox (Rare)
  - 🦉 Comet Owl (Epic)
  - 🐰 Stardust Rabbit (Common)
  - 🐢 Cosmic Turtle (Common)

### Creature Dashboard
- Real-time stats tracking (Hunger, Happiness, Energy)
- Feed your creature with UP tokens
- Multiple feeding options (1, 5, 10, 25 UP tokens)
- Level progression with XP system
- Interactive animations and feedback
- Yield generation tracking (coming soon)

### Mini Finance Features
- **Aave Integration**: Your creature deposits generate yield
- **Passive Income**: Earn while your creature grows
- **Smart Savings**: Small deposits, real returns
- **Transparent Tracking**: See your yield generation in real-time

### Info Page
- Learn about MINIFI and its features
- Rarity system explanation
- How to get UP tokens
- Links to Unlock Protocol and Farcaster

## 🎨 Design

- **Mobile-First**: Optimized for mobile devices only
- **Color Scheme**: 
  - Background: #262424 (off-black)
  - Primary: #DCC2FE (digital lavender)
  - Secondary: #D9D9D9, #F3F3F3
- **Glassmorphism Effects**: Frosted glass cards with subtle animations
- **Dark Mode Only**: Consistent with ALANA branding

## 🔧 Technology Stack

- React + TypeScript
- Tailwind CSS v4
- Unlock Protocol NFTs
- UP Token integration
- shadcn/ui components
- Local storage for persistence
- Aave Protocol for DeFi yield generation

## 📱 Navigation

Three main pages accessible via mobile menu:
1. **Mint Creature** - Main minting interface
2. **My Creature** - Dashboard (only visible after minting)
3. **About** - Information and links

## 🚀 Getting Started

1. Watch the intro (or skip it)
2. Connect your wallet
3. Mint a creature (random or dedicated)
4. Feed and nurture your creature
5. Watch it grow and level up!

## 💜 Built by The ALANA Project

Powered by Unlock Protocol | May the blockchain be with you ✨

---

## Development Notes

- All data is stored in localStorage for demo purposes
- Wallet connection is simulated
- UP token balance is mock data
- Stats decrease over time to encourage engagement
- Feeding cooldown prevents spam