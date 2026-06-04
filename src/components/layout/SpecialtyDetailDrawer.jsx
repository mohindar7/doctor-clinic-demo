import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';

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
            Back to List
          </Button>
          <Button variant="filled" onClick={handleProceedToBooking} style={{ flex: 2, gap: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.594ZM7.994 14.52a6.57 6.57 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.294c-.202-.102-1.202-.594-1.387-.662-.186-.068-.322-.102-.457.102-.136.2-.524.662-.643.797-.12.134-.238.153-.44.05-.202-.1-.851-.313-1.62-.999-.597-.533-1-1.192-1.118-1.394-.118-.2-.013-.308.088-.408.09-.09.2-.234.3-.35.1-.117.133-.198.2-.33.067-.133.034-.25-.018-.35-.052-.102-.458-1.102-.626-1.507-.164-.399-.333-.344-.457-.35-.119-.005-.255-.005-.39-.005-.136 0-.356.05-.542.253-.186.2-.712.696-.712 1.698 0 1.002.729 1.97 1.23 2.983 6.133 5.4 10.843 8.358 13.064 9.176.52.193 1.025.184 1.41.127.43-.064 1.32-.54 1.507-1.061.186-.52.186-1.002.131-1.102-.056-.1-.202-.15-.403-.25Z"/>
            </svg>
            Schedule Visit
          </Button>
        </div>
      </div>
    </>
  );
}
