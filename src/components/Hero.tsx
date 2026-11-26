import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ShieldCheck,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Landmark,
  CheckCircle2,
  Compass
} from 'lucide-react';
import type { Property, PropertyCategory } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: PropertyCategory | 'all';
  selectedSubCategory: string;
  onSubCategoryChange: (sub: string) => void;
  availableSubCategories: { name: string; count: number }[];
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  onResetFilters: () => void;
  onOpenAiCall: () => void;
  onSelectProperty: (property: Property) => void;
}

const CATEGORY_LABELS: Record<PropertyCategory | 'all', string> = {
  all: 'All Categories',
  plot: 'JDA Plots',
  villa: 'Luxury Villas',
  farmhouse: 'Farmhouses',
  commercial: 'Commercial',
  land: 'Big Land / 90A'
};

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  selectedSubCategory,
  onSubCategoryChange,
  availableSubCategories,
  selectedLocation,
  onLocationChange,
  onResetFilters,
  onOpenAiCall,
  onSelectProperty
}) => {
  // Smartly sync showcase poster with selected category & area subcategory
  const featuredList = useMemo(() => {
    const filtered = PROPERTIES_DATA.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
      return true;
    });
    if (filtered.length > 0) return filtered;
    return PROPERTIES_DATA.filter((p) => p.featured);
  }, [selectedCategory, selectedSubCategory]);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (featuredList.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredList.length]);

  const currentFeatured = featuredList[slideIndex] || PROPERTIES_DATA[0];

  const scrollToListings = () => {
    const el = document.getElementById('properties');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-white pt-6 pb-10 sm:pt-8 sm:pb-14 overflow-hidden border-b border-amber-500/10">
      {/* Subtle Ambient Sandstone Glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT COLUMN: Crisp Heading + Search Property by Area + Trust Metrics */}
          <div className="lg:col-span-7 space-y-5">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Jaipur • Ajmer Road • Hirapura • Mahindra SEZ Corridor</span>
            </div>

            {/* Crisp 2-Line Luxury Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.15]">
              Verified Properties &{' '}
              <span className="bg-gradient-to-r from-[#ffe8ab] via-[#df9b58] to-[#c86446] bg-clip-text text-transparent">
                Prime Estates in Jaipur.
              </span>
            </h1>

            {/* Concise 1-Line Value Subhead */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Direct verified deals across Ajmer Road, Mahindra SEZ & Hirapura —{' '}
              <span className="text-amber-200 font-semibold">Transparent Registry & Loan Assistance.</span>
            </p>

            {/* Search Property by Area Card (No Duplicate Category Bar!) */}
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-amber-500/25 space-y-3.5">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <h2 className="font-sans text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                    Search Property by Area
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {CATEGORY_LABELS[selectedCategory]}
                  </span>
                  {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || selectedLocation !== 'all' || searchQuery) && (
                    <button
                      onClick={onResetFilters}
                      className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Area Subcategory Quick Selector */}
              {availableSubCategories.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {selectedCategory === 'all'
                      ? 'Popular Locations / Area Subcategories:'
                      : `${CATEGORY_LABELS[selectedCategory]} — Area Subcategories:`}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => onSubCategoryChange('all')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                        selectedSubCategory === 'all'
                          ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 shadow-sm'
                          : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-white'
                      }`}
                    >
                      All Areas
                    </button>
                    {availableSubCategories.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => onSubCategoryChange(sub.name)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1.5 ${
                          selectedSubCategory === sub.name
                            ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 shadow-sm'
                            : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-white'
                        }`}
                      >
                        <MapPin className={`w-3 h-3 ${selectedSubCategory === sub.name ? 'text-slate-950' : 'text-amber-400'}`} />
                        <span>{sub.name}</span>
                        <span
                          className={`text-[10px] px-1.5 rounded-full ${
                            selectedSubCategory === sub.name
                              ? 'bg-slate-950/20 text-slate-950'
                              : 'bg-slate-800 text-amber-400'
                          }`}
                        >
                          {sub.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Input & Area Dropdown Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
                <div className="sm:col-span-5 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-amber-400/80" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Area, project, 100ft, SEZ..."
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
                    <option value="all">All Jaipur Areas</option>
                    {availableSubCategories.map((sub) => (
                      <option key={sub.name} value={sub.name.split(' ')[0]}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={scrollToListings}
                  className="sm:col-span-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-950/50 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Search Area</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Compact Trust Strip & AI Voice Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Verified Legal Registry
                </span>
                <span className="flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  Up to 70% Loan Assistance
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Direct & Transparent Deals
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
