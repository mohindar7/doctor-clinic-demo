import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import WhatsAppIcon from '../common/WhatsAppIcon';

/**
 * Redesigned Hero Section
 * Implements a modern, multi-dimensional Bento Grid dashboard configuration.
 * Connects clinic operational schedules and star feedback widgets dynamically.
 * Scroll parallax removed — clean, static bento layout with 3D mouse-tilt only.
 */
export default function Hero() {
  const { config, openBooking } = useApp();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);
  // Detect touch/mobile — disable 3D tilt on touch devices to save CPU
  const isTouchDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);

  // Mouse coordinate listener for 3D tilt on the image card only
  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    if (!isHovered) setIsHovered(true);
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  // 3D rotations from mouse position only
  const rotateX = mousePos.y * -14;
  const rotateY = mousePos.x * 14;

  return (
    <section
      ref={heroRef}
      className="container hero-grid-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Intro Bento Card */}
      <div className="hero-intro-card">
        <div className="hero-card-inner intro-card-inner">
          <span className="hero-badge">{config.clinic.badge}</span>
          <h1 className="display-large" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15 }}>
            Your Family's Health is Our <span style={{ color: 'var(--md-sys-color-secondary)' }}>Highest Priority</span>
          </h1>
          <p className="body-large" style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)', lineHeight: 1.6 }}>
            {config.clinic.heroSubtitle}
          </p>
          <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
            <Button variant="filled" onClick={() => openBooking('general')} style={{ gap: '8px' }}>
              <WhatsAppIcon size={24} />
              Schedule A Visit
            </Button>
            <a
              href={`tel:+${config.contact.phone.replace(/\D/g, '')}`}
              className="btn btn-tonal"
              style={{ gap: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>call</span>
              Call Clinic
            </a>
            <a href="#services" className="btn btn-outlined">
              Explore Services
            </a>
          </div>
        </div>
      </div>

      {/* 2. Image Bento Card (3D Tilt Container) */}
      <div className="hero-image-bento-card">
        <div
          className="hero-image-3d-container"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            willChange: 'transform',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%'
          }}
        >
          <div
            className="hero-image-wrapper"
            style={{
              transform: 'translateZ(0px)',
              transformStyle: 'preserve-3d',
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            <img
              src="/clinic_lobby.png"
              alt={`${config.clinic.name} modern lobby`}
              className="hero-image"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            {/* Glare Reflection Sheet */}
            <div
              className="hero-glare-overlay"
              style={{
                '--glare-x': `${50 - mousePos.x * 80}%`,
                '--glare-y': `${50 - mousePos.y * 80}%`
              }}
            />
          </div>

          {/* Floating Bento Card A */}
          <div className="hero-floating-card top-card">
            <div className="floating-card-icon-wrapper">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ffffff' }}>emergency</span>
            </div>
            <div>
              <h4>24/7 Vital Monitoring</h4>
              <p>Nursing &amp; Care Wards</p>
            </div>
          </div>

          {/* Floating Bento Card B */}
          <div className="hero-floating-card bottom-card">
            <div className="floating-card-stars">
              <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <div>
              <h4>Clinical Excellence</h4>
              <p>Dr. Roshan &amp; Dr. Komal</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Facilities Bento Card */}
      <div className="hero-facilities-card">
        <div className="hero-card-inner facilities-card-inner">
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--md-sys-color-secondary)', letterSpacing: '0.05em' }}>Hospital Wards</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--md-sys-color-secondary)' }}>local_hospital</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', margin: 0 }}>
              Inpatient Care
            </h3>
          </div>
          <p className="body-small" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.9 }}>
            24/7 Nursing &amp; Admitted Beds
          </p>
        </div>
      </div>

      {/* 4. Reviews Bento Card */}
      <div className="hero-reviews-card">
        <div className="hero-card-inner reviews-card-inner">
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--md-sys-color-secondary)', letterSpacing: '0.05em' }}>Patient Trust</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', margin: 0 }}>4.9</h3>
            <div className="floating-card-stars" style={{ display: 'inline-flex', gap: '2px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <p className="body-small" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.9 }}>
            230+ Google Reviews
          </p>
        </div>
      </div>
    </section>
  );
}
