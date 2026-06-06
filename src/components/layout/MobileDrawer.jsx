import React from 'react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from '../common/ThemeToggle';

/**
 * Slide-out navigation drawer for mobile and tablet screen widths.
 */
export default function MobileDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, activeSection } = useApp();

  return (
    <>
      <div
        className={`mobile-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-links">
          <li>
            <a
              href="#services"
              className={`mobile-drawer-link ${activeSection === 'services' ? 'active' : ''}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#doctor"
              className={`mobile-drawer-link ${activeSection === 'doctor' ? 'active' : ''}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className={`mobile-drawer-link ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className={`mobile-drawer-link ${activeSection === 'testimonials' ? 'active' : ''}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Reviews
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`mobile-drawer-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', width: '100%', paddingTop: '20px' }}>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
