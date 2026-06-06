import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * DoctorProfile
 * Renders a dedicated profile card for each doctor in the clinic,
 * using their Google Maps photos and rich profile data.
 * Cards are displayed side-by-side on desktop, stacked on mobile.
 */
function DoctorCard({ doctor, index, openBooking }) {
  const [hovered, setHovered] = useState(false);
  const animRef = useScrollAnimation();

  // Both doctors handle general consultations; Komal also handles physician/diabetology cases
  const serviceId = 'general';

  return (
    <div
      ref={animRef}
      className={`doctor-profile-card ${hovered ? 'hovered' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="doctor-card-inner">

        {/* Photo Panel */}
        <div className="doctor-img-container">
          <img
            src={doctor.portrait}
            alt={`Photo of ${doctor.name}`}
            className="doctor-card-img"
            style={{ objectPosition: doctor.photoPosition || 'center top' }}
            loading="lazy"
          />
          {/* Gradient overlay for text legibility */}
          <div className="doctor-img-overlay" />

          {/* Floating availability badge */}
          <div className="doctor-avail-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '5px' }}>
              schedule
            </span>
            {doctor.availability}
          </div>
        </div>

        {/* Info Panel */}
        <div className="doctor-card-info">

          {/* Role chip */}
          <div className="doctor-role-chip">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
            <span>{doctor.role}</span>
          </div>

          {/* Name */}
          <h3 className="doctor-card-name">{doctor.name}</h3>

          {/* Qualifications */}
          <div className="doctor-quals">
            {doctor.qualifications.map((q, i) => (
              <span key={i} className="doctor-qual-tag">{q}</span>
            ))}
          </div>

          {/* Bio */}
          <p className="doctor-card-bio">{doctor.bio}</p>

          {/* Specialties */}
          <div className="doctor-specialties">
            <div className="doctor-specialties-label">
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>stethoscope</span>
              <span>Specialties</span>
            </div>
            <div className="doctor-specialty-chips">
              {doctor.specialties.map((spec, i) => (
                <span key={i} className="doctor-specialty-chip">{spec}</span>
              ))}
            </div>
          </div>

          {/* Hospital Experience (shown for Dr. Komal) */}
          {doctor.hospitalExperience && doctor.hospitalExperience.length > 0 && (
            <div className="doctor-hospitals">
              <div className="doctor-specialties-label">
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>local_hospital</span>
                <span>Hospital Experience</span>
              </div>
              <ul className="doctor-hospital-list">
                {doctor.hospitalExperience.map((h, i) => (
                  <li key={i} className="doctor-hospital-item">
                    <span className="material-symbols-outlined" style={{ fontSize: '13px', flexShrink: 0 }}>check_circle</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clinic Services (shown for Dr. Roshan) */}
          {doctor.clinicServices && doctor.clinicServices.length > 0 && (
            <div className="doctor-hospitals">
              <div className="doctor-specialties-label">
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>medical_services</span>
                <span>Clinic Services & Facilities</span>
              </div>
              <ul className="doctor-hospital-list">
                {doctor.clinicServices.map((s, i) => (
                  <li key={i} className="doctor-hospital-item">
                    <span className="material-symbols-outlined" style={{ fontSize: '13px', flexShrink: 0 }}>check_circle</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          <div className="doctor-languages">
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--md-sys-color-on-surface-variant)' }}>
              language
            </span>
            <span className="doctor-languages-text">
              {doctor.languages.join(' · ')}
            </span>
          </div>

          {/* Stats row */}
          <div className="doctor-card-stats">
            {doctor.stats.map((stat, i) => (
              <div key={i} className="doctor-card-stat-item">
                <div className="doctor-card-stat-val">{stat.val}</div>
                <div className="doctor-card-stat-lbl">{stat.lbl}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="doctor-book-btn"
            onClick={() => openBooking(serviceId)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
            Book with {doctor.name.split(' ')[1]}
          </button>

        </div>
      </div>
    </div>
  );
}

/**
 * DoctorProfile Section
 */
export default function DoctorProfile() {
  const { config, openBooking } = useApp();
  const headerRef = useScrollAnimation();

  return (
    <section id="doctor" className="section doctor-section">
      <div className="container">

        {/* Section header */}
        <div className="doctor-section-header" ref={headerRef}>
          <span className="hero-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '6px' }}>
              health_and_safety
            </span>
            Meet Our Physicians
          </span>
          <h2 className="display-medium" style={{ marginTop: '12px' }}>
            Experts You Can <span style={{ color: 'var(--md-sys-color-secondary)' }}>Trust</span>
          </h2>
          <p className="body-large" style={{ color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '560px', margin: '12px auto 0' }}>
            Our physician team brings decades of combined clinical excellence, compassionate care, and deep community roots in Vadodara.
          </p>
        </div>

        {/* Doctor cards grid */}
        <div className="doctors-grid">
          {config.doctors.map((doctor, idx) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              index={idx}
              openBooking={openBooking}
            />
          ))}
        </div>

        {/* Bottom trust signal */}
        <div className="doctor-trust-bar">
          <div className="doctor-trust-item">
            <span className="material-symbols-outlined">verified_user</span>
            <span>Board-Certified Physicians</span>
          </div>
          <div className="doctor-trust-item">
            <span className="material-symbols-outlined">star</span>
            <span>Highest Rated Clinic · Soma Talav</span>
          </div>
          <div className="doctor-trust-item">
            <span className="material-symbols-outlined">groups</span>
            <span>18,000+ Families Served</span>
          </div>
        </div>

      </div>
    </section>
  );
}
