import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailPage } from './components/PropertyDetailPage';
import { AiAssistant } from './components/AiAssistant';
import { EmiCalculator } from './components/EmiCalculator';
import { MarketGuide } from './components/MarketGuide';
import { BlogSection } from './components/BlogSection';
import { BlogReaderPage } from './components/BlogReaderPage';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { PROPERTIES_DATA } from './data/properties';
import { PROJECT_CITIES, type ProjectCity, type Property, type PropertyCategory } from './types/property';
import type { BlogArticle } from './data/blogs';
import { Building, MapPin } from 'lucide-react';

const getInitialCityFromUrl = (): ProjectCity | 'all' => {
  if (typeof window === 'undefined') return 'all';
  const param = new URLSearchParams(window.location.search).get('city')?.toLowerCase();
  if (param === 'jaipur') return 'Jaipur';
  if (param === 'mumbai') return 'Mumbai';
  return 'all';
};

export function App() {
  const [activeCity, setActiveCity] = useState<ProjectCity | 'all'>(getInitialCityFromUrl);
  const [activeCategory, setActiveCategory] = useState<PropertyCategory | 'all'>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const handleCategoryChange = (
    cat: PropertyCategory | 'all',
    subCategory: string = 'all',
    shouldScroll: boolean = false
  ) => {
    setSelectedProperty(null);
    setSelectedBlog(null);
    setActiveCategory(cat);
    setActiveSubCategory(subCategory);
    if (shouldScroll) {
      setTimeout(() => scrollToSection('properties'), 60);
    }
  };

  const openPropertyFullPage = (prop: Property, jumpToVisit: boolean = false) => {
    setSelectedBlog(null);
    setSelectedProperty(prop);
    if (jumpToVisit) {
      setTimeout(() => scrollToSection('book-visit-section'), 120);
    }
  };

  const openInsightsSection = () => {
    setSelectedProperty(null);
    setSelectedBlog(null);
    setTimeout(() => scrollToSection('insights'), 60);
  };

  const handleCityChange = (city: ProjectCity | 'all') => {
    setSelectedProperty(null);
    setSelectedBlog(null);
    setActiveCity(city);
    setActiveSubCategory('all');
    setSelectedLocation('all');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (city === 'all') {
        url.searchParams.delete('city');
      } else {
        url.searchParams.set('city', city.toLowerCase());
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleResetFilters = () => {
    handleCityChange('all');
    setActiveCategory('all');
    setActiveSubCategory('all');
    setSelectedLocation('all');
    setSearchQuery('');
  };

  // Location / Area Subcategories for the active city & category
  const availableSubCategories = useMemo(() => {
    const matchingCategoryProps = PROPERTIES_DATA.filter(
      (prop) =>
        (activeCity === 'all' || prop.city === activeCity) &&
        (activeCategory === 'all' || prop.category === activeCategory)
    );
    const counts = new Map<string, number>();
    matchingCategoryProps.forEach((prop) => {
      if (prop.subCategory) {
        counts.set(prop.subCategory, (counts.get(prop.subCategory) || 0) + 1);
      }
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [activeCity, activeCategory]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((prop) => {
      // City match
      if (activeCity !== 'all' && prop.city !== activeCity) {
        return false;
      }
      // Category match
      if (activeCategory !== 'all' && prop.category !== activeCategory) {
        return false;
      }
      // Subcategory (Area / Location) match
      if (activeSubCategory !== 'all' && prop.subCategory !== activeSubCategory) {
        return false;
      }
      // Location match
      if (selectedLocation !== 'all' && !prop.subLocation.toLowerCase().includes(selectedLocation.toLowerCase()) && !prop.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesCity = prop.city.toLowerCase().includes(query);
        const matchesSub = prop.subLocation.toLowerCase().includes(query);
        const matchesSubCat = (prop.subCategory || '').toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        const matchesHighlights = prop.highlights.some((h) => h.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCity && !matchesSub && !matchesSubCat && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }
      return true;
    });
  }, [activeCity, activeCategory, activeSubCategory, selectedLocation, searchQuery]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerAiCall = () => {
    const trigger = document.querySelector('button[title="Start Call"]') as HTMLButtonElement;
    if (trigger) {
      trigger.click();
    } else {
      const floatBtn = document.querySelector('.group.relative') as HTMLButtonElement;
      if (floatBtn) floatBtn.click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 pb-16 lg:pb-0 transition-colors duration-300">
      {/* Navigation */}
      <Navbar
        activeCity={activeCity}
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
        onSelectCategory={handleCategoryChange}
        onOpenPartnerModal={() => setShowPartnerModal(true)}
        onOpenCalculator={() => setShowCalculator(true)}
        onOpenInsights={openInsightsSection}
      />

      {/* FULL-SCREEN BLOG READER, FULL-SCREEN PROPERTY DETAIL VIEW, OR MAIN HOME VIEW */}
      {selectedBlog ? (
        <BlogReaderPage
          article={selectedBlog}
          onBack={() => setSelectedBlog(null)}
          onOpenProperty={(p) => openPropertyFullPage(p)}
        />
      ) : selectedProperty ? (
        <PropertyDetailPage
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
        />
      ) : (
        <>
          {/* Hero Section */}
          <Hero
            activeCity={activeCity}
            onCityChange={handleCityChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={activeCategory}
            selectedSubCategory={activeSubCategory}
            onSubCategoryChange={(sub) => {
              setActiveSubCategory(sub);
              if (sub !== 'all') {
                scrollToSection('properties');
              }
            }}
            availableSubCategories={availableSubCategories}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            onResetFilters={handleResetFilters}
            onSelectProperty={(p) => openPropertyFullPage(p)}
          />

          {/* Main Property Listings Section */}
          <main id="properties" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
            {/* Listings Header & City Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-3">
              <div>
                <h2 className="text-xl sm:text-3xl font-black text-white">
                  {activeCity === 'all' ? 'Available Properties' : `${activeCity} Projects`}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Showing {filteredProperties.length} verified {filteredProperties.length === 1 ? 'property' : 'properties'}
                  {activeCity !== 'all' ? ` in ${activeCity}` : ''}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* City Filter Pills */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {PROJECT_CITIES.map((cityItem) => (
                    <button
                      key={cityItem.id}
                      onClick={() => handleCityChange(cityItem.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        activeCity === cityItem.id
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {cityItem.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleResetFilters}
                  className="px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-900 active:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Location / Area Subcategory Filter Bar */}
            {availableSubCategories.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Area Subcategory:
                </span>
                <button
                  onClick={() => setActiveSubCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border ${
                    activeSubCategory === 'all'
                      ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:text-white'
                  }`}
                >
                  All Areas
                </button>
                {availableSubCategories.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => setActiveSubCategory(sub.name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border flex items-center gap-1.5 ${
                      activeSubCategory === sub.name
                        ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:text-white'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        activeSubCategory === sub.name
                          ? 'bg-slate-950/20 text-slate-950 font-extrabold'
                          : 'bg-slate-800 text-amber-400'
                      }`}
                    >
                      {sub.count}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={(p) => openPropertyFullPage(p, false)}
                    onBookVisit={(p) => openPropertyFullPage(p, true)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-amber-500/20 max-w-xl mx-auto">
                <Building className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {activeCity !== 'all'
                    ? `${activeCity} Projects — Onboarding Soon`
                    : 'New Verified Projects Coming Soon'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 mb-5 leading-relaxed">
                  {activeCity !== 'all'
                    ? `${activeCity} listings are kept completely separate from other cities. Verified ${activeCity} projects are currently being onboarded — view live Jaipur estates or list a ${activeCity} property.`
                    : 'Verified deals for this category are currently being onboarded. Explore our live Weekend Farms project in Hirapura (Near Mahindra SEZ) or list your property with us.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleCityChange('Jaipur')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 font-extrabold text-xs transition cursor-pointer"
                  >
                    View Jaipur Live Projects
                  </button>
                  <button
                    onClick={() => setShowPartnerModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition cursor-pointer"
                  >
                    List Your Property
                  </button>
                </div>
              </div>
            )}

            {/* Inline EMI Calculator Anchor Section */}
            <div id="calculator" className="mt-12 sm:mt-16">
              <EmiCalculator />
            </div>
          </main>

          {/* Local Area Growth & Investment Guide */}
          <MarketGuide />

          {/* Flagship SEO Research Blogs */}
          <BlogSection onSelectBlog={(article) => setSelectedBlog(article)} />
        </>
      )}

      {/* Footer */}
      <Footer onSelectCategory={handleCategoryChange} />

      {/* Dedicated Partner Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl my-auto">
            <PartnerSection onClose={() => setShowPartnerModal(false)} />
          </div>
        </div>
      )}

      {/* Dedicated Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl my-auto">
            <EmiCalculator onClose={() => setShowCalculator(false)} />
          </div>
        </div>
      )}

      {/* Floating AI Voice & Chat Assistant (Pooja) */}
      <AiAssistant />

      {/* Real Estate Theme Selector Modal */}
      <ThemeSelectorModal />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileBottomBar
        onOpenAiCall={triggerAiCall}
        onOpenCalculator={() => setShowCalculator(true)}
        onScrollToProperties={() => scrollToSection('properties')}
      />
    </div>
  );
}

export default App;
