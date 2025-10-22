import { Sparkles, Lock, Heart, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import minifiLogo from 'figma:asset/584cd2622c63f4a5ec2d067eb5be328d13b0799d.png';

export function InfoPage() {
  return (
    <div className="min-h-screen bg-[#262424] pb-24 pt-28">
      <div className="w-full max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-3 sm:space-y-4">
              <div className="mb-3 sm:mb-4 flex justify-center">
                <img 
                  src={minifiLogo} 
                  alt="MINIFI Logo" 
                  className="h-16 sm:h-20 w-auto"
                />
              </div>
              <p className="text-base sm:text-lg text-[#DCC2FE]/80 font-medium tracking-wide">
                About the MINIFI App
              </p>
            </section>

            {/* Scrolling Banner */}
            <section className="overflow-hidden bg-[#DCC2FE]/10 border-y border-[#DCC2FE]/30 py-3 -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="animate-scroll whitespace-nowrap">
                <span className="inline-block text-[#DCC2FE] font-medium text-base tracking-wider">
                  👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 
                </span>
                <span className="inline-block text-[#DCC2FE] font-medium text-base tracking-wider">
                  👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 Learn more 👇 
                </span>
              </div>
            </section>

            {/* What is MINIFI */}
            <Card className="glass-card border-[#DCC2FE]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#F3F3F3]">
                  <Sparkles className="w-5 h-5 text-[#DCC2FE]" />
                  What is MINIFI?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 text-[#D9D9D9] text-xs sm:text-sm">
                <p>
                  <strong className="text-[#DCC2FE]">MINIFI</strong> (Mini Finance) is a revolutionary 
                  mobile-first Farcaster mini app that combines the joy of digital pet ownership with 
                  DeFi yield generation.
                </p>
                <p>
                  Mint your unique cosmic creature as an Unlock Protocol NFT, feed it with tokens 
                  to help it grow, and watch your investments automatically generate yield through{' '}
                  <a 
                    href="https://aave.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#DCC2FE] hover:text-[#DCC2FE]/80 underline decoration-[#DCC2FE]/50 hover:decoration-[#DCC2FE] transition-colors inline-flex items-center gap-0.5"
                  >
                    Aave Protocol
                    <ExternalLink className="w-3 h-3 inline" />
                  </a>{' '}
                  integration.
                </p>
                <p>
                  It's not just about caring for your creature — it's about building savings while 
                  having fun. <strong className="text-[#DCC2FE]">Feed. Grow. Save.</strong>
                </p>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#DCC2FE]/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#DCC2FE]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#F3F3F3] mb-1 text-sm sm:text-base">Unlock Protocol NFTs</h4>
                    <p className="text-xs sm:text-sm text-[#D9D9D9]">
                      Every creature is a unique NFT minted through Unlock Protocol, ensuring true ownership
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#DCC2FE]/20 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#DCC2FE]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#F3F3F3] mb-1 text-sm sm:text-base">Feed & Grow</h4>
                    <p className="text-xs sm:text-sm text-[#D9D9D9]">
                      Use tokens to feed your creature, increase its stats, and watch it level up
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#DCC2FE]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#DCC2FE]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#F3F3F3] mb-1 text-sm sm:text-base">Aave Yield Generation</h4>
                    <p className="text-xs sm:text-sm text-[#D9D9D9]">
                      Your creature's feeding generates yield through{' '}
                      <a 
                        href="https://aave.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#DCC2FE] hover:text-[#DCC2FE]/80 underline decoration-[#DCC2FE]/50 hover:decoration-[#DCC2FE] transition-colors inline-flex items-center gap-0.5"
                      >
                        Aave Protocol
                        <ExternalLink className="w-3 h-3 inline" />
                      </a>{' '}
                      integration in the background
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#DCC2FE]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#DCC2FE]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#F3F3F3] mb-1 text-sm sm:text-base">Community Driven</h4>
                    <p className="text-xs sm:text-sm text-[#D9D9D9]">
                      Join a vibrant community of creature collectors, trainers, and mini finance enthusiasts
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Creature Types */}
            <Card className="glass-card border-[#DCC2FE]/30">
              <CardHeader>
                <CardTitle className="text-[#F3F3F3]">10 Unique Creature Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐉</span>
                    <span className="text-[#D9D9D9]">Cosmic Dragon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <span className="text-[#D9D9D9]">Star Phoenix</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐺</span>
                    <span className="text-[#D9D9D9]">Moon Wolf</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐱</span>
                    <span className="text-[#D9D9D9]">Nebula Cat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐍</span>
                    <span className="text-[#D9D9D9]">Void Serpent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐻</span>
                    <span className="text-[#D9D9D9]">Galaxy Bear</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🦊</span>
                    <span className="text-[#D9D9D9]">Astral Fox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🦉</span>
                    <span className="text-[#D9D9D9]">Comet Owl</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐰</span>
                    <span className="text-[#D9D9D9]">Stardust Rabbit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐢</span>
                    <span className="text-[#D9D9D9]">Cosmic Turtle</span>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* Minting Options */}
            <Card className="glass-card border-[#DCC2FE]/30">
              <CardHeader>
                <CardTitle className="text-[#F3F3F3] text-base sm:text-lg">Minting Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 text-[#D9D9D9]">
                <p className="text-xs sm:text-sm">
                  Choose how you want to mint your creature:
                </p>
                <ul className="text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#DCC2FE] flex-shrink-0">•</span>
                    <span><strong className="text-[#F3F3F3]">Random Mint:</strong> First mint is FREE, additional random mints cost 1 USDC each</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DCC2FE] flex-shrink-0">•</span>
                    <span><strong className="text-[#F3F3F3]">Dedicated Mint:</strong> Choose your specific creature for 3 USDC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DCC2FE] flex-shrink-0">•</span>
                    <span>All creatures are minted as Unlock Protocol NFTs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* How to Get Tokens */}
            <Card className="glass-card border-[#DCC2FE]/30">
              <CardHeader>
                <CardTitle className="text-[#F3F3F3] text-base sm:text-lg">How to Get Tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 text-[#D9D9D9]">
                <p className="text-xs sm:text-sm">
                  UP (Unlock Protocol) tokens are used to feed and nurture your creature. Here's how to get them:
                </p>
                <ul className="text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#DCC2FE]">•</span>
                    <span>Participate in community events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DCC2FE]">•</span>
                    <span>Complete daily quests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DCC2FE]">•</span>
                    <span>Trade with other players</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DCC2FE]">•</span>
                    <span>Purchase from the Unlock Protocol ecosystem</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Links */}
            <div className="px-6 mb-8">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-[#DCC2FE]/30 text-[#DCC2FE] hover:bg-[#DCC2FE]/10"
                  asChild
                >
                  <a href="https://unlock-protocol.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    Learn About Unlock Protocol
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#DCC2FE]/30 text-[#DCC2FE] hover:bg-[#DCC2FE]/10"
                  asChild
                >
                  <a href="https://www.farcaster.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    Learn About Farcaster
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Credits */}
            <Card className="glass-card border-[#DCC2FE]/30">
              <CardContent className="p-4 sm:p-6 text-center space-y-2">
                <p className="text-sm text-[#D9D9D9]">
                  Built by The ALANA Project
                </p>
                <p className="text-xs text-[#D9D9D9]/70">
                  Powered by Unlock Protocol
                </p>
                <div className="pt-4">
                  <p className="text-xs text-[#DCC2FE]">
                    May the blockchain be with you ✨
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}