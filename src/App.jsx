import React, { useState, useEffect } from 'react';
import ServiceCard from './components/ServiceCard';
import BookingModal from './components/BookingModal';

import defaultConfig from './config.json';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('general');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('carepulse_dark_mode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('carepulse_dark_mode', isDarkMode);
  }, [isDarkMode]);


  // Monitor scroll percentage for visual feedback
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load configuration from localStorage draft or fall back to config.json
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('carepulse_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved config, using default", e);
      }
    }
    return defaultConfig;
  });


  const openBooking = (serviceId) => {
    setSelectedServiceId(serviceId || 'general');
    setIsModalOpen(true);
  };

  // Generate dynamic CSS overrides based on the configuration primary hue/saturation/lightness values
  const { primaryHue, primarySaturation, primaryLightness } = config.theme;
  const themeStyles = `
    :root {
      --md-sys-color-primary: hsl(${primaryHue}, ${primarySaturation}%, ${primaryLightness}%);
      --md-sys-color-primary-container: hsl(${primaryHue}, ${primarySaturation}%, 92%);
      --md-sys-color-on-primary-container: hsl(${primaryHue}, ${primarySaturation}%, 12%);
      --md-sys-color-secondary: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 10}%, ${primaryLightness + 5}%);
      --md-sys-color-secondary-container: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 10}%, 92%);
      --md-sys-color-on-secondary-container: hsl(${(primaryHue + 30) % 360}, ${primarySaturation - 10}%, 15%);
    }
  `;

  return (
    <>
      {/* Inject dynamic styles */}
      <style>{themeStyles}</style>

      {/* Scroll Progress Indicator Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Ambient Decorative Blur Blobs */}
      <div className="ambient-blob-1"></div>
      <div className="ambient-blob-2"></div>


      {/* Navigation Header */}
      <header className="header">
        <div className="container nav">
          <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.clinic.logoUrl ? (
              <img src={config.clinic.logoUrl} alt={`${config.clinic.name} Logo`} style={{ height: '44px', borderRadius: '8px', objectFit: 'contain' }} />
            ) : (
              <span className="logo-icon">{config.clinic.name[0]}</span>
            )}
            {config.clinic.name}
          </a>
          <ul className="nav-links">
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#doctor" className="nav-link">About The Doctor</a></li>
            <li><a href="#gallery" className="nav-link">Gallery</a></li>
            <li><a href="#testimonials" className="nav-link">Reviews</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Dark/Light Mode"
              title="Toggle Dark/Light Theme"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            <button className="btn btn-tonal" onClick={() => openBooking('general')}>
              Book Appointment
            </button>
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

      <main>
        {/* Hero Section */}
        <section className="container hero">
          <div className="hero-content">
            <span className="hero-badge">{config.clinic.badge}</span>
            <h1 className="display-large">{config.clinic.heroTitle}</h1>
            <p className="body-large">{config.clinic.heroSubtitle}</p>
            <div className="hero-actions">
              <button className="btn btn-filled" onClick={() => openBooking('general')}>
                Schedule A Visit
              </button>
              <a href="#services" className="btn btn-outlined">
                Explore Services
              </a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img 
              src="/clinic_lobby.png" 
              alt={`${config.clinic.name} modern lobby`} 
              className="hero-image"
            />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="section-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="display-medium">Our Medical Specialties</h2>
              <p className="body-large">
                Providing top-tier primary and specialized healthcare solutions utilizing advanced diagnostics and treatment methodologies.
              </p>
            </div>
            
            <div className="services-grid">
              {config.services.map((srv) => (
                <ServiceCard 
                  key={srv.id}
                  title={srv.title}
                  description={srv.description}
                  iconPath={srv.iconPath}
                  onBook={() => openBooking(srv.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Doctor Profile Section */}
        <section id="doctor" className="container section">
          <div className="doctor-profile">
            <div className="doctor-img-wrapper">
              <img 
                src="/doctor_portrait.png" 
                alt={config.doctor.name} 
                className="doctor-img"
              />
            </div>
            <div className="doctor-info">
              <span className="hero-badge">{config.doctor.roleBadge}</span>
              <h2 className="display-medium">{config.doctor.name}</h2>
              <p className="body-large">{config.doctor.bioLarge}</p>
              <p className="body-medium">{config.doctor.bioMedium}</p>
              
              <div className="doctor-stats">
                {config.doctor.stats.map((stat, idx) => (
                  <div key={idx} className="stat-item">
                    <div className="stat-val">{stat.val}</div>
                    <div className="stat-lbl">{stat.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clinic Gallery Section */}
        <section id="gallery" className="container section">
          <div className="section-header">
            <h2 className="display-medium">Our Facilities & Clinic</h2>
            <p className="body-large">
              A glimpse inside Shraddha Clinic & Nursing Home, showing our clean chambers, diagnostic systems, and ward rooms.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginTop: '40px'
          }}>
            {[
              { src: '/gallery_1.png', alt: 'Clinic Reception' },
              { src: '/gallery_2.png', alt: 'Patient Ward Cabin' },
              { src: '/gallery_3.png', alt: 'Diagnostic Center' },
              { src: '/gallery_4.png', alt: 'General Ward & Nurse Desk' }
            ].map((img, idx) => (
              <div 
                key={idx} 
                className="service-card" 
                style={{ 
                  padding: 0, 
                  overflow: 'hidden', 
                  height: '280px',
                  borderRadius: 'var(--md-shape-corner-large)'
                }}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform var(--md-motion-duration-medium) var(--md-motion-easing-spring)'
                  }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.85))',
                  padding: '20px',
                  color: 'white'
                }}>
                  <h4 style={{ color: 'white', fontFamily: 'var(--md-font-display)', fontSize: '1.05rem', fontWeight: '700' }}>{img.alt}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials/Reviews Section */}
        <section id="testimonials" className="section-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="display-medium">What Our Patients Say</h2>
              <p className="body-large">
                Real feedback from individuals and families who trust {config.clinic.name} for their daily and specialized healthcare.
              </p>
            </div>

            <div className="testimonials-grid">
              {config.testimonials.map((test, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-rating">
                    {"★".repeat(test.rating) + "☆".repeat(5 - test.rating)}
                  </div>
                  <p className="body-medium">{test.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{test.avatar}</div>
                    <div className="author-info">
                      <h4>{test.author}</h4>
                      <p>{test.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact details & Map */}
        <section id="contact" className="container section">
          <div className="section-header">
            <h2 className="display-medium">{config.contact.badge}</h2>
            <p className="body-large">{config.contact.description}</p>
          </div>

          <div className="contact-layout">
            <div className="contact-details">
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

            <div className="contact-map-wrapper" style={{ height: '380px', overflow: 'hidden' }}>
              <iframe
                title="Google Maps Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={config.contact.mapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(config.contact.location)}&t=&z=16&ie=UTF8&iwloc=near&output=embed`}
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {config.clinic.logoUrl ? (
                <img src={config.clinic.logoUrl} alt={`${config.clinic.name} Logo`} style={{ height: '40px', borderRadius: '8px', objectFit: 'contain' }} />
              ) : (
                <span className="logo-icon">{config.clinic.name[0]}</span>
              )}
              {config.clinic.name}
            </a>
            <ul className="footer-nav">
              <li><a href="#services">Services</a></li>
              <li><a href="#doctor">About</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {config.clinic.name} Clinic. All rights reserved.</p>
            <p>Designed for Healthcare Professionals</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialServiceId={selectedServiceId}
      />

      {/* Floating Action Button (FAB) for Booking */}
      <button 
        className="booking-fab" 
        onClick={() => openBooking('general')}
        title="Schedule Appointment"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="booking-fab-icon">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span className="booking-fab-text">Book Visit</span>
      </button>


      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={() => setIsDrawerOpen(false)}></div>
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-links">
          <li><a href="#services" className="mobile-drawer-link" onClick={() => setIsDrawerOpen(false)}>Services</a></li>
          <li><a href="#doctor" className="mobile-drawer-link" onClick={() => setIsDrawerOpen(false)}>About</a></li>
          <li><a href="#gallery" className="mobile-drawer-link" onClick={() => setIsDrawerOpen(false)}>Gallery</a></li>
          <li><a href="#testimonials" className="mobile-drawer-link" onClick={() => setIsDrawerOpen(false)}>Reviews</a></li>
          <li><a href="#contact" className="mobile-drawer-link" onClick={() => setIsDrawerOpen(false)}>Contact</a></li>
        </ul>
        <button className="btn btn-filled" style={{ marginTop: 'auto', width: '100%' }} onClick={() => { setIsDrawerOpen(false); openBooking('general'); }}>
          Book Appointment
        </button>
      </div>
    </>
  );
}
