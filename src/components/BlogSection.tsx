import React from 'react';
import { BookOpen, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { FLAGSHIP_BLOGS, type BlogArticle } from '../data/blogs';

interface BlogSectionProps {
  onSelectBlog: (article: BlogArticle) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectBlog }) => {
  return (
    <section id="insights" className="bg-slate-950 py-12 sm:py-16 border-t border-slate-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-800/80">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Flagship Research & Area Guides</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              Jaipur Real Estate Insights & Investor Briefings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              In-depth, data-backed market research across Mahindra SEZ, Hirapura, Ajmer Road, Ring Road & Rajasthan land laws.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{FLAGSHIP_BLOGS.length} Verified Flagship Guides</span>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {FLAGSHIP_BLOGS.map((blog) => (
            <article
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="group bg-slate-900 rounded-3xl border border-slate-800 hover:border-amber-500/50 overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-1 shadow-xl cursor-pointer"
            >
              {/* Article Thumbnail */}
              <div className="relative sm:w-48 md:w-52 h-44 sm:h-auto shrink-0 overflow-hidden bg-slate-950">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="media-scrim-dark absolute inset-0 opacity-75" />
                <span className="media-overlay-dark absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#140c09]/90 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  {blog.category}
                </span>
              </div>

              {/* Article Summary */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                    <span>•</span>
                    <span>{blog.publishedDate}</span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                    Read Full Research Guide
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
