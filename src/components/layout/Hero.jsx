import React from 'react';
import { useApp } from '../../context/AppContext';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import Button from '../common/Button';
import WhatsAppIcon from '../common/WhatsAppIcon';

/**
 * Hero Section
 * Large display introductory layout welcoming users to the clinic.
 */
export default function Hero() {
  const { config, openBooking } = useApp();

  // Scroll animations for both sides of the split layout
  const leftAnimRef = useScrollAnimation();
  const rightAnimRef = useScrollAnimation();

  return (
    <section className="container hero">
      <div className="hero-content" ref={leftAnimRef}>
        <span className="hero-badge">{config.clinic.badge}</span>
        <h1 className="display-large">{config.clinic.heroTitle}</h1>
        <p className="body-large">{config.clinic.heroSubtitle}</p>
        <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Button variant="filled" onClick={() => openBooking('general')} style={{ gap: '8px' }}>
            <WhatsAppIcon size={24} />
            Schedule A Visit
          </Button>
          <a
            href={`tel:+${config.contact.phone.replace(/\D/g, '')}`}
            className="btn btn-tonal"
            style={{ gap: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
            </svg>
            Call Clinic
          </a>
          <a href="#services" className="btn btn-outlined">
            Explore Services
          </a>
        </div>
      </div>
      
      <div ref={rightAnimRef} style={{ transitionDelay: '200ms' }}>
        <div className="hero-image-wrapper">
          <img
            src="/clinic_lobby.png"
            alt={`${config.clinic.name} modern lobby`}
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
