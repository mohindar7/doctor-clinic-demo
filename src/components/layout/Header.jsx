import React from 'react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../common/Button';

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
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          {config.clinic.logoUrl ? (
            <>
              <img
                src={config.clinic.logoUrl}
                alt={`${config.clinic.name} Logo`}
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', whiteSpace: 'nowrap' }}>
                {config.clinic.name}
              </span>
              {/* Live Status Badge next to clinic name */}
              <div
                className="status-badge"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--md-shape-corner-full)',
                  backgroundColor: 'var(--md-sys-color-surface-container-high)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: 'var(--md-sys-color-on-surface-variant)',
                  boxShadow: 'var(--md-elevation-1)',
                  whiteSpace: 'nowrap',
                  marginLeft: '4px'
                }}
              >
                <span
                  className="status-badge-dot"
                  style={{
                    width: '6px',
                    height: '6px',
                    color: status.color,
                    backgroundColor: status.color
                  }}
                />
                <span>{status.text}</span>
              </div>
            </>
          ) : (
            <>
              <span className="logo-icon">{config.clinic.name[0]}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.1 }}>
                  {config.clinic.name}
                </span>
                {/* Live Status Badge next to text title */}
                <div
                  className="status-badge"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    whiteSpace: 'nowrap',
                    lineHeight: 1
                  }}
                >
                  <span
                    className="status-badge-dot"
                    style={{
                      width: '6px',
                      height: '6px',
                      color: status.color,
                      backgroundColor: status.color
                    }}
                  />
                  <span>{status.text}</span>
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
          
          <Button variant="tonal" onClick={() => openBooking('general')}>
            Book Appointment
          </Button>

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
