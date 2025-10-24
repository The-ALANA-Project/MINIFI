import { useState, useEffect } from 'react';
import { Sparkles, Shuffle, Lock, Coins, ExternalLink, Wallet, Shield, Key, Zap, Heart, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import { CreatureCarousel } from '../CreatureCarousel';
import minifiTitle from 'figma:asset/43ed93ec12b7cd4f7b5812ed68ed562405f82239.png';
import sunnyoImage from 'figma:asset/dd2bf1c1f6de584004aa489ac7fce117393c0239.png';
import jellodrasImage from 'figma:asset/7faac7b58396842abb9e0e75ccdcb2d00d14adcd.png';
import lumibelImage from 'figma:asset/1ce5fb3181519c0af59cf06f998a54b077adcf0d.png';
import snoodellaImage from 'figma:asset/d8a5503b511bbfd38cd94bd9518eceb0a0ae1a3e.png';
import mellobaImage from 'figma:asset/7ffe4091d18852bc5b5d41a14d2a68cfde44b312.png';
import wistrowImage from 'figma:asset/fa4e594bf0d6745e205993f782059909589fd28d.png';
import dozukiImage from 'figma:asset/d85ffac30c486428705449914df3d9a1aa9cdd6c.png';
import orbitronImage from 'figma:asset/f5e3a69c7beea69b11f75e4d79982975b97e69c5.png';
import solaraImage from 'figma:asset/a74d0a257c68f6c95d7f5d244ff12307f14408a9.png';
import bubbitImage from 'figma:asset/8a42f6b81eff92ba2149ceb63a4027ad9e9edb3c.png';

interface MintingPageProps {
  onMintComplete: (creatureType: string) => void;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
  walletAddress?: string;
}

// 10 creature types
const CREATURES = [
  { id: 1, name: 'Sunnyo', description: 'Your cheerful savings buddy', color: '#DCC2FE', image: sunnyoImage },
  { id: 2, name: 'Jellodras', description: 'Curious explorer of opportunities', color: '#B99EF5', image: jellodrasImage },
  { id: 3, name: 'Lumibel', description: 'Gentle and encouraging protector of savings', color: '#9B7FE8', image: lumibelImage },
  { id: 4, name: 'Snoodella', description: 'Your peaceful and SPA-loving savings companion', color: '#DCC2FE', image: snoodellaImage },
  { id: 5, name: 'Melloba', description: 'Gentle support in the background', color: '#8B6FD8', image: mellobaImage },
  { id: 6, name: 'Wistrow', description: 'Your loyal butler at your service', color: '#B99EF5', image: wistrowImage },
  { id: 7, name: 'Dozuki', description: 'Slow and steady savings guide', color: '#A08AE5', image: dozukiImage },
  { id: 8, name: 'Orbitron', description: 'Watchful observer of your progress', color: '#C9B3F9', image: orbitronImage },
  { id: 9, name: 'Solara', description: 'Shines brightest with your progress', color: '#B99EF5', image: bubbitImage },
  { id: 10, name: 'Bubbit', description: 'Excited explorer of possibilities', color: '#8B6FD8', image: solaraImage },
];

export function MintingPage({ onMintComplete, isWalletConnected, onWalletConnect, walletAddress }: MintingPageProps) {
  const [selectedCreature, setSelectedCreature] = useState<number | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [randomMintCount, setRandomMintCount] = useState(0);
  const [showWalletHelpDialog, setShowWalletHelpDialog] = useState(false);

  // Load random mint count from localStorage (wallet-specific)
  useEffect(() => {
    if (walletAddress) {
      const storageKey = `minifi-random-mint-count-${walletAddress}`;
      const savedCount = localStorage.getItem(storageKey);
      if (savedCount) {
        setRandomMintCount(parseInt(savedCount, 10));
      } else {
        setRandomMintCount(0);
      }
    }
  }, [walletAddress]);

  const handleRandomMint = async () => {
    if (!isWalletConnected) {
      toast.error('Please connect your wallet first');
      onWalletConnect();
      return;
    }

    setIsMinting(true);
    
    // Check if this is first mint or subsequent
    const isFirstMint = randomMintCount === 0;
    const cost = isFirstMint ? 'Free' : '1 USDC';
    
    // Simulate random selection animation
    let count = 0;
    const interval = setInterval(() => {
      setSelectedCreature(Math.floor(Math.random() * CREATURES.length));
      count++;
      
      if (count > 20) {
        clearInterval(interval);
        const finalCreature = Math.floor(Math.random() * CREATURES.length);
        setSelectedCreature(finalCreature);
        setTimeout(() => {
          setIsMinting(false);
          
          // Increment and save random mint count (wallet-specific)
          const newCount = randomMintCount + 1;
          setRandomMintCount(newCount);
          if (walletAddress) {
            const storageKey = `minifi-random-mint-count-${walletAddress}`;
            localStorage.setItem(storageKey, newCount.toString());
          }
          
          if (isFirstMint) {
            toast.success(`You minted a ${CREATURES[finalCreature].name} for free! 🎉`);
          } else {
            toast.success(`You minted a ${CREATURES[finalCreature].name} for 1 USDC! 🎉`);
          }
          setTimeout(() => onMintComplete(CREATURES[finalCreature].name), 1500);
        }, 1000);
      }
    }, 100);
  };

  const handleDedicatedMint = async () => {
    if (!isWalletConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (selectedCreature === null) {
      toast.error('Please select a creature first');
      return;
    }

    setIsMinting(true);
    
    // Simulate minting transaction
    setTimeout(() => {
      setIsMinting(false);
      toast.success(`You minted a ${CREATURES[selectedCreature].name} for 3 USDC! 🎉`);
      setTimeout(() => onMintComplete(CREATURES[selectedCreature].name), 1500);
    }, 2000);
  };



  return (
    <div className="min-h-screen bg-[#262424] pb-24 pt-20 relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 w-48 h-48 bg-[#DCC2FE]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-64 right-1/4 w-56 h-56 bg-[#DCC2FE]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-[#DCC2FE]/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Hero Section with Tagline */}
        <section className="px-4 pt-8 pb-8 text-center">
          <div className="space-y-4">
            <div className="space-y-2 relative">
              {/* Glowing title effect */}
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#DCC2FE]/20 to-[#B99EF5]/20 scale-150" />
                <img 
                  src={minifiTitle} 
                  alt="MINIFI" 
                  className="h-9 sm:h-11 w-auto mx-auto relative"
                />
              </div>
              <p className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider">
                Feed. Grow. Save.
              </p>
            </div>

            {/* Creature Carousel */}
            <CreatureCarousel creatures={CREATURES} />

            <p className="text-sm sm:text-base text-[#D9D9D9]/90 leading-relaxed">
              Mint your cosmic creature, feed it to grow stronger, and watch your savings generate yield through <a 
                href="https://aave.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#DCC2FE] hover:text-[#DCC2FE]/80 underline decoration-[#DCC2FE]/50 hover:decoration-[#DCC2FE] transition-colors inline items-center gap-1 whitespace-nowrap"
              >Aave Protocol<ExternalLink className="w-3 h-3 inline ml-1" /></a>.
            </p>
          </div>
        </section>

        {/* Scrolling Banner */}
        <section className="overflow-hidden bg-[#DCC2FE]/10 border-y border-[#DCC2FE]/30 py-3 mb-8">
          <div className="animate-scroll whitespace-nowrap">
            <span className="inline-block text-[#DCC2FE] font-medium text-base tracking-wider">
              Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 
            </span>
            <span className="inline-block text-[#DCC2FE] font-medium text-base tracking-wider">
              Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 Get Started 👇 
            </span>
          </div>
        </section>

        {/* How It Works - Swipeable on Mobile */}
        {!isWalletConnected && (
          <div className="mb-8 px-4">
            {/* Title and Description */}
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2">How It Works</h2>
              <p className="text-sm text-[#D9D9D9]/80">4 steps to get you started</p>
            </div>

            {/* Mobile: Swipeable Cards */}
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4">
              <div className="flex gap-4 w-max px-4">
                {/* Card 0: Connect Wallet */}
                <Card 
                  className="glass-card border-[#DCC2FE]/30 w-[280px] snap-center flex-shrink-0 cursor-pointer hover:border-[#DCC2FE]/60 transition-all duration-300"
                  onClick={() => setShowWalletHelpDialog(true)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 0
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 0
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <Wallet className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Connect Wallet</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Get started with a crypto wallet
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 1: Mint Creatures */}
                <Card className="glass-card border-[#DCC2FE]/30 w-[280px] snap-center flex-shrink-0">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 1
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 1
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <Sparkles className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Mint Creature(s)</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Create unique cosmic companions as NFTs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: Feed & Grow */}
                <Card className="glass-card border-[#DCC2FE]/30 w-[280px] snap-center flex-shrink-0">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 2
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 2
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <Heart className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Feed & Grow</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Nurture your creature with tokens
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3: Earn Yield */}
                <Card className="glass-card border-[#DCC2FE]/30 w-[280px] snap-center flex-shrink-0">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 3
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 3
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <TrendingUp className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Earn Yield</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Generate savings through Aave
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden">
              <div className="grid grid-cols-4 gap-4">
                {/* Card 0: Connect Wallet */}
                <Card 
                  className="glass-card border-[#DCC2FE]/30 hover:border-[#DCC2FE]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#DCC2FE]/10 cursor-pointer"
                  onClick={() => setShowWalletHelpDialog(true)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 0
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 0
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <Wallet className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Connect Wallet</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Get started with a crypto wallet
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 1: Mint Creatures */}
                <Card className="glass-card border-[#DCC2FE]/30 hover:border-[#DCC2FE]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#DCC2FE]/10">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 1
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 1
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <Sparkles className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Mint Creatures</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Create unique cosmic companions as NFTs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: Feed & Grow */}
                <Card className="glass-card border-[#DCC2FE]/30 hover:border-[#DCC2FE]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#DCC2FE]/10">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 2
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 2
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <Heart className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Feed & Grow</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Nurture your creature with tokens
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3: Earn Yield */}
                <Card className="glass-card border-[#DCC2FE]/30 hover:border-[#DCC2FE]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#DCC2FE]/10">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit invisible">
                        Step 3
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#DCC2FE]/20 text-[#DCC2FE] text-xs flex-shrink-0 h-fit">
                        Step 3
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#DCC2FE]/10 blur-xl" />
                          <TrendingUp className="w-8 h-8 text-[#DCC2FE] relative z-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#F3F3F3] mb-1.5">Earn Yield</h3>
                        <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
                          Generate savings through Aave
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Connection CTA - Enhanced */}
        {!isWalletConnected && (
          <div className="px-4 mb-6">
            {/* Step 0 Header */}
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2">Step 0</h2>
              <p className="text-sm text-[#D9D9D9]/80 leading-relaxed">
                For any transaction on a blockchain you need a wallet. Do you have one? Great, then let's get it connected. If you don't, <span
                  onClick={() => setShowWalletHelpDialog(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowWalletHelpDialog(true);
                    }
                  }}
                  className="text-[#DCC2FE] underline hover:text-[#DCC2FE]/80 transition-colors cursor-pointer"
                >click here</span> to learn how to get one.
              </p>
            </div>

            <Button 
              onClick={onWalletConnect}
              className="w-full bg-gradient-to-r from-[#DCC2FE] to-[#B99EF5] text-[#262424] hover:opacity-90 shadow-lg hover:shadow-[#DCC2FE]/30 transition-all duration-300"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>

            {/* Wallet Help Dialog */}
            <Dialog open={showWalletHelpDialog} onOpenChange={setShowWalletHelpDialog}>
              <DialogPortal>
                <DialogOverlay className="bg-[#DCC2FE]/50" />
                <DialogContent aria-describedby={undefined} className="max-w-[calc(100%-2rem)] sm:max-w-lg max-h-[80vh] overflow-y-auto bg-[#262424] border-[#DCC2FE]/30">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-lg text-[#F3F3F3] text-left">New to Crypto Wallets?</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-2">
                    {/* What is a Wallet */}
                    <div>
                      <p className="text-sm text-[#D9D9D9]/80">
                        A crypto wallet is your digital identity on the blockchain—like a login that proves you own your creatures and tokens.
                      </p>
                    </div>

                    {/* Where to Get One */}
                    <div>
                      <p className="text-sm font-medium text-[#F3F3F3] mb-2">Popular Free Wallets:</p>
                      <div className="space-y-1.5 pl-3">
                        <p className="text-sm text-[#D9D9D9]/80">
                          • <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-[#DCC2FE] underline hover:text-[#DCC2FE]/80">MetaMask</a> - Most popular
                        </p>
                        <p className="text-sm text-[#D9D9D9]/80">
                          • <a href="https://www.coinbase.com/wallet" target="_blank" rel="noopener noreferrer" className="text-[#DCC2FE] underline hover:text-[#DCC2FE]/80">Coinbase Wallet</a> - Best for beginners
                        </p>
                        <p className="text-sm text-[#D9D9D9]/80">
                          • <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer" className="text-[#DCC2FE] underline hover:text-[#DCC2FE]/80">Rainbow</a> - Mobile-friendly
                        </p>
                      </div>
                    </div>

                    {/* Base Network Requirement */}
                    <div className="bg-[#DCC2FE]/5 border border-[#DCC2FE]/20 rounded-lg p-3">
                      <p className="text-sm font-medium text-[#F3F3F3] mb-1">You'll Need ETH on Base</p>
                      <p className="text-sm text-[#D9D9D9]/80 mb-2">
                        MINIFI runs on Base (Ethereum Layer 2). You'll need a small amount of ETH on Base for transaction fees.
                      </p>
                      <a 
                        href="https://www.coinbase.com/explore" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-[#DCC2FE] underline hover:text-[#DCC2FE]/80 inline-flex items-center gap-1"
                      >
                        Get ETH on Base
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* CTA */}
                    <Button 
                      onClick={() => {
                        setShowWalletHelpDialog(false);
                        onWalletConnect();
                      }}
                      className="w-full bg-[#DCC2FE] text-[#262424] hover:bg-[#DCC2FE]/90"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect My Wallet
                    </Button>
                  </div>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
        )}

        {/* Minting Options - Enhanced Design */}
        {isWalletConnected && (
          <>
            <div className="px-4 mb-8">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2">Choose Your Path</h2>
                <p className="text-sm text-[#D9D9D9]/80">Select how you'd like to mint your cosmic companion</p>
              </div>
              
              <div className="space-y-3">
                {/* Random Mint Button */}
                <Button
                  onClick={handleRandomMint}
                  disabled={isMinting}
                  className="w-full bg-gradient-to-r from-[#DCC2FE] to-[#B99EF5] text-[#262424] hover:opacity-90 shadow-lg hover:shadow-[#DCC2FE]/30 transition-all duration-300 h-12 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Shuffle className="w-4 h-4" />
                      {isMinting ? 'Minting...' : 'Random Mint'}
                    </span>
                    <Badge className="bg-[#262424]/20 text-[#F3F3F3] border-none">
                      {randomMintCount === 0 ? 'FREE' : '1 USDC'}
                    </Badge>
                  </div>
                </Button>
                
                {/* Random Mint Status */}
                {randomMintCount === 0 && (
                  <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#DCC2FE]/10 border border-[#DCC2FE]/20">
                    <Sparkles className="w-3 h-3 text-[#DCC2FE] flex-shrink-0" />
                    <span className="text-xs text-[#DCC2FE]">First random mint is FREE!</span>
                  </div>
                )}
                {randomMintCount > 0 && (
                  <p className="text-xs text-center text-[#D9D9D9]/70">
                    You've minted {randomMintCount} random creature{randomMintCount > 1 ? 's' : ''}
                  </p>
                )}

                {/* Dedicated Mint Button */}
                <Button
                  onClick={handleDedicatedMint}
                  disabled={isMinting || selectedCreature === null}
                  className="w-full bg-[#DCC2FE] text-[#262424] hover:bg-[#DCC2FE]/90 shadow-md hover:shadow-lg transition-all duration-300 h-12"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {isMinting ? 'Minting...' : selectedCreature !== null ? 'Mint Selected' : 'Dedicated Mint'}
                    </span>
                    <Badge className="bg-[#262424]/20 text-[#F3F3F3] border-none">
                      3 USDC
                    </Badge>
                  </div>
                </Button>
                
                {/* Dedicated Mint Status */}
                {selectedCreature === null && (
                  <p className="text-xs text-center text-[#D9D9D9]/70">
                    Select a creature below to mint
                  </p>
                )}
              </div>
            </div>

            {/* Creatures Carousel - Circular Slide Menu */}
            <div className="mb-6 px-4">
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2">
                  Available Creatures
                </h3>
                <p className="text-sm text-[#D9D9D9]/80">
                  Swipe to browse, tap a creature to select it, then click the <span className="text-[#DCC2FE]">Dedicated Mint</span> button above
                </p>
              </div>
              
              {/* Creature Carousel */}
              <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4">
                <div className="flex gap-6 w-max py-4">
                  {CREATURES.map((creature, index) => (
                    <div
                      key={creature.id}
                      onClick={() => !isMinting && setSelectedCreature(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${creature.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          !isMinting && setSelectedCreature(index);
                        }
                      }}
                      className={`cursor-pointer transition-all duration-300 snap-center flex-shrink-0 ${
                        isMinting && selectedCreature === index ? 'animate-pulse' : ''
                      }`}
                    >
                      <div className="relative p-2">
                        {/* Rounded square creature card */}
                        <div className={`w-36 h-36 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden p-3 ${
                          selectedCreature === index
                            ? 'bg-gradient-to-br from-[#DCC2FE]/30 to-[#DCC2FE]/10 ring-4 ring-[#DCC2FE] shadow-xl shadow-[#DCC2FE]/30 scale-110'
                            : 'bg-[#DCC2FE]/10 border-2 border-[#DCC2FE]/30 hover:border-[#DCC2FE]/50 hover:scale-105'
                        }`}>
                          {creature.image ? (
                            <img 
                              src={creature.image} 
                              alt={creature.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-6xl">{creature.emoji}</span>
                          )}
                        </div>
                        
                        {/* Glow effect for selected */}
                        {selectedCreature === index && (
                          <div className="absolute inset-0 bg-[#DCC2FE]/20 rounded-xl blur-2xl -z-10 animate-pulse" />
                        )}
                      </div>
                      
                      {/* Creature info below card */}
                      <div className="mt-3 text-center max-w-[160px]">
                        <h4 className={`text-sm font-medium mb-1 ${
                          selectedCreature === index ? 'text-[#DCC2FE]' : 'text-[#F3F3F3]'
                        }`}>
                          {creature.name}
                        </h4>
                        <p className="text-xs text-[#D9D9D9]/70 leading-relaxed">
                          {creature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}


      </div>
    </div>
  );
}