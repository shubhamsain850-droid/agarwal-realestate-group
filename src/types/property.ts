export type PropertyCategory = 'plot' | 'villa' | 'farmhouse' | 'commercial' | 'land';

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  categoryLabel: string;
  subCategory?: string; // Location / Area subcategory for grouping deals
  location: string;
  subLocation: string;
  pincode: string;
  price: number; // in INR
  priceDisplay: string;
  pricePerUnit: string; // e.g. "₹42,000 / Gaj" or "₹5,200 / sq.ft."
  areaSize: number; // in sq yards
  areaSizeUnit: string; // "Gaj" or "Sq. Yd." or "Bigha"
  facing: 'East' | 'North' | 'North-East' | 'West' | 'Corner';
  roadWidth: string; // e.g. "40 ft road", "60 ft sector road"
  approvalStatus: 'JDA Approved' | 'JDA 90A Approved' | 'Society Patta' | 'RERA Registered' | 'Agriculture (Registry)';
  reraId?: string;
  bankLoanAvailable: boolean;
  bankLoanPercentage: number; // e.g. 80
  featured: boolean;
  images: string[];
  googleMapsUrl?: string;
  layoutMapPdf?: string;
  description: string;
  highlights: string[];
  amenities: string[];
  distanceMilestones: { label: string; distance: string }[];
  readyToRegistry: boolean;
}

export interface PropertyFilter {
  category: PropertyCategory | 'all';
  location: string;
  maxBudget: number;
  roadWidth: string;
  minSize: number;
}
