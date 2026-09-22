import React from 'react';
import { ArrowLeft, Clock, Calendar, ChevronRight, Share2, CheckCircle2, ArrowRight } from 'lucide-react';
import { BlogPostData, SERVICES_DATA } from '../data/seoData';
import { SEOHead } from './SEOHead';

interface BlogPostPageProps {
  post: BlogPostData;
  onBackToBlog: () => void;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
  onBookClick: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onBackToBlog,
  onNavigateHome,
  onNavigateService,
  onBookClick,
}) => {
  const relatedService = SERVICES_DATA.find((s) => s.slug === post.relatedServiceSlug);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-['Plus_Jakarta_Sans'] pb-24 selection:bg-black selection:text-white">
      {/* Dynamic SEO Head with Article Schema */}
      <SEOHead
        title={`${post.metaTitle} | Shrey Studio`}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.heroImage}
        ogImageAlt={post.heroImageAlt}
        articleMeta={{
          publishDate: '2025-06-01',
          author: 'Shreyash Gore',
          category: post.category,
        }}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        faqs={post.faqs}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-5 sm:px-8 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToBlog}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>All Articles</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
            aria-label="Share article"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button onClick={onNavigateHome} className="hover:text-stone-900 cursor-pointer">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <button onClick={onBackToBlog} className="hover:text-stone-900 cursor-pointer">Blog</button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold truncate max-w-xs">{post.title}</span>
        </nav>
      </div>

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pt-6">
        <article className="space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {post.date}
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 font-light leading-relaxed">
              {post.summary}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-2 pb-4 border-b border-stone-200">
              <div className="w-10 h-10 rounded-full bg-stone-950 text-amber-400 font-serif font-bold text-sm flex items-center justify-center">
                SG
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Shreyash Gore</p>
                <p className="text-[11px] text-slate-500">Founder & Chief Photographer at Shrey Studio, Chakan</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-lg border border-stone-200">
            <img
              src={post.heroImage}
              alt={post.heroImageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Body Sections */}
          <div className="prose prose-stone max-w-none space-y-8 pt-4">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-slate-800">
                    {section.subheading}
                  </h3>
                )}
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {p}
                  </p>
                ))}

                {section.tips && section.tips.length > 0 && (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 sm:p-6 space-y-2 mt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                      Expert Advice from Shrey Studio
                    </span>
                    {section.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Article Specific FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4 mt-10">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-950 mb-2">
                Questions Answered in This Guide
              </h3>
              <div className="space-y-4">
                {post.faqs.map((f, fIdx) => (
                  <div key={fIdx} className="border-b border-stone-100 pb-3 last:border-b-0">
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
          )}

          {/* Relevant Service Internal CTA Box */}
          {relatedService && (
            <div className="rounded-3xl bg-stone-950 text-white p-6 sm:p-10 border border-stone-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-12">
              <div className="max-w-xl space-y-1.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">
                  Featured Service
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-light text-white">
                  {relatedService.name} by Shrey Studio
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {relatedService.tagline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigateService(relatedService.slug)}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-stone-700"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold tracking-wider transition-colors cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};
