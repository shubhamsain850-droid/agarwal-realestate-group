import React from 'react';
import { ShieldCheck, Compass, MapPin, CheckCircle2, MessageCircle, Eye } from 'lucide-react';
import type { Property } from '../types/property';
import { GoogleMapsButton } from './GoogleMapsButton';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onBookVisit: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onBookVisit
}) => {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'plot':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'villa':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'farmhouse':
        return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'commercial':
        return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'hotel-resort':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getWhatsappLink = () => {
    const text = `Hello Ajarwal Real Estate Group! I would like to inquire about "${property.title}" (${property.priceDisplay}, ${property.subLocation}). Please share the verified layout plan, brochure, and video tour.`;
    return `https://wa.me/919829000000?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="group bg-slate-900 rounded-3xl border border-slate-800 hover:border-emerald-500/50 shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
      {/* Card Container Click Opens Full Page */}
      <div
        onClick={() => onSelect(property)}
        className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={property.cardCover || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="media-scrim-dark absolute inset-0" />

        {/* Top Badges */}
        <div className="media-overlay-dark absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border bg-[#071636]/90 backdrop-blur-md uppercase tracking-wider ${getBadgeColor(property.category)}`}>
            {property.categoryLabel}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#071636]/90 text-white border border-amber-400/45 flex items-center gap-1 backdrop-blur-md">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            {property.approvalStatus}
          </span>
        </div>

        {/* Bottom Image Stats Overlay */}
        <div className="media-overlay-dark absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">
              {property.priceDisplay}
            </div>
            <div className="text-[11px] font-medium text-slate-300">
              {property.pricePerUnit}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-lg">
              {property.areaSize} {property.areaSizeUnit}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Area Subcategory & Location Pin */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold min-w-0">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{property.subCategory || property.location}</span>
            </div>
            {property.googleMapsUrl && (
              <GoogleMapsButton url={property.googleMapsUrl} compact />
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition line-clamp-2">
            {property.title}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 truncate">{property.subLocation}</p>

          {/* Quick Specification Badges */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>Facing: <strong className="text-white">{property.facing}</strong></span>
            </div>
            <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
              <span>Road: <strong className="text-white">{property.roadWidth}</strong></span>
            </div>
          </div>

          {/* Key Checklist Highlights */}
          <ul className="mt-3 space-y-1 text-xs text-slate-400">
            {property.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons Row */}
        <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => onSelect(property)}
            className="flex-1 flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <a
            href={getWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center cursor-pointer"
            title="WhatsApp Inquiry"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => onBookVisit(property)}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition cursor-pointer whitespace-nowrap"
          >
            Book Visit
          </button>
        </div>
      </div>
    </div>
  );
};
