import React, { createContext, useContext, useState, useEffect } from 'react';
import type { RealEstateTheme, ThemeConfig } from '../types/theme';
import { REAL_ESTATE_THEMES } from '../types/theme';

interface ThemeContextType {
  currentTheme: RealEstateTheme;
  themeConfig: ThemeConfig;
  setTheme: (theme: RealEstateTheme) => void;
  availableThemes: ThemeConfig[];
  isThemeModalOpen: boolean;
  openThemeModal: () => void;
  closeThemeModal: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<RealEstateTheme>(() => {
    const saved = localStorage.getItem('ajarwal_re_theme') as RealEstateTheme;
    if (saved && REAL_ESTATE_THEMES.some((t) => t.id === saved)) {
      return saved;
    }
    // Default to user's favorite Jaipur Sandstone & Terracotta
    return 'jaipur-sandstone';
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const themeConfig =
    REAL_ESTATE_THEMES.find((t) => t.id === currentTheme) || REAL_ESTATE_THEMES[0];

  useEffect(() => {
    // Apply data-theme to root html element
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('ajarwal_re_theme', currentTheme);

    // Also toggle dark class for clean-ivory
    if (currentTheme === 'clean-ivory') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [currentTheme]);

  const setTheme = (theme: RealEstateTheme) => {
    setCurrentThemeState(theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig,
        setTheme,
        availableThemes: REAL_ESTATE_THEMES,
        isThemeModalOpen,
        openThemeModal: () => setIsThemeModalOpen(true),
        closeThemeModal: () => setIsThemeModalOpen(false)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useRealEstateTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useRealEstateTheme must be used within a ThemeProvider');
  }
  return context;
};
