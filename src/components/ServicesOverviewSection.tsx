import React from 'react';
import { ArrowUpRight, Camera, Film, Users, Sparkles, Building2, Package, Globe } from 'lucide-react';
import { SERVICES_DATA, ServiceItemData } from '../data/seoData';

interface ServicesOverviewSectionProps {
  onNavigate: (path: string) => void;
}

export const ServicesOverviewSection: React.FC<ServicesOverviewSectionProps> = ({ onNavigate }) => {
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'wedding-photography':
      case 'portrait-photography':
        return Camera;
      case 'wedding-cinematography':
      case 'cinematic-films':
      case 'event-cinematography':
        return Film;
      case 'event-photography':
      case 'pre-wedding-photography':
        return Users;
      case 'fashion-photography':
        return Sparkles;
      case 'commercial-photography':
      case 'corporate-photography':
        return Building2;
      case 'product-photography':
        return Package;
      case 'destination-photography':
        return Globe;
      default:
        return Camera;
    }
  };

  return (
    <section id="services" className="relative w-full bg-slate-50/70 text-slate-900 py-16 sm:py-24 border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.22em] text-amber-800 uppercase">
              Comprehensive Studio Portfolio
            </span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight mb-3">
            Photography & Cinematography Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed">
            Serving Chakan, Pune, PCMC, and international destination locations with slow, purposeful visual curation.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES_DATA.map((service: ServiceItemData) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <div
                key={service.slug}
                onClick={() => onNavigate(`/${service.slug}`)}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-amber-400/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-slate-900 group-hover:text-amber-900 transition-colors mb-2">
                    {service.name}
                  </h3>

                  <p className="text-xs text-slate-500 font-['Plus_Jakarta_Sans'] leading-relaxed mb-5 line-clamp-2">
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                  <span>Explore Service</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-slate-600 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
