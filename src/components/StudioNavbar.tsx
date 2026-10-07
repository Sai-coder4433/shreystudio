import React, { useState, useEffect } from 'react';
import { Camera, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudioNavbarProps {
  onBookClick: () => void;
  onAdminClick?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export const StudioNavbar: React.FC<StudioNavbarProps> = ({
  onBookClick,
  onAdminClick,
  onNavigate,
  currentPath = '/',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => {
        if (!prev && y > 45) return true;
        if (prev && y < 15) return false;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string, path: string = '/') => {
    setMobileMenuOpen(false);
    if (onNavigate && currentPath !== path && path !== '/') {
      onNavigate(path);
      return;
    }
    if (onNavigate && currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        if (id === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 pointer-events-auto ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
            : 'bg-white/60 backdrop-blur-sm border-b border-slate-200/30'
        } py-2.5 sm:py-3`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 flex items-center justify-between">
          {/* Official Brand Logo */}
          <div
            className="flex items-center h-11 sm:h-13 md:h-14 shrink-0 cursor-pointer select-none"
            onClick={() => handleLinkClick('top', '/')}
          >
            <img
              src="https://i.postimg.cc/FHbyBsDQ/logo-black-(1).png"
              alt="Professional Photography and Cinematography Studio Logo"
              className="h-11 sm:h-12 md:h-14 w-auto max-w-[210px] sm:max-w-[250px] md:max-w-[290px] object-contain transform-gpu backface-hidden [transform:translateZ(0)] transition-opacity duration-200 hover:opacity-85"
              loading="eager"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-['Plus_Jakarta_Sans'] text-xs font-semibold tracking-wider text-slate-700 uppercase">
            <button
              onClick={() => handleLinkClick('manifesto', '/')}
              className="hover:text-black cursor-pointer transition-colors duration-200"
            >
              Manifesto
            </button>
            <button
              onClick={() => handleLinkClick('architect', '/')}
              className="hover:text-black cursor-pointer transition-colors duration-200"
            >
              The Architect
            </button>
            <button
              onClick={() => handleLinkClick('stories', '/')}
              className="hover:text-black cursor-pointer transition-colors duration-200"
            >
              Stories
            </button>
            <button
              onClick={() => handleLinkClick('reviews', '/')}
              className="hover:text-black cursor-pointer transition-colors duration-200"
            >
              Reviews
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('/blog');
              }}
              className="hover:text-amber-800 cursor-pointer transition-colors duration-200 font-bold"
            >
              Journal
            </button>
          </nav>

          {/* Right Actions & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 bg-slate-950 text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider uppercase px-4 sm:px-6 py-2.5 rounded-full hover:bg-slate-800 active:scale-95 transition-all duration-200 cursor-pointer shadow-md shadow-slate-950/15"
            >
              <span className="hidden sm:inline">Book Session</span>
              <span className="sm:hidden">Book</span>
              <Camera className="w-3.5 h-3.5 text-amber-400" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 hover:text-black transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white/98 backdrop-blur-xl border-b border-slate-200 p-6 lg:hidden shadow-xl"
          >
            {/* Mobile Drawer Logo */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
              <img
                src="https://i.postimg.cc/FHbyBsDQ/logo-black-(1).png"
                alt="Professional Photography and Cinematography Studio Logo"
                className="h-12 sm:h-14 w-auto max-w-[230px] object-contain transform-gpu backface-hidden"
              />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Chakan, Pune
              </span>
            </div>

            <div className="flex flex-col gap-3 font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wider text-slate-800 uppercase">
              <button
                onClick={() => handleLinkClick('manifesto', '/')}
                className="text-left py-2 border-b border-slate-100 hover:text-amber-700 transition-colors cursor-pointer"
              >
                Manifesto
              </button>
              <button
                onClick={() => handleLinkClick('architect', '/')}
                className="text-left py-2 border-b border-slate-100 hover:text-amber-700 transition-colors cursor-pointer"
              >
                The Architect
              </button>
              <button
                onClick={() => handleLinkClick('stories', '/')}
                className="text-left py-2 border-b border-slate-100 hover:text-amber-700 transition-colors cursor-pointer"
              >
                Stories
              </button>
              <button
                onClick={() => handleLinkClick('reviews', '/')}
                className="text-left py-2 border-b border-slate-100 hover:text-amber-700 transition-colors cursor-pointer"
              >
                Reviews
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('/blog');
                }}
                className="text-left py-2 border-b border-slate-100 text-amber-800 font-bold transition-colors cursor-pointer"
              >
                Journal / Blog
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="mt-2 w-full py-3 rounded-xl bg-slate-950 text-white text-center font-bold uppercase text-xs tracking-wider"
              >
                Reserve Session Date
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
