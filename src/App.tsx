import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhotoItem, StoryItem } from './types';
import { StudioDataProvider, useStudioData } from './context/StudioDataContext';
import { AmbientBackground } from './components/AmbientBackground';
import { CylinderCarousel } from './components/CylinderCarousel';
import { PhotographerSubject } from './components/PhotographerSubject';
import { FloatingLogo } from './components/FloatingLogo';
import { HeroControls } from './components/HeroControls';
import { StudioNavbar } from './components/StudioNavbar';
import { StudioManifestoSection } from './components/StudioManifestoSection';
import { ArchitectFounderSection } from './components/ArchitectFounderSection';
import { StoriesSection } from './components/StoriesSection';
import { StoryDetailPage } from './components/StoryDetailPage';
import { CoupleReviewsSection } from './components/CoupleReviewsSection';
import { StudioFooter } from './components/StudioFooter';
import { BookSessionModal } from './components/BookSessionModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { LocationDetailPage } from './components/LocationDetailPage';
import { BlogListPage } from './components/BlogListPage';
import { BlogPostPage } from './components/BlogPostPage';
import { NotFoundPage } from './components/NotFoundPage';
import { SEOHead } from './components/SEOHead';
import { SERVICES_DATA, LOCATIONS_DATA, BLOG_POSTS, HOMEPAGE_FAQS } from './data/seoData';

gsap.registerPlugin(ScrollTrigger);

