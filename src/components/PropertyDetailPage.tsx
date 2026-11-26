import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  FileText,
  ExternalLink,
  Camera,
  Video,
  Compass,
  Building2,
  Calendar,
  Phone,
  PlayCircle,
  Landmark
} from 'lucide-react';
import type { Property } from '../types/property';
import { GoogleMapsButton } from './GoogleMapsButton';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
}

const PHOTO_LABELS = [
  'Main Entrance Gate & Site Approach',
  'Stacked Paver Blocks & Demarcated Plots',
  'Wide Interlocking Paver Road Construction',
  'Farmhouse Plots & Perimeter Boundary Wall',
  'Internal Road Network & Curbstones',
  'Green Belt Tree Plantation & Roads',
  'Electricity Poles & Boundary Infrastructure',
  'Finished Interlocking Road Toward Entrance Gate'
];

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ property, onBack }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'videos'>('photos');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIndex(0);
    setActiveMediaTab('photos');
    setIsBooked(false);
  }, [property.id]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName || !visitPhone) return;
    setIsBooked(true);
  };

  const getWhatsappInquiryUrl = (customText?: string) => {
    const text =
      customText ||
      `Hello Ajarwal Real Estate Group! I would like complete details, layout map, and site visit booking for "${property.title}" (${property.priceDisplay} | ${property.pricePerUnit}, ${property.subLocation}).`;
    return `https://wa.me/919829000000?text=${encodeURIComponent(text)}`;
  };

  const scrollToVisitForm = () => {
    document.getElementById('book-visit-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 lg:pb-12">
      {/* Sticky Top Action Bar */}
      <div className="sticky top-[88px] sm:top-[110px] z-30 bg-[#140c09]/95 backdrop-blur-xl border-b border-amber-500/25 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-black text-amber-400">
                {property.priceDisplay}{' '}
                <span className="text-xs font-semibold text-slate-300">({property.pricePerUnit})</span>
              </div>
              <div className="text-[10px] text-slate-400">
                {property.areaSize} {property.areaSizeUnit} • {property.approvalStatus}
              </div>
            </div>

            <button
              onClick={scrollToVisitForm}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer"
            >
              Book Your Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width Hero Cover Poster Banner */}
      <section className="relative min-h-[410px] sm:min-h-[480px] w-full overflow-hidden border-b border-amber-500/20 flex items-end">
        <img
          src={property.detailBanner || property.images[0]}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120906] via-[#120906]/65 to-black/35" />

        <div className="media-overlay-dark relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider">
              {property.categoryLabel}
            </span>
            {property.subCategory && (
              <span className="px-3 py-1 rounded-full bg-[#140c09]/85 backdrop-blur border border-amber-400/40 text-amber-300 text-[11px] font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {property.subCategory}
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur border border-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {property.approvalStatus}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
            {property.title}
          </h1>

          <p className="text-xs sm:text-sm text-amber-100/90 mt-2 flex items-center gap-1.5 max-w-3xl">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{property.subLocation}</span>
          </p>

          {/* Key Metric Strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
            <div className="bg-[#140c09]/85 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Special Rate</div>
              <div className="text-base sm:text-xl font-black text-amber-400 mt-0.5">{property.pricePerUnit}</div>
              <div className="text-[10px] text-slate-300">Starts {property.priceDisplay}</div>
            </div>
            <div className="bg-[#140c09]/85 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Plot Sizes</div>
              <div className="text-base sm:text-xl font-black text-white mt-0.5">
                {property.areaSize} {property.areaSizeUnit}
              </div>
              <div className="text-[10px] text-slate-300">Custom Sizes Available</div>
            </div>
            <div className="bg-[#140c09]/85 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Road Network</div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">100 ft Main Road</div>
              <div className="text-[10px] text-slate-300">60 ft & 40 ft Internal</div>
            </div>
            <div className="bg-[#140c09]/85 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Bank Finance</div>
              <div className="text-base sm:text-xl font-black text-amber-400 mt-0.5">
                Up to {property.bankLoanPercentage}%
              </div>
              <div className="text-[10px] text-slate-300">Loan Assistance Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* SECTION 1: PHOTOS & VIDEOS MEDIA GALLERY */}
        <section id="media-gallery" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-white">
                Project Photos & Site Tour Videos
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Inspect actual on-ground road development, gated entrance, boundary walls, and walkthrough media
              </p>
            </div>

            {/* Photos vs Videos Toggle Tabs */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start">
              <button
                onClick={() => setActiveMediaTab('photos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeMediaTab === 'photos'
                    ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Photos ({property.images.length})</span>
              </button>
              <button
                onClick={() => setActiveMediaTab('videos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeMediaTab === 'videos'
                    ? 'bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Videos ({property.videos?.length || 0})</span>
              </button>
            </div>
          </div>

          {/* PHOTOS TAB CONTENT */}
          {activeMediaTab === 'photos' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Main Active Photo Viewer */}
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-amber-500/25 shadow-2xl">
                  <img
                    src={property.images[selectedImageIndex]}
                    alt={`${property.title} view ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="media-overlay-dark absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 bg-[#140c09]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-500/25">
                    <span className="text-xs font-bold text-amber-200">
                      {PHOTO_LABELS[selectedImageIndex] || `Site View ${selectedImageIndex + 1}`}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {selectedImageIndex + 1} / {property.images.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Grid Right Side */}
              <div className="lg:col-span-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 content-start max-h-[480px] overflow-y-auto pr-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`group relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/30'
                        : 'border-slate-800 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/65 px-2 py-1 text-[10px] text-white font-medium truncate">
                      Site Photo {idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIDEOS TAB CONTENT */}
          {activeMediaTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(property.videos || []).map((vid, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 rounded-3xl border border-amber-500/25 overflow-hidden shadow-xl flex flex-col"
                >
                  {vid.url ? (
                    <video controls className="w-full aspect-video bg-black">
                      <source src={vid.url} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="relative aspect-video bg-[#140c09] flex flex-col items-center justify-center p-6 text-center">
                      <img
                        src={property.images[idx + 1] || property.images[0]}
                        alt={vid.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-25"
                      />
                      <div className="relative z-10 flex flex-col items-center space-y-3">
                        <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-400">
                          <PlayCircle className="w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-white text-sm sm:text-base max-w-sm">
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-slate-300 max-w-xs">
                          Full on-site walkthrough video available directly via WhatsApp from our advisory desk.
                        </p>
                        <a
                          href={getWhatsappInquiryUrl(
                            `Hello Ajarwal Real Estate Group! Please send me the site tour video ("${vid.title}") for ${property.title}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#df9b58] text-slate-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Get Site Video on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2: OVERVIEW, HIGHLIGHTS & AMENITIES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Project Overview & Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {property.description}
              </p>

              <div className="pt-2 space-y-2.5">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-amber-400">
                  Key Highlights
                </h3>
                <ul className="space-y-2">
                  {property.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Infrastructure & Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: MAP PIN, PDF LAYOUT MAP & SPECS */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location & Layout Map Actions */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Site Map & Live Navigation</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white">
                Official Layout Plan & Google Maps Pin
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect exact plot dimensions (Blocks F-1 to F-24: 270.87 Sq. Yd. to 1,576.25 Sq. Yd.), 100 ft main road frontage, internal 60 ft / 40 ft roads, parks, and navigate straight to the project site.
              </p>

              <div className="space-y-3 pt-1">
                {property.googleMapsUrl && (
                  <GoogleMapsButton
                    url={property.googleMapsUrl}
                    label="Open Exact Site Pin"
                    className="w-full"
                  />
                )}

                {property.layoutMapPdf && (
                  <a
                    href={property.layoutMapPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs transition"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      View / Download Site Layout Map (PDF)
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Technical Spec Table */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
              <h3 className="font-serif text-lg font-bold text-white">Quick Fact Sheet</h3>
              <div className="divide-y divide-slate-800 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Location</span>
                  <span className="font-bold text-white text-right">{property.location}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Rate</span>
                  <span className="font-bold text-amber-400">{property.pricePerUnit}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Plot Range</span>
                  <span className="font-bold text-white">300 – 3,000 Sq. Yds. (Gaj)</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Legal Status</span>
                  <span className="font-bold text-white">{property.approvalStatus}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Bank Finance</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5" />
                    Up to {property.bankLoanPercentage}% Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CONNECTIVITY DISTANCES & CORPORATE HUB */}
        <section className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Excellent Connectivity & Key Landmarks
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {property.distanceMilestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center"
                >
                  <div className="text-lg sm:text-xl font-black text-amber-400">
                    {milestone.distance}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-medium">{milestone.label}</div>
                </div>
              ))}
            </div>
          </div>

          {property.corporateHubs && property.corporateHubs.length > 0 && (
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Nearby Mahindra SEZ Corporate & Logistics Hub
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {property.corporateHubs.map((corp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200"
                  >
                    {corp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 4: PROFESSIONAL BOOK YOUR SITE VISIT (NO CAB/PICKUP) */}
        <section
          id="book-visit-section"
          className="bg-gradient-to-br from-[#1f120b] via-slate-900 to-[#160c08] p-6 sm:p-8 rounded-3xl border border-amber-500/35 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                On-Site Inspection
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Book Your Site Visit
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Schedule your personalized visit to inspect plot boundaries, road width, and registry documentation directly with our senior property advisor.
              </p>
              <div className="pt-1 flex flex-wrap gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  +91 98290 XXXXX
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              {isBooked ? (
                <div className="p-6 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-9 h-9 text-amber-400 mx-auto" />
                  <h4 className="font-bold text-white text-base">Site Visit Request Confirmed!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, <strong>{visitName}</strong>. Our advisory team will contact you shortly on{' '}
                    <strong>{visitPhone}</strong> to finalize your site visit schedule.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={visitName}
                        onChange={(e) => setVisitName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                        Mobile / WhatsApp No.
                      </label>
                      <input
                        type="tel"
                        required
                        value={visitPhone}
                        onChange={(e) => setVisitPhone(e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer"
                    >
                      Book Your Visit
                    </button>

                    <a
                      href={getWhatsappInquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
