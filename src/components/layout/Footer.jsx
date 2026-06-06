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
                className="logo-img"
                style={{ height: '40px' }}
              />
            ) : (
              <span className="logo-icon">{config.clinic.name[0]}</span>
            )}
            <span className="clinic-name">{config.clinic.name}</span>
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
          <p className="designer-credit">
            Designed with <span className="heart-icon">♥</span> by <a href="#" className="designer-link">Mohindar</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
