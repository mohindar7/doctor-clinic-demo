import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultConfig from '../config.json';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('general');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSpecialtyDetailId, setActiveSpecialtyDetailId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('carepulse_dark_mode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('carepulse_dark_mode', isDarkMode);
  }, [isDarkMode]);

  const openBooking = (serviceId) => {
    setSelectedServiceId(serviceId || 'general');
    setIsModalOpen(true);
  };

  const closeBooking = () => {
    setIsModalOpen(false);
  };

  const openSpecialtyDetail = (id) => {
    setActiveSpecialtyDetailId(id);
  };

  const closeSpecialtyDetail = () => {
    setActiveSpecialtyDetailId(null);
  };

  // Generate dynamic CSS overrides based on the configuration primary hue/saturation/lightness values
  const { primaryHue, primarySaturation, primaryLightness } = config.theme;
  const themeStyles = `
    :root {
      --primary-h: ${primaryHue};
      --primary-s: ${primarySaturation}%;
      --primary-l: ${primaryLightness}%;
      --md-sys-color-primary: hsl(${primaryHue}, ${primarySaturation}%, ${primaryLightness}%);
      --md-sys-color-primary-container: hsl(${primaryHue}, ${primarySaturation}%, 94%);
      --md-sys-color-on-primary-container: hsl(${primaryHue}, ${primarySaturation}%, 12%);
      --md-sys-color-secondary: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 10}%, ${primaryLightness + 5}%);
      --md-sys-color-secondary-container: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 10}%, 94%);
      --md-sys-color-on-secondary-container: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 10}%, 15%);
      --card-hover-bg: linear-gradient(135deg, #ffffff 0%, hsl(${primaryHue}, ${primarySaturation}%, 94%) 100%);
    }
    .dark-theme {
      --primary-h: ${primaryHue};
      --primary-s: ${primarySaturation + 10}%;
      --primary-l: 55%;
      --md-sys-color-primary: hsl(${primaryHue}, ${primarySaturation + 10}%, 55%);
      --md-sys-color-on-primary: hsl(${primaryHue}, ${primarySaturation}%, 5%);
      --md-sys-color-primary-container: hsl(${primaryHue}, ${primarySaturation - 20}%, 16%);
      --md-sys-color-on-primary-container: hsl(${primaryHue}, ${primarySaturation + 15}%, 85%);
      
      --md-sys-color-secondary: hsl(${(primaryHue + 30) % 360}, ${primarySaturation}%, 65%);
      --md-sys-color-on-secondary: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 10}%, 5%);
      --md-sys-color-secondary-container: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 20}%, 16%);
      --md-sys-color-on-secondary-container: hsl(${(primaryHue + 30) % 360}, ${primarySaturation + 15}%, 85%);
      --card-hover-bg: linear-gradient(135deg, hsl(${primaryHue}, ${primarySaturation - 10}%, 16%) 0%, hsl(${primaryHue}, ${primarySaturation - 5}%, 22%) 100%);
    }
  `;

  return (
    <AppContext.Provider
      value={{
        config,
        isDarkMode,
        setIsDarkMode,
        isModalOpen,
        setIsModalOpen,
        selectedServiceId,
        setSelectedServiceId,
        openBooking,
        closeBooking,
        isDrawerOpen,
        setIsDrawerOpen,
        activeSpecialtyDetailId,
        openSpecialtyDetail,
        closeSpecialtyDetail,
      }}
    >
      <style>{themeStyles}</style>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
