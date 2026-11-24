import React from 'react';
import { Search, ShieldCheck, MapPin, Sparkles, Award } from 'lucide-react';
import type { PropertyCategory } from '../types/property';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: PropertyCategory | 'all';
  onCategoryChange: (cat: PropertyCategory | 'all') => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  onOpenAiCall: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  onOpenAiCall
}) => {
  const categoryTabs: { id: PropertyCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Inventory' },
    { id: 'plot', label: 'JDA Plots' },
    { id: 'villa', label: 'Duplex Villas' },
    { id: 'farmhouse', label: 'Farmhouses' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'land', label: 'Big Land / 90A' }
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-16 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-500/10 via-amber-500/5 to-teal-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Value Proposition Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>#1 Real Estate Advisory in Bhankrota & Ajmer Road Corridor</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            भरोसा ज़मीन का, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              वादा तरक्की और पक्की रजिस्ट्री का।
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Bhankrota (302026), 200 ft Bypass, Jaisinghpura, Mahapura, aur Ring Road belt ke 
            <strong> 100% verified JDA Single Patta plots, duplex villas, weekend farmhouses aur commercial spaces</strong> direct developer rates par.
          </p>

          {/* Quick Voice AI Trigger Banner */}
          <div className="pt-2">
            <button
              onClick={onOpenAiCall}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition cursor-pointer border border-emerald-400/30 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Pooja (AI Calling Agent) se Phone pe Baat Karein</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                FREE CALL
              </span>
            </button>
          </div>
        </div>

        {/* Search & Filter Component Box */}
        <div className="mt-10 bg-slate-900/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 max-w-5xl mx-auto">
          {/* Category Selection Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-800 no-scrollbar">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs Row */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Keyword Search */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by colony, road (e.g. 200ft, DPS, Jaisinghpura)..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Location Filter */}
            <div className="md:col-span-4 relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition cursor-pointer appearance-none"
              >
                <option value="all">All Locations (Bhankrota & Ajmer Road)</option>
                <option value="Bhankrota">Bhankrota 200 ft Sector Road</option>
                <option value="Jaisinghpura">Jaisinghpura Corridor</option>
                <option value="Mahapura">Mahapura & SEZ Belt</option>
                <option value="Ring Road">Ring Road Cloverleaf Junction</option>
                <option value="Ajmer Road">NH-48 Ajmer Highway Touch</option>
                <option value="Boraj">Boraj - Begus Farmhouse Belt</option>
              </select>
            </div>

            {/* Direct Verification Filter Tag */}
            <div className="md:col-span-3 flex items-center justify-center bg-emerald-950/40 border border-emerald-700/40 rounded-2xl px-4 py-3 text-xs text-emerald-300 font-semibold gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% JDA Patta Clear</span>
            </div>
          </div>
        </div>

        {/* 3 Pillar Trust Metric Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">JDA & RERA Approved</div>
            <div className="text-[10px] text-slate-500">Single Patta Registry</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">80%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">SBI / HDFC Bank Loan</div>
            <div className="text-[10px] text-slate-500">Fast file approval</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">0%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Brokerage on New Townships</div>
            <div className="text-[10px] text-slate-500">Direct Developer Rates</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">24/7</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Free Pickup & Site Visit</div>
            <div className="text-[10px] text-slate-500">Bhankrota local office</div>
          </div>
        </div>
      </div>
    </div>
  );
};
