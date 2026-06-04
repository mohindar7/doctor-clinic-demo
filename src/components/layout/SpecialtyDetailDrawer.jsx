import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import WhatsAppIcon from '../common/WhatsAppIcon';

/**
 * SpecialtyDetailDrawer
 * An M3 bottom sheet displaying detailed clinical data for a specialty.
 * Slides up from bottom and bridges straight into the Booking Modal.
 */
export default function SpecialtyDetailDrawer() {
  const {
    config,
    activeSpecialtyDetailId,
    closeSpecialtyDetail,
    openBooking
  } = useApp();

  const services = config.services || [];
  const activeService = services.find(s => s.id === activeSpecialtyDetailId);

  const handleClose = () => {
    closeSpecialtyDetail();
  };

  const handleProceedToBooking = () => {
    if (activeService) {
      const serviceId = activeService.id;
      // Close the detail sheet first
      closeSpecialtyDetail();
      // Open booking modal
      setTimeout(() => {
        openBooking(serviceId);
      }, 250); // Small delay to let sheet slide down smoothly
    }
  };

  if (!activeService) return null;

  return (
    <>
      {/* Dynamic Backdrop */}
      <div 
        className={`detail-sheet-overlay ${activeSpecialtyDetailId ? 'open' : ''}`} 
        onClick={handleClose}
      />

      {/* Slide-up Sheet Panel */}
      <div className={`detail-sheet-container ${activeSpecialtyDetailId ? 'open' : ''}`}>
        {/* Handle bar for bottom sheet visual aesthetic */}
        <div className="detail-sheet-handle" onClick={handleClose}></div>

        <div className="detail-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="detail-sheet-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={activeService.iconPath} />
              </svg>
            </div>
            <div>
              <h2 className="title-large" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activeService.title}</h2>
              <span className="hero-badge" style={{ marginTop: '4px', fontSize: '0.72rem' }}>
                {activeService.duration} • {activeService.cost}
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close Details">&times;</button>
        </div>

        <div className="detail-sheet-body">
          {/* Assigned Physician */}
          <div className="detail-sheet-meta-card">
            <span style={{ fontSize: '1.2rem' }}>👩‍⚕️</span>
            <div>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.7, letterSpacing: '0.05em' }}>Assigned Practitioner(s)</h4>
              <p style={{ fontWeight: '700', color: 'var(--md-sys-color-primary)' }}>{activeService.assignedDoctors}</p>
            </div>
          </div>

          {/* Treatments List */}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: 800 }}>Medical Coverages & Treatments</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeService.treatments?.map((tr, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 'bold' }}>✓</span>
                  <span>{tr}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparatory Instructions */}
          {activeService.preparations && (
            <div className="detail-sheet-instruction-card">
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.25rem' }}>ℹ️</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '4px' }}>Patient Preparation Instructions</h4>
                  <p className="body-medium" style={{ fontSize: '0.88rem', lineHeight: '1.4' }}>{activeService.preparations}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="detail-sheet-footer">
          <Button variant="tonal" onClick={handleClose} style={{ flex: 1 }}>
            Back
          </Button>
          <a
            href={`tel:+${config.contact.phone.replace(/\D/g, '')}`}
            className="btn btn-outlined"
            style={{ flex: 1.2, gap: '6px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
            </svg>
            Call
          </a>
          <Button variant="filled" onClick={handleProceedToBooking} style={{ flex: 2, gap: '8px' }}>
            <WhatsAppIcon size={24} />
            Schedule
          </Button>
        </div>
      </div>
    </>
  );
}
