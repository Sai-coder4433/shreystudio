import React, { useState } from 'react';
import { Camera, ScrollText, ShieldCheck, Award } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { FOUNDER_DATA, CORE_PILLARS } from '../data/shreyStudioData';
import { AnimatedHeadline } from './AnimatedHeadline';
import { CounterNumber } from './CounterNumber';

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

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Manifesto & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow: The Architect of Moments with Animated Bullet */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] text-amber-800 uppercase">
                {FOUNDER_DATA.eyebrow}
              </span>
            </motion.div>

            {/* Founder Name: Word-by-Word Animated Reveal */}
            <div className="mb-1">
              <AnimatedHeadline
                as="h2"
                align="left"
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
              className="font-['Plus_Jakarta_Sans'] text-xs sm:text-[13px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-5"
            >
              {FOUNDER_DATA.title}
            </motion.p>

            {/* Elegant Divider */}
            <motion.div 
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-16 h-[2px] bg-amber-600 mb-8" 
            />

            {/* Core Quote */}
            <motion.blockquote 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-['Cormorant_Garamond'] text-lg sm:text-xl md:text-2xl italic font-normal text-slate-800 leading-relaxed mb-6 pl-4 border-l-2 border-amber-600/60"
            >
              {FOUNDER_DATA.quote}
            </motion.blockquote>

            {/* Editorial Philosophy Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-normal"
            >
              {FOUNDER_DATA.body}
            </motion.p>

            {/* Core Pillars List */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              {CORE_PILLARS.map((pillar, idx) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.15 * idx }}
                  onMouseEnter={() => setHoveredPillar(pillar.id)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className={`flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 ${
                    hoveredPillar === pillar.id ? 'bg-white shadow-md -translate-y-0.5' : 'bg-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                    hoveredPillar === pillar.id ? 'bg-amber-100 border-amber-400' : 'bg-white border-slate-200'
                  }`}>
                    {getIcon(pillar.icon)}
                  </div>
                  <div>
                    <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold text-slate-950 mb-0.5">
                      {pillar.title}
                    </h4>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Layered Heritage Visual Architecture */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md sm:max-w-lg"
            >
              
              {/* Main Heritage Palace Image with Arch Cutout Top-Left */}
              <div className="relative w-full aspect-[4/5] rounded-3xl rounded-tl-[80px] overflow-hidden shadow-2xl border-4 border-white bg-slate-200 group">
                <img
                  src={FOUNDER_DATA.palaceImage}
                  alt="Royal Couple in Palace Archway"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Overlapping Bride Cutout Card (Bottom-Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -15, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 sm:-bottom-8 sm:-left-6 left-2 w-32 xs:w-40 sm:w-52 md:w-56 aspect-[4/5] rounded-2xl rounded-bl-[32px] sm:rounded-bl-[40px] overflow-hidden shadow-2xl border-2 sm:border-4 border-white z-20 group cursor-pointer"
              >
                <img
                  src={FOUNDER_DATA.brideImage}
                  alt="Royal Indian Bride with Traditional Jewellery"
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                />
              </motion.div>

              {/* Floating Stat Card (Bottom-Right) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="absolute -bottom-3 sm:-bottom-6 sm:-right-4 right-2 z-30 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 md:p-6 rounded-2xl border border-slate-200 shadow-xl max-w-[170px] xs:max-w-[200px] sm:max-w-[260px]"
              >
                <div className="flex items-baseline mb-0.5 sm:mb-1">
                  <CounterNumber
                    value={10}
                    suffix="+"
                    duration={1800}
                    className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl md:text-4xl font-medium text-amber-700"
                    suffixClassName="text-amber-700 font-serif text-lg sm:text-xl ml-0.5"
                  />
                </div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.18em] text-slate-800 uppercase mb-1 sm:mb-2">
                  {FOUNDER_DATA.experienceBadge.title}
                </h4>
                <div className="w-6 sm:w-8 h-[2px] bg-amber-600 mb-1.5 sm:mb-2" />
                <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2 sm:line-clamp-none">
                  {FOUNDER_DATA.experienceBadge.description}
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
