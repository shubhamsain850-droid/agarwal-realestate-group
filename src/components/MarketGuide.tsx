import React from 'react';
import { TrendingUp, Building2, Route, ShieldCheck } from 'lucide-react';

export const MarketGuide: React.FC = () => {
  return (
    <section className="bg-slate-950 py-16 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Infrastructure & Location Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Why Invest in the Mahindra SEZ & Ajmer Road Belt?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The Hirapura – Ajmer Road corridor around Mahindra World City SEZ is one of Jaipur's rapidly developing industrial, warehousing, and weekend farmhouse growth zones.
          </p>
        </div>

        {/* 4 Pillar Growth Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-lg mb-4">
              01
            </div>
            <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mahindra World City SEZ</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Surrounded by major corporate campuses including Infosys, JCB, Deutsche Bank, Genpact, Wipro, ICICI Bank, MetLife, Mahindra & Mahindra, and Nagarro.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-lg mb-4">
              02
            </div>
            <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Logistics & Warehousing Hub</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Situated within the rapidly expanding commercial warehousing corridor near Oswal Warehouse, Flipkart, and Amazon logistics hubs driving steady land appreciation.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-lg mb-4">
              03
            </div>
            <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
              <Route className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100 ft & Ring Road Access</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connected via 100 ft wide approach road linking Mahindra World City and Jaipur–Diggi Road, with easy connectivity to Renwal Road and Muhana Ring Road.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-lg mb-4">
              04
            </div>
            <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Direct Registry & Loan</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clean documentation and registry process with organized plot demarcation, internal paver roads, boundary walls, and up to 70% loan assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
