export type RealEstateTheme = 
  | 'jaipur-sandstone' 
  | 'emerald-gold' 
  | 'corporate-blue' 
  | 'midnight-gold' 
  | 'clean-ivory';

export interface ThemeConfig {
  id: RealEstateTheme;
  name: string;
  hindiName: string;
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
    name: 'Jaipur Sandstone & Terracotta',
    hindiName: 'जयपुर सैंडस्टोन & टेराकोटा (डिफ़ॉल्ट)',
    tagline: 'Authentic Pink City Heritage & Warmth',
    bestFor: 'Luxury Heritage Villas, Farmhouse Retreats, Local Culture',
    palette: {
      bg: '#140c09',
      card: '#1f130e',
      primary: '#ea580c',
      accent: '#f59e0b',
      text: '#fff5f0'
    }
  },
  {
    id: 'emerald-gold',
    name: 'Royal Emerald & Gold',
    hindiName: 'रॉयल एमराल्ड & गोल्ड',
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
    hindiName: 'मॉडर्न कॉर्पोरेट सफायर',
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
    hindiName: 'मिडनाइट ओब्सीडियन & गोल्ड',
    tagline: 'Ultra-Luxury VIP & High-Ticket Estates',
    bestFor: 'High-Net-Worth Investors, Premium Duplexes, Elite Estates',
    palette: {
      bg: '#000000',
      card: '#0a0a0a',
      primary: '#eab308',
      accent: '#f59e0b',
      text: '#ffffff'
    }
  },
  {
    id: 'clean-ivory',
    name: 'Clean Ivory & Platinum Light',
    hindiName: 'क्लीन आइवरी & प्लैटिनम (लाइट थीम)',
    tagline: 'High-Readability Daytime Corporate Architecture',
    bestFor: 'Corporate Portals, High-Contrast Reading, Daytime Browsing',
    palette: {
      bg: '#f8fafc',
      card: '#ffffff',
      primary: '#059669',
      accent: '#d97706',
      text: '#0f172a'
    }
  }
];
