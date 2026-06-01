import React from 'react';
import { useApp } from '../../context/AppContext';
import Section from '../common/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * ReviewsSection
 * Showcases patient comments and rating stars dynamically from the clinic configuration.
 */
export default function ReviewsSection() {
  const { config } = useApp();

  const headerRef = useScrollAnimation();

  return (
    <Section id="testimonials" alt animate={false}>
      <div className="section-header" ref={headerRef}>
        <h2 className="display-medium">What Our Patients Say</h2>
        <p className="body-large">
          Real feedback from individuals and families who trust {config.clinic.name} for their daily and specialized healthcare.
        </p>
      </div>

      <div className="testimonials-grid">
        {config.testimonials.map((test, index) => {
          const itemRef = useScrollAnimation();
          const delayClass = `delay-${((index % 4) + 1) * 100}`;

          return (
            <div key={index} ref={itemRef} className={delayClass}>
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {'★'.repeat(test.rating) + '☆'.repeat(5 - test.rating)}
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
            </div>
          );
        })}
      </div>
    </Section>
  );
}
