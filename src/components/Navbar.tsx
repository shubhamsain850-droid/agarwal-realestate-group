import React, { useState, useMemo } from 'react';
import { MessageCircle, Menu, X, Palette, ChevronDown, MapPin } from 'lucide-react';
import type { ProjectCity, PropertyCategory } from '../types/property';
import { useRealEstateTheme } from '../context/ThemeContext';
import { PROPERTIES_DATA } from '../data/properties';

interface NavbarProps {
  activeCity: ProjectCity | 'all';
  activeCategory: PropertyCategory | 'all';
  activeSubCategory: string;
  onSelectCategory: (cat: PropertyCategory | 'all', subCategory?: string, shouldScroll?: boolean) => void;
  onOpenPartnerModal: () => void;
  onOpenCalculator: () => void;
  onOpenInsights: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCity,
  activeCategory,
  activeSubCategory,
  onSelectCategory,
  onOpenPartnerModal,
  onOpenCalculator,
  onOpenInsights
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<PropertyCategory | 'all' | null>(null);
  const { themeConfig, openThemeModal } = useRealEstateTheme();

  const navCategories: { id: PropertyCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Properties' },
    { id: 'plot', label: 'Plots' },
    { id: 'villa', label: 'Luxury Villas' },
    { id: 'farmhouse', label: 'Farmhouses' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'land', label: '90A' },
    { id: 'hotel-resort', label: 'Hotel & Resort' }
  ];

