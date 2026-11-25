import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { AiAssistant } from './components/AiAssistant';
import { EmiCalculator } from './components/EmiCalculator';
import { MarketGuide } from './components/MarketGuide';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { ThemeFloatingButton } from './components/ThemeFloatingButton';
import { PROPERTIES_DATA } from './data/properties';
import type { Property, PropertyCategory } from './types/property';
import { Sparkles, Building } from 'lucide-react';

export function App() {
  const [activeCategory, setActiveCategory] = useState<PropertyCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((prop) => {
      // Category match
      if (activeCategory !== 'all' && prop.category !== activeCategory) {
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
        const matchesSub = prop.subLocation.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        const matchesHighlights = prop.highlights.some((h) => h.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSub && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, selectedLocation, searchQuery]);

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
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenPartnerModal={() => setShowPartnerModal(true)}
        onOpenCalculator={() => setShowCalculator(true)}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onOpenAiCall={triggerAiCall}
      />

      {/* Main Property Listings Section */}
      <main id="properties" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Listings Header & Filter Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-slate-800/80 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Inventory (Bhankrota 302026)</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
              Available Properties & Plotted Schemes
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing {filteredProperties.length} verified legal title assets along Ajmer Road corridor
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedLocation('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-900 active:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(p) => setSelectedProperty(p)}
                onBookVisit={(p) => setSelectedProperty(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-800 max-w-lg mx-auto">
            <Building className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-white">No Properties Found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              No properties matched your search criteria. Please reset your filters or consult with Pooja (AI Advisor).
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedLocation('all');
                setSearchQuery('');
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 active:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer"
            >
              Show All Properties
            </button>
          </div>
        )}

        {/* Inline EMI Calculator Anchor Section */}
        <div id="calculator" className="mt-12 sm:mt-16">
          <EmiCalculator />
        </div>

        {/* Inline Partner Section */}
        <div id="partners" className="mt-12 sm:mt-16">
          <PartnerSection />
        </div>
      </main>

      {/* Local Area Growth & Investment Guide */}
      <MarketGuide />

      {/* Footer */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* Property Detail Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

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

      {/* Real Estate Theme Selector Floating Button & Modal */}
      <ThemeFloatingButton />
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
