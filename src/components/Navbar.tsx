import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowRight, Palette } from 'lucide-react';
import type { PropertyCategory } from '../types/property';
import { useRealEstateTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeCategory: PropertyCategory | 'all';
  onSelectCategory: (cat: PropertyCategory | 'all') => void;
  onOpenPartnerModal: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenPartnerModal,
  onOpenCalculator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { themeConfig, openThemeModal } = useRealEstateTheme();

  const navCategories: { id: PropertyCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Properties' },
    { id: 'plot', label: 'JDA Plots' },
    { id: 'villa', label: 'Luxury Villas' },
    { id: 'farmhouse', label: 'Farmhouses' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'land', label: 'Big Land / 90A' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 py-1.5 px-4 text-xs border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-300 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bhankrota (302026) & Ajmer Road Specialists • JDA Approved & RERA Verified Only</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="hidden sm:inline">Office: Bhankrota Chauraha, Jaipur</span>
            <a
              href="tel:+919829000000"
              className="flex items-center gap-1 text-emerald-400 font-bold hover:underline"
            >
              <Phone className="w-3 h-3" /> +91 98290 XXXXX
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src="/logo-emblem.jpg"
                alt="Ajarwal Real Estate Group Emblem"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-white font-serif">
                  AJARWAL
                </span>
                <span className="text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  REAL ESTATE GROUP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                अजरवाल रियल एस्टेट ग्रुप • भंकरोटा, अजमेर रोड (जयपुर)
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === item.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onOpenCalculator}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition cursor-pointer"
            >
              EMI Calc
            </button>
          </nav>

          {/* Action Buttons & Theme Selector */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Selector Button */}
            <button
              onClick={openThemeModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 border border-slate-700 hover:border-amber-400/60 hover:text-white transition cursor-pointer"
              title="Change Website Theme"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Theme:</span>
              <span className="text-amber-400 truncate max-w-[85px]">{themeConfig.name.split(' ')[0]}</span>
            </button>

            <button
              onClick={onOpenPartnerModal}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition cursor-pointer"
            >
              <span>Colonizers</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <a
              href="https://wa.me/919829000000?text=Namaste%20Ajarwal%20Real%20Estate%20Group,%20mujhe%20Bhankrota%20me%20property%20ki%20jaankari%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-900/40 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={openThemeModal}
              className="p-2.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 cursor-pointer"
              title="Select Theme"
            >
              <Palette className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                  activeCategory === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800/80 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                openThemeModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 text-center text-xs font-bold bg-slate-800 text-amber-400 border border-amber-500/30 rounded-xl flex items-center justify-center gap-2"
            >
              <Palette className="w-4 h-4" />
              <span>Change Website Theme ({themeConfig.name})</span>
            </button>

            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold bg-slate-800 rounded-xl text-sky-400 cursor-pointer"
            >
              Loan / EMI Calculator
            </button>
            <button
              onClick={() => {
                onOpenPartnerModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl cursor-pointer"
            >
              List Land / Colonizer Partner Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
