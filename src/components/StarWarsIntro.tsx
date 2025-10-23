import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import minifiLogo from 'figma:asset/43ed93ec12b7cd4f7b5812ed68ed562405f82239.png';

interface StarWarsIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function StarWarsIntro({ onComplete, onSkip }: StarWarsIntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-complete after animation (60 seconds for full effect)
    const timer = setTimeout(() => {
      handleComplete();
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => onComplete(), 500);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onSkip(), 500);
  };

  if (!isVisible) return null;

  // Generate more stars for better starfield effect
  const stars = Array.from({ length: 100 }, (_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50 safe-top">
      {/* Starfield background */}
      <div className="absolute inset-0 bg-black">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Skip button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSkip}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-[#DCC2FE] hover:text-[#F3F3F3] hover:bg-[#DCC2FE]/20 text-sm safe-top"
      >
        Skip
        <X className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
      </Button>

      {/* Star Wars crawl container */}
      <div className="star-wars">
        <div className="crawl">
          <div className="title">
            <img src={minifiLogo} alt="MINIFI" className="logo-image" />
          </div>
          
          <p>
            In a universe where digital creatures roam the blockchain, 
            a new era of <span className="highlight">mini finance</span> has emerged...
          </p>

          <p>
            <span className="highlight">MINIFI</span> — where you can <span className="highlight">Feed. Grow. Save.</span>
          </p>

          <p>
            Mint your unique cosmic creature as an <span className="highlight">Unlock Protocol NFT</span>. 
            Nurture it with <span className="highlight">tokens</span> and watch it thrive. But this is more 
            than just caring for a digital companion...
          </p>

          <p>
            Every token you feed becomes an investment. Through the power 
            of <span className="highlight">Aave Protocol</span>, your creature generates yield 
            while you sleep. The more you feed, the more it grows. 
            The more it grows, the more you save.
          </p>

          <p>
            Ten unique <span className="highlight">Turriteccos</span> await, each with its own cosmic powers and personality. 
            From the curious <span className="highlight">Jellodras</span> to the loyal <span className="highlight">Wistrow</span>, 
            your journey begins with a single choice.
          </p>

          <p>
            Will you take a chance with random fate, or carefully select 
            your companion? Either way, your path to mini finance mastery 
            starts now.
          </p>

          <p>
            Feed your creature. Watch it grow. Build your savings.
          </p>

          <p>
            <span className="highlight">Welcome to MINIFI.</span>
          </p>
        </div>
      </div>

      <style>{`
        /* Star Wars opening crawl effect */
        .star-wars {
          display: flex;
          justify-content: center;
          position: relative;
          height: 100%;
          color: #F3F3F3;
          font-family: 'Pathway Gothic One', sans-serif;
          font-size: 500%;
          font-weight: 600;
          letter-spacing: 6px;
          line-height: 150%;
          perspective: 400px;
          text-align: left;
        }

        .crawl {
          position: relative;
          top: 99999px;
          transform-origin: 50% 100%;
          animation: crawl 60s linear;
        }

        .crawl > .title {
          font-size: 90%;
          text-align: left;
          display: flex;
          justify-content: flex-start;
        }

        .crawl > .title h1 {
          margin: 0 0 100px;
          text-transform: uppercase;
          font-size: 1em;
          color: #DCC2FE;
        }

        .crawl > .title .logo-image {
          width: 80%;
          max-width: 600px;
          height: auto;
          margin: 0 0 100px;
          transform-style: preserve-3d;
          filter: drop-shadow(0 0 20px rgba(220, 194, 254, 0.6));
        }

        @keyframes crawl {
          0% {
            top: 100vh;
            transform: rotateX(20deg) translateZ(0);
          }
          100% { 
            top: -6000px;
            transform: rotateX(25deg) translateZ(-2500px);
          }
        }

        .crawl p {
          margin-bottom: 100px;
          font-size: 0.7em;
          line-height: 1.5;
          color: #F3F3F3;
        }

        .crawl .highlight {
          color: #DCC2FE;
          font-weight: 700;
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .star-wars {
            font-size: 300%;
            perspective: 300px;
          }

          .crawl > .title h1 {
            margin: 0 0 60px;
          }

          .crawl > .title .logo-image {
            width: 85%;
            max-width: 400px;
            margin: 0 0 60px;
          }

          .crawl p {
            margin-bottom: 60px;
            font-size: 0.65em;
          }

          @keyframes crawl {
            0% {
              top: 100vh;
              transform: rotateX(20deg) translateZ(0);
            }
            100% { 
              top: -5000px;
              transform: rotateX(25deg) translateZ(-2000px);
            }
          }
        }

        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1024px) {
          .star-wars {
            font-size: 400%;
            perspective: 350px;
          }

          .crawl > .title h1 {
            margin: 0 0 80px;
          }

          .crawl > .title .logo-image {
            width: 82%;
            max-width: 500px;
            margin: 0 0 80px;
          }

          .crawl p {
            margin-bottom: 80px;
          }

          @keyframes crawl {
            0% {
              top: 100vh;
              transform: rotateX(20deg) translateZ(0);
            }
            100% { 
              top: -5500px;
              transform: rotateX(25deg) translateZ(-2300px);
            }
          }
        }
      `}</style>
    </div>
  );
}