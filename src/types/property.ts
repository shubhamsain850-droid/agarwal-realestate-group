export type ProjectCity = 'Jaipur' | 'Mumbai';

export const PROJECT_CITIES: { id: ProjectCity | 'all'; label: string }[] = [
  { id: 'all', label: 'All Cities' },
  { id: 'Jaipur', label: 'Jaipur' },
  { id: 'Mumbai', label: 'Mumbai' }
];

export type PropertyCategory = 'plot' | 'villa' | 'farmhouse' | 'commercial' | 'land' | 'hotel-resort';

export interface Property {
  id: string;
  city: ProjectCity;
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
  heroPoster?: string;
  cardCover?: string;
  detailBanner?: string;
  images: string[];
  videos?: { title: string; duration?: string; url?: string }[];
  googleMapsUrl?: string;
  layoutMapPdf?: string;
  description: string;
  highlights: string[];
  amenities: string[];
  corporateHubs?: string[];
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
