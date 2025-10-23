import { Sparkles, Lock, Heart, Users, ExternalLink, Zap, Coins, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import minifiLogo from 'figma:asset/584cd2622c63f4a5ec2d067eb5be328d13b0799d.png';
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

export function InfoPage() {
  return (
    <div className="min-h-screen bg-[#262424] pb-24 pt-28">
      <div className="w-full max-w-md mx-auto">
        <div className="px-4 space-y-6 sm:space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-3 sm:space-y-4">
              <div className="mb-3 sm:mb-4 flex flex-col items-center gap-3">
                <div className="inline-block">
                  <img 
                    src={minifiLogo} 
                    alt="MINIFI Logo" 
                    className="w-[45%] h-auto mb-3 mx-auto"
                  />
                  <p className="text-base sm:text-lg text-[#DCC2FE]/80 font-medium tracking-wide whitespace-nowrap">
                    About the MINIFI App
                  </p>
                </div>
              </div>
            </section>

            {/* Scrolling Banner */}
            <section className="overflow-hidden bg-[#DCC2FE]/10 border-y border-[#DCC2FE]/30 py-3 -mx-4">
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
            <div className="mb-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  What is MINIFI?
                </h2>
                <p className="text-sm text-[#D9D9D9]/80">Mini Finance for Creators & Creative Builders</p>
              </div>
              
              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 text-[#D9D9D9] text-xs sm:text-sm">
                  <p>
                    <strong className="text-[#DCC2FE]">MINIFI</strong> (Mini Finance) is a warm and low-risk  
                    welcome to DeFi (decentralized Finance) in the format of a mobile mini app that combines 
                    gamified cuteness with a piggybank mechanic under the hood.
                  </p>
                  <p>
                    Start by getting your unique cosmic creature as an Unlock Protocol NFT, feed it with tokens 
                    to help it grow, and watch your investments automatically generate yield through{' '}
                    <a 
                      href="https://aave.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#DCC2FE] hover:text-[#DCC2FE]/80 underline decoration-[#DCC2FE]/50 hover:decoration-[#DCC2FE] transition-colors"
                    >
                      Aave Protocol<ExternalLink className="w-3 h-3 inline ml-0.5 -mt-0.5" />
                    </a>{' '}
                    integration.
                  </p>
                  <p>
                    While MINIFI is about building savings while having fun, you will also take part 
                    in the wider lore of The ALANA Project.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Creature Types */}
            <div className="mb-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  10 Unique Creature Types
                </h2>
                <p className="text-sm text-[#D9D9D9]/80">Discover your Turritecco companion creature</p>
              </div>
              
              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <img src={sunnyoImage} alt="Sunnyo" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Sunnyo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={jellodrasImage} alt="Jellodras" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Jellodras</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={lumibelImage} alt="Lumibel" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Lumibel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={snoodellaImage} alt="Snoodella" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Snoodella</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={mellobaImage} alt="Melloba" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Melloba</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={wistrowImage} alt="Wistrow" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Wistrow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={dozukiImage} alt="Dozuki" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Dozuki</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={orbitronImage} alt="Orbitron" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Orbitron</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={solaraImage} alt="Solara" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Solara</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={bubbitImage} alt="Bubbit" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[#D9D9D9]">Bubbit</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Minting Options */}
            <div className="mb-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2 flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Minting Options
                </h2>
                <p className="text-sm text-[#D9D9D9]/80">Choose how you want to mint your creature</p>
              </div>
              
              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-4 sm:p-6 text-[#D9D9D9]">
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
                      <span>All creatures are minted as{' '}
                        <a 
                          href="https://unlock-protocol.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#DCC2FE] hover:text-[#DCC2FE]/80 underline decoration-[#DCC2FE]/50 hover:decoration-[#DCC2FE] transition-colors"
                        >
                          Unlock Protocol<ExternalLink className="w-3 h-3 inline ml-0.5 -mt-0.5" />
                        </a>{' '}
                        NFTs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* How to Get Tokens */}
            <div className="mb-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl text-[#DCC2FE] font-medium tracking-wider mb-2 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  How to Get Tokens on Base
                </h2>
                <p className="text-sm text-[#D9D9D9]/80">$UP tokens and any other tokens on Base feed and nurture your Turritecco creature</p>
              </div>
              
              <Card className="glass-card border-[#DCC2FE]/30">
                <CardContent className="p-4 sm:p-6 text-[#D9D9D9]">
                  <ul className="text-xs sm:text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#DCC2FE]">•</span>
                      <span>Participate in Unlock DAO and receive tokens for your contributions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DCC2FE]">•</span>
                      <span>Get some $UP tokens on the open market <a href="https://www.coingecko.com/en/coins/unlockprotocoltoken" target="_blank" rel="noopener noreferrer" className="text-[#DCC2FE] hover:underline">here</a></span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}