  // Dynamically map area subcategories per category from real properties (scoped by activeCity)
  const categorySubMap = useMemo(() => {
    const map: Record<string, { name: string; count: number }[]> = {};
    navCategories.forEach((cat) => {
      if (cat.id === 'all') return;
      const counts = new Map<string, number>();
      PROPERTIES_DATA.filter(
        (p) => (activeCity === 'all' || p.city === activeCity) && p.category === cat.id
      ).forEach((p) => {
        if (p.subCategory) {
          counts.set(p.subCategory, (counts.get(p.subCategory) || 0) + 1);
        }
      });
      map[cat.id] = Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
    });
    return map;
  }, [activeCity]);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Head Office Bar */}
      <div className="top-office-bar bg-[#140b07] py-1 px-3 sm:px-6 text-[11px] sm:text-xs border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <a
            href="https://maps.app.goo.gl/it2rKAKRhp2kzAx29?g_st=awb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-200 hover:text-amber-300 font-semibold transition underline decoration-amber-400/40"
            title="Open Head Office Location in Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Head Office</span>
          </a>
        </div>
      </div>

      {/* Main Logo & WhatsApp Row */}
      <div className="header-brand-row w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => onSelectCategory('all', 'all', false)}
            className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 cursor-pointer"
          >
            <div className="relative shrink-0">
              <img
                src="/logo-emblem-sandstone.jpg"
                alt="Ajarwal Real Estate Group Emblem"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-400/90 shadow-[0_0_15px_rgba(223,155,88,0.35)]"
              />
            </div>
            <div className="flex flex-col justify-center shrink-0">
              <span className="font-serif font-black text-lg sm:text-2xl tracking-[0.06em] text-white leading-none">
                AJARWAL
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-amber-400 mt-0.5 sm:mt-1 whitespace-nowrap">
                REAL ESTATE GROUP
              </span>
            </div>
          </div>

          {/* Desktop Action Buttons & Utility Links */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenInsights}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-900/60 transition cursor-pointer"
            >
              Guides
            </button>
            <button
              onClick={onOpenCalculator}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-900/60 transition cursor-pointer"
            >
              EMI Calc
            </button>

            {/* Theme Selector Icon Button */}
            <button
              onClick={openThemeModal}
              className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-400/60 text-amber-400 transition cursor-pointer"
              title="Change Website Theme"
            >
              <Palette className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPartnerModal}
              className="px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition cursor-pointer"
            >
              Partner Desk
            </button>

            <a
              href="https://wa.me/919829000000?text=Hello%20Ajarwal%20Real%20Estate%20Group!%20I%20am%20interested%20in%20verified%20properties%20in%20Jaipur."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 shadow-md shadow-amber-950/60 transition"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Actions (WhatsApp + Theme + Menu) */}
          <div className="sm:hidden flex items-center gap-1.5">
            <a
              href="https://wa.me/919829000000?text=Hello%20Ajarwal%20Real%20Estate%20Group!%20I%20am%20interested%20in%20verified%20properties%20in%20Jaipur."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-slate-950" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={openThemeModal}
              className="p-2 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 cursor-pointer"
              title="Select Theme"
            >
              <Palette className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Full-Width Edge-to-Edge Category Navigation Bar Below Logo & WhatsApp */}
      <div className="category-bar-wrapper category-mobile-strip w-full border-t border-slate-800/80 bg-slate-950/95">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <nav className="category-bar flex items-center justify-start lg:justify-center gap-1.5 sm:gap-2 overflow-x-auto lg:overflow-visible no-scrollbar">
            {navCategories.map((item) => {
              const subs = categorySubMap[item.id] || [];
              const hasSubs = subs.length > 0;
              const isDropdownOpen = openDropdown === item.id;
              const isActive = activeCategory === item.id;

              return (
                <div
                  key={item.id}
                  className="relative shrink-0"
                  onMouseEnter={() => hasSubs && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      onSelectCategory(item.id, 'all', subs.length === 0);
                      if (hasSubs) {
                        setOpenDropdown(isDropdownOpen ? null : item.id);
                      } else {
                        setOpenDropdown(null);
                      }
                    }}
                    className={`category-btn px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 border ${
                      isActive
                        ? 'category-btn-active bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                        : 'bg-slate-900/80 text-slate-200 border-slate-800 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSubs && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-amber-400' : 'opacity-80'
                        }`}
                      />
                    )}
                  </button>

                  {/* Area Subcategory Dropdown (Desktop) */}
                  {hasSubs && isDropdownOpen && (
                    <div className="hidden lg:block absolute left-0 top-full pt-1.5 w-64 z-50">
                      <div className="bg-[#180e09] border border-amber-500/35 rounded-2xl shadow-2xl p-2 space-y-1 backdrop-blur-xl">
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400/80 border-b border-amber-500/15 mb-1">
                          Select {item.label} Area
                        </div>
                        <button
                          onClick={() => {
                            onSelectCategory(item.id, 'all', true);
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                            activeCategory === item.id && activeSubCategory === 'all'
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'text-slate-200 hover:bg-amber-500/15 hover:text-amber-300'
                          }`}
                        >
                          <span>All {item.label}</span>
                          <span className="text-[10px] opacity-75">
                            {subs.reduce((acc, s) => acc + s.count, 0)}
                          </span>
                        </button>
                        {subs.map((sub) => (
                          <button
                            key={sub.name}
                            onClick={() => {
                              onSelectCategory(item.id, sub.name, true);
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between gap-2 cursor-pointer ${
                              activeCategory === item.id && activeSubCategory === sub.name
                                ? 'bg-amber-500 text-slate-950 font-bold'
                                : 'text-slate-200 hover:bg-amber-500/15 hover:text-amber-300'
                            }`}
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                              <span className="truncate">{sub.name}</span>
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${
                                activeCategory === item.id && activeSubCategory === sub.name
                                  ? 'bg-slate-950/20 text-slate-950'
                                  : 'bg-slate-900 text-amber-400'
                              }`}
                            >
                              {sub.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Show Area Subcategory chips directly on mobile when a category with areas (like Farmhouses) is tapped */}
        {activeCategory !== 'all' && (categorySubMap[activeCategory] || []).length > 0 && (
          <div className="lg:hidden px-3 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold uppercase text-amber-400 shrink-0 mr-1">Area:</span>
            <button
              onClick={() => onSelectCategory(activeCategory, 'all', true)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer shrink-0 ${
                activeSubCategory === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              All
            </button>
            {(categorySubMap[activeCategory] || []).map((sub) => (
              <button
                key={sub.name}
                onClick={() => onSelectCategory(activeCategory, sub.name, true)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1 ${
                  activeSubCategory === sub.name
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-200 border border-slate-800'
                }`}
              >
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{sub.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="category-drawer-grid grid grid-cols-2 gap-2 mb-3">
            {navCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.id, 'all', true);
                  setMobileMenuOpen(false);
                }}
                className={`category-btn p-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                  activeCategory === item.id
                    ? 'category-btn-active bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {activeCategory !== 'all' && (categorySubMap[activeCategory] || []).length > 0 && (
            <div className="pb-3 border-b border-slate-800 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-1">
                Filter by Area Subcategory:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(categorySubMap[activeCategory] || []).map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => {
                      onSelectCategory(activeCategory, sub.name, true);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                      activeSubCategory === sub.name
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {sub.name} ({sub.count})
                  </button>
                ))}
              </div>
            </div>
          )}

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
                onOpenInsights();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold bg-slate-800 rounded-xl text-amber-300 cursor-pointer"
            >
              Area Research Guides & Blogs
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
