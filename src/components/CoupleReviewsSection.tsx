import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { StudioTestimonialItem } from '../types';

export const CoupleReviewsSection: React.FC = () => {
  const { reviews } = useStudioData();

  // If there are fewer reviews, duplicate them so the marquee has a seamless infinite loop
  const displayReviews: StudioTestimonialItem[] =
    reviews.length > 0
      ? reviews.length < 6
        ? [...reviews, ...reviews, ...reviews, ...reviews]
        : [...reviews, ...reviews]
      : [];

  return (
    <section id="reviews" className="relative w-full bg-[#faf9f6] text-slate-900 py-16 sm:py-24 border-b border-slate-100 overflow-hidden select-none">
      {/* Background Ambient Warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-amber-100/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 mb-10 sm:mb-12">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.22em] text-amber-800 uppercase">
              Generational Praise
            </span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight mb-2">
            Words From Our Couples
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-['Plus_Jakarta_Sans'] font-normal">
            Reflections from weddings, pre-weddings, and destination commissions across Pune, Maharashtra & beyond.
          </p>
        </div>
      </div>

      {/* Running Marquee Track with Left & Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Fade Mask */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#faf9f6] to-transparent z-20 pointer-events-none" />
        
        {/* Right Fade Mask */}
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#faf9f6] to-transparent z-20 pointer-events-none" />

        {/* Marquee Animation Container */}
        <div className="flex gap-4 sm:gap-5 w-max animate-reviews-marquee group-hover:[animation-play-state:paused] py-3 px-4">
          {displayReviews.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-[280px] sm:w-[320px] shrink-0 bg-white/95 rounded-2xl p-4 sm:p-5 border border-stone-200/90 hover:border-amber-400 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars + Category */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200/60">
                    {t.weddingType}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="flex items-start gap-1.5 mb-3">
                  <Quote className="w-3.5 h-3.5 text-amber-600/40 shrink-0 mt-0.5" />
                  <p className="font-['Cormorant_Garamond'] text-sm sm:text-base italic font-normal text-stone-800 leading-snug line-clamp-3">
                    “{t.quote}”
                  </p>
                </div>
              </div>

              {/* Bottom Row: Couple Name, Venue & Location */}
              <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
                <div className="min-w-0">
                  <h4 className="font-['Cormorant_Garamond'] text-base sm:text-lg font-bold text-stone-900 truncate">
                    {t.couple}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-stone-400 font-medium font-['Plus_Jakarta_Sans'] truncate">
                    <MapPin className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                    <span className="truncate">{t.location}</span>
                  </div>
                </div>

                <span className="shrink-0 inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Keyframes Animation */}
      <style>{`
        @keyframes reviewsMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-reviews-marquee {
          animation: reviewsMarquee 42s linear infinite;
        }
      `}</style>
    </section>
  );
};
