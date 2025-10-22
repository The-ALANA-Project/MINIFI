# MINIFI Project Structure

Clean, organized structure for the MINIFI mobile mini app.

## 📁 Core Files

```
/
├── App.tsx                          # Main application component
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
└── vercel.json                      # Deployment config
```

## 📱 Components

```
components/
├── MobileFrameWrapper.tsx           # Desktop mobile frame container
├── MobileHeader.tsx                 # Mobile navigation header
├── StarWarsIntro.tsx                # Opening intro animation
│
├── pages/
│   ├── MintingPage.tsx              # Creature minting interface
│   ├── CreatureDashboard.tsx        # Creature care dashboard
│   └── InfoPage.tsx                 # App information
│
├── figma/
│   └── ImageWithFallback.tsx        # Image component (protected)
│
└── ui/                              # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── badge.tsx
    ├── progress.tsx
    ├── sonner.tsx
    └── ... (30+ UI components)
```

## 🎨 Styles

```
styles/
└── globals.css                      # Tailwind v4 + custom styles
```

## 📚 Documentation

```
/
├── README.md                        # Main documentation
├── MINIFI_README.md                 # Detailed feature docs
└── PROJECT_STRUCTURE.md             # This file
```

## 🔧 Configuration Files

```
/
├── deploy.config.js                 # Deployment settings
├── deployment.manifest              # Manifest file
├── figma-make.config.json           # Figma Make config
└── project.config                   # Project settings
```

## 🗂️ Ignored/Protected Folders

The following folders exist but contain protected system files:
- `/supabase/` - Protected backend files (not used)
- `/utils/supabase/` - Protected utility files (not used)
- `/guidelines/` - Protected guidelines (not used)
- `/no-supabase/` - Empty (old code removed)

## 🎯 Active Components

### Pages (3 total)
1. **MintingPage** - Main landing and minting interface
2. **CreatureDashboard** - Creature care and feeding
3. **InfoPage** - About and instructions

### Core Components (3 total)
1. **MobileFrameWrapper** - Desktop mobile frame
2. **MobileHeader** - Navigation menu
3. **StarWarsIntro** - Intro animation

### UI Components (40+ from shadcn/ui)
All located in `/components/ui/` - reusable, accessible components

## 📊 Code Stats

- **Total Active Components**: ~46
- **Pages**: 3
- **Custom Components**: 3
- **UI Components**: 40+
- **Lines of Code**: ~2,000+ (excluding UI library)

## 🧹 Recently Cleaned

Removed all ALANA Project legacy code:
- ❌ Old wallet implementations (6 components)
- ❌ Old pages (5 pages)
- ❌ Old modals (4 components)
- ❌ Old utilities (8 files)
- ❌ Mock data and services
- ❌ Old configuration files

## ✅ What Remains

Only essential MINIFI code:
- ✓ 3 core mobile components
- ✓ 3 app pages
- ✓ shadcn/ui library
- ✓ Global styles
- ✓ Configuration files

---

**Clean, minimal, and mobile-first** 🚀
