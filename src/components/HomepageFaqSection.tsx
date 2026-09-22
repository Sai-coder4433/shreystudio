import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HOMEPAGE_FAQS } from '../data/seoData';

interface HomepageFaqSectionProps {
  onBookClick: () => void;
}

export const HomepageFaqSection: React.FC<HomepageFaqSectionProps> = ({ onBookClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-100 overflow-hidden">
      {/* Subtle ambient circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-amber-50/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.22em] text-amber-800 uppercase">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight mb-3">
            Everything You Need to Know
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-['Plus_Jakarta_Sans'] leading-relaxed">
            Transparent answers regarding our photography services in Chakan, Pune, and destination shoots worldwide.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {HOMEPAGE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-400/80 bg-amber-50/20 shadow-sm'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="font-['Cormorant_Garamond'] text-lg sm:text-xl font-medium text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-amber-500 text-slate-950 rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed border-t border-amber-200/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Card */}
        <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 text-amber-800">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-['Cormorant_Garamond'] text-xl font-bold text-slate-900">
                Have a Specific Shoot Question?
              </h4>
              <p className="text-xs text-slate-500 font-['Plus_Jakarta_Sans'] mt-0.5">
                Our creative directors are available to discuss dates, venues, and custom folios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBookClick}
              className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold font-['Plus_Jakarta_Sans'] transition-colors cursor-pointer"
            >
              Plan Your Shoot
            </button>
            <a
              href="https://wa.me/917517443240?text=Hello%20Shrey%20Studio%2C%20I%20have%20a%20question%20about%20your%20photography%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
