import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Handshake } from 'lucide-react';

interface PartnerSectionProps {
  onClose?: () => void;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({ onClose }) => {
  const [partnerType, setPartnerType] = useState('colonizer');
  const [landDetails, setLandDetails] = useState({
    name: '',
    phone: '',
    location: '',
    landSize: '',
    propertyType: 'Residential Plots',
    priceExpectation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!landDetails.name || !landDetails.phone) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-slate-800 shadow-2xl max-w-5xl mx-auto my-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
            <Handshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Colonizers, Builders & Land Owners Partner Desk</h3>
            <p className="text-xs text-slate-400">Apni zameen ya plotted township ko Agarwal Real Estate Group ke sath sale karwayein</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      {submitted ? (
        <div className="p-8 text-center space-y-3 bg-slate-950 rounded-2xl border border-emerald-500/30">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">Partner Application Received!</h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Dhanyawad {landDetails.name}! Agarwal Real Estate Group ke senior acquisition head aapse Bhankrota office me meeting ke liye 24 ghante me contact karenge.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => setPartnerType('colonizer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                partnerType === 'colonizer'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              I am a Colonizer / Developer (Plotted Scheme)
            </button>
            <button
              type="button"
              onClick={() => setPartnerType('landowner')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                partnerType === 'landowner'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              I am a Land Owner / Farmer (Sell Agriculture / 90A Land)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Aapka Naam (Full Name)</label>
              <input
                type="text"
                required
                value={landDetails.name}
                onChange={(e) => setLandDetails({ ...landDetails, name: e.target.value })}
                placeholder="Ramesh Agarwal / colonizer name"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Mobile / WhatsApp Number</label>
              <input
                type="tel"
                required
                value={landDetails.phone}
                onChange={(e) => setLandDetails({ ...landDetails, phone: e.target.value })}
                placeholder="+91 98290 XXXXX"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Location of Land / Scheme</label>
              <input
                type="text"
                required
                value={landDetails.location}
                onChange={(e) => setLandDetails({ ...landDetails, location: e.target.value })}
                placeholder="e.g. Near Ring Road cut, Bhankrota"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Total Size (Gaj / Bigha)</label>
              <input
                type="text"
                required
                value={landDetails.landSize}
                onChange={(e) => setLandDetails({ ...landDetails, landSize: e.target.value })}
                placeholder="e.g. 50 Plots or 5 Bigha"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Approval Status</label>
              <select
                value={landDetails.propertyType}
                onChange={(e) => setLandDetails({ ...landDetails, propertyType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              >
                <option value="JDA Approved Scheme">JDA Approved (Single Patta)</option>
                <option value="90A Converted Land">90A Converted Commercial/Residential</option>
                <option value="Agriculture Land">Agricultural Land</option>
                <option value="Gated Villa Project">Villa Project</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Expected Rate / Price</label>
              <input
                type="text"
                value={landDetails.priceExpectation}
                onChange={(e) => setLandDetails({ ...landDetails, priceExpectation: e.target.value })}
                placeholder="e.g. ₹35,000/Gaj or ₹1 Cr/Bigha"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict confidentiality guaranteed. Direct developer channel partnership.</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs transition cursor-pointer"
            >
              Submit Property for Listing
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
