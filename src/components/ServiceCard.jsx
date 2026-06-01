import React from 'react';
import Button from './common/Button';

export default function ServiceCard({ title, description, iconPath, onBook, className }) {
  return (
    <div className={`service-card ${className || ''}`} onClick={onBook}>
      <div className="service-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={iconPath} />
        </svg>
      </div>
      <h3>{title}</h3>
      <p className="body-medium">{description}</p>
      <Button
        variant="text"
        style={{ alignSelf: 'flex-start', marginLeft: '-16px', marginTop: 'auto' }}
      >
        Book now
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Button>
    </div>
  );
}

