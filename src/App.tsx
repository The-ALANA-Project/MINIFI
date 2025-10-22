import { useState, useEffect } from "react";
import { MobileHeader, MobilePageType } from "./components/MobileHeader";
import { StarWarsIntro } from "./components/StarWarsIntro";
import { MintingPage } from "./components/pages/MintingPage";
import { CreatureDashboard } from "./components/pages/CreatureDashboard";
import { InfoPage } from "./components/pages/InfoPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

/**
 * MINIFI - MOBILE-ONLY FARCASTER MINI APP
 * 
 * "Feed. Grow. Save." - Mini Finance for the blockchain era
 * 
 * A cosmic creature minting and nurturing app powered by:
 * - Unlock Protocol NFTs
 * - Token feeding system
 * - Aave Protocol yield generation
 * - Mobile-first design
 * - Star Wars-inspired intro
 * 
 * Minting Options:
 * - Random Mint: First mint FREE, subsequent mints 1 USDC
 * - Dedicated Mint: Choose specific creature for 3 USDC
 * 
 * @version 2.0.0
 * @author The ALANA Project
 * 
 * Repository cleaned on October 11, 2025
 * - Removed 43 legacy ALANA Project files
 * - Kept only essential MINIFI components
 * - See CLEANUP_SUMMARY.md for details
 */

export default function App() {
  const [currentPage, setCurrentPage] = useState<MobilePageType>('mint');
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [mintedCreature, setMintedCreature] = useState<string | null>(null);
  const [mintedCreatures, setMintedCreatures] = useState<string[]>([]);

  // Check if user has seen intro before
  useEffect(() => {
    const seenIntro = localStorage.getItem('minifi-seen-intro');
    if (seenIntro === 'true') {
      setShowIntro(false);
      setHasSeenIntro(true);
    }

    // Check wallet connection first
    const savedWallet = localStorage.getItem('minifi-wallet');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      setIsWalletConnected(true);
      
      // Only load creatures if wallet is connected
      loadCreaturesForWallet(savedWallet);
    }
  }, []);

  // Reset scroll position whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Load creatures for a specific wallet
  const loadCreaturesForWallet = (wallet: string) => {
    const storageKey = `minifi-creatures-${wallet}`;
    const savedCreatures = localStorage.getItem(storageKey);
    
    if (savedCreatures) {
      try {
        const creaturesArray = JSON.parse(savedCreatures);
        setMintedCreatures(creaturesArray);
        // Set the most recently minted creature as the active one
        if (creaturesArray.length > 0) {
          setMintedCreature(creaturesArray[creaturesArray.length - 1]);
        }
      } catch (e) {
        console.error('Error loading creatures:', e);
        setMintedCreatures([]);
        setMintedCreature(null);
      }
    } else {
      setMintedCreatures([]);
      setMintedCreature(null);
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    setCurrentPage('mint');
    localStorage.setItem('minifi-seen-intro', 'true');
  };

  const handleIntroSkip = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    setCurrentPage('mint');
    localStorage.setItem('minifi-seen-intro', 'true');
  };

  const handlePageChange = (page: MobilePageType) => {
    if (page === 'intro') {
      setShowIntro(true);
    } else {
      setShowIntro(false);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWalletConnect = () => {
    // Simulate wallet connection
    const mockAddress = "0x" + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setWalletAddress(mockAddress);
    setIsWalletConnected(true);
    localStorage.setItem('minifi-wallet', mockAddress);
    
    // Load any existing creatures for this wallet
    loadCreaturesForWallet(mockAddress);
    
    toast.success("🎉 Wallet connected! Ready to mint your creature.");
  };

  const handleWalletDisconnect = () => {
    // Clear wallet and creature data from state
    setIsWalletConnected(false);
    setWalletAddress('');
    setMintedCreature(null);
    setMintedCreatures([]);
    
    // Remove wallet from localStorage (but keep creature data stored per wallet)
    localStorage.removeItem('minifi-wallet');
    
    // Redirect to mint page
    setCurrentPage('mint');
    
    toast("Wallet disconnected");
  };

  const handleMintComplete = (creatureName: string) => {
    if (!isWalletConnected || !walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    // Add to creatures array
    const updatedCreatures = [...mintedCreatures, creatureName];
    setMintedCreatures(updatedCreatures);
    setMintedCreature(creatureName);
    
    // Save creatures with wallet-specific key
    const storageKey = `minifi-creatures-${walletAddress}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedCreatures));
    
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 2000);
  };

  const renderCurrentPage = () => {
    if (currentPage === 'intro' || (showIntro && !hasSeenIntro)) {
      return <StarWarsIntro onComplete={handleIntroComplete} onSkip={handleIntroSkip} />;
    }

    switch (currentPage) {
      case 'mint':
        return (
          <MintingPage 
            onMintComplete={handleMintComplete}
            isWalletConnected={isWalletConnected}
            onWalletConnect={handleWalletConnect}
            walletAddress={walletAddress}
          />
        );
      case 'dashboard':
        // Only show dashboard if wallet is connected and user has creatures
        if (!isWalletConnected) {
          return (
            <MintingPage 
              onMintComplete={handleMintComplete}
              isWalletConnected={isWalletConnected}
              onWalletConnect={handleWalletConnect}
              walletAddress={walletAddress}
            />
          );
        }
        
        return mintedCreature ? (
          <CreatureDashboard 
            creatureName={mintedCreature} 
            ownedCreatures={mintedCreatures}
            walletAddress={walletAddress}
          />
        ) : (
          <MintingPage 
            onMintComplete={handleMintComplete}
            isWalletConnected={isWalletConnected}
            onWalletConnect={handleWalletConnect}
            walletAddress={walletAddress}
          />
        );
      case 'info':
        return <InfoPage />;
      default:
        return (
          <MintingPage 
            onMintComplete={handleMintComplete}
            isWalletConnected={isWalletConnected}
            onWalletConnect={handleWalletConnect}
            walletAddress={walletAddress}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#262424] dark">
      {/* Only show header if not showing first-time intro */}
      {(hasSeenIntro || currentPage === 'intro') && (
        <MobileHeader 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onIntroClick={() => handlePageChange('intro')}
          hasCreature={!!mintedCreature}
          creatureCount={mintedCreatures.length}
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      )}
      
      <main className="w-full bg-[#262424]">
        {renderCurrentPage()}
      </main>
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            marginTop: '60px',
          },
        }}
      />
    </div>
  );
}