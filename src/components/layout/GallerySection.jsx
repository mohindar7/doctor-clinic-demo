import React, { useState, useEffect } from 'react';
import Section from '../common/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const GALLERY_IMAGES = [
  { src: '/gallery_1.png', alt: 'Clinic Reception Chamber' },
  { src: '/gallery_2.png', alt: 'Patient Ward Cabin' },
  { src: '/gallery_3.png', alt: 'Diagnostic Center' },
  { src: '/gallery_4.png', alt: 'General Ward & Nurse Desk' },
];

// Double the array for seamless looping
const LOOPED_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

/**
 * GallerySection
 * Displays clinic photos as an infinite auto-scrolling marquee strip.
 * Hover on any card to pause the marquee and zoom the photo.
 */
export default function GallerySection() {
  const headerRef = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <Section id="gallery" animate={false}>
      <div className="section-header" ref={headerRef}>
        <h2 className="display-medium">Our Facilities &amp; Clinic</h2>
        <p className="body-large">
          A glimpse inside Shraddha Clinic &amp; Nursing Home — our clean chambers, diagnostic systems, and ward rooms.
        </p>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="gallery-marquee-container">
        <div className="gallery-marquee-track">
          {LOOPED_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className="gallery-marquee-card"
              onClick={() => setSelectedImage(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedImage(img);
                }
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="gallery-marquee-img"
              />
              <div className="gallery-marquee-caption">
                <h4>{img.alt}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div 
          className="modal-overlay open" 
          onClick={() => setSelectedImage(null)}
          style={{ zIndex: 1100 }}
        >
          <div 
            className="gallery-modal-card" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-modal-header">
              <h3 className="title-large" style={{ margin: 0 }}>{selectedImage.alt}</h3>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="gallery-modal-body">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="gallery-modal-img" 
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
