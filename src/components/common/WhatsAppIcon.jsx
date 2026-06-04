import React from 'react';
import whatsappLogo from '../../assets/whatsapp.png';

/**
 * Reusable WhatsApp PNG Icon component.
 * Loads the clinic's custom WhatsApp PNG icon with dynamic size.
 */
export default function WhatsAppIcon({ size = 20, style = {}, className = '' }) {
  return (
    <img
      src={whatsappLogo}
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
