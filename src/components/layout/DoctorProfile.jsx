import React from 'react';
import { useApp } from '../../context/AppContext';
import Section from '../common/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * DoctorProfile
 * Showcases the clinic's doctors, details their expertise,
 * and highlights key practice statistics.
 */
export default function DoctorProfile() {
  const { config } = useApp();

  const imageAnimRef = useScrollAnimation();
  const infoAnimRef = useScrollAnimation();

  return (
    <Section id="doctor" animate={false}>
      <div className="doctor-profile">
        <div ref={imageAnimRef}>
          <div className="doctor-img-wrapper">
            <img
              src="/doctor_portrait.png"
              alt={config.doctor.name}
              className="doctor-img"
            />
          </div>
        </div>

        <div className="doctor-info" ref={infoAnimRef} style={{ transitionDelay: '200ms' }}>
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
    </Section>
  );
}
