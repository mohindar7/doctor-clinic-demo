import React from 'react';
import Section from '../common/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const GALLERY_IMAGES = [
  { src: '/gallery_1.png', alt: 'Clinic Reception' },
  { src: '/gallery_2.png', alt: 'Patient Ward Cabin' },
  { src: '/gallery_3.png', alt: 'Diagnostic Center' },
  { src: '/gallery_4.png', alt: 'General Ward & Nurse Desk' }
];

/**
 * GallerySection
 * Displays photos of clinic rooms, diagnostic systems, and wards.
 */
export default function GallerySection() {
  const headerRef = useScrollAnimation();

  return (
    <Section id="gallery" animate={false}>
      <div className="section-header" ref={headerRef}>
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
        {GALLERY_IMAGES.map((img, idx) => {
          const itemRef = useScrollAnimation();
          const delayClass = `delay-${((idx % 4) + 1) * 100}`;

          return (
            <div key={idx} ref={itemRef} className={delayClass}>
              <div
                className="service-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  height: '280px',
                  position: 'relative',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--md-motion-duration-medium) var(--md-motion-easing-spring)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.85))',
                  padding: '20px',
                  color: 'white',
                }}>
                  <h4 style={{
                    color: 'white',
                    fontFamily: 'var(--md-font-display)',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                  }}>
                    {img.alt}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
