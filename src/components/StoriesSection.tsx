import React, { useRef, useState, useEffect } from 'react';
import { MapPin, ArrowRight, BookOpen, Check, Layers, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useStudioData } from '../context/StudioDataContext';
import { StoryItem } from '../types';
import { AnimatedHeadline } from './AnimatedHeadline';

interface StoriesSectionProps {
  onBookClick: () => void;
  onSelectStory: (story: StoryItem) => void;
  stories?: StoryItem[];
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ 
  onBookClick, 
  onSelectStory,
  stories: propStories,
}) => {
  const { stories: contextStories } = useStudioData();
  const stories = propStories || contextStories;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScrollIndex, setActiveScrollIndex] = useState<number>(0);

  // Monitor which card is currently in active scroll view to highlight progress dots
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      cardRefs.current.forEach((ref, index) => {
        if (ref) {
          const top = ref.offsetTop;
          const height = ref.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height + 200) {
            setActiveScrollIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    const target = cardRefs.current[idx];
    if (target) {
      // Offset slightly for sticky header
      const y = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="relative w-full bg-stone-50/80 text-slate-900 py-20 sm:py-28 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-3"
            >
              <Layers className="w-4 h-4 text-amber-800" />
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] text-amber-800 uppercase">
                Featured Commissions • Royal Folios
              </span>
            </motion.div>

            <AnimatedHeadline
              as="h2"
              align="left"
              className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight"
              words={[
                { text: 'Featured', subHint: 'Handpicked Unions' },
                { text: 'Wedding', isItalic: true, hasUnderline: true, isAccent: true, subHint: 'Sacred Rituals' },
                { text: 'Stories', subHint: 'Stacking Folios' },
              ]}
            />
          </div>

          <div className="max-w-md space-y-3">
            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Scroll down through our flagship royal wedding commissions. Each folio stacks atop the previous layer (1 on 2, then 3 and 4), keeping each chapter accessible in a physical archival ledger.
            </p>

            {/* Visual Layer Progress Bar */}
            <div className="flex items-center gap-2 pt-1 font-['Plus_Jakarta_Sans'] text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                Stack Layer:
              </span>
              <div className="flex items-center gap-1.5">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeScrollIndex === i
                        ? 'w-7 bg-amber-800'
                        : activeScrollIndex > i
                        ? 'w-3 bg-amber-600/70'
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    title={`Jump to Layer 0${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-amber-900 font-bold ml-1 text-xs">
                0{activeScrollIndex + 1} / 0{stories.length}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TRUE STICKY SCROLL STACK CONTAINER ("ek ke upar 2 then 3 4 aise")        */}
        {/* All cards share the same parent container so they stack over each other.  */}
        {/* ========================================================================= */}
        <div className="relative w-full pb-24 sm:pb-32">
          {stories.map((story, idx) => {
            const isReversed = idx % 2 === 1;
            const isLast = idx === stories.length - 1;

            // Header ledge offset:
            // Layer 1: top: calc(75px + 0px)   = 75px
            // Layer 2: top: calc(75px + 36px)  = 111px (reveals Layer 1 header tab)
            // Layer 3: top: calc(75px + 72px)  = 147px (reveals Layer 1 & 2 tabs)
            // Layer 4: top: calc(75px + 108px) = 183px (reveals Layer 1, 2 & 3 tabs)
            const stickyTop = `calc(75px + ${idx * 38}px)`;

            // Z-Index strictly increasing so:
            // Layer 2 scrolls UP and OVER Layer 1
            // Layer 3 scrolls UP and OVER Layer 2
            // Layer 4 scrolls UP and OVER Layer 3
            const zIndex = 10 + idx;

            return (
              <div
                key={story.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{
                  top: stickyTop,
                  zIndex: zIndex,
                }}
                className={`sticky transition-all duration-300 ${
                  isLast ? 'mb-8' : 'mb-[36vh] sm:mb-[42vh]'
                }`}
              >
                <article
                  className="group bg-white rounded-3xl sm:rounded-[32px] border border-stone-300/90 shadow-[0_-8px_30px_rgba(0,0,0,0.06),0_20px_50px_rgba(0,0,0,0.12)] hover:border-amber-400/90 transition-all duration-300 overflow-hidden"
                >
                  {/* Physical Archival Folio Header Tab (Always visible in the stack) */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToCard(idx);
                    }}
                    className={`px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between border-b cursor-pointer transition-colors ${
                      activeScrollIndex === idx 
                        ? 'bg-amber-950 text-amber-50 border-amber-900' 
                        : 'bg-stone-100 hover:bg-stone-200 text-slate-800 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-4">
                      {/* Layer Tag Badge */}
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold font-['Plus_Jakarta_Sans'] tracking-widest uppercase ${
                        activeScrollIndex === idx 
                          ? 'bg-amber-500 text-slate-950' 
                          : 'bg-stone-200 text-slate-700'
                      }`}>
                        LAYER 0{idx + 1}
                      </span>

                      {/* Couple Name */}
                      <span className="font-['Cormorant_Garamond'] text-lg sm:text-2xl font-medium tracking-tight">
                        {story.title}
                      </span>

                      {/* Location Pin */}
                      <span className="hidden md:inline-flex items-center gap-1 text-xs font-['Plus_Jakarta_Sans'] opacity-80">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{story.location}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-['Plus_Jakarta_Sans'] font-medium opacity-75 hidden sm:inline">
                        {story.season}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-900 border border-amber-500/20">
                        {story.deliverables[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Interior Content */}
                  <div className="p-5 sm:p-8 lg:p-10">
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}>
                      
                      {/* Visual Image Column */}
                      <div className={`lg:col-span-6 relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 shadow-xs group">
                          <img
                            src={story.image}
                            alt={`${story.title} - ${story.location}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                          
                          {/* Top Category Badge */}
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-900 uppercase font-['Plus_Jakarta_Sans'] shadow-xs">
                            {story.category}
                          </div>

                          {/* Center Hover Action Pill */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectStory(story);
                              }}
                              className="px-4 py-2 rounded-full bg-white hover:bg-amber-950 hover:text-white text-slate-950 text-xs font-bold font-['Plus_Jakarta_Sans'] tracking-widest uppercase flex items-center gap-2 shadow-xl transform scale-95 group-hover:scale-100 transition-all cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-amber-700 group-hover:text-amber-300" />
                              <span>Explore Wedding Chapter</span>
                            </button>
                          </div>

                          {/* Bottom Plate Counter Tag */}
                          <div className="absolute bottom-3 left-3 text-white text-[10px] sm:text-[11px] font-['Plus_Jakarta_Sans'] font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                            {story.gallery.length + 3} Bound Plates
                          </div>
                        </div>
                      </div>

                      {/* Narrative & Folio Details Column */}
                      <div className={`lg:col-span-6 flex flex-col justify-center ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs mb-2 font-['Plus_Jakarta_Sans']">
                          <span className="px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-bold tracking-wider text-[10px] sm:text-[11px]">
                            {story.number}
                          </span>
                          <span className="text-slate-500 font-medium text-xs">
                            {story.season}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-950 mb-1 group-hover:text-amber-800 transition-colors">
                          {story.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] text-slate-500 uppercase font-['Plus_Jakarta_Sans'] mb-2.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>{story.location}</span>
                        </div>

                        {/* Poetic Quote */}
                        <p className="font-['Cormorant_Garamond'] text-base sm:text-lg italic text-slate-800 mb-2.5 leading-snug">
                          {story.quote}
                        </p>

                        {/* Narrative Excerpt */}
                        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4 line-clamp-3 sm:line-clamp-none">
                          {story.description}
                        </p>

                        {/* Deliverables Tags */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                          {story.deliverables.slice(0, 3).map((item, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-['Plus_Jakarta_Sans'] font-medium text-slate-700 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full"
                            >
                              <Check className="w-3 h-3 text-amber-700" />
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons & Next Layer Hint */}
                        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectStory(story);
                            }}
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase font-['Plus_Jakarta_Sans'] text-slate-950 group-hover:text-amber-800 transition-colors cursor-pointer"
                          >
                            <span>Open Story Page</span>
                            <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </button>

                          {/* Subtle Scroll Cue for cards before the last one */}
                          {!isLast && (
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                scrollToCard(idx + 1);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-['Plus_Jakarta_Sans'] text-amber-800/80 hover:text-amber-900 font-semibold cursor-pointer animate-pulse"
                            >
                              <span>Scroll for Layer 0{idx + 2}</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Bottom Inquire Banner */}
        <div className="mt-8 sm:mt-12 p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-medium text-slate-950">
              Planning a Destination Union?
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-600 mt-1">
              Connect with Shreyash Gore to discuss bespoke heirloom commissions across India and worldwide.
            </p>
          </div>
          <button
            onClick={onBookClick}
            className="px-6 py-3 rounded-full bg-slate-950 hover:bg-amber-900 text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest uppercase transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Inquire For Dates
          </button>
        </div>

      </div>
    </section>
  );
};
