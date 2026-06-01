import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Page footer layout displaying brand branding, directory links,
 * copyright, and credits.
 */
export default function Footer() {
  const { config } = useApp();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <a
            href="#"
            className="logo"
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            {config.clinic.logoUrl ? (
              <img
                src={config.clinic.logoUrl}
                alt={`${config.clinic.name} Logo`}
                style={{ height: '40px', borderRadius: '8px', objectFit: 'contain' }}
              />
            ) : (
              <span className="logo-icon">{config.clinic.name[0]}</span>
            )}
            {config.clinic.name}
          </a>
          <ul className="footer-nav">
            <li><a href="#services">Services</a></li>
            <li><a href="#doctor">About</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {config.clinic.name} Clinic. All
            rights reserved.
          </p>
          <p>designed by Mohindar</p>
        </div>
      </div>
    </footer>
  );
}
