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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
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
        onOpenAiCall={() => {
          // Trigger floating AI modal call
          const trigger = document.querySelector('button[title="Start Call"]') as HTMLButtonElement;
          if (trigger) trigger.click();
        }}
      />

      {/* Main Property Listings Section */}
      <main id="properties" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Listings Header & Filter Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Inventory (Bhankrota 302026)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
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
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800 max-w-lg mx-auto">
            <Building className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Properties Found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Aapke search criteria ke anusaar property nahi mili. Kripya filter reset karein ya direct Pooja (AI Advisor) se puchiye.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedLocation('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
            >
              Show All Properties
            </button>
          </div>
        )}

        {/* Inline EMI Calculator Anchor Section */}
        <div id="calculator" className="mt-16">
          <EmiCalculator />
        </div>

        {/* Inline Partner Section */}
        <div id="partners" className="mt-16">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl">
            <PartnerSection onClose={() => setShowPartnerModal(false)} />
          </div>
        </div>
      )}

      {/* Dedicated Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl">
            <EmiCalculator onClose={() => setShowCalculator(false)} />
          </div>
        </div>
      )}

      {/* Floating AI Voice & Chat Assistant (Pooja) */}
      <AiAssistant />
    </div>
  );
}

export default App;
