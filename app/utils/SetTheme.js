// ThemeContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import themes from '../constants/Themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');

  // Update theme based on system preference changes
  useEffect(() => {
    if (theme === 'system') {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [theme]);

  // Log theme changes
  useEffect(() => {
    console.log('Current Theme:', theme);
    console.log('Theme Properties:', themes[theme] || themes.light);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    currentTheme: themes[theme] || themes.light,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
