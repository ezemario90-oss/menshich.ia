import React, { createContext, useMemo, useState, PropsWithChildren } from 'react';

type BrandTheme = {
  logoUrl?: string;
  brandPrimary: string;
  brandBackground: string;
  brandText: string;
  brandSurface: string;
  [key: string]: string | undefined;
};

type ThemeCtx = {
  theme: BrandTheme;
  setTheme: (t: BrandTheme) => void;
};

export const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export const ThemeProvider: React.FC<PropsWithChildren<{ initial?: BrandTheme }>> = ({ children, initial }) => {
  const [theme, setTheme] = useState<BrandTheme>(
    initial ?? {
      logoUrl: '',
      brandPrimary: '#4F46E5',
      brandBackground: '#F7F8FB',
      brandText: '#1F2937',
      brandSurface: '#FFFFFF',
    }
  );

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', theme.brandPrimary);
    root.style.setProperty('--brand-background', theme.brandBackground);
    root.style.setProperty('--brand-text', theme.brandText);
    root.style.setProperty('--brand-surface', theme.brandSurface);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
