import React, { useState } from 'react';
import { Camera, ArrowUpRight, Award, Compass, BookOpen, Heart } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { STUDIO_MANIFESTO, STUDIO_STATS } from '../data/shreyStudioData';
import { CounterNumber } from './CounterNumber';

interface StudioManifestoSectionProps {
  onBookClick: () => void;
}

interface HeadlineWord {
  id: string;
  text: string;
  isItalic?: boolean;
  isAccent?: boolean;
  hasUnderline?: boolean;
  hoverGlow?: string;
  subHint?: string;
}

const HEADLINE_WORDS: HeadlineWord[] = [
  { id: 'w1', text: 'We', hoverGlow: 'hover:text-slate-700' },
  { id: 'w2', text: 'Photograph', hoverGlow: 'hover:text-amber-900', subHint: 'Master Light & Frame' },
  { id: 'w3', text: 'the', hoverGlow: 'hover:text-slate-700' },
  {
    id: 'w4',
    text: 'Moments',
    isItalic: true,
    isAccent: true,
    hasUnderline: true,
    hoverGlow: 'hover:text-amber-700',
    subHint: 'Sacred Emotions',
  },
  { id: 'w5', text: 'You', hoverGlow: 'hover:text-slate-700' },
  { id: 'w6', text: 'Never', hoverGlow: 'hover:text-amber-950', subHint: 'Timeless' },
  { id: 'w7', text: 'Want', hoverGlow: 'hover:text-slate-700' },
  { id: 'w8', text: 'to', hoverGlow: 'hover:text-slate-700' },
  {
    id: 'w9',
    text: 'Forget',
    isItalic: true,
    hoverGlow: 'hover:text-amber-800',
    subHint: 'Generational Heirlooms',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.68,
      ease: [0.16, 1, 0.3, 1], // Silk quintic ease-out
    },
  },
};

export const StudioManifestoSection: React.FC<StudioManifestoSectionProps> = ({ onBookClick }) => {
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);

  const handleScrollToStories = () => {
    document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const statIcons = [Compass, BookOpen, Award, Heart];

  return (
    <section id="manifesto" className="relative w-full bg-white text-slate-900 py-20 sm:py-28 md:py-32 border-b border-slate-100 overflow-hidden">
      {/* Subtle architectural background guide lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Eyebrow with small accent bullet */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-[13px] font-bold tracking-[0.25em] text-slate-500 uppercase">
            {STUDIO_MANIFESTO.eyebrow}
          </span>
        </motion.div>

        {/* Primary Statement: Word-by-word Animated Stagger with Interactive Hover */}
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10">
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="font-['Cormorant_Garamond'] text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-slate-950 leading-[1.15] sm:leading-[1.1] md:leading-[1.08] tracking-[-0.015em] flex flex-wrap justify-center items-baseline gap-x-[0.22em] sm:gap-x-[0.28em] md:gap-x-[0.32em] gap-y-1 sm:gap-y-2.5 select-none"
          >
            {HEADLINE_WORDS.map((word) => (
              <motion.span
                key={word.id}
                variants={wordVariants}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                }}
                onMouseEnter={() => setHoveredWordId(word.id)}
                onMouseLeave={() => setHoveredWordId(null)}
                className={`relative inline-block cursor-default transition-colors duration-300 py-0.5 ${
                  word.isItalic ? 'italic font-serif' : 'font-light'
                } ${
                  word.isAccent ? 'text-slate-900' : 'text-slate-950'
                } ${word.hoverGlow}`}
              >
                {/* Word Text */}
                <span className="relative z-10">{word.text}</span>

                {/* Delicate animated underline on "Moments" */}
                {word.hasUnderline && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-600/40 via-amber-600 to-amber-600/40 rounded-full transition-all duration-300 ${
                      hoveredWordId === word.id ? 'opacity-100 scale-x-105 h-[3px]' : 'opacity-60 scale-x-100'
                    }`}
                  />
                )}

                {/* Micro Sub-Hint Tooltip on Hover */}
                {word.subHint && hoveredWordId === word.id && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.92 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden md:inline-block absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-slate-950 text-white font-['Plus_Jakarta_Sans'] text-[10px] font-bold tracking-wider uppercase shadow-md pointer-events-none z-30"
                  >
                    {word.subHint}
                  </motion.span>
                )}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Narrative Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {STUDIO_MANIFESTO.description}
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-20 sm:mb-24"
        >
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide hover:bg-slate-800 active:scale-98 transition-all duration-200 shadow-md shadow-slate-950/10 cursor-pointer"
          >
            <span>BOOK A SESSION</span>
            <Camera className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={handleScrollToStories}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-300 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide hover:bg-slate-50 hover:border-slate-400 active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <span>VIEW PORTFOLIO</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </button>
        </motion.div>

        {/* Exact Metrics Grid with Animated Counting */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-slate-200/80">
          {STUDIO_STATS.map((stat, idx) => {
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
            return (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <div className="flex items-baseline mb-1 sm:mb-1.5">
                  <CounterNumber
                    value={numericValue}
                    suffix="+"
                    duration={1600 + idx * 200}
                    className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium text-slate-950 tracking-tight"
                    suffixClassName="text-amber-700 font-serif text-2xl sm:text-3xl font-light ml-0.5"
                  />
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold tracking-[0.18em] text-slate-800 uppercase mb-1">
                  {stat.label}
                </span>
                {stat.detail && (
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 leading-snug">
                    {stat.detail}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
