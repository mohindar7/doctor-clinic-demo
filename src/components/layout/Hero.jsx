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
        <div className="hero-actions">
          <Button variant="filled" onClick={() => openBooking('general')} style={{ gap: '8px' }}>
            <WhatsAppIcon size={18} />
            Schedule A Visit
          </Button>
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
