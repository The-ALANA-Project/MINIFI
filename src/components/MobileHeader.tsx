import { Menu, X, Home, Sparkles, Info, Film, ExternalLink, Wallet } from 'lucide-react';
import { useState } from 'react';
import minifiLogo from 'figma:asset/584cd2622c63f4a5ec2d067eb5be328d13b0799d.png';

export type MobilePageType = 'mint' | 'dashboard' | 'info' | 'intro';

interface MobileHeaderProps {
  currentPage: MobilePageType;
  onPageChange: (page: MobilePageType) => void;
  onIntroClick: () => void;
  hasCreature: boolean;
  creatureCount: number;
  isWalletConnected: boolean;
  walletAddress: string;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
}

export function MobileHeader({ 
  currentPage, 
  onPageChange, 
  onIntroClick, 
  hasCreature,
  creatureCount,
  isWalletConnected,
  walletAddress,
  onWalletConnect,
  onWalletDisconnect
}: MobileHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageChange = (page: MobilePageType) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleWalletAction = () => {
    if (isWalletConnected) {
      onWalletDisconnect();
    } else {
      onWalletConnect();
    }
    setIsMobileMenuOpen(false);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {/* Purple tinted backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-[#DCC2FE]/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
      
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#262424]/90 border-b border-[#DCC2FE]/20">
        <div className="w-full max-w-md mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => handlePageChange('mint')}
        >
          <img 
            src={minifiLogo} 
            alt="MINIFI" 
            className="h-5 sm:h-[1.4rem] w-auto object-contain"
          />
        </div>
        
        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Wallet Button */}
          <button
            onClick={handleWalletAction}
            className={`p-2 rounded-lg transition-colors ${
              isWalletConnected 
                ? 'text-[#DCC2FE] bg-[#DCC2FE]/10 hover:bg-[#DCC2FE]/20' 
                : 'text-[#F3F3F3] hover:text-[#DCC2FE] hover:bg-[#DCC2FE]/10'
            }`}
            aria-label={isWalletConnected ? 'Disconnect wallet' : 'Connect wallet'}
          >
            <Wallet className="w-5 h-5 sm:w-5 sm:h-5" />
          </button>
          
          {/* Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#F3F3F3] hover:text-[#DCC2FE] transition-colors p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${ 
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="backdrop-blur-md bg-[#262424]/95 border-t border-[#DCC2FE]/20">
          <nav className="w-full max-w-md mx-auto px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
            {/* Wallet Status/Action */}
            <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-[#DCC2FE]/20">
              {isWalletConnected ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#D9D9D9]/60 px-3 sm:px-4">
                    <Wallet className="w-3 h-3" />
                    <span>Connected</span>
                  </div>
                  <div className="bg-[#DCC2FE]/10 rounded-lg p-2.5 sm:p-3 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#DCC2FE] font-mono">
                      {formatAddress(walletAddress)}
                    </span>
                    <button
                      onClick={handleWalletAction}
                      className="text-xs text-[#D9D9D9]/60 hover:text-[#DCC2FE] transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleWalletAction}
                  className="w-full bg-[#DCC2FE] text-[#262424] hover:bg-[#DCC2FE]/90 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-medium"
                >
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>

            <button 
              onClick={() => handlePageChange('mint')}
              className={`w-full text-left py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
                currentPage === 'mint'
                  ? 'bg-[#DCC2FE]/20 text-[#F3F3F3] border-l-4 border-[#DCC2FE]' 
                  : 'text-[#D9D9D9] hover:bg-[#DCC2FE]/10 hover:text-[#DCC2FE] border-l-4 border-transparent'
              }`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Mint Creature</span>
            </button>

            {hasCreature && (
              <button 
                onClick={() => handlePageChange('dashboard')}
                className={`w-full text-left py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
                  currentPage === 'dashboard'
                    ? 'bg-[#DCC2FE]/20 text-[#F3F3F3] border-l-4 border-[#DCC2FE]' 
                    : 'text-[#D9D9D9] hover:bg-[#DCC2FE]/10 hover:text-[#DCC2FE] border-l-4 border-transparent'
                }`}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{creatureCount > 1 ? 'My Creatures' : 'My Creature'}</span>
              </button>
            )}

            <button 
              onClick={() => handlePageChange('info')}
              className={`w-full text-left py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
                currentPage === 'info'
                  ? 'bg-[#DCC2FE]/20 text-[#F3F3F3] border-l-4 border-[#DCC2FE]' 
                  : 'text-[#D9D9D9] hover:bg-[#DCC2FE]/10 hover:text-[#DCC2FE] border-l-4 border-transparent'
              }`}
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>About</span>
            </button>

            <button 
              onClick={() => handlePageChange('intro')}
              className={`w-full text-left py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
                currentPage === 'intro'
                  ? 'bg-[#DCC2FE]/20 text-[#F3F3F3] border-l-4 border-[#DCC2FE]' 
                  : 'text-[#D9D9D9] hover:bg-[#DCC2FE]/10 hover:text-[#DCC2FE] border-l-4 border-transparent'
              }`}
            >
              <Film className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Watch Intro</span>
            </button>

            <div className="pt-3 sm:pt-4 border-t border-[#DCC2FE]/20">
              <a
                href="https://the-alana-project.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 py-2 px-3 sm:px-4 text-xs text-[#D9D9D9]/60 hover:text-[#DCC2FE]/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Powered by The ALANA Project
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </div>
          </nav>
        </div>
      </div>
      </header>
    </>
  );
}