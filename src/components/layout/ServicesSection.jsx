import React from 'react';
import { useApp } from '../../context/AppContext';
import Section from '../common/Section';
import ServiceCard from '../ServiceCard';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * ServicesSection
 * Section showing the specialties of the clinic dynamically using ServiceCards.
 */
export default function ServicesSection() {
  const { config, openSpecialtyDetail } = useApp();

  const headerRef = useScrollAnimation();

  return (
    <Section id="services" alt animate={false}>
      <div className="section-header" ref={headerRef}>
        <h2 className="display-medium">Our Medical Specialties</h2>
        <p className="body-large">
          Providing top-tier primary and specialized healthcare solutions utilizing advanced diagnostics and treatment methodologies.
        </p>
      </div>

      <div className="services-grid">
        {config.services.map((srv, idx) => {
          // Use scroll animation for each individual card with transition delays
          const cardRef = useScrollAnimation();
          const delayClass = `delay-${((idx % 4) + 1) * 100}`;

          return (
            <div key={srv.id} ref={cardRef} className={delayClass}>
              <ServiceCard
                title={srv.title}
                description={srv.description}
                iconPath={srv.iconPath}
                onBook={() => openSpecialtyDetail(srv.id)}
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
