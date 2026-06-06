import React from 'react';
import { useApp } from '../../context/AppContext';
import Section from '../common/Section';
import Button from '../common/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
  * FacilitiesSection
  * A unified showcase of Clinical Facilities & Nursing Wards.
  * Combines nursing services, ward amenities, and provides an active CTA to open the Booking Modal.
  */
export default function FacilitiesSection() {
  const { config, openBooking } = useApp();
  const headerRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();
  const amenitiesRef = useScrollAnimation();

  const facilities = config.facilities || [];

  const amenities = [
    { label: "Semi-Private AC Rooms", icon: "ac_unit" },
    { label: "24/7 Patient Monitoring", icon: "monitoring" },
    { label: "Bedside Nurse Call-Bells", icon: "notifications" },
    { label: "Post-Operative Wound Care", icon: "healing" },
    { label: "Oxygen & Nebulizer Support", icon: "air" },
    { label: "Diagnostics & Lab Collections", icon: "biotech" }
  ];

  return (
    <Section id="facilities" animate={false}>
      {/* Section Header */}
      <div className="section-header" ref={headerRef}>
        <h2 className="display-medium">Clinical Facilities &amp; Wards</h2>
        <p className="body-large">
          Shraddha Clinic &amp; Nursing Home operates 24/7 inpatient recovery wards, professional nurse monitoring, emergency stabilization care, and pediatric checkups in Kapurai, Vadodara.
        </p>
      </div>

      {/* Grid of Core Hospital Assets */}
      <div className="facilities-grid">
        {facilities.map((fac, idx) => {
          const cardRef = useScrollAnimation();
          const delayClass = `delay-${((idx % 4) + 1) * 100}`;

          return (
            <div
              key={fac.id}
              ref={cardRef}
              className={`facility-card ${delayClass}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '28px',
                borderRadius: 'var(--md-shape-corner-large)',
                backgroundColor: 'var(--md-sys-color-surface-container-low)',
                transition: 'transform var(--md-motion-duration-medium) var(--md-motion-easing-spring), background-color var(--md-motion-duration-medium) var(--md-motion-easing-standard), box-shadow var(--md-motion-duration-medium) var(--md-motion-easing-spring)',
                cursor: 'default'
              }}
            >
              <div
                className="facility-icon-wrapper"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--md-sys-color-secondary-container)',
                  color: 'var(--md-sys-color-on-secondary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'transform var(--md-motion-duration-medium) var(--md-motion-easing-spring)'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                  {fac.icon}
                </span>
              </div>
              <div>
                <h3 className="title-medium" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', marginBottom: '8px' }}>
                  {fac.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5 }}>
                  {fac.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ward Amenities Checklist */}
      <div 
        ref={amenitiesRef}
        style={{
          marginTop: '48px',
          padding: '36px',
          borderRadius: 'var(--md-shape-corner-large)',
          backgroundColor: 'rgba(240, 244, 255, 0.4)',
          border: '1px dashed var(--md-sys-color-surface-variant)'
        }}
        className="facilities-amenities-card"
      >
        <h3 className="title-large" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', marginBottom: '24px', textAlign: 'center' }}>
          Nursing Home Comforts &amp; Accommodations
        </h3>
        <div className="facilities-amenities-grid">
          {amenities.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--md-shape-corner-medium)',
                backgroundColor: 'var(--md-sys-color-surface-container-low)'
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-secondary)', fontSize: '20px' }}>
                {item.icon}
              </span>
              <span className="body-medium" style={{ fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Admission CTA Block */}
      <div className="facilities-cta-wrapper" ref={ctaRef} style={{ marginTop: '40px' }}>
        <div className="facilities-cta-card">
          <div className="facilities-cta-content">
            <h3 className="title-large" style={{ fontWeight: 800, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '8px' }}>
              Require Inpatient Nursing Care?
            </h3>
            <p className="body-medium" style={{ color: 'var(--md-sys-color-on-primary-container)', opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
              Schedule a clinical consult for inpatient wards, general nurse care, post-surgical dressings, or continuous medical monitoring.
            </p>
          </div>
          <div className="facilities-cta-action">
            <Button
              variant="filled"
              className="facilities-cta-btn"
              onClick={() => openBooking('nursing')}
            >
              <span className="material-symbols-outlined" style={{ marginRight: '6px' }}>medical_services</span>
              Book Ward Services
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
