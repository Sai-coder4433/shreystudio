import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Send, CheckCircle2, MapPin, Mail, Phone, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';

interface FooterSectionProps {
  onScrollToTop?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onScrollToTop }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-white text-slate-900 pt-24 pb-12 px-6 md:px-12 lg:px-20 border-t border-slate-200 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Call to Action Statement Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-slate-900 text-white border border-black mb-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-2xl">
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mb-3 block">
              Start The Next Viral Moment
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-4">
              Ready to make <br />
              <span className="font-['Cormorant_Garamond'] italic font-normal text-slate-300 text-4xl sm:text-6xl">
                billions watch?
              </span>
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-slate-300 font-normal max-w-lg leading-relaxed">
              Partner with Opraah. From proprietary IP development to high-velocity commercial production and exclusive talent management.
            </p>
          </div>

          {/* Quick Connect Form */}
          <div className="w-full lg:max-w-md">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3 text-white"
              >
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-400" />
                <div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-white">Inquiry Received!</h4>
                  <p className="text-xs text-slate-300">Our creative directors will reach out within 24 hours.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your brand work email..."
                  required
                  className="flex-grow px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm font-['Plus_Jakarta_Sans'] focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-white text-black font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-tight hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Let's Talk</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-6 mt-5 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Response within 24 hours
              </span>
              <span>•</span>
              <span>Direct NDAs Available</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-200">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={onScrollToTop}>
              <img
                src="https://i.postimg.cc/YqPgV4jZ/logo-black-(1).png"
                alt="Opraah Logo"
                className="h-8 w-auto object-contain select-none"
              />
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-slate-600 font-normal max-w-sm leading-relaxed mb-6">
              India’s pioneer creator-first production and talent agency. Powering 300M+ audience reach across Gaming, Glam, Entertainment, and Athletics.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 hover:bg-black hover:text-white flex items-center justify-center text-slate-700 transition-all duration-200 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 hover:bg-black hover:text-white flex items-center justify-center text-slate-700 transition-all duration-200 cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 hover:bg-black hover:text-white flex items-center justify-center text-slate-700 transition-all duration-200 cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 hover:bg-black hover:text-white flex items-center justify-center text-slate-700 transition-all duration-200 cursor-pointer"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-black mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 font-normal">
              <li>
                <button onClick={() => scrollToSection('works')} className="hover:text-black transition-colors cursor-pointer">
                  Work / Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('what-we-do')} className="hover:text-black transition-colors cursor-pointer">
                  What We Do
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('best-things')} className="hover:text-black transition-colors cursor-pointer">
                  Original IP's
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="hover:text-black transition-colors cursor-pointer">
                  Creators
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('careers')} className="hover:text-black transition-colors cursor-pointer">
                  Careers & Hiring
                </button>
              </li>
            </ul>
          </div>

          {/* Verticals */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-black mb-4">
              OP Verticals
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 font-normal">
              <li className="hover:text-black transition-colors">OP Gaming</li>
              <li className="hover:text-black transition-colors">OP Glam & Fashion</li>
              <li className="hover:text-black transition-colors">OP Entertainment</li>
              <li className="hover:text-black transition-colors">OP CAP (Accelerator)</li>
              <li className="hover:text-black transition-colors">OP Fitness & Wellness</li>
            </ul>
          </div>

          {/* Locations & Direct Contacts */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-[0.2em] text-black mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm text-slate-600 font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <span>Noida HQ: Ace Group, Sec 126</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <span>Mumbai: Andheri West Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-black flex-shrink-0" />
                <a href="mailto:business@opraah.com" className="hover:text-black transition-colors font-medium">
                  business@opraah.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-black flex-shrink-0" />
                <a href="mailto:hiring@opraah.com" className="hover:text-black transition-colors font-medium">
                  hiring@opraah.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <div>
            © {new Date().getFullYear()} Opraah Media Group. All rights reserved. Built by creators, for creators.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-black cursor-pointer transition-colors">Terms of Representation</span>
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 text-slate-700 hover:text-black transition-colors cursor-pointer pl-2 border-l border-slate-300"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
