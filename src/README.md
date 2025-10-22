# MINIFI - Cosmic Creatures Mini App

> A mobile-first Farcaster mini app for minting and nurturing unique blockchain creatures

**Feed. Grow. Save.**

![MINIFI](https://img.shields.io/badge/Blockchain-Unlock%20Protocol-purple)
![Mobile First](https://img.shields.io/badge/Mobile-First-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## 🌟 Overview

MINIFI (Mini Finance) brings the joy of digital pet ownership to DeFi. Mint unique creatures as Unlock Protocol NFTs, nurture them with UP tokens, and watch them grow while generating yield through Aave Protocol integration. It's not just about caring for your creature — it's about building savings while having fun.

**Feed. Grow. Save.**

## ✨ Features

### 🎬 Cinematic Intro
- Star Wars-style scrolling text introduction
- Skippable with option to replay
- Sets the cosmic tone in ALANA brand colors

### 🎮 Minting System
- **Random Mint**: 
  - First mint: FREE 🎉
  - Subsequent mints: 1 USDC each
  - Get a surprise creature
- **Dedicated Mint**: 
  - Cost: 3 USDC
  - Choose your specific creature
  - Guaranteed selection
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

### 🏠 Creature Dashboard
- Real-time stats tracking (Hunger, Happiness, Energy)
- Feed your creature with UP tokens
- Level progression system with XP
- Multiple feeding options (1, 5, 10, 25 UP)
- Interactive care system with animations

### 💰 DeFi Integration
- **Aave Protocol Integration**: Your creature's feeding generates yield in the background
- **Mini Finance**: Save money while playing and caring for your creature
- **Yield Generation**: The more you feed, the more your creature grows and generates returns
- **Unlock Protocol NFTs**: True ownership of your digital companions

### 📱 Mobile-First Design

#### Desktop Experience
- Realistic mobile phone frame with notch
- Centered display with cosmic purple glow
- Responsive scaling on smaller screens
- Professional mobile simulator

#### Mobile Experience
- Full-screen native app feel
- 44px minimum touch targets
- Safe area support for notched devices
- Smooth scrolling and touch interactions
- Pull-to-refresh disabled
- Hidden scrollbars for cleaner UI
- Haptic-friendly touch feedback

## 🎨 Design System

### Color Palette
- Background: `#262424` (off-black)
- Primary: `#DCC2FE` (digital lavender)
- Light Gray: `#D9D9D9`
- White: `#F3F3F3`

### Features
- Glassmorphism effects
- Frosted glass cards
- Subtle grain textures
- Smooth animations
- Dark mode only

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Blockchain**: Unlock Protocol NFTs
- **Token**: UP (Unlock Protocol)
- **State**: localStorage (demo)
- **Notifications**: Sonner

## 📦 Project Structure

```
/
├── App.tsx                          # Main application entry
├── components/
│   ├── MobileFrameWrapper.tsx       # Desktop mobile frame
│   ├── MobileHeader.tsx             # Mobile navigation
│   ├── StarWarsIntro.tsx            # Intro animation
│   ├── pages/
│   │   ├── MintingPage.tsx          # Mint creatures
│   │   ├── CreatureDashboard.tsx    # Care for creature
│   │   └── InfoPage.tsx             # About & info
│   ├── ui/                          # shadcn/ui components
│   └── figma/
│       └── ImageWithFallback.tsx    # Image component
├── styles/
│   └── globals.css                  # Global styles
└── index.html                       # HTML entry point
```

## 🎯 User Flow

1. **Watch Intro** - Cinematic Star Wars-style introduction explaining the "Feed. Grow. Save." concept
2. **Connect Wallet** - Required for all minting options
3. **Mint Creature** - Choose random (first free, then 1 USDC) or dedicated mint (3 USDC)
4. **Care & Feed** - Nurture your creature with UP tokens
5. **Level Up & Save** - Watch your creature grow while generating Aave yield

## 🔧 Performance Optimizations

- Hardware-accelerated animations
- Touch-optimized interactions
- Prevents zoom on input focus (iOS)
- Dynamic viewport height support
- Image optimization
- Smooth 60fps animations
- Will-change optimizations

## 📱 Browser Support

- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🎮 Game Mechanics

### Minting Options
- **Random Mint**: 
  - First mint: FREE 🎉
  - Subsequent mints: 1 USDC each
  - Get a surprise creature
- **Dedicated Mint**: 
  - Cost: 3 USDC
  - Choose your specific creature
  - Guaranteed selection

### Stats System
- **Hunger**: Decreases over time, increased by feeding
- **Happiness**: Affected by care and attention
- **Energy**: Restored through feeding

### Leveling
- Gain XP by feeding your creature
- XP required = Level × 100
- Higher levels unlock special abilities

### Rarity Effects
- **Legendary**: Fastest growth and special abilities
- **Epic**: Fast growth rate
- **Rare**: Normal growth with bonuses
- **Common**: Steady, reliable growth

### Yield Generation
- Feeding your creature deposits tokens into Aave Protocol
- Generate passive yield while your creature grows
- The more you feed, the more you save
- **Mini Finance**: Small deposits, real returns

## 🔐 Security Notes

- All wallet connections are simulated for demo
- No real cryptocurrency transactions (demo mode)
- Data stored in localStorage only
- No backend or database
- Production version will integrate real Aave Protocol and Unlock Protocol

## 💜 Credits

Built by **The ALANA Project**  
Powered by **Unlock Protocol** & **Aave Protocol**

**Feed. Grow. Save.**

*May the blockchain be with you* ✨

---

## 📝 License

This is a demo application for educational purposes.

## 🤝 Contributing

This is a closed-source demo project for The ALANA Project.

For questions or feedback, please contact The ALANA Project team.