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

      <div className="reviews-marquee-container">
        <div className="reviews-marquee-track">
          {[...config.testimonials, ...config.testimonials].map((test, index) => {
            const handleMouseMove = (e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);
            };

            return (
              <div key={index} className="reviews-marquee-card-wrapper">
                <div className="testimonial-card" onMouseMove={handleMouseMove}>
                  <div className="testimonial-rating" style={{ display: 'flex', gap: '2px' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined"
                        style={{
                          fontVariationSettings: i < test.rating ? "'FILL' 1" : "'FILL' 0",
                          fontSize: '20px'
                        }}
                      >
                        star
                      </span>
                    ))}
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
      </div>
    </Section>
  );
}
