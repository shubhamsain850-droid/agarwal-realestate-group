import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck, Clock, ArrowUpRight } from 'lucide-react';
import type { PropertyCategory } from '../types/property';
import { GoogleMapsButton } from './GoogleMapsButton';

interface FooterProps {
  onSelectCategory: (cat: PropertyCategory | 'all') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t-2 border-amber-500/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Info with Official Logo */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-emblem-sandstone.jpg"
                alt="Ajarwal Real Estate Group Emblem"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
              />
              <div>
                <span className="font-black text-lg text-white font-serif">AJARWAL</span>
                <span className="text-amber-400 text-xs font-bold block">REAL ESTATE GROUP</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Ajarwal Real Estate Group — Trusted property advisory for Jaipur's Ajmer Road, Mahindra SEZ, and Hirapura corridor.
              Verified farmhouse estates, plotted land, and transparent registry & loan support.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Verified Documentation & Transparent Deals</span>
            </div>
          </div>

          {/* Core Categories */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Property Categories</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory('farmhouse')} className="text-left block w-full hover:text-amber-400 transition cursor-pointer">
                  Weekend Farmhouses (Hirapura / SEZ)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('plot')} className="text-left block w-full hover:text-amber-400 transition cursor-pointer">
                  Plots (Upcoming)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('villa')} className="text-left block w-full hover:text-amber-400 transition cursor-pointer">
                  Luxury Villas (Upcoming)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('commercial')} className="text-left block w-full hover:text-amber-400 transition cursor-pointer">
                  Commercial Plots (Upcoming)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('land')} className="text-left block w-full hover:text-amber-400 transition cursor-pointer">
                  90A (Upcoming)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hotel-resort')} className="text-left block w-full hover:text-amber-400 transition cursor-pointer">
                  Hotel & Resort (Upcoming)
                </button>
              </li>
            </ul>
          </div>

          {/* Key Locations */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Coverage Areas</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Hirapura (Near Mahindra SEZ)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ajay Rajpura – Hirapura Belt</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Mahindra World City Corridor</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Diggi – Renwal Road Stretch</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Muhana & Jaipur Ring Road</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ajmer Road (NH-48) Corridor</span>
              </li>
            </ul>
          </div>

          {/* Highlighted Head Office & Contact Card */}
          <div className="lg:col-span-4">
            <div className="footer-office-card bg-slate-900 border border-amber-500/35 rounded-2xl p-5 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Head Office & Contact</span>
                </h4>
                <span className="footer-office-badge px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Open Daily
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-slate-200 font-medium">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Ajarwal Real Estate Group, Jaipur, Rajasthan</span>
              </div>

              <GoogleMapsButton
                url="https://maps.app.goo.gl/it2rKAKRhp2kzAx29?g_st=awb"
                label="Head Office Pin"
                className="w-full footer-maps-btn"
              />

              <div className="grid grid-cols-1 gap-2 pt-1">
                <div className="footer-contact-row flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300">
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Helpline: <strong className="text-white">+91 98290 XXXXX</strong></span>
                  </span>
                </div>

                <a
                  href="mailto:contact@ajarwalrealestategroup.com"
                  className="footer-contact-row flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 hover:border-amber-400/50 transition"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">contact@ajarwalrealestategroup.com</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </a>

                <div className="footer-contact-row flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Office Hours: Monday – Sunday (9:00 AM – 8:00 PM)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-slate-500 space-y-2 text-[11px] max-w-4xl mx-auto px-2 sm:px-28">
          <p>
            Disclaimer: All property dimensions, rates, and legal details on this portal are shared transparently based on project records. Buyers are advised to inspect physical title documents prior to final registration.
          </p>
          <p className="font-semibold">
            © {new Date().getFullYear()} Ajarwal Real Estate Group. All Rights Reserved. Serving Jaipur Real Estate Growth.
          </p>
        </div>
      </div>
    </footer>
  );
};