function PortfolioContent() {
  const { heroPhotos, stories } = useStudioData();
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [photographerEntered, setPhotographerEntered] = useState(false);
  const [carouselEntered, setCarouselEntered] = useState(false);
  const [hoveredPhoto, setHoveredPhoto] = useState<PhotoItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Sync route on popstate (browser back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check URL hash for direct #admin link on load or change
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      } else if (window.location.hash && window.location.hash.startsWith('#story-')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Universal Navigation Handler
  const handleNavigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    window.location.hash = '#admin';
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSelectStory = (story: StoryItem) => {
    setSelectedStory(story);
  };

  const handleBackFromStory = () => {
    setSelectedStory(null);
    if (window.location.hash && window.location.hash.startsWith('#story-')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setTimeout(() => {
      const el = document.getElementById('stories');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  // Initialize Lenis Smooth Scroll and GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // GSAP ScrollTrigger tracking hero scroll progress for 3D rotation
    let trigger: ScrollTrigger | null = null;
    if (heroRef.current) {
      trigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (trigger) trigger.kill();
    };
  }, [currentPath]);

  // Pause Lenis and lock background body scroll when Admin Panel is open
  useEffect(() => {
    if (isAdminOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAdminOpen]);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Normalize path
  const normalizedPath =
    currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

  const isHome = normalizedPath === '' || normalizedPath === '/';
  const isBlogList = normalizedPath === '/blog';
  const isBlogPost = normalizedPath.startsWith('/blog/') && normalizedPath.length > 6;
  const blogSlug = isBlogPost ? normalizedPath.replace('/blog/', '') : null;
  const currentBlogPost = blogSlug ? BLOG_POSTS.find((p) => p.slug === blogSlug) : null;

  const routeSlug =
    !isHome && !isBlogList && !isBlogPost && normalizedPath.startsWith('/')
      ? normalizedPath.slice(1)
      : null;

  const currentService = routeSlug ? SERVICES_DATA.find((s) => s.slug === routeSlug) : null;
  const currentLocation = routeSlug ? LOCATIONS_DATA.find((l) => l.slug === routeSlug) : null;

  // Format FAQs for Homepage Schema
  const homepageFaqsForSchema = HOMEPAGE_FAQS.map((f) => ({
    q: f.question,
    a: f.answer,
  }));

  return (
    <div className="relative w-full min-h-screen bg-white text-slate-900 selection:bg-black selection:text-white overflow-x-clip">
      {/* 1. ROUTE: HOMEPAGE */}
      {isHome && (
        <>
          {/* Universal Homepage Schema & SEO Head */}
          <SEOHead
            title="Professional Photographer & Cinematographer in Chakan, Pune | Shrey Studio"
            description="Shrey Studio offers cinematic wedding photography, pre-wedding shoots, maternity, baby, fashion & commercial cinematography in Chakan, Pune & PCMC. Directed by Shreyash Gore."
            canonicalPath="/"
            ogType="website"
            faqs={homepageFaqsForSchema}
          />

          {/* Universal Fixed Top Navigation Header Bar */}
          <StudioNavbar
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
            currentPath={normalizedPath}
          />

          {/* 100vh Fullscreen Hero Section - 3D Cylinder Carousel & Rising Photographer */}
          <section
            ref={heroRef}
            className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center select-none z-0"
          >
            {/* Museum Ambient Background */}
            <AmbientBackground />

            {/* 3D Cylindrical Photo Belt (Three.js) with dynamic heroPhotos from Admin */}
            <CylinderCarousel
              photos={heroPhotos}
              scrollProgress={scrollProgress}
              triggerEntry={photographerEntered}
              onEntryComplete={() => setCarouselEntered(true)}
              onHoverPhoto={setHoveredPhoto}
              onSelectPhoto={setSelectedPhoto}
            />

            {/* Main Lead Photographer Cutout Image that rises up into the hero */}
            <PhotographerSubject
              scrollProgress={scrollProgress}
              onEntryComplete={() => setPhotographerEntered(true)}
            />

            {/* Center Floating Logo Emblem */}
            <FloatingLogo triggerEntry={carouselEntered} />

            {/* Hero Controls (Explore Heirlooms button, photo hover card, lightbox) */}
            <HeroControls
              hoveredPhoto={hoveredPhoto}
              selectedPhoto={selectedPhoto}
              onCloseSelected={() => setSelectedPhoto(null)}
              onExploreClick={handleScrollToExplore}
            />
          </section>

          {/* Editorial Content Stack */}
          <main className="relative z-10 w-full bg-white rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(0,0,0,0.08)] border-t border-slate-100">
            {/* 1. Studio Manifesto & Exact Key Stats */}
            <StudioManifestoSection onBookClick={handleOpenBooking} />

            {/* 2. Featured Wedding Stories (5 Stacking Cards) */}
            <StoriesSection
              stories={stories}
              onBookClick={handleOpenBooking}
              onSelectStory={handleSelectStory}
            />

            {/* 3. The Architect of Moments (Shreyash Gore, Founder Quote & 3 Pillars) */}
            <ArchitectFounderSection />

            {/* 4. Couple Reviews & Testimonials */}
            <CoupleReviewsSection />

            {/* 5. Studio Footer */}
            <StudioFooter
              onScrollToTop={handleScrollToTop}
              onBookClick={handleOpenBooking}
              onAdminClick={handleOpenAdmin}
              onNavigate={handleNavigate}
            />
          </main>
        </>
      )}

      {/* 2. ROUTE: SERVICE DETAIL PAGE */}
      {currentService && (
        <>
          <StudioNavbar
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
            currentPath={normalizedPath}
          />
          <ServiceDetailPage
            service={currentService}
            onBack={() => handleNavigate('/')}
            onBookClick={handleOpenBooking}
            onNavigateService={(slug) => handleNavigate(`/${slug}`)}
          />
          <StudioFooter
            onScrollToTop={handleScrollToTop}
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* 3. ROUTE: LOCATION DETAIL PAGE */}
      {currentLocation && (
        <>
          <StudioNavbar
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
            currentPath={normalizedPath}
          />
          <LocationDetailPage
            location={currentLocation}
            onBack={() => handleNavigate('/')}
            onBookClick={handleOpenBooking}
            onNavigateLocation={(slug) => handleNavigate(`/${slug}`)}
            onNavigateService={(slug) => handleNavigate(`/${slug}`)}
          />
          <StudioFooter
            onScrollToTop={handleScrollToTop}
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* 4. ROUTE: BLOG ARCHIVE LIST PAGE */}
      {isBlogList && (
        <>
          <StudioNavbar
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
            currentPath={normalizedPath}
          />
          <BlogListPage
            onBack={() => handleNavigate('/')}
            onSelectPost={(postSlug) => handleNavigate(`/blog/${postSlug}`)}
          />
          <StudioFooter
            onScrollToTop={handleScrollToTop}
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* 5. ROUTE: BLOG SINGLE POST PAGE */}
      {isBlogPost && currentBlogPost && (
        <>
          <StudioNavbar
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
            currentPath={normalizedPath}
          />
          <BlogPostPage
            post={currentBlogPost}
            onBackToBlog={() => handleNavigate('/blog')}
            onNavigateHome={() => handleNavigate('/')}
            onNavigateService={(slug) => handleNavigate(`/${slug}`)}
            onBookClick={handleOpenBooking}
          />
          <StudioFooter
            onScrollToTop={handleScrollToTop}
            onBookClick={handleOpenBooking}
            onAdminClick={handleOpenAdmin}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* 6. ROUTE: 404 NOT FOUND */}
      {!isHome &&
        !isBlogList &&
        !(isBlogPost && currentBlogPost) &&
        !currentService &&
        !currentLocation && (
          <>
            <StudioNavbar
              onBookClick={handleOpenBooking}
              onAdminClick={handleOpenAdmin}
              onNavigate={handleNavigate}
              currentPath={normalizedPath}
            />
            <NotFoundPage
              onNavigateHome={() => handleNavigate('/')}
              onNavigateService={(slug) => handleNavigate(`/${slug}`)}
            />
            <StudioFooter
              onScrollToTop={handleScrollToTop}
              onBookClick={handleOpenBooking}
              onAdminClick={handleOpenAdmin}
              onNavigate={handleNavigate}
            />
          </>
        )}

      {/* Full-Screen Story Detail Page Overlay */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#faf8f5]"
          >
            <StoryDetailPage
              story={selectedStory}
              onBack={handleBackFromStory}
              onBookClick={handleOpenBooking}
              onSelectStory={handleSelectStory}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Booking Session Modal */}
      <BookSessionModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Full-Screen Luxury Admin Panel Modal */}
      {isAdminOpen && <AdminPanel onClose={handleCloseAdmin} />}
    </div>
  );
}

export default function App() {
  return (
    <StudioDataProvider>
      <PortfolioContent />
    </StudioDataProvider>
  );
}
