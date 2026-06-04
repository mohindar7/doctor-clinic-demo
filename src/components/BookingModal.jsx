import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Button from './common/Button';
import WhatsAppIcon from './common/WhatsAppIcon';

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM'
];

// Helper to generate next 8 business days (excluding weekends)
const getNextBusinessDays = () => {
  const days = [];
  const today = new Date();
  let current = new Date(today);
  
  while (days.length < 8) {
    current.setDate(current.getDate() + 1);
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sunday (0) and Saturday (6)
      days.push(new Date(current));
    }
  }
  return days;
};

export default function BookingModal() {
  const { isModalOpen, closeBooking, selectedServiceId, config } = useApp();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('general');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  // Persistent patient info with local storage cache
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('carepulse_patient_info');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cached patient info:', e);
    }
    return { name: '', email: '', phone: '', note: '' };
  });

  const timeSlotsRef = React.useRef(null);
  const dates = getNextBusinessDays();
  const services = config.services || [];

  // Save patient profile info changes to local cache
  useEffect(() => {
    try {
      localStorage.setItem('carepulse_patient_info', JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save patient info to cache:', e);
    }
  }, [formData]);

  // Reset wizard progress and single-use notes, but keep profile details
  useEffect(() => {
    if (isModalOpen) {
      setStep(1);
      setSelectedService(selectedServiceId || 'general');
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData(prev => ({ ...prev, note: '' }));
    }
  }, [isModalOpen, selectedServiceId]);

  // Smooth-scroll focus to time slots container on date selection
  useEffect(() => {
    if (selectedDate && timeSlotsRef.current) {
      setTimeout(() => {
        timeSlotsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 120);
    }
  }, [selectedDate]);

  if (!isModalOpen) return null;

  const currentService = services.find(s => s.id === selectedService) || services[0] || {
    id: 'general',
    title: 'General Consultation',
    duration: '30 mins',
    cost: '₹300'
  };

  // Safe dismiss confirmation to prevent accidental loss
  const handleClose = () => {
    const hasProgress = selectedDate || selectedTime || formData.note;
    if (step < 4 && hasProgress) {
      if (window.confirm("Are you sure you want to cancel booking? Your selected date and time will be lost.")) {
        closeBooking();
      }
    } else {
      closeBooking();
    }
  };

  const handleServiceSelect = (id) => {
    setSelectedService(id);
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2 && (!selectedDate || !selectedTime)) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const getWhatsAppUrl = () => {
    const dateString = selectedDate?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    const message = `Hello *${config.clinic.name}*,\n\nI would like to book an appointment:\n` +
      `- *Service:* ${currentService.title}\n` +
      `- *Date:* ${dateString}\n` +
      `- *Time:* ${selectedTime}\n` +
      `- *Patient Name:* ${formData.name}\n` +
      `- *Phone Number:* ${formData.phone}\n` +
      `- *Email:* ${formData.email}\n` +
      (formData.note ? `- *Note:* ${formData.note}\n` : '') +
      `\nPlease verify availability and confirm my visit. Thank you!`;

    const cleanPhone = (config.contact?.phone || '+919327787679').replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    try {
      const waUrl = getWhatsAppUrl();
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open WhatsApp window:', err);
    }
    
    setStep(4); // Success step
  };

  return (
    <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />
        <div className="modal-header">
          <h2>Book an Appointment</h2>
          <button className="modal-close-btn" onClick={handleClose}>&times;</button>
        </div>

        {/* Scrollable body for accessibility/smaller screens */}
        <div className="modal-body">
          {/* Step Progress Nodes */}
          {step < 4 && (
            <div className="modal-step-indicator">
              <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
              <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
              <div className={`step-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3</div>
            </div>
          )}

          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="fade-in">
              <h3 style={{ marginBottom: '16px' }}>Select a Clinical Service</h3>
              <div className="options-list">
                {services.map((srv) => (
                  <div 
                    key={srv.id} 
                    className={`option-item ${selectedService === srv.id ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect(srv.id)}
                  >
                    <div>
                      <div className="option-title">{srv.title}</div>
                      <div className="option-subtitle">{srv.duration} • {srv.cost}</div>
                    </div>
                    {selectedService === srv.id && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Time */}
          {step === 2 && (
            <div className="fade-in">
              <h3 style={{ marginBottom: '16px' }}>Choose Date & Time</h3>
              <p className="body-medium" style={{ marginBottom: '16px' }}>
                Selected: <strong>{currentService.title}</strong>
              </p>
              
              <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Available Dates</h4>
              <div className="date-grid">
                {dates.map((d, index) => {
                  const isSelected = selectedDate && selectedDate.toDateString() === d.toDateString();
                  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                  const dateNum = d.getDate();
                  return (
                    <div 
                      key={index} 
                      className={`date-cell ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(d)}
                    >
                      <div className="date-day-name">{dayName}</div>
                      <div className="date-number">{dateNum}</div>
                    </div>
                  );
                })}
              </div>

              {selectedDate && (
                <>
                  <h4 ref={timeSlotsRef} style={{ fontSize: '1rem', marginBottom: '8px', marginTop: '16px' }}>Available Time Slots</h4>
                  <div className="time-slots">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <div 
                          key={slot} 
                          className={`time-slot ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 3: Patient Info */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="fade-in">
              <h3 style={{ marginBottom: '16px' }}>Patient Registration</h3>
              <p className="body-medium" style={{ marginBottom: '20px' }}>
                Booking <strong>{currentService.title}</strong> on{' '}
                <strong>
                  {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </strong>{' '}
                at <strong>{selectedTime}</strong>.
              </p>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. john@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. (555) 000-0000"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notes for the Doctor (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="Briefly describe the symptoms or reason for visit..."
                  className="form-input"
                  style={{ resize: 'none' }}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>
            </form>
          )}

          {/* STEP 4: Success Message / Action */}
          {step === 4 && (
            <div className="success-card fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
              <div className="success-icon" style={{ backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-primary)', width: '64px', height: '64px', fontSize: '1.8rem', animation: 'success-bounce 1s var(--md-motion-easing-spring) infinite alternate' }}>✓</div>
              <h2 style={{ marginTop: '4px' }}>Request Prepared!</h2>
              
              {/* Alert Card: Action Required */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                backgroundColor: 'hsla(36, 85%, 50%, 0.12)',
                border: '1px dashed var(--md-sys-color-tertiary)',
                color: 'var(--md-sys-color-on-surface)',
                padding: '12px 16px',
                borderRadius: '16px',
                width: '100%',
                textAlign: 'left',
                fontSize: '0.82rem',
                lineHeight: '1.45'
              }}>
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>⚠️</span>
                <span><strong>Action Required:</strong> Your booking is <strong>not finalized</strong> yet. You must complete the steps below to send the request via WhatsApp.</span>
              </div>

              {/* Step Guide */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
                textAlign: 'left',
                padding: '4px 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.75rem',
                    flexShrink: 0
                  }}>1</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--md-sys-color-on-surface-variant)' }}>Tap the green button below.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.75rem',
                    flexShrink: 0
                  }}>2</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--md-sys-color-on-surface-variant)' }}>WhatsApp will open with a pre-filled message.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.75rem',
                    flexShrink: 0
                  }}>3</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--md-sys-color-on-surface-variant)' }}>Tap <strong style={{ color: '#128C7E' }}>Send</strong> inside WhatsApp to finish!</span>
                </div>
              </div>

              {/* Chat Bubble Message Preview */}
              <div style={{
                position: 'relative',
                backgroundColor: 'var(--md-sys-color-surface-container-high)',
                border: '1px solid var(--md-sys-color-surface-container-highest)',
                borderRadius: '16px 16px 16px 0',
                padding: '16px',
                textAlign: 'left',
                width: '100%',
                fontSize: '0.8rem',
                fontFamily: 'var(--md-font-body)',
                color: 'var(--md-sys-color-on-surface)',
                boxShadow: 'var(--md-elevation-1)',
                lineHeight: '1.4'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '12px',
                  backgroundColor: 'var(--md-sys-color-secondary)',
                  color: 'var(--md-sys-color-on-secondary)',
                  fontSize: '0.62rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Message Preview
                </div>
                <div style={{ fontWeight: '700', color: 'var(--md-sys-color-primary)', marginBottom: '4px' }}>To: {config.clinic.name}</div>
                <div style={{ whiteSpace: 'pre-wrap', opacity: 0.9 }}>
                  {`Hello ${config.clinic.name},\nI would like to book a: *${currentService.title}*\nDate: ${selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\nTime: ${selectedTime}\nName: ${formData.name}`}
                </div>
              </div>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-pulse"
                style={{
                  marginTop: '8px',
                  width: '100%',
                  padding: '14px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: 'var(--md-shape-corner-large)',
                  textDecoration: 'none',
                  fontWeight: '700'
                }}
              >
                <WhatsAppIcon size={24} />
                Send Request via WhatsApp
              </a>

              <div style={{
                backgroundColor: 'var(--md-sys-color-surface-container)',
                padding: '12px 16px',
                borderRadius: 'var(--md-shape-corner-medium)',
                width: '100%',
                textAlign: 'left',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div><strong>Service:</strong> {currentService.title}</div>
                <div><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div><strong>Time:</strong> {selectedTime}</div>
                <div><strong>Location:</strong> {config.contact?.location || 'Shraddha Clinic'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal controls using standard M3 buttons */}
        <div className="modal-footer">
          {step === 1 && (
            <>
              <div /> {/* spacing placeholder */}
              <Button variant="filled" onClick={() => setStep(2)}>Next</Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button variant="tonal" onClick={handleBack}>Back</Button>
              <Button 
                variant="filled" 
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
                style={{ opacity: (!selectedDate || !selectedTime) ? 0.5 : 1 }}
              >
                Next
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Button variant="tonal" onClick={handleBack}>Back</Button>
              <Button 
                variant="filled" 
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.phone}
                style={{ opacity: (!formData.name || !formData.email || !formData.phone) ? 0.5 : 1 }}
              >
                Confirm Appointment
              </Button>
            </>
          )}

          {step === 4 && (
            <Button variant="filled" style={{ width: '100%' }} onClick={handleClose}>
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
