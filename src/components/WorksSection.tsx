import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowUpRight, X, Film, CheckCircle2 } from 'lucide-react';
import { AGENCY_WORKS } from '../data/agencyData';
import { WorkItem } from '../types';

const CATEGORIES = ['All', 'Creator IPs', 'Brand Campaigns', 'Commercials', 'Docu-Series'] as const;

export const WorksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const filteredWorks = activeCategory === 'All'
    ? AGENCY_WORKS
    : AGENCY_WORKS.filter((item) => item.category === activeCategory);

  return (
    <section id="works" className="relative w-full bg-white text-slate-900 py-28 px-6 md:px-12 lg:px-20 border-t border-slate-200 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-100 mb-4">
              <Film className="w-3.5 h-3.5 text-black" />
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-[0.2em] text-slate-700 uppercase">
                Portfolio & Case Studies
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.08]">
              Proper Works, <br />
              <span className="text-slate-500 font-['Cormorant_Garamond'] italic font-normal text-4xl sm:text-5xl md:text-6xl">
                Real Cultural Impact.
              </span>
            </h2>
          </div>

          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            Every campaign is built from scratch. Groundbreaking visual direction, iconic talent pairings, and measurable billions in organic watchtime.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans'] tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:text-black hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, idx) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => setSelectedWork(work)}
                className="group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col shadow-sm hover:shadow-md"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-200">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Top Floating Metric Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-white tracking-wide">
                      {work.metrics}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-4 right-4 z-10 font-mono text-xs text-black font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
                    {work.year}
                  </div>

                  {/* Hover Arrow Overlay */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
                      <span className="text-black font-extrabold uppercase tracking-wider text-[10px]">
                        {work.client}
                      </span>
                      <span>{work.category}</span>
                    </div>

                    <h3 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-bold text-black tracking-tight leading-snug group-hover:text-slate-700 transition-colors mb-3">
                      {work.title}
                    </h3>

                    <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-600 font-normal line-clamp-2 leading-relaxed mb-6">
                      {work.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-md border border-slate-300/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal for Case Study Details */}
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedWork(null)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="relative max-w-3xl w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_40px_100px_rgba(0,0,0,0.25)] overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-black text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Media Image */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-md">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-black text-white font-['Plus_Jakarta_Sans'] text-xs font-bold">
                      {selectedWork.metrics}
                    </span>
                    {selectedWork.subMetric && (
                      <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-black font-['Plus_Jakarta_Sans'] text-xs font-bold">
                        {selectedWork.subMetric}
                      </span>
                    )}
                  </div>
                </div>

                {/* Case Details */}
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <span className="text-black">{selectedWork.client}</span>
                  <span>•</span>
                  <span>{selectedWork.category}</span>
                  <span>•</span>
                  <span>{selectedWork.year}</span>
                </div>

                <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-black mb-4">
                  {selectedWork.title}
                </h2>

                <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
                  {selectedWork.description}
                </p>

                {/* Execution Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Scripted & Directed by In-House Team</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Multi-Platform Algorithmic Optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>End-to-End Visual Identity & Sound Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>100% Organic Viral Distribution</span>
                  </div>
                </div>

                {/* Tags & Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedWork(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-black text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-tight hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                  >
                    Close Project
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
