import React, { useState, useEffect } from 'react';
import ServiceCard from './components/ServiceCard';
import BookingModal from './components/BookingModal';
import AdminEditor from './components/AdminEditor';
import defaultConfig from './config.json';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('general');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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

  const handleConfigUpdate = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('carepulse_config', JSON.stringify(newConfig));
  };

  const handleConfigReset = () => {
    if (confirm('Reset all changes back to original defaults? This will erase your current edits.')) {
      setConfig(defaultConfig);
      localStorage.removeItem('carepulse_config');
    }
  };

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
            <li><a href="#testimonials" className="nav-link">Reviews</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
          <button className="btn btn-tonal" onClick={() => openBooking('general')}>
            Book Appointment
          </button>
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

            <div className="contact-map-wrapper">
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--md-sys-color-surface-container-high)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--md-sys-color-on-surface-variant)',
                padding: '40px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '3rem', marginBottom: '12px' }}>🗺️</span>
                <h3>Interactive Map Placeholder</h3>
                <p className="body-medium" style={{ maxWidth: '300px', marginTop: '4px' }}>
                  In production, this displays a live Google Map centered at {config.contact.location}.
                </p>
              </div>
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

      {/* Visual Admin Panel Editor */}
      <AdminEditor
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdate={handleConfigUpdate}
        onReset={handleConfigReset}
      />

      {/* Floating Admin Trigger Button */}
      <button 
        className="admin-trigger" 
        onClick={() => setIsAdminOpen(!isAdminOpen)}
        title="Open Visual Site Editor"
      >
        ⚙️
      </button>
    </>
  );
}
