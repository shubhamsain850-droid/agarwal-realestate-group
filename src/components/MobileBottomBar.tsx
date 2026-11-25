import React from 'react';
import { MessageCircle, Calculator, Sparkles, Building2 } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenAiCall: () => void;
  onOpenCalculator: () => void;
  onScrollToProperties: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenAiCall,
  onOpenCalculator,
  onScrollToProperties
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 shadow-[0_-10px_25px_rgba(0,0,0,0.7)]">
      <div className="grid grid-cols-4 gap-1.5 items-center">
        {/* Properties / Explore */}
        <button
          onClick={onScrollToProperties}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 active:scale-95 transition cursor-pointer"
        >
          <Building2 className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Plots/Villas</span>
        </button>

        {/* AI Voice Call Button (Hero Element) */}
        <button
          onClick={onOpenAiCall}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/50 active:scale-95 transition cursor-pointer relative"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-extrabold mt-1 tracking-tight text-white">Call AI Pooja</span>
        </button>

        {/* EMI Calc */}
        <button
          onClick={onOpenCalculator}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 active:scale-95 transition cursor-pointer"
        >
          <Calculator className="w-5 h-5 text-sky-400" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">EMI Calc</span>
        </button>

        {/* WhatsApp Quick Link */}
        <a
          href="https://wa.me/919829000000?text=Namaste%20Ajarwal%20Real%20Estate%20Group!%20Mujhe%20Bhankrota%20property%20ki%20details%20chahiye."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 active:scale-95 transition cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
