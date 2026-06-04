import React from 'react';

/**
 * Reusable WhatsApp PNG Icon component.
 * Loads the clinic's custom WhatsApp PNG icon with dynamic size.
 */
export default function WhatsAppIcon({ size = 20, style = {}, className = '' }) {
  return (
    <img
      src="/whatsapp.png"
      alt="WhatsApp Icon"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style
      }}
    />
  );
}
