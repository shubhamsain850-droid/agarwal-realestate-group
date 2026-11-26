export type RealEstateTheme =
  | 'jaipur-sandstone'
  | 'royal-white-blue-gold'
  | 'champagne-marble'
  | 'sage-sandstone-light'
  | 'pearl-slate-teal'
  | 'clean-ivory'
  | 'emerald-gold'
  | 'corporate-blue'
  | 'midnight-gold';

export interface ThemeConfig {
  id: RealEstateTheme;
  name: string;
  hindiName: string;
  mode: 'Light' | 'Dark';
  tagline: string;
  bestFor: string;
  palette: {
    bg: string;
    card: string;
    primary: string;
    accent: string;
    text: string;
  };
}

export const REAL_ESTATE_THEMES: ThemeConfig[] = [
  {
    id: 'jaipur-sandstone',
    name: 'Amber Sandstone & Terracotta',
    hindiName: 'Jaipur Heritage Edition',
    mode: 'Dark',
    tagline: 'Authentic Pink City Amber Sandstone & Warm Gold',
    bestFor: 'Luxury Heritage Villas, Farmhouse Retreats, Local Culture',
    palette: {
      bg: '#140c09',
      card: '#1f130e',
      primary: '#df9b58',
      accent: '#c86446',
      text: '#fff5f0'
    }
  },
  {
    id: 'royal-white-blue-gold',
    name: 'Royal White, Blue & Gold',
    hindiName: 'White • Royal Blue • Gold',
    mode: 'Light',
    tagline: 'Crisp Pearl White, Imperial Royal Blue & 24K Gold Luxury',
    bestFor: 'Corporate Luxury Estates, NRI Buyers, Clean Daylight Presentation',
    palette: {
      bg: '#f8fafc',
      card: '#ffffff',
      primary: '#1e3a8a',
      accent: '#d4af37',
      text: '#0f2557'
    }
  },
  {
    id: 'champagne-marble',
    name: 'Champagne Cream & Walnut Gold',
    hindiName: 'Lightweight Oberoi / Marble Style',
    mode: 'Light',
    tagline: 'Warm Alabaster Cream, Silk White & Antique Champagne Gold',
    bestFor: 'Ultra-Luxury Estates, High-Trust Editorial Feel, Soft Eyesight',
    palette: {
      bg: '#faf7f2',
      card: '#ffffff',
      primary: '#78350f',
      accent: '#c99a3b',
      text: '#2d1a10'
    }
  },
  {
    id: 'sage-sandstone-light',
    name: 'Mint Sage & Desert Gold',
    hindiName: 'Lightweight Farmhouse Eco Edition',
    mode: 'Light',
    tagline: 'Airy Botanical Off-White, Forest Sage & Warm Desert Gold',
    bestFor: 'Weekend Farmhouses, Nature Retreats & Hirapura Estates',
    palette: {
      bg: '#f4f8f5',
      card: '#ffffff',
      primary: '#14532d',
      accent: '#b4782e',
      text: '#102a1d'
    }
  },
  {
    id: 'pearl-slate-teal',
    name: 'Pearl Mist, Slate & Copper',
    hindiName: 'Lightweight Architectural Studio',
    mode: 'Light',
    tagline: 'Breezy Sky White, Deep Petrol Slate & Muted Copper Gold',
    bestFor: 'Modern Townships, Tech Professionals & Clean Daylight Browsing',
    palette: {
      bg: '#f4f8fb',
      card: '#ffffff',
      primary: '#0f3d4c',
      accent: '#c27838',
      text: '#0f2a33'
    }
  },
  {
    id: 'clean-ivory',
    name: 'Clean Ivory & Emerald Light',
    hindiName: 'Daylight Architectural Edition',
    mode: 'Light',
    tagline: 'High-Readability Minimal Ivory & Classic Emerald Gold',
    bestFor: 'Corporate Portals, High-Contrast Reading, Daytime Browsing',
    palette: {
      bg: '#f8fafc',
      card: '#ffffff',
      primary: '#059669',
      accent: '#d97706',
      text: '#0f172a'
    }
  },
  {
    id: 'emerald-gold',
    name: 'Royal Emerald & Gold',
    hindiName: 'JDA Trust & Prosperity Edition',
    mode: 'Dark',
    tagline: 'Classic Rajasthani Prosperity & JDA Trust',
    bestFor: 'JDA Plots, Land Investment, Traditional Trust',
    palette: {
      bg: '#020617',
      card: '#0f172a',
      primary: '#10b981',
      accent: '#f59e0b',
      text: '#f8fafc'
    }
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Sapphire',
    hindiName: 'Modern Commercial Edition',
    mode: 'Dark',
    tagline: 'High-Tech Commercial & Institutional Focus',
    bestFor: 'Commercial SCO, Mahindra SEZ Tech Buyers, IT Corridor',
    palette: {
      bg: '#030712',
      card: '#0c1527',
      primary: '#3b82f6',
      accent: '#06b6d4',
      text: '#f8fafc'
    }
  },
  {
    id: 'midnight-gold',
    name: 'Midnight Obsidian & Gold',
    hindiName: 'VIP Ultra-Luxury Edition',
    mode: 'Dark',
    tagline: 'Ultra-Luxury VIP & High-Ticket Estates',
    bestFor: 'High-Net-Worth Investors, Premium Duplexes, Elite Estates',
    palette: {
      bg: '#000000',
      card: '#0a0a0a',
      primary: '#eab308',
      accent: '#f59e0b',
      text: '#ffffff'
    }
  }
];
