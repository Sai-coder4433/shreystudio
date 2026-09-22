import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera } from 'lucide-react';
import { PhotoItem } from '../types';

interface HeroControlsProps {
  hoveredPhoto: PhotoItem | null;
  selectedPhoto: PhotoItem | null;
  onCloseSelected?: () => void;
  onContactClick?: () => void;
  onExploreClick?: () => void;
}

export const HeroControls: React.FC<HeroControlsProps> = ({
  hoveredPhoto,
  selectedPhoto,
  onCloseSelected,
  onExploreClick,
}) => {
  return (
    <>
      {/* Subtle Bottom Scroll Hint */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center pointer-events-auto">
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-slate-200 text-slate-700 hover:text-black transition-all duration-200 cursor-pointer shadow-sm group"
        >
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-widest uppercase">
            Explore Heirlooms
          </span>
          <span className="text-xs group-hover:translate-y-0.5 transition-transform duration-200">↓</span>
        </button>
      </div>

      {/* Hovered Photo Info Card (Clean White Glassmorphism Plaque) */}
      <AnimatePresence>
        {hoveredPhoto && !selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-24 left-6 md:left-10 z-40 pointer-events-none bg-white/95 backdrop-blur-md p-4 px-5 rounded-2xl border border-slate-200 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                {hoveredPhoto.category} — {hoveredPhoto.year}
              </span>
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-medium italic text-black">
              "{hoveredPhoto.title}"
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light Modal / Focus View when a photo is clicked */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl"
            onClick={onCloseSelected}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-slate-200 flex flex-col items-center text-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-slate-200 shadow-lg">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.3em] text-slate-500 uppercase mb-1">
                {selectedPhoto.category} • {selectedPhoto.year}
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-medium italic text-black mb-4">
                {selectedPhoto.title}
              </h2>

              <button
                onClick={onCloseSelected}
                className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.2em] text-black hover:text-white uppercase border border-slate-300 hover:bg-black px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
              >
                CLOSE EXHIBIT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
