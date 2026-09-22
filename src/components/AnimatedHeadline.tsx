import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';

export interface WordData {
  id: string;
  raw: string;
  isItalic?: boolean;
  isAccent?: boolean;
  hasUnderline?: boolean;
  subHint?: string;
  customClass?: string;
}

interface AnimatedHeadlineProps {
  words: (string | {
    text: string;
    isItalic?: boolean;
    isAccent?: boolean;
    hasUnderline?: boolean;
    subHint?: string;
    customClass?: string;
  })[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  delay?: number;
}

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
    y: 26,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1], // Silk quintic ease-out
    },
  },
};

export const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  words,
  as: Component = 'h2',
  className = '',
  align = 'center',
  theme = 'light',
  delay = 0,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const justifyClass = 
    align === 'center' ? 'justify-center text-center' :
    align === 'right' ? 'justify-end text-right' : 'justify-start text-left';

  const normalizedWords: WordData[] = words.map((w, idx) => {
    if (typeof w === 'string') {
      return { id: `w-${idx}`, raw: w };
    }
    return {
      id: `w-${idx}`,
      raw: w.text,
      isItalic: w.isItalic,
      isAccent: w.isAccent,
      hasUnderline: w.hasUnderline,
      subHint: w.subHint,
      customClass: w.customClass,
    };
  });

  const isDark = theme === 'dark';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delayChildren: delay }}
      className={`flex flex-wrap items-baseline gap-x-[0.22em] sm:gap-x-[0.28em] md:gap-x-[0.32em] gap-y-1 sm:gap-y-2 select-none ${justifyClass} ${className}`}
    >
      {normalizedWords.map((word, idx) => {
        const isHovered = hoveredIndex === idx;

        // Dynamic theme-aware colors
        const defaultColor = isDark ? 'text-[#fcf9f2] hover:text-amber-300' : 'text-slate-950 hover:text-amber-900';
        const accentColor = isDark ? 'text-amber-400 hover:text-amber-200' : 'text-slate-900 hover:text-amber-800';

        return (
          <motion.span
            key={word.id}
            variants={wordVariants}
            whileHover={{
              y: -4,
              scale: 1.03,
              transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative inline-block cursor-default py-0.5 transition-colors duration-300 ${
              word.isItalic ? 'italic font-serif' : 'font-light'
            } ${
              word.isAccent ? accentColor : defaultColor
            } ${word.customClass || ''}`}
          >
            {/* Word characters */}
            <span className="relative z-10">{word.raw}</span>

            {/* Delicate animated underline if configured */}
            {word.hasUnderline && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-600/40 via-amber-500 to-amber-600/40 rounded-full transition-all duration-300 ${
                  isHovered ? 'opacity-100 scale-x-105 h-[3px]' : 'opacity-60 scale-x-100'
                }`}
              />
            )}

            {/* Interactive Sub-Hint Tooltip on Hover (hidden on mobile touch to avoid overflow) */}
            {word.subHint && isHovered && (
              <motion.span
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.92 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`hidden md:inline-block absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full font-['Plus_Jakarta_Sans'] text-[10px] font-bold tracking-wider uppercase shadow-md pointer-events-none z-30 ${
                  isDark
                    ? 'bg-[#24201a] text-amber-300 border border-amber-500/40 shadow-black/80'
                    : 'bg-slate-950 text-white shadow-slate-950/30'
                }`}
              >
                {word.subHint}
              </motion.span>
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
