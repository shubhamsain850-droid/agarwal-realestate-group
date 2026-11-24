import React from 'react';
import { TrendingUp, Compass, MapPin } from 'lucide-react';

export const MarketGuide: React.FC = () => {
  return (
    <section className="bg-slate-950 py-16 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Investment & Infrastructure Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Why Invest in Bhankrota & Ajmer Road Corridor?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Bhankrota is currently Jaipur's fastest growing residential and commercial belt. 
            Jaipur Nagar Nigam area pincode 302026 offers higher capital appreciation than saturated central zones like Mansarovar or Vaishali Nagar.
          </p>
        </div>

        {/* 4 Pillar Growth Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-lg mb-4">
              01
            </div>
            <h3 className="font-bold text-white text-base mb-2">Jaipur Ring Road Connectivity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct interchange connecting Ajmer Road to Tonk Road, Agra Road, and the Delhi-Mumbai Expressway spur. Multi-fold commercial and plotted appreciation.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-lg mb-4">
              02
            </div>
            <h3 className="font-bold text-white text-base mb-2">Mahindra World City SEZ</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              100+ global enterprises (Infosys, Deutsche Bank, JCB, MetLife) driving guaranteed executive rental demand and high-income home buyers to Bhankrota.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-sky-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-black text-lg mb-4">
              03
            </div>
            <h3 className="font-bold text-white text-base mb-2">200 Ft Master Plan Roads</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wide sector roads linking Bhankrota to Jaisinghpura, Muhana Mandi, and Mansarovar Extension ensure high traffic flow and seamless intra-city transit.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-teal-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-black text-lg mb-4">
              04
            </div>
            <h3 className="font-bold text-white text-base mb-2">Jaipur Nagar Nigam 302026</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete municipal infrastructure under Jaipur Nagar Nigam Greater—piped water, underground electricity, government streetlights, and rapid metro surveys.
            </p>
          </div>
        </div>

        {/* Local Rate Benchmark Comparison Table */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-6 border border-slate-800">
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Price Benchmark: Bhankrota vs Adjoining Jaipur Localities (Per Gaj Rates)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Locality</th>
                  <th className="py-3 px-4">Avg Plot Rate (Per Gaj)</th>
                  <th className="py-3 px-4">3-Year Growth Rate</th>
                  <th className="py-3 px-4">Key Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="bg-emerald-950/20 font-semibold text-emerald-300">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <strong>Bhankrota (302026)</strong>
                  </td>
                  <td className="py-3 px-4 text-white">₹38,000 – ₹48,000 / Gaj</td>
                  <td className="py-3 px-4 text-emerald-400">+22% YoY (Fastest)</td>
                  <td className="py-3 px-4 text-slate-300">Affordable entry, Ring Road + SEZ boom</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Jaisinghpura Corridor</td>
                  <td className="py-3 px-4">₹35,000 – ₹42,000 / Gaj</td>
                  <td className="py-3 px-4">+18% YoY</td>
                  <td className="py-3 px-4">Connected to 200 ft link road</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Mansarovar Extension</td>
                  <td className="py-3 px-4">₹65,000 – ₹85,000 / Gaj</td>
                  <td className="py-3 px-4">+10% YoY</td>
                  <td className="py-3 px-4">Saturated, high initial capital required</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Vaishali Nagar West</td>
                  <td className="py-3 px-4">₹90,000 – ₹1,40,000 / Gaj</td>
                  <td className="py-3 px-4">+8% YoY</td>
                  <td className="py-3 px-4">Expensive, low room for 2x capital gain</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Boraj - Begus (Farmhouse Belt)</td>
                  <td className="py-3 px-4">₹8,000 – ₹12,000 / Gaj</td>
                  <td className="py-3 px-4">+25% YoY</td>
                  <td className="py-3 px-4">Huge land size, weekend retreat lifestyle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
