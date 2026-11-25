import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';
import type { PropertyCategory } from '../types/property';

interface FooterProps {
  onSelectCategory: (cat: PropertyCategory | 'all') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info with Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-emblem.jpg"
                alt="Ajarwal Real Estate Group Emblem"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
              />
              <div>
                <span className="font-black text-lg text-white font-serif">AJARWAL</span>
                <span className="text-amber-400 text-xs font-bold block">REAL ESTATE GROUP</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Bhankrota (Pincode: 302026), Ajmer Road corridor ki sabse vishwasniya property advisory. 
              Single JDA Patta plots, gated villas, farmhouses aur highway commercial zameen me 100% legal title assurance.
            </p>

            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Rajasthan RERA & JDA Compliant Portal</span>
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Property Categories</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory('plot')} className="hover:text-emerald-400 transition cursor-pointer">
                  JDA Approved Residential Plots
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('villa')} className="hover:text-emerald-400 transition cursor-pointer">
                  Luxury Duplex Villas (Bhankrota)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('farmhouse')} className="hover:text-emerald-400 transition cursor-pointer">
                  Gated Weekend Farmhouses (Boraj Belt)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('commercial')} className="hover:text-emerald-400 transition cursor-pointer">
                  Highway Commercial SCO & Shops
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('land')} className="hover:text-emerald-400 transition cursor-pointer">
                  1 to 10 Bigha Commercial / Warehouse Land
                </button>
              </li>
            </ul>
          </div>

          {/* Key Locations */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Coverage Areas</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Bhankrota 200 ft Bypass (302026)</li>
              <li>Jaisinghpura Link Road</li>
              <li>Mahapura SEZ Road Corridor</li>
              <li>Ring Road Cloverleaf Junction</li>
              <li>Near Delhi Public School (DPS) Ajmer Road</li>
              <li>Bad ke Balaji & Omaxe City Stretch</li>
              <li>Boraj - Begus Farmhouse Green Belt</li>
            </ul>
          </div>

          {/* Office Address & Helpline */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Head Office & Contact</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Ajarwal Real Estate Group, Main Ajmer Road, Bhankrota Chauraha, Jaipur, Rajasthan - 302026</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Helpline: +91 98290 XXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Email: contact@ajarwalrealestategroup.com</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                Office Hours: Monday – Sunday (9:00 AM – 8:00 PM)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 pt-8 border-t border-slate-900 text-center text-slate-500 space-y-2 text-[11px]">
          <p>
            Disclaimer: All property dimensions, rates, and specifications on this portal are verified against Jaipur Development Authority (JDA) and Rajasthan RERA records. Buyers are advised to inspect physical patta documents prior to final registration.
          </p>
          <p>
            © {new Date().getFullYear()} Ajarwal Real Estate Group. All Rights Reserved. Crafted with dedication for Bhankrota & Jaipur Growth.
          </p>
        </div>
      </div>
    </footer>
  );
};
