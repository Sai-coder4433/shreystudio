import React from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { ServiceItemData, SERVICES_DATA } from '../data/seoData';
import { SEOHead } from './SEOHead';

interface ServiceDetailPageProps {
  service: ServiceItemData;
  onBack: () => void;
  onBookClick: () => void;
  onNavigateService: (slug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onBookClick,
  onNavigateService,
}) => {
  const relatedServices = SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-['Plus_Jakarta_Sans'] pb-20 selection:bg-black selection:text-white">
      {/* Dynamic SEO Meta & Structured Data */}
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={`/${service.slug}`}
        ogImage={service.heroImage}
        ogImageAlt={service.heroImageAlt}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/#services' },
          { name: service.name, path: `/${service.slug}` },
        ]}
        faqs={service.faqs}
        serviceSchema={{
          name: service.name,
          description: service.metaDescription,
          category: service.category,
        }}
      />

      {/* Top Navigation Bar */}
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="px-4 py-2 rounded-full bg-stone-950 text-white text-xs font-bold tracking-wider hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              {service.ctaText}
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button onClick={onBack} className="hover:text-stone-900 cursor-pointer">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-400">Services</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold">{service.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white min-h-[380px] sm:min-h-[460px] flex items-end p-6 sm:p-12 border border-stone-800 shadow-2xl">
          {/* Background Hero Image */}
          <img
            src={service.heroImage}
            alt={service.heroImageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-45"
            loading="eager"
          />
          {/* Dark luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.category} Curation</span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-3">
              {service.h1}
            </h1>

            <p className="text-sm sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl mb-6">
              {service.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onBookClick}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {service.ctaText}
              </button>
              <a
                href="https://wa.me/917517443240?text=Hello%20Shrey%20Studio%2C%20I%20am%20enquiring%20about%20your%20photography%20services."
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

      {/* Main Content & Architecture */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Narrative & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Narrative Overview */}
          <article className="bg-white rounded-2xl p-6 sm:p-9 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-stone-950">
              Our Vision & Method
            </h2>
            {service.overview.map((paragraph, idx) => (
              <p key={idx} className="text-stone-600 leading-relaxed text-sm sm:text-base">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Pillars of Craft */}
          <div className="space-y-4">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-950">
              Pillars of Our {service.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.features.map((feat) => (
                <div key={feat.title} className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mb-2" />
                  <h4 className="font-['Cormorant_Garamond'] text-lg font-bold text-stone-900 mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-950 mb-4">
              What Is Included in Your Commission
            </h3>
            <div className="space-y-3">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Specific FAQ */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-950 mb-2">
              Frequently Asked Questions About {service.name}
            </h3>
            <div className="space-y-3">
              {service.faqs.map((f, idx) => (
                <div key={idx} className="border-b border-stone-100 pb-3.5 last:border-b-0">
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

        {/* Right Sidebar: Booking Widget & Related Services (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Reservation Card */}
          <div className="bg-stone-950 text-white rounded-2xl p-6 border border-stone-800 shadow-xl space-y-4 sticky top-24">
            <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase block">
              Direct Inquiries
            </span>
            <h4 className="font-['Cormorant_Garamond'] text-2xl font-light text-white">
              Reserve Your {service.name} Session
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              We accept a limited number of commissions per season to ensure uncompromising quality.
            </p>

            <button
              type="button"
              onClick={onBookClick}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {service.ctaText}
            </button>

            <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Serving Chakan, Pune & Worldwide</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Direct phone: +91 75174 43240
              </p>
            </div>

            {/* Related Services Links */}
            <div className="pt-4 border-t border-stone-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-2">
                Related Services
              </span>
              <div className="space-y-1.5">
                {relatedServices.map((rel) => (
                  <button
                    key={rel.slug}
                    type="button"
                    onClick={() => onNavigateService(rel.slug)}
                    className="w-full text-left py-1 text-xs text-stone-300 hover:text-amber-400 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{rel.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
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
