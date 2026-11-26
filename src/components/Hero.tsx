import React, { useState, useEffect } from 'react';
import {
  Search,
  ShieldCheck,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Landmark,
  CheckCircle2
} from 'lucide-react';
import type { Property, PropertyCategory } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: PropertyCategory | 'all';
  onCategoryChange: (cat: PropertyCategory | 'all') => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  onOpenAiCall: () => void;
  onSelectProperty: (property: Property) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  onOpenAiCall,
  onSelectProperty
}) => {
  const featuredList = PROPERTIES_DATA.filter((p) => p.featured);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (featuredList.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredList.length]);

  const currentFeatured = featuredList[slideIndex] || PROPERTIES_DATA[0];

  const categoryTabs: { id: PropertyCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Inventory' },
    { id: 'plot', label: 'JDA Plots' },
    { id: 'villa', label: 'Duplex Villas' },
    { id: 'farmhouse', label: 'Farmhouses' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'land', label: '90A Land' }
  ];

  const scrollToListings = () => {
    const el = document.getElementById('properties');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (id: PropertyCategory | 'all') => {
    onCategoryChange(id);
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-white pt-6 pb-10 sm:pt-8 sm:pb-14 overflow-hidden border-b border-amber-500/10">
      {/* Subtle Ambient Sandstone Glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT COLUMN: Crisp Heading + Search Bar + Trust Metrics */}
          <div className="lg:col-span-7 space-y-5">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Bhankrota • Ajmer Road Corridor • Jaipur 302026</span>
            </div>

            {/* Crisp 2-Line Luxury Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.15]">
              Verified JDA Plots &{' '}
              <span className="bg-gradient-to-r from-[#ffe8ab] via-[#df9b58] to-[#c86446] bg-clip-text text-transparent">
                Luxury Villas in Jaipur.
              </span>
            </h1>

            {/* Concise 1-Line Value Subhead */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Direct developer pricing across 200 ft Bypass, Jaisinghpura, Mahapura & Ring Road —{' '}
              <span className="text-amber-200 font-semibold">100% Single Patta & RERA Verified.</span>
            </p>

            {/* Above-the-Fold Quick Search & Filter Card */}
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-amber-500/20 space-y-3">
              {/* Category Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80 no-scrollbar">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleCategoryClick(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 shadow-sm'
                        : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <div className="sm:col-span-5 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-amber-400/80" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Colony, 200ft, DPS..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div className="sm:col-span-4 relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-400/80" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 transition cursor-pointer appearance-none"
                  >
                    <option value="all">All Ajmer Road Zones</option>
                    <option value="Hirapura">Hirapura (Near Mahindra SEZ)</option>
                    <option value="Bhankrota">Bhankrota 200 ft Road</option>
                    <option value="Jaisinghpura">Jaisinghpura Corridor</option>
                    <option value="Mahapura">Mahapura & SEZ Belt</option>
                    <option value="Ring Road">Ring Road Junction</option>
                    <option value="Ajmer Road">NH-48 Highway Touch</option>
                    <option value="Boraj">Boraj Farmhouse Belt</option>
                  </select>
                </div>

                <button
                  onClick={scrollToListings}
                  className="sm:col-span-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-950/50 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Compact Trust Strip & AI Voice Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  100% JDA & RERA Clear
                </span>
                <span className="flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  80% SBI / HDFC Loan
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  0% Brokerage
                </span>
              </div>

              <button
                onClick={onOpenAiCall}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-[11px] border border-amber-500/30 hover:border-amber-400 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>AI Advisor Call</span>
                <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  FREE
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Luxury Featured Property Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              {/* Showcase Image */}
              <div className="relative h-[320px] sm:h-[370px] overflow-hidden">
                <img
                  src={currentFeatured.images[0]}
                  alt={currentFeatured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120906] via-[#120906]/45 to-black/30" />

                {/* Top Overlay Bar: Status & Slide Arrows */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#140c09]/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    Featured • {currentFeatured.approvalStatus}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        setSlideIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length)
                      }
                      aria-label="Previous Featured Property"
                      className="p-1.5 rounded-full bg-[#140c09]/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-amber-500/30 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSlideIndex((prev) => (prev + 1) % featuredList.length)}
                      aria-label="Next Featured Property"
                      className="p-1.5 rounded-full bg-[#140c09]/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-amber-500/30 transition cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                    <span className="uppercase tracking-wider">{currentFeatured.categoryLabel}</span>
                    <span>{currentFeatured.areaSizeUnit}</span>
                  </div>

                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2">
                    {currentFeatured.title}
                  </h2>

                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{currentFeatured.subLocation}</span>
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-amber-500/20">
                    <div>
                      <span className="text-xl font-black text-amber-400">
                        {currentFeatured.priceDisplay}
                      </span>
                      <span className="block text-[10px] text-slate-300">
                        {currentFeatured.pricePerUnit}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectProperty(currentFeatured)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Progress Dots */}
              <div className="bg-[#140c09] px-4 py-2 flex items-center justify-between border-t border-amber-500/15">
                <span className="text-[10px] text-slate-400 font-medium">
                  Verified Inventory Showcase ({slideIndex + 1}/{featuredList.length})
                </span>
                <div className="flex items-center gap-1.5">
                  {featuredList.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setSlideIndex(idx)}
                      aria-label={`Show ${item.title}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === slideIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
