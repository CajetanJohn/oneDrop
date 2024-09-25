import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import themes from '../constants/Themes'; // Ensure this file contains your theme definitions

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme()); 
  
  
  useEffect(() => {
    if (theme === 'system') {
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [theme, colorScheme]); 


  

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
  console.log(colorScheme);


      
      setColorScheme(colorScheme);
      if (theme === 'system') {
        setTheme(colorScheme === 'dark' ? 'dark' : 'light');
      }
    });

    
  }, [theme, colorScheme]);

  // Log theme changes
  useEffect(() => {
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
