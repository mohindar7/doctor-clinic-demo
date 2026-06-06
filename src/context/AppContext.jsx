import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultConfig from '../config.json';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('general');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSpecialtyDetailId, setActiveSpecialtyDetailId] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('carepulse_dark_mode') === 'true';
  });

  useEffect(() => {
    const sections = ['services', 'doctor', 'gallery', 'testimonials', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection(prev => prev !== '' ? '' : prev);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      
      --md-sys-color-primary: #0f172a;
      --md-sys-color-on-primary: #ffffff;
      --md-sys-color-primary-container: #131b2e;
      --md-sys-color-on-primary-container: #ffffff;
      
      --md-sys-color-secondary: #1d4ed8;
      --md-sys-color-on-secondary: #ffffff;
      --md-sys-color-secondary-container: #dbeafe;
      --md-sys-color-on-secondary-container: #1e40af;
      
      --md-sys-color-surface: #f8f9ff;
      --md-sys-color-on-surface: #0f172a;
      --md-sys-color-surface-variant: #d3e4fe;
      --md-sys-color-on-surface-variant: #334155;
      
      --md-sys-color-surface-container-lowest: #ffffff;
      --md-sys-color-surface-container-low: #eff4ff;
      --md-sys-color-surface-container: #e5eeff;
      --md-sys-color-surface-container-high: #dce9ff;
      --md-sys-color-surface-container-highest: #d3e4fe;
      
      --card-hover-bg: linear-gradient(135deg, #ffffff 0%, #eff4ff 100%);
    }
    .dark-theme {
      --md-sys-color-primary: #f8f9ff;
      --md-sys-color-on-primary: #0b1c30;
      --md-sys-color-primary-container: #bec6e0;
      --md-sys-color-on-primary-container: #131b2e;
      
      --md-sys-color-secondary: #60a5fa;
      --md-sys-color-on-secondary: #0c1a3a;
      --md-sys-color-secondary-container: #1e3a8a;
      --md-sys-color-on-secondary-container: #93c5fd;
      
      --md-sys-color-surface: #0a0f1d;
      --md-sys-color-on-surface: #f8f9ff;
      --md-sys-color-surface-variant: #1e2b46;
      --md-sys-color-on-surface-variant: #cbd5e1;
      
      --md-sys-color-surface-container-lowest: #0c1224;
      --md-sys-color-surface-container-low: #10182e;
      --md-sys-color-surface-container: #141f3b;
      --md-sys-color-surface-container-high: #1c2b50;
      --md-sys-color-surface-container-highest: #243666;
      
      --card-hover-bg: linear-gradient(135deg, #0f1a2e 0%, #1e2d50 100%);
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
        activeSection,
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
