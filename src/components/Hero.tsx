import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Building2,
  MessageCircle
} from 'lucide-react';
import { PROJECT_CITIES, type ProjectCity, type Property, type PropertyCategory } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';

interface HeroProps {
  activeCity: ProjectCity | 'all';
  onCityChange: (city: ProjectCity | 'all') => void;
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
  activeCity,
  onCityChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  selectedSubCategory,
  onSubCategoryChange: _onSubCategoryChange,
  availableSubCategories,
  selectedLocation,
  onLocationChange,
  onResetFilters,
  onSelectProperty
}) => {
  const cityProps = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => activeCity === 'all' || p.city === activeCity);
  }, [activeCity]);

  const featuredList = useMemo(() => {
    if (cityProps.length === 0) return [];
    const filtered = cityProps.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
      return true;
    });
    if (filtered.length > 0) return filtered;
    return cityProps.filter((p) => p.featured);
  }, [cityProps, selectedCategory, selectedSubCategory]);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [activeCity, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (featuredList.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredList.length]);

  const currentFeatured = featuredList[slideIndex] || null;

  const scrollToListings = () => {
    const el = document.getElementById('properties');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 text-white pt-5 pb-6 sm:pt-6 sm:pb-8 overflow-hidden border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
        {/* Full-Width Balanced Search Available Property by Area Bar + City Filter */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-lg border border-amber-500/25 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="font-sans text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Search Property by Area</span>
            </h1>

            {/* City Switcher Pills: All Cities / Jaipur / Mumbai */}
            <div className="flex flex-wrap items-center gap-1.5">
              {PROJECT_CITIES.map((cityItem) => {
                const count =
                  cityItem.id === 'all'
                    ? PROPERTIES_DATA.length
                    : PROPERTIES_DATA.filter((p) => p.city === cityItem.id).length;
                const isSelected = activeCity === cityItem.id;
                return (
                  <button
                    key={cityItem.id}
                    onClick={() => onCityChange(cityItem.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <span>{cityItem.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-slate-950/20 text-slate-950 font-extrabold' : 'bg-slate-800 text-amber-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {(activeCity !== 'all' || selectedCategory !== 'all' || selectedSubCategory !== 'all' || selectedLocation !== 'all' || searchQuery) && (
                <button
                  onClick={onResetFilters}
                  className="ml-1 text-[11px] font-semibold text-slate-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
            <div className="sm:col-span-5 relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-amber-400/80" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search available property by area..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="sm:col-span-4 relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-amber-400/80" />
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition cursor-pointer appearance-none"
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
              className="sm:col-span-3 py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Search</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wide Horizontal Featured Project Showcase Card */}
        {currentFeatured ? (
        <div className="rounded-3xl overflow-hidden bg-slate-900 border border-amber-500/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 group">
          {/* Left: Clean Un-obstructed Showcase Poster */}
          <div
            onClick={() => onSelectProperty(currentFeatured)}
            className="lg:col-span-7 relative h-[220px] sm:h-[290px] lg:h-[310px] overflow-hidden cursor-pointer bg-slate-950"
          >
            <img
              src={currentFeatured.heroPoster || currentFeatured.images[0]}
              alt={currentFeatured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

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
          </div>

          {/* Right: Structured Property Details Panel */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between gap-4 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  {currentFeatured.approvalStatus}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                  {currentFeatured.areaSize} {currentFeatured.areaSizeUnit}
                </span>
              </div>

              <h2
                onClick={() => onSelectProperty(currentFeatured)}
                className="font-serif text-lg sm:text-2xl font-bold text-white leading-snug cursor-pointer hover:text-amber-300 transition"
              >
                {currentFeatured.title}
              </h2>

              <p className="text-xs text-slate-400 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{currentFeatured.subLocation}</span>
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-semibold">
                  {currentFeatured.roadWidth}
                </span>
                {currentFeatured.bankLoanAvailable && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-semibold">
                    Up to {currentFeatured.bankLoanPercentage}% Loan
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-amber-400 leading-none">
                    {currentFeatured.priceDisplay}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-1 font-medium">
                    {currentFeatured.pricePerUnit}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProperty(currentFeatured)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {featuredList.length > 1 && (
                <div className="flex items-center justify-between pt-1">
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
              )}
            </div>
          </div>
        </div>
        ) : (
        <div className="rounded-3xl bg-slate-900 border border-amber-500/30 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>{activeCity} Real Estate Desk</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {activeCity} Verified Projects — Launching Soon
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {activeCity} inventory is separated from Jaipur listings and currently under verification. Request direct alerts or switch to live Jaipur projects.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <button
              onClick={() => onCityChange('Jaipur')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] text-slate-950 font-extrabold text-xs shadow-lg cursor-pointer"
            >
              View Jaipur Live Projects
            </button>
            <a
              href={`https://wa.me/919829000000?text=${encodeURIComponent(`Hello Ajarwal Real Estate Group! Please share upcoming verified project updates for ${activeCity}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{activeCity} Inquiry</span>
            </a>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};
