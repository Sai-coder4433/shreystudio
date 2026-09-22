import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface PhotographerSubjectProps {
  scrollProgress: number;
  onEntryComplete?: () => void;
}

export const PhotographerSubject: React.FC<PhotographerSubjectProps> = ({
  onEntryComplete,
}) => {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // 1.0s delay + 2.8s rising animation = 3.8s total completion
    const timer = setTimeout(() => {
      setHasEntered(true);
      onEntryComplete?.();
    }, 3800);

    return () => clearTimeout(timer);
  }, [onEntryComplete]);

  return (
    <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center pointer-events-none z-30 overflow-hidden pb-0 select-none">
      {/* Soft Rim Backlight Glow behind Photographer - Steady */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(230, 238, 255, 0.7) 0%, rgba(240, 245, 255, 0.3) 45%, rgba(255, 255, 255, 0) 70%)',
        }}
      />

      {/* Photographer Cutout Image Container - Completely Steady & Grounded */}
      <motion.div
        className="relative z-30 flex items-end justify-center max-w-full"
        initial={{
          y: 420,
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.6,
          duration: 2.4,
          ease: [0.12, 1, 0.13, 1],
        }}
      >
        <div className="relative flex items-end justify-center">
          <img
            src="https://i.postimg.cc/RZF3MvJh/04.png"
            alt="Lead Photographer"
            className="h-[74vh] sm:h-[82vh] md:h-[88vh] lg:h-[94vh] xl:h-[98vh] max-h-[98vh] min-h-[520px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] select-none pointer-events-none origin-bottom scale-105 md:scale-110"
            loading="eager"
            decoding="sync"
          />
        </div>
      </motion.div>
    </div>
  );
};
