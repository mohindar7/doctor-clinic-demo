import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Slide-out navigation drawer for mobile and tablet screen widths.
 */
export default function MobileDrawer() {
  const { isDrawerOpen, setIsDrawerOpen } = useApp();

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
              className="mobile-drawer-link"
              onClick={() => setIsDrawerOpen(false)}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#doctor"
              className="mobile-drawer-link"
              onClick={() => setIsDrawerOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="mobile-drawer-link"
              onClick={() => setIsDrawerOpen(false)}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="mobile-drawer-link"
              onClick={() => setIsDrawerOpen(false)}
            >
              Reviews
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="mobile-drawer-link"
              onClick={() => setIsDrawerOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
