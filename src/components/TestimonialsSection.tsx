import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/agencyData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative w-full bg-slate-50 text-slate-900 py-28 px-6 md:px-12 lg:px-20 border-t border-slate-200 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white mb-4 shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-[0.2em] text-slate-700 uppercase">
                Creator & Brand Endorsements
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.08]">
              Trusted By The Biggest <br />
              <span className="text-slate-500 font-['Cormorant_Garamond'] italic font-normal text-4xl sm:text-5xl md:text-6xl">
                Voices On The Screen.
              </span>
            </h2>
          </div>

          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            From co-founders who are viral creators themselves to Fortune 500 brand CMOs, here’s why the biggest storytellers choose Opraah.
          </p>
        </div>

        {/* Testimonials 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative p-8 md:p-10 rounded-3xl bg-white border border-slate-200 hover:border-black transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-black group-hover:text-white transition-colors">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Body */}
                <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base font-bold text-black tracking-tight">
                        {t.name}
                      </h4>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 fill-blue-600/20" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {t.role} • <span className="text-slate-800 font-semibold">{t.handle}</span>
                    </div>
                  </div>
                </div>

                {/* Metric/Follower Badge */}
                <div className="hidden sm:block text-right">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                    {t.followers}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
