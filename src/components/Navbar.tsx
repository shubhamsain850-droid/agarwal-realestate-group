import React, { useState, useMemo } from 'react';
import { Phone, MessageCircle, Menu, X, Palette, ChevronDown, MapPin } from 'lucide-react';
import type { PropertyCategory } from '../types/property';
import { useRealEstateTheme } from '../context/ThemeContext';
import { PROPERTIES_DATA } from '../data/properties';

interface NavbarProps {
  activeCategory: PropertyCategory | 'all';
  activeSubCategory: string;
  onSelectCategory: (cat: PropertyCategory | 'all', subCategory?: string, shouldScroll?: boolean) => void;
  onOpenPartnerModal: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  activeSubCategory,
  onSelectCategory,
  onOpenPartnerModal,
  onOpenCalculator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<PropertyCategory | 'all' | null>(null);
  const { themeConfig, openThemeModal } = useRealEstateTheme();

  const navCategories: { id: PropertyCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Properties' },
    { id: 'plot', label: 'JDA Plots' },
    { id: 'villa', label: 'Luxury Villas' },
    { id: 'farmhouse', label: 'Farmhouses' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'land', label: 'Big Land / 90A' }
  ];

  // Dynamically map area subcategories per category from real properties
  const categorySubMap = useMemo(() => {
    const map: Record<string, { name: string; count: number }[]> = {};
    navCategories.forEach((cat) => {
      if (cat.id === 'all') return;
      const counts = new Map<string, number>();
      PROPERTIES_DATA.filter((p) => p.category === cat.id).forEach((p) => {
        if (p.subCategory) {
          counts.set(p.subCategory, (counts.get(p.subCategory) || 0) + 1);
        }
      });
      map[cat.id] = Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
    });
    return map;
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Notification Bar */}
      <div className="bg-[#140b07] py-1.5 px-4 text-xs border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-200/90 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Jaipur Real Estate Corridor • Ajmer Road & Mahindra SEZ • Verified Inventory</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="hidden sm:inline">Office: Bhankrota Chauraha, Jaipur</span>
            <a
              href="tel:+919829000000"
              className="flex items-center gap-1 text-amber-400 font-bold hover:underline"
            >
              <Phone className="w-3 h-3" /> +91 98290 XXXXX
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="relative shrink-0">
              <img
                src="/logo-emblem-sandstone.jpg"
                alt="Ajarwal Real Estate Group Emblem"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/90 shadow-[0_0_15px_rgba(223,155,88,0.35)]"
              />
            </div>
            <div className="flex flex-col justify-center shrink-0">
              <span className="font-serif font-black text-2xl tracking-[0.06em] text-white leading-none">
                AJARWAL
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-amber-400 mt-1 whitespace-nowrap">
                REAL ESTATE GROUP
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links with Area Subcategory Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            {navCategories.map((item) => {
              const subs = categorySubMap[item.id] || [];
              const hasSubs = subs.length > 0;
              const isDropdownOpen = openDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => hasSubs && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      onSelectCategory(item.id, 'all', false);
                      if (hasSubs) {
                        setOpenDropdown(isDropdownOpen ? null : item.id);
                      } else {
                        setOpenDropdown(null);
                      }
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      activeCategory === item.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSubs && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-amber-400' : 'opacity-70'
                        }`}
                      />
                    )}
                  </button>

                  {/* Area Subcategory Dropdown */}
                  {hasSubs && isDropdownOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-64 z-50">
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
            <button
              onClick={onOpenCalculator}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-900/60 transition cursor-pointer"
            >
              EMI Calc
            </button>
          </nav>

          {/* Action Buttons & Theme Selector */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
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
              href="https://wa.me/919829000000?text=Hello%20Ajarwal%20Real%20Estate%20Group!%20I%20am%20interested%20in%20verified%20properties%20in%20Bhankrota%2C%20Ajmer%20Road."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 shadow-md shadow-amber-950/60 transition"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
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
                  onSelectCategory(item.id, 'all', true);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                  activeCategory === item.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
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
