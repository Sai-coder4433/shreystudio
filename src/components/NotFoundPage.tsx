import React from 'react';
import { Camera, Home, ArrowLeft } from 'lucide-react';
import { SEOHead } from './SEOHead';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome, onNavigateService }) => {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-['Plus_Jakarta_Sans'] flex flex-col items-center justify-center p-6 text-center">
      <SEOHead
        title="404 — Page Not Found | Shrey Studio"
        description="The requested page could not be found. Explore luxury wedding photography and cinematic films by Shrey Studio in Chakan, Pune."
        canonicalPath="/404"
      />

      <div className="w-16 h-16 rounded-3xl bg-stone-950 flex items-center justify-center text-amber-400 mb-6 shadow-xl p-3">
        <img
          src="https://i.postimg.cc/FHbyBsDQ/logo-black-(1).png"
          alt="Professional Photography and Cinematography Studio Logo"
          className="w-full h-full object-contain filter invert brightness-200"
        />
      </div>

      <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 mb-2">
        Error 404
      </span>

      <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-light text-slate-950 mb-4">
        Page Not Found
      </h1>

      <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
        The page you are looking for may have been moved or archived. Explore our portfolio, services, or return to the main studio.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="px-6 py-3 rounded-full bg-stone-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateService('wedding-photography')}
          className="px-5 py-3 rounded-full bg-white text-stone-800 border border-stone-200 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
        >
          Wedding Photography
        </button>
      </div>
    </div>
  );
};
