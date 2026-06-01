import React, { useState } from 'react';

const SERVICES = [
  { id: 'general', name: 'General Consultation', duration: '30 mins', cost: '$50' },
  { id: 'pediatrics', name: 'Pediatric Care', duration: '45 mins', cost: '$70' },
  { id: 'cardio', name: 'Cardiology Assessment', duration: '60 mins', cost: '$120' },
  { id: 'dental', name: 'Dental Cleaning & Exam', duration: '45 mins', cost: '$80' },
  { id: 'wellness', name: 'Comprehensive Health Checkup', duration: '90 mins', cost: '$150' },
];

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

export default function BookingModal({ isOpen, onClose, initialServiceId }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialServiceId || 'general');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', note: '' });

  const dates = getNextBusinessDays();

  // Reset modal state
  const handleClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', email: '', phone: '', note: '' });
    onClose();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setStep(4); // Success step
  };

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book an Appointment</h2>
          <button className="modal-close-btn" onClick={handleClose}>&times;</button>
        </div>

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
                {SERVICES.map((srv) => (
                  <div 
                    key={srv.id} 
                    className={`option-item ${selectedService === srv.id ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect(srv.id)}
                  >
                    <div>
                      <div className="option-title">{srv.name}</div>
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
                Selected: <strong>{currentService.name}</strong>
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
                  <h4 style={{ fontSize: '1rem', marginBottom: '8px', marginTop: '16px' }}>Available Time Slots</h4>
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
                Booking <strong>{currentService.name}</strong> on{' '}
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
            <div className="success-card fade-in">
              <div className="success-icon">✓</div>
              <h2>Booking Confirmed!</h2>
              <p className="body-large" style={{ marginTop: '8px' }}>
                Thank you, <strong>{formData.name}</strong>. Your appointment has been scheduled successfully.
              </p>
              <div style={{
                backgroundColor: 'var(--md-sys-color-surface-container)',
                padding: '20px',
                borderRadius: 'var(--md-shape-corner-medium)',
                width: '100%',
                marginTop: '16px',
                textAlign: 'left'
              }}>
                <div style={{ marginBottom: '8px' }}><strong>Service:</strong> {currentService.name}</div>
                <div style={{ marginBottom: '8px' }}><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div style={{ marginBottom: '8px' }}><strong>Time:</strong> {selectedTime}</div>
                <div><strong>Location:</strong> Suite 400, CarePulse Medical Plaza</div>
              </div>
              <p className="body-medium" style={{ opacity: 0.8, fontSize: '0.85rem' }}>
                A confirmation email and SMS reminder have been sent.
              </p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step === 1 && (
            <>
              <div /> {/* spacing placeholder */}
              <button className="btn btn-filled" onClick={() => setStep(2)}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <button className="btn btn-tonal" onClick={handleBack}>Back</button>
              <button 
                className="btn btn-filled" 
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
                style={{ opacity: (!selectedDate || !selectedTime) ? 0.5 : 1 }}
              >
                Next
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button className="btn btn-tonal" onClick={handleBack}>Back</button>
              <button 
                className="btn btn-filled" 
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.phone}
                style={{ opacity: (!formData.name || !formData.email || !formData.phone) ? 0.5 : 1 }}
              >
                Confirm Appointment
              </button>
            </>
          )}

          {step === 4 && (
            <button className="btn btn-filled" style={{ width: '100%' }} onClick={handleClose}>
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
