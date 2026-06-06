import React from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Main application navigation header.
 * Sticky at the top of viewport; handles responsive states, brand configuration,
 * and quick-booking actions.
 */
import { getClinicStatus } from '../../utils/clinicTimeUtils';

/**
 * Main application navigation header.
 * Sticky at the top of viewport; handles responsive states, brand configuration,
 * and quick-booking actions.
 */
export default function Header() {
  const { config, openBooking, isDrawerOpen, setIsDrawerOpen, activeSection } = useApp();
  const status = getClinicStatus();

  return (
    <header className="header">
      <div className="container nav">
        <a
          href="#"
          className="logo"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          {config.clinic.logoUrl ? (
            <>
              <img
                src={config.clinic.logoUrl}
                alt={`${config.clinic.name} Logo`}
                className="logo-img"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center' }}>
                <span className="clinic-name" style={{ fontSize: '1.2rem', fontWeight: 800, whiteSpace: 'nowrap', lineHeight: 1.15 }}>
                  {config.clinic.name}
                </span>
                
                {/* Live Status Inline Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', lineHeight: 1 }}>
                  <span
                    className="status-badge-dot"
                    style={{
                      width: '6px',
                      height: '6px',
                      color: status.color,
                      backgroundColor: status.color,
                      borderRadius: '50%',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: status.color }}>
                    {status.statusLabel}
                  </span>
                  <span style={{ fontSize: '0.66rem', fontWeight: '500', color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.8 }}>
                    • {status.timeLabel}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined logo-icon" style={{ fontSize: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px' }}>medical_services</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="clinic-name" style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.15 }}>
                  {config.clinic.name}
                </span>
                
                {/* Live Status Inline Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', lineHeight: 1 }}>
                  <span
                    className="status-badge-dot"
                    style={{
                      width: '6px',
                      height: '6px',
                      color: status.color,
                      backgroundColor: status.color,
                      borderRadius: '50%',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: status.color }}>
                    {status.statusLabel}
                  </span>
                  <span style={{ fontSize: '0.66rem', fontWeight: '500', color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.8 }}>
                    • {status.timeLabel}
                  </span>
                </div>
              </div>
            </>
          )}
        </a>

        <ul className="nav-links">
          <li><a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a></li>
          <li><a href="#doctor" className={`nav-link ${activeSection === 'doctor' ? 'active' : ''}`}>About The Doctor</a></li>
          <li><a href="#gallery" className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}>Gallery</a></li>
          <li><a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}>Reviews</a></li>
          <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className={`hamburger-btn ${isDrawerOpen ? 'open' : ''}`}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle Mobile Navigation Menu"
          >
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
