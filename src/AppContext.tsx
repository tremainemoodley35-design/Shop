import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType, ThemeConfig, LocalizationConfig } from './types';
import { THEMES, LOCALIZATION_MAP } from './constants';

interface AppContextType {
  theme: ThemeConfig;
  setTheme: (type: ThemeType) => void;
  loc: LocalizationConfig;
  formatPrice: (price: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('royal');
  const [loc, setLoc] = useState<LocalizationConfig>(LOCALIZATION_MAP.DEFAULT);

  useEffect(() => {
    // Detect location/country
    const detectLoc = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const countryCode = data.country_code;
        setLoc(LOCALIZATION_MAP[countryCode] || LOCALIZATION_MAP.DEFAULT);
      } catch (e) {
        console.error('Loc detection failed', e);
      }
    };
    detectLoc();
  }, []);

  const theme = THEMES.find(t => t.id === themeType) || THEMES[0];

  const formatPrice = (price: number) => {
    const converted = price * loc.rate;
    return `${loc.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme: setThemeType, loc, formatPrice }}>
      <div style={{ 
        '--color-primary': theme.primary,
        '--color-secondary': theme.secondary,
        '--color-bg': theme.bg,
        '--glow-color': theme.glow,
      } as any}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
