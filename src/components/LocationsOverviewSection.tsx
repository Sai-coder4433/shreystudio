import React from 'react';
import { MapPin, ArrowUpRight, Compass, Plane } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/seoData';

interface LocationsOverviewSectionProps {
  onNavigate: (path: string) => void;
}

export const LocationsOverviewSection: React.FC<LocationsOverviewSectionProps> = ({ onNavigate }) => {
  const secondaryAreas = [
    'Alandi',
    'Talegaon',
    'Bhosari',
    'Akurdi',
    'Nigdi',
    'Mahalunge',
    'Chikhali',
    'Dudulgaon',
    'Wakad',
    'Lonavala',
  ];

  return (
    <section id="locations" className="relative w-full bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.22em] text-amber-800 uppercase">
              Service Areas & Destinations
            </span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight mb-3">
            Where We Photograph & Film
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed">
            Headquartered in Chakan, Pune, covering Maharashtra and international destination locations.
          </p>
        </div>

        {/* 5 Primary Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-10">
          {LOCATIONS_DATA.map((loc) => {
            const isPrimary = loc.slug === 'photographer-in-chakan';
            return (
              <div
                key={loc.slug}
                onClick={() => onNavigate(`/${loc.slug}`)}
                className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isPrimary
                    ? 'border-amber-400 bg-amber-50/30 shadow-md ring-1 ring-amber-400/30'
                    : 'border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-amber-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isPrimary
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-white border border-slate-200 text-amber-700'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    {isPrimary && (
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 tracking-wider">
                        Headquarters
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-slate-900 group-hover:text-amber-900 transition-colors mb-1">
                    {loc.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-['Plus_Jakarta_Sans'] leading-snug line-clamp-2">
                    {loc.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-700 group-hover:text-amber-800 transition-colors">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Locations & Destination Banner */}
        <div className="rounded-2xl bg-[#0c0b0a] text-[#f4efe8] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Plane className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-amber-400 uppercase font-['Plus_Jakarta_Sans']">
                Destination & Worldwide Shoots
              </span>
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-2xl font-light text-white">
              Photography across Pune, Maharashtra & Destinations Including Vietnam, Singapore and Malaysia
            </h4>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-[#a39b8e]">
              <span className="text-stone-300 font-medium">Also serving nearby locations:</span>
              {secondaryAreas.map((area, idx) => (
                <span key={area} className="inline-flex items-center gap-1.5">
                  <span className="text-[#f4efe8]">{area}</span>
                  {idx < secondaryAreas.length - 1 && <span className="text-[#4a433a]">•</span>}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/destination-photography')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider hover:brightness-110 transition-all shrink-0 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Explore Destination Folios
          </button>
        </div>
      </div>
    </section>
  );
};
