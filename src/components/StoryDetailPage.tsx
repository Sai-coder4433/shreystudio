import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  ZoomIn, 
  Camera, 
  ShieldCheck, 
  Share2,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryItem } from '../types';
import { useStudioData } from '../context/StudioDataContext';

interface StoryDetailPageProps {
  story: StoryItem;
  onBack: () => void;
  onBookClick: () => void;
  onSelectStory: (story: StoryItem) => void;
}

export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({
  story,
  onBack,
  onBookClick,
  onSelectStory,
}) => {
  const { stories } = useStudioData();
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Scroll to top when page mounts or story changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [story.id]);

  // Handle ESC key to exit lightbox or page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeLightboxImg) {
          setActiveLightboxImg(null);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImg, onBack]);

  // Find index and next/previous story
  const currentIndex = stories.findIndex((s) => s.id === story.id);
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : stories[stories.length - 1];
  const nextStory = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : stories[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Curate a rich plate gallery combining main image + gallery items + architectural details
  const allPlates = [
    story.image,
    ...story.gallery,
    'https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format&fit=crop',
  ].slice(0, 6);

  return (
    <div className="relative w-full min-h-screen bg-[#faf8f5] text-slate-900 selection:bg-black selection:text-white">
      {/* Top Floating Sticky Header Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Stories */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-['Plus_Jakarta_Sans'] font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
            <span className="hidden xs:inline">Back to All Stories</span>
            <span className="xs:hidden">Stories</span>
          </button>

          {/* Center Story Title Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans']">
            <span className="font-bold text-amber-800 tracking-wider uppercase">{story.number}</span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-slate-700 truncate max-w-[200px] lg:max-w-none">{story.title}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-semibold">{story.location}</span>
          </div>

          {/* Actions & Book Session */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-2 rounded-full border border-stone-200 hover:bg-stone-100 text-slate-700 text-xs font-['Plus_Jakarta_Sans'] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy share link"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">{isCopied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isLiked ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-stone-200 hover:bg-stone-100 text-slate-600'
              }`}
              title="Favorite story"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={onBookClick}
              className="px-4 sm:px-5 py-2 rounded-full bg-slate-950 hover:bg-amber-900 text-white text-xs font-['Plus_Jakarta_Sans'] font-bold tracking-widest uppercase transition-colors shadow-xs cursor-pointer"
            >
              Inquire Dates
            </button>
          </div>

        </div>
      </nav>

      {/* Hero Exhibition Banner */}
      <section className="relative w-full min-h-[65vh] sm:min-h-[75vh] flex items-end pb-12 sm:pb-20 pt-16 bg-slate-950 overflow-hidden">
        {/* Background Image with Slow Zoom */}
        <motion.div 
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest uppercase shadow-xs">
                {story.number}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold tracking-wider uppercase">
                {story.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-stone-300 font-['Plus_Jakarta_Sans'] text-xs">
                {story.season}
              </span>
            </div>

            {/* Couple Names */}
            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none">
              {story.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-stone-300 text-sm sm:text-base font-['Plus_Jakarta_Sans'] font-medium">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{story.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Narrative & Story Details Section */}
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24 space-y-20">
        
        {/* Narrative & Quote Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: The Emotional Heart */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-amber-800">
              <Camera className="w-3.5 h-3.5 text-amber-700" />
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] uppercase">
                Archival Chapter
              </span>
            </div>

            <blockquote className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl italic text-slate-950 leading-snug border-l-3 border-amber-700 pl-5">
              {story.quote}
            </blockquote>

            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {story.description}
            </p>

            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-slate-600 font-normal leading-relaxed pt-2">
              Every photograph was captured with intention, honoring quiet pauses as much as monumental rituals. From morning light filtering through heritage sandstone arches to candlelight dances under starry desert skies, this portfolio reflects an heirloom built to outlast trends.
            </p>

            {/* Photographer Note Box */}
            <div className="mt-8 p-6 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider uppercase">
                <Camera className="w-4 h-4 text-amber-700" />
                <span>Photographer’s Curation Notes • Shreyash Gore</span>
              </div>
              <p className="font-['Cormorant_Garamond'] text-lg italic text-slate-800">
                “We used soft 35mm analog glass and medium-format digital sensors to preserve the natural warmth of Indian marigolds and royal heritage stone. There is zero artificial staging—just pure reverence for the couple.”
              </p>
            </div>
          </div>

          {/* Right Column: Key Deliverables & Specifications */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-slate-950 pb-3 border-b border-stone-100">
              Commission Specifications
            </h3>

            <div className="space-y-4">
              {story.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-slate-800">{item}</span>
                  </div>
                </div>
              ))}

              {/* Extra archival items */}
              <div className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-slate-800">
                    Hand-Bound Gold Foil Archival Leather Box
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-slate-800">
                    Lifetime Cloud Archival Vault & High-Res RAW Delivery
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={onBookClick}
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-amber-900 text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest uppercase transition-colors shadow-sm cursor-pointer"
              >
                Inquire For Similar Union
              </button>
            </div>
          </div>

        </section>

        {/* Archival Photographic Gallery Plates */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] text-amber-800 uppercase">
                Curated Plates
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-slate-950 mt-1">
                Visual Artifacts & Moments
              </h2>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-500">
              Click any plate to inspect in high-resolution archival view
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allPlates.map((imgUrl, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveLightboxImg(imgUrl)}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 cursor-pointer shadow-xs hover:shadow-lg transition-all"
              >
                <img
                  src={imgUrl}
                  alt={`${story.title} plate ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-[10px] font-['Plus_Jakarta_Sans'] font-semibold">
                  Plate 0{idx + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Navigator Footer */}
        <section className="pt-12 border-t border-stone-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Previous Story Card */}
            <div
              onClick={() => onSelectStory(prevStory)}
              className="group p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center shrink-0 text-slate-700 group-hover:text-amber-900 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-['Plus_Jakarta_Sans']">
                  Previous Folio
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-medium text-slate-900 truncate group-hover:text-amber-800 transition-colors">
                  {prevStory.title}
                </h4>
                <p className="text-xs text-slate-500 truncate font-['Plus_Jakarta_Sans']">
                  {prevStory.location}
                </p>
              </div>
            </div>

            {/* Next Story Card */}
            <div
              onClick={() => onSelectStory(nextStory)}
              className="group p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 text-right"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-['Plus_Jakarta_Sans']">
                  Next Folio
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-medium text-slate-900 truncate group-hover:text-amber-800 transition-colors">
                  {nextStory.title}
                </h4>
                <p className="text-xs text-slate-500 truncate font-['Plus_Jakarta_Sans']">
                  {nextStory.location}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center shrink-0 text-slate-700 group-hover:text-amber-900 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

          </div>
        </section>

        {/* Final Booking Callout */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-['Plus_Jakarta_Sans'] font-bold tracking-widest uppercase">
              Limited 2026/2027 Dates
            </span>
            <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light leading-tight">
              Ready to create your family heirloom?
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-stone-300 leading-relaxed">
              We accept only 12 exclusive destination weddings per season to guarantee undivided artistic devotion from Shreyash Gore.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="px-8 py-4 rounded-full bg-white hover:bg-amber-100 text-slate-950 font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest uppercase transition-colors shadow-lg cursor-pointer"
              >
                Reserve Your Wedding Dates
              </button>
              <button
                onClick={onBack}
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
              >
                Return to Studio Home
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox Modal for Full-Res Image Viewing */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightboxImg}
              alt="Archival plate enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
