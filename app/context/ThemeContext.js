import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default to light

  useEffect(() => {
    // Load saved theme from storage when app starts
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('userTheme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('userTheme', newTheme);
  };

  // Define your colors here
  const colors = theme === 'light' 
    ? { background: '#ffffff', text: '#000000', input: '#f0f0f0', border: '#ccc', placeholder: '#888' }
    : { background: '#121212', text: '#ffffff', input: '#333333', border: '#555', placeholder: '#aaa' };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);