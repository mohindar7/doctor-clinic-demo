import React from 'react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from '../common/ThemeToggle';

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
  const { config, openBooking, isDrawerOpen, setIsDrawerOpen } = useApp();
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
                style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', whiteSpace: 'nowrap', lineHeight: 1.15 }}>
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
              <span className="logo-icon">{config.clinic.name[0]}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.15 }}>
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
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#doctor" className="nav-link">About The Doctor</a></li>
          <li><a href="#gallery" className="nav-link">Gallery</a></li>
          <li><a href="#testimonials" className="nav-link">Reviews</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeToggle />

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
