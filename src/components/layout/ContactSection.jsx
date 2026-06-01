import React from 'react';
import { useApp } from '../../context/AppContext';
import Section from '../common/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * ContactSection
 * Houses contact information (location, operating hours, phone/email)
 * and an interactive embedded Google Map.
 */
export default function ContactSection() {
  const { config } = useApp();

  const headerRef = useScrollAnimation();
  const detailsRef = useScrollAnimation();
  const mapRef = useScrollAnimation();

  return (
    <Section id="contact" animate={false}>
      <div className="section-header" ref={headerRef}>
        <h2 className="display-medium">{config.contact.badge}</h2>
        <p className="body-large">{config.contact.description}</p>
      </div>

      <div className="contact-layout">
        <div className="contact-details" ref={detailsRef}>
          <div className="contact-item">
            <div className="contact-item-icon">📍</div>
            <div className="contact-item-content">
              <h3>Clinic Location</h3>
              <p className="body-medium">{config.contact.location}</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-item-icon">📞</div>
            <div className="contact-item-content">
              <h3>Phone & Email</h3>
              <p className="body-medium">
                {config.contact.phone}<br />
                {config.contact.email}
              </p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-item-icon">🕒</div>
            <div className="contact-item-content">
              <h3>Operating Hours</h3>
              <p className="body-medium" style={{ whiteSpace: 'pre-line' }}>
                {config.contact.hours}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={mapRef}
          style={{ height: '380px', overflow: 'hidden', transitionDelay: '200ms' }}
        >
          <div className="contact-map-wrapper" style={{ height: '100%' }}>
            <iframe
              title="Google Maps Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={
                config.contact.mapUrl ||
                `https://maps.google.com/maps?q=${encodeURIComponent(
                  config.contact.location
                )}&t=&z=16&ie=UTF8&iwloc=near&output=embed`
              }
            ></iframe>
          </div>
        </div>
      </div>
    </Section>
  );
}
