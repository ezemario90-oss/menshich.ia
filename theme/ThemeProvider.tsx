import React from 'react';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: 'var(--brand-surface)', color: 'var(--text-primary)' }}>
    {children}
  </div>
);
