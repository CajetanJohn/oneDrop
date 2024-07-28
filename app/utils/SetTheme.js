import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import themes from '../constants/Themes'; // Ensure this file contains your theme definitions

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme()); // To keep track of system theme

  // Update theme based on system preference changes
  useEffect(() => {
    if (theme === 'system') {
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [theme, colorScheme]); // Depend on both theme and colorScheme

  // Detect system theme changes and update the theme accordingly
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
      if (theme === 'system') {
        setTheme(colorScheme === 'dark' ? 'dark' : 'light');
      }
    });

    // Clean up subscription on unmount
    return () => subscription.remove();
  }, [theme, Appearance]);

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
