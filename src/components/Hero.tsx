import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ShieldCheck,
  MapPin,
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
  selectedSubCategory: string;
  onSubCategoryChange: (sub: string) => void;
  availableSubCategories: { name: string; count: number }[];
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  onResetFilters: () => void;
  onSelectProperty: (property: Property) => void;
}

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
  onSelectProperty
}) => {
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
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-white pt-5 pb-8 sm:pt-8 sm:pb-12 overflow-hidden border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT COLUMN: Straight Headline + Clean Search by Area */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-[1.15]">
              Verified Properties &{' '}
              <span className="bg-gradient-to-r from-[#ffe8ab] via-[#df9b58] to-[#c86446] bg-clip-text text-transparent">
                Farmhouse Plots in Jaipur.
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
              Direct verified deals across Hirapura, Mahindra SEZ & Ajmer Road.
            </p>

            {/* Straight & Minimal Search Property by Area Card */}
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 shadow-xl border border-amber-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Search Property by Area
                </h2>
                {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || selectedLocation !== 'all' || searchQuery) && (
                  <button
                    onClick={onResetFilters}
                    className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Clean Search Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <div className="sm:col-span-5 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-amber-400/80" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Enter area or project..."
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
                    <option value="all">Select Area</option>
                    {availableSubCategories.map((sub) => (
                      <option key={sub.name} value={sub.name.split(' ')[0]}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={scrollToListings}
                  className="sm:col-span-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Search</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct Area Subcategory Pills */}
              {availableSubCategories.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {availableSubCategories.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() =>
                        onSubCategoryChange(selectedSubCategory === sub.name ? 'all' : sub.name)
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                        selectedSubCategory === sub.name
                          ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950'
                          : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-amber-500/40'
                      }`}
                    >
                      <span>{sub.name}</span>
                      <span className="text-[10px] opacity-75">({sub.count})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Crisp 3-Point Trust Strip (No Duplicate AI Button!) */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Verified Registry
              </span>
              <span className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-amber-400" />
                Up to 70% Loan
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Direct Deals
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Featured Brochure Poster Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <div
                onClick={() => onSelectProperty(currentFeatured)}
                className="relative h-[300px] sm:h-[360px] overflow-hidden cursor-pointer"
              >
                <img
                  src={currentFeatured.heroPoster || currentFeatured.images[0]}
                  alt={currentFeatured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120906] via-[#120906]/40 to-transparent" />

                {featuredList.length > 1 && (
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlideIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
                      }}
                      aria-label="Previous Featured Property"
                      className="p-1.5 rounded-full bg-[#140c09]/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-amber-500/30 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlideIndex((prev) => (prev + 1) % featuredList.length);
                      }}
                      aria-label="Next Featured Property"
                      className="p-1.5 rounded-full bg-[#140c09]/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-amber-500/30 transition cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="media-overlay-dark absolute bottom-0 left-0 right-0 p-4 sm:p-5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                    <span className="uppercase tracking-wider">{currentFeatured.approvalStatus}</span>
                    <span>
                      {currentFeatured.areaSize} {currentFeatured.areaSizeUnit}
                    </span>
                  </div>

                  <h2 className="font-serif text-base sm:text-xl font-bold text-white leading-snug line-clamp-2">
                    {currentFeatured.title}
                  </h2>

                  <div className="pt-2 flex items-center justify-between border-t border-amber-500/20">
                    <div>
                      <span className="text-lg sm:text-xl font-black text-amber-400">
                        {currentFeatured.priceDisplay}
                      </span>
                      <span className="block text-[10px] text-slate-300">
                        {currentFeatured.pricePerUnit}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProperty(currentFeatured);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#140c09] px-4 py-2 flex items-center justify-between border-t border-amber-500/15">
                <span className="text-[10px] text-slate-400 font-medium">
                  Featured Project ({slideIndex + 1}/{featuredList.length})
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
