import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Button from './common/Button';

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

          {/* STEP 4: Success Message */}
          {step === 4 && (
            <div className="success-card fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="success-icon" style={{ backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)' }}>✓</div>
              <h2 style={{ marginTop: '12px' }}>Request Prepared!</h2>
              <p className="body-large" style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.4' }}>
                Thank you, <strong>{formData.name}</strong>. Please click the button below to send your details via WhatsApp and finalize your booking.
              </p>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  marginTop: '16px',
                  width: '100%',
                  padding: '14px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: 'var(--md-shape-corner-large)',
                  textDecoration: 'none',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                  transition: 'transform var(--md-motion-duration-short) var(--md-motion-easing-spring)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.594ZM7.994 14.52a6.57 6.57 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.294c-.202-.102-1.202-.594-1.387-.662-.186-.068-.322-.102-.457.102-.136.2-.524.662-.643.797-.12.134-.238.153-.44.05-.202-.1-.851-.313-1.62-.999-.597-.533-1-1.192-1.118-1.394-.118-.2-.013-.308.088-.408.09-.09.2-.234.3-.35.1-.117.133-.198.2-.33.067-.133.034-.25-.018-.35-.052-.102-.458-1.102-.626-1.507-.164-.399-.333-.344-.457-.35-.119-.005-.255-.005-.39-.005-.136 0-.356.05-.542.253-.186.2-.712.696-.712 1.698 0 1.002.729 1.97 1.23 2.983 6.133 5.4 10.843 8.358 13.064 9.176.52.193 1.025.184 1.41.127.43-.064 1.32-.54 1.507-1.061.186-.52.186-1.002.131-1.102-.056-.1-.202-.15-.403-.25Z"/>
                </svg>
                Send Request via WhatsApp
              </a>

              <div style={{
                backgroundColor: 'var(--md-sys-color-surface-container)',
                padding: '16px 20px',
                borderRadius: 'var(--md-shape-corner-medium)',
                width: '100%',
                marginTop: '16px',
                textAlign: 'left',
                fontSize: '0.85rem'
              }}>
                <div style={{ marginBottom: '6px' }}><strong>Service:</strong> {currentService.title}</div>
                <div style={{ marginBottom: '6px' }}><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div style={{ marginBottom: '6px' }}><strong>Time:</strong> {selectedTime}</div>
                <div><strong>Location:</strong> {config.contact?.location || 'Shraddha Clinic'}</div>
              </div>
              <p className="body-medium" style={{ opacity: 0.7, fontSize: '0.8rem', marginTop: '12px' }}>
                Note: Clicking the button will open WhatsApp with your prefilled message ready to send.
              </p>
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
