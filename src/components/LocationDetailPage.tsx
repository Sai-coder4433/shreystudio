import React from 'react';
import { ArrowLeft, MapPin, ChevronRight, MessageCircle, CheckCircle2, Building, Sparkles } from 'lucide-react';
import { LocationItemData, LOCATIONS_DATA, SERVICES_DATA } from '../data/seoData';
import { SEOHead } from './SEOHead';

interface LocationDetailPageProps {
  location: LocationItemData;
  onBack: () => void;
  onBookClick: () => void;
  onNavigateLocation: (slug: string) => void;
  onNavigateService: (slug: string) => void;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({
  location,
  onBack,
  onBookClick,
  onNavigateLocation,
  onNavigateService,
}) => {
  const otherLocations = LOCATIONS_DATA.filter((l) => l.slug !== location.slug);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-['Plus_Jakarta_Sans'] pb-20 selection:bg-black selection:text-white">
      {/* Dynamic SEO Meta & Structured Data */}
      <SEOHead
        title={location.metaTitle}
        description={location.metaDescription}
        canonicalPath={`/${location.slug}`}
        ogImage={location.heroImage}
        ogImageAlt={location.heroImageAlt}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/#locations' },
          { name: `Photographer in ${location.name}`, path: `/${location.slug}` },
        ]}
        faqs={location.faqs}
      />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-5 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Back to Studio</span>
          </button>

          <button
            type="button"
            onClick={onBookClick}
            className="px-4 py-2 rounded-full bg-stone-950 text-white text-xs font-bold tracking-wider hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
          >
            Book in {location.name}
          </button>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button onClick={onBack} className="hover:text-stone-900 cursor-pointer">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-400">Locations</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold">{location.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white min-h-[380px] sm:min-h-[440px] flex items-end p-6 sm:p-12 border border-stone-800 shadow-2xl">
          <img
            src={location.heroImage}
            alt={location.heroImageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-45"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-wider uppercase mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location.district}</span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-3">
              {location.h1}
            </h1>

            <p className="text-sm sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl mb-6">
              {location.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onBookClick}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Book a Session in {location.name}
              </button>
              <a
                href="https://wa.me/917517443240?text=Hello%20Shrey%20Studio%2C%20I%20am%20enquiring%20about%20photography%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Content Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Summary Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-stone-950 mb-3">
              About Our Work in {location.name}
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              {location.summary}
            </p>
          </div>

          {/* Coverage Badges */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-stone-950 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Coverage Areas in and around {location.name}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {location.coverageAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Venues & Landmarks */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-stone-950 mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-600" />
              <span>Key Venues & Highlight Spots</span>
            </h3>
            <div className="space-y-2">
              {location.venuesAndHighlights.map((v) => (
                <div key={v} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative Content Sections */}
          {location.sections.map((sec) => (
            <article key={sec.heading} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-3">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-950">
                {sec.heading}
              </h3>
              {sec.body.map((p, idx) => (
                <p key={idx} className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {p}
                </p>
              ))}
            </article>
          ))}

          {/* Location FAQs */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-950 mb-2">
              Frequently Asked Questions for {location.name}
            </h3>
            <div className="space-y-3">
              {location.faqs.map((f, idx) => (
                <div key={idx} className="border-b border-stone-100 pb-3 last:border-b-0">
                  <h4 className="font-['Cormorant_Garamond'] text-lg font-semibold text-stone-900 mb-1">
                    {f.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Reservation Card */}
          <div className="bg-stone-950 text-white rounded-2xl p-6 border border-stone-800 shadow-xl space-y-4 sticky top-24">
            <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase block">
              Local Studio Consultation
            </span>
            <h4 className="font-['Cormorant_Garamond'] text-2xl font-light text-white">
              Connect With Us in {location.name}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              We arrange in-person studio consultations to review heirloom albums, camera directives, and ceremony timelines.
            </p>

            <button
              type="button"
              onClick={onBookClick}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Plan Your Shoot
            </button>

            {/* Services Available */}
            <div className="pt-4 border-t border-stone-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-2">
                Services in {location.name}
              </span>
              <div className="space-y-1.5">
                {SERVICES_DATA.slice(0, 5).map((srv) => (
                  <button
                    key={srv.slug}
                    type="button"
                    onClick={() => onNavigateService(srv.slug)}
                    className="w-full text-left py-1 text-xs text-stone-300 hover:text-amber-400 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{srv.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Other Location Links */}
            <div className="pt-4 border-t border-stone-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-2">
                Other Locations Served
              </span>
              <div className="space-y-1.5">
                {otherLocations.map((other) => (
                  <button
                    key={other.slug}
                    type="button"
                    onClick={() => onNavigateLocation(other.slug)}
                    className="w-full text-left py-1 text-xs text-stone-400 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{other.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
