import React, { useState } from 'react';
import { Camera, ScrollText, ShieldCheck, Award } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { FOUNDER_DATA, CORE_PILLARS } from '../data/shreyStudioData';
import { AnimatedHeadline } from './AnimatedHeadline';

export const ArchitectFounderSection: React.FC = () => {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'camera':
        return <Camera className="w-5 h-5 text-amber-700" />;
      case 'scroll':
        return <ScrollText className="w-5 h-5 text-amber-700" />;
      case 'shield':
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <section id="architect" className="relative w-full bg-slate-50/70 text-slate-900 py-24 sm:py-32 border-b border-slate-200/80 overflow-hidden">
      
      {/* Soft Ambient Gold Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-radial from-amber-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow: The Architect of Moments with Animated Bullet */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2.5 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] text-amber-800 uppercase">
              {FOUNDER_DATA.eyebrow}
            </span>
          </motion.div>

          {/* Founder Name: Word-by-Word Animated Reveal */}
          <div className="mb-2">
            <AnimatedHeadline
              as="h2"
              align="center"
              className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-light text-slate-950 capitalize tracking-tight"
              words={[
                { text: 'Shreyash', subHint: 'Director & Visionary' },
                { text: 'Gore', isItalic: true, hasUnderline: true, subHint: 'Master Light Craftsman' },
              ]}
            />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-['Plus_Jakarta_Sans'] text-xs sm:text-[13px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6"
          >
            {FOUNDER_DATA.title}
          </motion.p>

          {/* Elegant Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-[2px] bg-amber-600 mb-10" 
          />

          {/* Core Quote */}
          <motion.blockquote 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-['Cormorant_Garamond'] text-xl sm:text-2xl md:text-3xl italic font-normal text-slate-900 leading-relaxed mb-8 max-w-3xl px-4"
          >
            {FOUNDER_DATA.quote}
          </motion.blockquote>

          {/* Editorial Philosophy Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-slate-600 leading-relaxed mb-12 max-w-2xl font-normal"
          >
            {FOUNDER_DATA.body}
          </motion.p>

          {/* Core Pillars (3 Cards horizontally across the bottom) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200/90 text-left">
            {CORE_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.15 * idx }}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  hoveredPillar === pillar.id 
                    ? 'bg-white border-amber-300 shadow-xl -translate-y-1' 
                    : 'bg-white/80 border-slate-200/80 shadow-xs'
                }`}
              >
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 mb-4 transition-colors ${
                  hoveredPillar === pillar.id ? 'bg-amber-100 border-amber-400' : 'bg-slate-50 border-slate-200'
                }`}>
                  {getIcon(pillar.icon)}
                </div>
                <h4 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-slate-950 mb-2">
                  {pillar.title}
                </h4>
                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
