import React from 'react';
import Button from './common/Button';

const getServiceIcon = (id) => {
  switch (id) {
    case 'general': return 'medical_services';
    case 'pediatrics': return 'child_care';
    case 'nursing': return 'healing';
    default: return 'medical_services';
  }
};

export default function ServiceCard({ id, title, description, onBook, className }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className={`service-card ${className || ''}`} 
      onClick={onBook}
      onMouseMove={handleMouseMove}
    >
      <div className="service-icon">
        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
          {getServiceIcon(id)}
        </span>
      </div>
      <h3>{title}</h3>
      <p className="body-medium">{description}</p>
      <Button
        variant="text"
        style={{ alignSelf: 'flex-start', marginLeft: '-16px', marginTop: 'auto', gap: '4px' }}
      >
        Book now
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
      </Button>
    </div>
  );
}

