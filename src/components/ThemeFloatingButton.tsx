import React from 'react';
import { useRealEstateTheme } from '../context/ThemeContext';
import { Palette } from 'lucide-react';

export const ThemeFloatingButton: React.FC = () => {
  const { themeConfig, openThemeModal } = useRealEstateTheme();

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40">
      <button
        onClick={openThemeModal}
        className="group flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-slate-200 hover:text-white px-3.5 py-2.5 rounded-full shadow-2xl border border-slate-700 hover:border-amber-400/60 transition-all hover:scale-105 cursor-pointer"
        title="Change Real Estate Website Theme"
      >
        <div className="relative">
          <Palette className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Theme</div>
          <div className="text-[11px] font-bold text-emerald-400 truncate max-w-[110px]">
            {themeConfig.name.split(' ')[0]}
          </div>
        </div>
        {/* Color preview dot */}
        <span
          className="w-2.5 h-2.5 rounded-full border border-slate-700 shadow-sm"
          style={{ backgroundColor: themeConfig.palette.primary }}
        />
      </button>
    </div>
  );
};
