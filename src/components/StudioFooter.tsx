import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Instagram, Globe, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_HUBS } from '../data/shreyStudioData';
import { AnimatedHeadline } from './AnimatedHeadline';
import { SERVICES_DATA, LOCATIONS_DATA } from '../data/seoData';

interface StudioFooterProps {
  onScrollToTop: () => void;
  onBookClick: () => void;
  onAdminClick?: () => void;
  onNavigate?: (path: string) => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({
  onScrollToTop,
  onBookClick,
  onAdminClick,
  onNavigate,
}) => {
  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#0c0b0a] text-[#f4efe8] pt-20 pb-14 overflow-hidden border-t border-[#26221d]">
      {/* Warm Ambient Heritage Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-radial from-amber-800/10 via-amber-950/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Top Call to Action Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 border border-[#3b3429] bg-gradient-to-br from-[#1c1914] via-[#16130f] to-[#12100d] shadow-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          <div className="max-w-xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center md:justify-start gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
                Now Reserving Commissions for 2025 – 2026
              </span>
            </motion.div>

            <div className="mb-3">
              <AnimatedHeadline
                as="h3"
                theme="dark"
                align="left"
                className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#fcf9f2] leading-tight"
                words={[
                  { text: 'Ready' },
                  { text: 'to' },
                  { text: 'create' },
                  { text: 'your' },
                  { text: 'visual', subHint: 'Slow Artistry' },
                  { text: 'heirloom?', isItalic: true, hasUnderline: true, isAccent: true, subHint: 'Archival & Soulful' },
                ]}
              />
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#b8b0a4] font-normal leading-relaxed">
              Based in Chakan, Pune, we document weddings, pre-weddings, portraits, commercial projects, and destination shoots across Maharashtra, India, Vietnam, Singapore, and Malaysia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider hover:brightness-110 transition-all shadow-[0_4px_25px_rgba(217,119,6,0.3)] cursor-pointer"
            >
              PLAN YOUR SHOOT
            </button>
            <a
              href="https://wa.me/917517443240?text=Hello%20Shrey%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20photography%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#24201a] text-[#f4efe8] hover:bg-[#2d2821] font-['Plus_Jakarta_Sans'] text-xs font-semibold tracking-wide transition-colors border border-[#3b3429] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Main Footer Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#231f1a]">
          {/* Col 1: Brand & Logo (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block p-2.5 bg-white rounded-2xl shadow-lg">
              <img
                src="https://i.postimg.cc/FHbyBsDQ/logo-black-(1).png"
                alt="Professional Photography and Cinematography Studio Logo"
                className="h-9 w-auto object-contain select-none"
              />
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#aba396] leading-relaxed max-w-sm">
              Professional photography and cinematography studio based in Chakan, Pune. Creating cinematic, emotional, and authentic visual stories that preserve real memories, brands, and generational legacies.
            </p>
            <div className="space-y-1 text-xs font-['Plus_Jakarta_Sans'] text-[#aba396] pt-1">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-semibold">Founder & Chief Photographer:</span>
                <span className="text-[#fcf9f2]">Shreyash Gore</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-semibold">Studio Location:</span>
                <span className="text-[#fcf9f2]">Chakan, Pune, Maharashtra 410501</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Links (3 Cols) */}
          <div className="lg:col-span-3">
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.2em] text-amber-400 uppercase block mb-3.5">
              Photography Services
            </span>
            <div className="space-y-2 text-xs font-['Plus_Jakarta_Sans'] text-[#aba396]">
              {SERVICES_DATA.slice(0, 7).map((s) => (
                <button
                  key={s.slug}
                  onClick={() => handleNav(`/${s.slug}`)}
                  className="block hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  {s.name}
                </button>
              ))}
              <button
                onClick={() => handleNav('/destination-photography')}
                className="block hover:text-amber-300 transition-colors text-left cursor-pointer text-amber-400/90 font-semibold"
              >
                Destination Photography (Vietnam, Singapore, Malaysia)
              </button>
            </div>
          </div>

          {/* Col 3: Location Hubs (3 Cols) */}
          <div className="lg:col-span-3">
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.2em] text-amber-400 uppercase block mb-3.5">
              Service Locations
            </span>
            <div className="space-y-2 text-xs font-['Plus_Jakarta_Sans'] text-[#aba396]">
              {LOCATIONS_DATA.map((l) => (
                <button
                  key={l.slug}
                  onClick={() => handleNav(`/${l.slug}`)}
                  className="block hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Photographer in {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Direct Inquiries (2 Cols) */}
          <div className="lg:col-span-2">
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.2em] text-amber-400 uppercase block mb-3.5">
              Contact & Journal
            </span>
            <div className="space-y-3 font-['Plus_Jakarta_Sans'] text-xs text-[#aba396]">
              <a href="mailto:studio@shreystudio.com" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">studio@shreystudio.com</span>
              </a>
              <a href="tel:+917517443240" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+91 75174 43240</span>
              </a>
              <button
                onClick={() => handleNav('/blog')}
                className="block hover:text-amber-300 transition-colors text-left text-amber-400 font-semibold cursor-pointer pt-1"
              >
                Photography Journal / Blog →
              </button>

              <div className="pt-2 flex items-center gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#1c1914] border border-[#3b3429] flex items-center justify-center text-amber-400 hover:text-white hover:bg-amber-600 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://shreystudio.com"
                  className="w-7 h-7 rounded-full bg-[#1c1914] border border-[#3b3429] flex items-center justify-center text-amber-400 hover:text-white hover:bg-amber-600 transition-all"
                  aria-label="Official Website"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f8678] font-['Plus_Jakarta_Sans']">
          <p>© {new Date().getFullYear()} Shrey Studio. All rights reserved. Directed by Shreyash Gore.</p>

          <div className="flex items-center gap-6">
            {onAdminClick && (
              <button
                type="button"
                onClick={onAdminClick}
                className="text-[#8f8678] hover:text-amber-400 text-xs transition-colors cursor-pointer"
                title="Studio Portal"
              >
                <span>Studio Portal</span>
              </button>
            )}
            <span className="hidden sm:inline text-[#635b51]">Chakan · Pune · PCMC · International</span>
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1914] hover:bg-[#28231c] text-[#d6cec3] hover:text-white border border-[#3b3429] transition-all cursor-pointer text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
