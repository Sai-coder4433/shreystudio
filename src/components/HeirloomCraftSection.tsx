import React, { useState } from 'react';
import { BookOpen, Award, Layers, Palette, Book, Shield, Pause, Play, ChevronLeft, ChevronRight, Grid, Infinity as InfinityIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { HEIRLOOM_CRAFT_ITEMS } from '../data/shreyStudioData';
import { HeirloomCraftItem } from '../types';
import { AnimatedHeadline } from './AnimatedHeadline';

export const HeirloomCraftSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'stream' | 'grid'>('stream');

  const getCraftIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return Book;
      case 'layers':
        return Layers;
      case 'sparkles':
        return Award;
      case 'bookOpen':
        return BookOpen;
      case 'shield':
        return Shield;
      case 'palette':
        return Palette;
      default:
        return Award;
    }
  };

  // Double the list for seamless continuous infinite marquee
  const loopedItems = [...HEIRLOOM_CRAFT_ITEMS, ...HEIRLOOM_CRAFT_ITEMS];

  const renderCraftCard = (item: HeirloomCraftItem, index: number, isGrid = false) => {
    const Icon = getCraftIcon(item.iconName);

    return (
      <div
        key={`${item.id}-${index}`}
        className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-slate-200/90 hover:border-amber-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
          isGrid
            ? 'w-full'
            : 'w-[280px] xs:w-[320px] sm:w-[370px] lg:w-[400px] shrink-0 select-none'
        }`}
      >
        <div>
          {/* Card Top Meta */}
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-100 transition-all">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800" />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                CRAFT {item.craftNumber}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider font-['Plus_Jakarta_Sans'] uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                {item.badge}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl lg:text-3xl font-medium text-slate-950 mb-2 sm:mb-3 group-hover:text-amber-900 transition-colors">
            {item.title}
          </h3>

          {/* Core Highlight Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] sm:text-[11px] font-semibold text-slate-700 mb-3 sm:mb-4 font-['Plus_Jakarta_Sans']">
            <Award className="w-3 h-3 text-amber-600 shrink-0" />
            <span>{item.highlight}</span>
          </div>

          {/* Description */}
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5 sm:mb-6">
            {item.description}
          </p>
        </div>

        {/* Bottom Material Specification */}
        <div className="pt-3.5 sm:pt-4 border-t border-slate-100 flex flex-col gap-1 text-xs font-['Plus_Jakarta_Sans']">
          <span className="font-bold tracking-widest text-slate-400 uppercase text-[9px] sm:text-[10px]">
            Material Specification
          </span>
          <span className="font-semibold text-slate-900 bg-slate-50/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200/70 text-[11px] sm:text-xs">
            {item.material}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="craft" className="relative w-full bg-slate-50/90 text-slate-900 py-24 sm:py-32 border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-amber-100/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Animated Word-by-Word Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] text-amber-800 uppercase">
                Tangible Artistry
              </span>
            </motion.div>

            <div className="mb-4">
              <AnimatedHeadline
                as="h2"
                align="left"
                className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight"
                words={[
                  { text: 'The', subHint: 'Handmade Craft' },
                  { text: 'Bound', subHint: 'Layflat 180°' },
                  { text: 'Heirloom', isItalic: true, hasUnderline: true, isAccent: true, subHint: '100-Year Cotton Rag' },
                  { text: 'Legacy', subHint: 'Generational Treasure' },
                ]}
              />
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
            >
              We reject fleeting digital files left forgotten on phone drives. Every Shrey Studio book is a physical work of museum-grade art crafted to outlive generations.
            </motion.p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex items-center gap-3 self-start md:self-end bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-xs">
            <button
              onClick={() => setViewMode(viewMode === 'stream' ? 'grid' : 'stream')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === 'stream'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-black'
              }`}
              title="Toggle Infinite Stream"
            >
              <InfinityIcon className="w-3.5 h-3.5" />
              <span>{viewMode === 'stream' ? 'Infinite Loop' : 'Stream View'}</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'stream' : 'grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-black'
              }`}
              title="Toggle Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>

            {viewMode === 'stream' && (
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                title={isPaused ? 'Resume Loop' : 'Pause Loop'}
                aria-label={isPaused ? 'Resume Loop' : 'Pause Loop'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Stream View: Smooth Seamless Infinite Marquee Loop */}
      {viewMode === 'stream' ? (
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle Side Fade Gradients */}
          <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50/90 to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <div
            className={`flex gap-6 sm:gap-8 animate-marquee-slow px-4 ${
              isPaused ? '[animation-play-state:paused]' : ''
            }`}
          >
            {loopedItems.map((item, idx) => renderCraftCard(item, idx, false))}
          </div>

          <div className="max-w-7xl mx-auto px-6 mt-6 flex items-center justify-between text-xs text-slate-500 font-['Plus_Jakarta_Sans']">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Hover anywhere over any card to pause and inspect specifications</span>
            </span>
            <span className="font-semibold text-amber-800">
              6 Handcrafted Pillars in Continuous Loop
            </span>
          </div>
        </div>
      ) : (
        /* Grid View: Full 6-Pillar Showcase */
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {HEIRLOOM_CRAFT_ITEMS.map((item, idx) => renderCraftCard(item, idx, true))}
          </div>
        </div>
      )}

    </section>
  );
};
