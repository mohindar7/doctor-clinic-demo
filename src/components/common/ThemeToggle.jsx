import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Theme Toggle Button component.
 * Syncs with the application state and local storage via AppContext.
 */
export default function ThemeToggle() {
  const { isDarkMode, setIsDarkMode } = useApp();

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label="Toggle Dark/Light Mode"
      title="Toggle Dark/Light Theme"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
        {isDarkMode ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
