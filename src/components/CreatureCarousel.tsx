import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Creature {
  id: number;
  name: string;
  image: string;
  color: string;
}

interface CreatureCarouselProps {
  creatures: Creature[];
}

export function CreatureCarousel({ creatures }: CreatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % creatures.length);
    }, 2000); // Change creature every 2 seconds

    return () => clearInterval(interval);
  }, [creatures.length]);

  const currentCreature = creatures[currentIndex];

  return (
    <div className="relative h-48 sm:h-56 flex items-center justify-center my-6 overflow-visible">
      {/* Animated background glow that changes with creature color */}
      <motion.div
        key={`glow-${currentIndex}`}
        className="absolute inset-0 blur-3xl opacity-30 scale-150"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.3, scale: 1.5 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(circle, ${currentCreature.color}40 0%, transparent 70%)`,
        }}
      />

      {/* Creature image with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ 
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="relative z-10"
        >
          <img
            src={currentCreature.image}
            alt={currentCreature.name}
            className="h-28 sm:h-36 w-auto object-contain drop-shadow-2xl"
            style={{
              filter: `drop-shadow(0 0 20px ${currentCreature.color}60)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Creature name label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`name-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <div 
            className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-[#DCC2FE]/40 bg-[#DCC2FE]/20 text-[#DCC2FE]"
          >
            {currentCreature.name}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
