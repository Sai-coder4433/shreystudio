import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Search, ArrowUpRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS, BlogPostData } from '../data/seoData';
import { SEOHead } from './SEOHead';

interface BlogListPageProps {
  onBack: () => void;
  onSelectPost: (slug: string) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onBack, onSelectPost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Wedding Planning', 'Destination', 'Guides', 'Fashion', 'Corporate', 'Commercial', 'Education'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-['Plus_Jakarta_Sans'] pb-20 selection:bg-black selection:text-white">
      {/* Dynamic SEO Meta */}
      <SEOHead
        title="Photography & Wedding Planning Blog | Shrey Studio Chakan Pune"
        description="Expert photography advice, wedding planning tips, pre-wedding location guides in Pune, and international destination shoot guides (Vietnam, Singapore, Malaysia)."
        canonicalPath="/blog"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      {/* Header */}
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

          <span className="font-['Cormorant_Garamond'] text-lg font-bold text-stone-900">
            SHREY STUDIO JOURNAL
          </span>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold tracking-wider uppercase mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Articles & Wedding Guides</span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight mb-4">
          The Photography & Wedding Journal
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
          Honest guides, location recommendations, and artistic insights from our photography and cinematography team in Chakan, Pune.
        </p>

        {/* Search & Category Filter */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles, wedding tips, or locations…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm">No articles found matching your query.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-amber-700 font-bold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post: BlogPostData) => (
              <article
                key={post.slug}
                onClick={() => onSelectPost(post.slug)}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-amber-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <img
                      src={post.heroImage}
                      alt={post.heroImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-[11px] text-stone-400 mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug mb-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-stone-500 font-['Plus_Jakarta_Sans'] leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 flex items-center justify-between text-xs font-bold text-stone-800 group-hover:text-amber-800 transition-colors border-t border-stone-100 mt-2">
                  <span>Read Full Article</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center text-stone-700 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
