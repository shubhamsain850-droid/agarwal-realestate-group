import React, { useState } from 'react';
import { X, MapPin, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import type { Property } from '../types/property';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [needPickup, setNeedPickup] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  if (!property) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName || !visitPhone) return;
    setIsBooked(true);
  };

  const getWhatsappInquiryUrl = () => {
    const text = `Namaste Agarwal Real Estate Group! Mujhe "${property.title}" (${property.priceDisplay}, Location: ${property.subLocation}) ka brochure aur layout plan bhejiye. Mera naam ${visitName || 'grahak'} hai.`;
    return `https://wa.me/919829000000?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {property.categoryLabel}
            </span>
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {property.approvalStatus} {property.reraId ? `• RERA: ${property.reraId}` : ''}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={property.images[selectedImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-sm font-bold text-amber-400">
                {property.priceDisplay} ({property.pricePerUnit})
              </div>
            </div>

            {property.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Core Location */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <MapPin className="w-4 h-4" />
              <span>{property.subLocation}, Bhankrota, Jaipur ({property.pincode})</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {property.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-[11px] text-slate-400">Plot / Built Size</div>
              <div className="text-sm font-bold text-white mt-0.5">{property.areaSize} {property.areaSizeUnit}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Facing Direction</div>
              <div className="text-sm font-bold text-white mt-0.5">{property.facing}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Approach Road</div>
              <div className="text-sm font-bold text-white mt-0.5">{property.roadWidth}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Bank Loan</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">Up to {property.bankLoanPercentage}% Approved</div>
            </div>
          </div>

          {/* Amenities & Infrastructure */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Township Amenities & Features:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Distance Milestones */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Connectivity & Key Landmarks:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {property.distanceMilestones.map((milestone, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-base font-extrabold text-amber-400">{milestone.distance}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{milestone.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Book Site Visit Form */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-5 rounded-2xl border border-emerald-800/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">Book Free Site Visit (Site Inspection)</h4>
                <p className="text-xs text-slate-400">Hamari car aapko Bhankrota office ya ghar se pickup kar degi.</p>
              </div>
              <span className="hidden sm:inline bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                100% Free Service
              </span>
            </div>

            {isBooked ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="font-bold text-white text-sm">Site Visit Request Received!</h5>
                <p className="text-xs text-slate-300">
                  Dhanyawad {visitName}! Agarwal Real Estate Group ki Bhankrota team aapse 15 minute ke andar sampark karegi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={visitName}
                    onChange={(e) => setVisitName(e.target.value)}
                    placeholder="Aapka Naam (Full Name)"
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="tel"
                    required
                    value={visitPhone}
                    onChange={(e) => setVisitPhone(e.target.value)}
                    placeholder="Mobile / WhatsApp Number"
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needPickup}
                      onChange={(e) => setNeedPickup(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>Mujhe Bhankrota / Mansarovar se pickup car chahiye</span>
                  </label>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    Confirm Site Visit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Bottom Contact Strip */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            Direct Helpline: <strong>+91 98290 XXXXX</strong> (Agarwal Group Office)
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={getWhatsappInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Brochure on WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
