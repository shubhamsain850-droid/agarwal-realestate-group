import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  MessageCircle,
  Tag
} from 'lucide-react';
import type { BlogArticle } from '../data/blogs';
import type { Property } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';

interface BlogReaderPageProps {
  article: BlogArticle;
  onBack: () => void;
  onOpenProperty: (property: Property) => void;
}

export const BlogReaderPage: React.FC<BlogReaderPageProps> = ({
  article,
  onBack,
  onOpenProperty
}) => {
  const relatedProperty = article.relatedPropertyId
    ? PROPERTIES_DATA.find((p) => p.id === article.relatedPropertyId)
    : PROPERTIES_DATA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const prevTitle = document.title;
    document.title = `${article.title} | Ajarwal Real Estate Group`;
    return () => {
      document.title = prevTitle;
    };
  }, [article]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 lg:pb-16">
      {/* Sticky Top Return Strip */}
      <div className="sticky top-[116px] sm:top-[138px] z-30 bg-[#140c09]/95 backdrop-blur-xl border-b border-amber-500/25 shadow-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {relatedProperty && (
            <button
              onClick={() => onOpenProperty(relatedProperty)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer flex items-center gap-1"
            >
              <span>View Hirapura Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Article Hero Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="text-slate-400">• {article.publishedDate}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="rounded-3xl overflow-hidden border border-amber-500/25 aspect-[16/9] bg-slate-900 shadow-2xl">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Executive Summary Box */}
        <div className="bg-[#1b100b] border border-amber-500/30 rounded-3xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <BookOpen className="w-4 h-4" />
            <span>Key Takeaway</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">{article.summary}</p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="space-y-2 pt-1">
                  {sec.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/70 p-3 rounded-2xl border border-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Comparison Table */}
        {article.comparisonTable && (
          <section className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-3">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
              Corridor & Legal Comparison Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 min-w-[560px]">
                <thead className="bg-slate-950 text-amber-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    {article.comparisonTable.headers.map((h, hIdx) => (
                      <th key={hIdx} className="py-3 px-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {article.comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx === 0 ? 'bg-amber-500/10 font-semibold text-white' : ''}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-3 px-4">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Buyer FAQs */}
        <section className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-3">
            {article.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1.5"
              >
                <h4 className="font-bold text-amber-300 text-xs sm:text-sm">{faq.question}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Target Keywords Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            Topics:
          </span>
          {article.targetKeywords.map((kw, kIdx) => (
            <span
              key={kIdx}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Bottom Related Property CTA Card */}
        {relatedProperty && (
          <div className="bg-gradient-to-r from-[#1f120b] via-slate-900 to-[#160c08] rounded-3xl p-6 border border-amber-500/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Featured Verified Opportunity
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {relatedProperty.title}
              </h3>
              <p className="text-xs text-slate-300">
                {relatedProperty.pricePerUnit} • {relatedProperty.areaSize} {relatedProperty.areaSizeUnit} • Up to {relatedProperty.bankLoanPercentage}% Loan Available
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => onOpenProperty(relatedProperty)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] text-slate-950 font-extrabold text-xs shadow-lg cursor-pointer"
              >
                Explore Full Project ➔
              </button>
              <a
                href={`https://wa.me/919829000000?text=${encodeURIComponent(
                  `Hello Ajarwal Real Estate Group! I just read "${article.title}" and want details on ${relatedProperty.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
