import React from 'react';
import { useRealEstateTheme } from '../context/ThemeContext';
import { Palette, Check, X, Sparkles } from 'lucide-react';
import type { RealEstateTheme } from '../types/theme';

export const ThemeSelectorModal: React.FC = () => {
  const { currentTheme, setTheme, availableThemes, isThemeModalOpen, closeThemeModal } =
    useRealEstateTheme();

  if (!isThemeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white">Select Real Estate Website Theme</h3>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  {availableThemes.length} Curated Palettes
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Choose an aesthetic that matches your brand & target buyers (Plots, Villas, Commercial)
              </p>
            </div>
          </div>

          <button
            onClick={closeThemeModal}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Cards Grid */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {availableThemes.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => setTheme(theme.id as RealEstateTheme)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-amber-400 bg-slate-800/90 shadow-lg shadow-amber-950/30'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Left Info */}
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-white text-sm sm:text-base">{theme.name}</h4>
                    <span className="text-xs text-amber-400 font-medium">({theme.hindiName})</span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{theme.tagline}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>Best suited for: <strong>{theme.bestFor}</strong></span>
                  </p>
                </div>

                {/* Right Color Swatches */}
                <div className="flex items-center gap-2 shrink-0 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <div
                    className="w-6 h-6 rounded-full border border-slate-700 shadow-sm"
                    style={{ backgroundColor: theme.palette.bg }}
                    title="Background"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-slate-700 shadow-sm"
                    style={{ backgroundColor: theme.palette.card }}
                    title="Cards & Modals"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-slate-700 shadow-sm"
                    style={{ backgroundColor: theme.palette.primary }}
                    title="Primary Accent"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-slate-700 shadow-sm"
                    style={{ backgroundColor: theme.palette.accent }}
                    title="Gold / Highlight"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Selected theme is automatically saved to your browser.
          </span>
          <button
            onClick={closeThemeModal}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold text-xs transition cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
