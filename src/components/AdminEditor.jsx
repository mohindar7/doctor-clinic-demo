import React, { useState } from 'react';

export default function AdminEditor({ isOpen, onClose, config, onUpdate, onReset }) {
  const [activeTab, setActiveTab] = useState('general'); // general, services, testimonials
  
  // Service editor sub-form state
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({ id: '', title: '', description: '', duration: '30 mins', cost: '$50', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' });
  const [isAddingService, setIsAddingService] = useState(false);

  // Testimonial editor sub-form state
  const [testimonialForm, setTestimonialForm] = useState({ text: '', author: '', meta: '', rating: 5, avatar: 'PA' });
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  if (!isOpen) return null;

  // General field change
  const handleChange = (section, field, value) => {
    const updated = {
      ...config,
      [section]: {
        ...config[section],
        [field]: value
      }
    };
    onUpdate(updated);
  };

  // Color Hue Slider change
  const handleHueChange = (e) => {
    const hue = parseInt(e.target.value);
    const updated = {
      ...config,
      theme: {
        ...config.theme,
        primaryHue: hue
      }
    };
    onUpdate(updated);
  };

  // Services actions
  const startAddService = () => {
    setServiceForm({
      id: 'service_' + Date.now(),
      title: '',
      description: '',
      duration: '30 mins',
      cost: '$60',
      iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2'
    });
    setIsAddingService(true);
    setEditingServiceId(null);
  };

  const startEditService = (srv) => {
    setServiceForm({ ...srv });
    setEditingServiceId(srv.id);
    setIsAddingService(false);
  };

  const saveService = () => {
    if (!serviceForm.title || !serviceForm.description) return;
    
    let updatedServices;
    if (editingServiceId) {
      updatedServices = config.services.map(s => s.id === editingServiceId ? serviceForm : s);
    } else {
      updatedServices = [...config.services, serviceForm];
    }
    
    onUpdate({ ...config, services: updatedServices });
    setIsAddingService(false);
    setEditingServiceId(null);
  };

  const deleteService = (id) => {
    const updatedServices = config.services.filter(s => s.id !== id);
    onUpdate({ ...config, services: updatedServices });
    if (editingServiceId === id) {
      setEditingServiceId(null);
      setIsAddingService(false);
    }
  };

  // Testimonial actions
  const addTestimonial = () => {
    if (!testimonialForm.text || !testimonialForm.author) return;
    const avatar = testimonialForm.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PA';
    const newTestimonial = { ...testimonialForm, avatar };
    
    onUpdate({
      ...config,
      testimonials: [...config.testimonials, newTestimonial]
    });
    setTestimonialForm({ text: '', author: '', meta: '', rating: 5, avatar: 'PA' });
    setIsAddingTestimonial(false);
  };

  const deleteTestimonial = (index) => {
    const updated = config.testimonials.filter((_, i) => i !== index);
    onUpdate({ ...config, testimonials: updated });
  };

  // Export JSON file config.json
  const exportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    alert('Configuration JSON copied to clipboard! Replace the contents of src/config.json with this.');
  };

  return (
    <div className={`admin-panel ${isOpen ? 'open' : ''}`}>
      <div className="admin-panel-header">
        <h2>Visual Website Editor</h2>
        <button 
          className="modal-close-btn" 
          style={{ width: '32px', height: '32px', fontSize: '1.25rem' }} 
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      {/* Editor Navigation tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--md-sys-color-surface-variant)' }}>
        <button 
          onClick={() => { setActiveTab('general'); setIsAddingService(false); setEditingServiceId(null); setIsAddingTestimonial(false); }}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            background: activeTab === 'general' ? 'var(--md-sys-color-surface)' : 'transparent',
            color: activeTab === 'general' ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
            fontWeight: activeTab === 'general' ? '700' : '500',
            cursor: 'pointer'
          }}
        >
          Info & Style
        </button>
        <button 
          onClick={() => { setActiveTab('services'); setIsAddingService(false); setEditingServiceId(null); }}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            background: activeTab === 'services' ? 'var(--md-sys-color-surface)' : 'transparent',
            color: activeTab === 'services' ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
            fontWeight: activeTab === 'services' ? '700' : '500',
            cursor: 'pointer'
          }}
        >
          Services ({config.services.length})
        </button>
        <button 
          onClick={() => { setActiveTab('testimonials'); setIsAddingTestimonial(false); }}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            background: activeTab === 'testimonials' ? 'var(--md-sys-color-surface)' : 'transparent',
            color: activeTab === 'testimonials' ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
            fontWeight: activeTab === 'testimonials' ? '700' : '500',
            cursor: 'pointer'
          }}
        >
          Reviews ({config.testimonials.length})
        </button>
      </div>

      <div className="admin-panel-body">
        
        {/* TAB 1: General Info & Style */}
        {activeTab === 'general' && (
          <>
            {/* Color Theme Selector */}
            <div className="admin-section">
              <div className="admin-section-title">🎨 Brand Color Theme</div>
              <div className="admin-form-group">
                <label>Primary Theme Hue: {config.theme.primaryHue}°</label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={config.theme.primaryHue} 
                  onChange={handleHueChange} 
                  className="admin-range-slider"
                />
                <span className="body-medium" style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '4px' }}>
                  Drag slider to instantly update the site brand colors (Teal, Blue, Purple, Green, Red, etc.).
                </span>
              </div>
            </div>

            {/* Clinic Info */}
            <div className="admin-section">
              <div className="admin-section-title">🏥 Clinic Details</div>
              <div className="admin-form-group">
                <label>Clinic Name</label>
                <input 
                  type="text" 
                  value={config.clinic.name} 
                  onChange={(e) => handleChange('clinic', 'name', e.target.value)} 
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label>SEO Full Title</label>
                <input 
                  type="text" 
                  value={config.clinic.fullName} 
                  onChange={(e) => handleChange('clinic', 'fullName', e.target.value)} 
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label>Hero Title Headline</label>
                <input 
                  type="text" 
                  value={config.clinic.heroTitle} 
                  onChange={(e) => handleChange('clinic', 'heroTitle', e.target.value)} 
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label>Hero Description</label>
                <textarea 
                  rows="3" 
                  value={config.clinic.heroSubtitle} 
                  onChange={(e) => handleChange('clinic', 'heroSubtitle', e.target.value)} 
                  className="admin-textarea"
                />
              </div>
            </div>

            {/* Doctor Profile Info */}
            <div className="admin-section">
              <div className="admin-section-title">🩺 Doctor Profile</div>
              <div className="admin-form-group">
                <label>Doctor's Name & Degrees</label>
                <input 
                  type="text" 
                  value={config.doctor.name} 
                  onChange={(e) => handleChange('doctor', 'name', e.target.value)} 
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label>Full Bio Paragraph 1</label>
                <textarea 
                  rows="4" 
                  value={config.doctor.bioLarge} 
                  onChange={(e) => handleChange('doctor', 'bioLarge', e.target.value)} 
                  className="admin-textarea"
                />
              </div>
              <div className="admin-form-group">
                <label>Full Bio Paragraph 2</label>
                <textarea 
                  rows="3" 
                  value={config.doctor.bioMedium} 
                  onChange={(e) => handleChange('doctor', 'bioMedium', e.target.value)} 
                  className="admin-textarea"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="admin-section">
              <div className="admin-section-title">📞 Contact & Location</div>
              <div className="admin-form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  value={config.contact.location} 
                  onChange={(e) => handleChange('contact', 'location', e.target.value)} 
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  value={config.contact.phone} 
                  onChange={(e) => handleChange('contact', 'phone', e.target.value)} 
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label>Email Address</label>
                <input 
                  type="text" 
                  value={config.contact.email} 
                  onChange={(e) => handleChange('contact', 'email', e.target.value)} 
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label>Opening Hours</label>
                <textarea 
                  rows="3" 
                  value={config.contact.hours} 
                  onChange={(e) => handleChange('contact', 'hours', e.target.value)} 
                  className="admin-textarea"
                />
              </div>
            </div>
          </>
        )}

        {/* TAB 2: Services Editor */}
        {activeTab === 'services' && (
          <div className="fade-in">
            {!isAddingService && !editingServiceId ? (
              <>
                <button className="btn btn-filled" style={{ width: '100%', marginBottom: '20px' }} onClick={startAddService}>
                  + Add New Service
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {config.services.map((srv) => (
                    <div key={srv.id} className="admin-list-item">
                      <div>
                        <strong>{srv.title}</strong>
                        <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>{srv.duration} • {srv.cost}</div>
                      </div>
                      <div className="admin-list-item-buttons">
                        <button className="btn btn-tonal" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '12px' }} onClick={() => startEditService(srv)}>
                          Edit
                        </button>
                        <button 
                          className="btn btn-text" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--md-sys-color-error)' }} 
                          onClick={() => { if(confirm('Are you sure you want to delete this service?')) deleteService(srv.id); }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="admin-section fade-in">
                <h3>{editingServiceId ? 'Edit Service' : 'New Service'}</h3>
                
                <div className="admin-form-group" style={{ marginTop: '16px' }}>
                  <label>Service Title</label>
                  <input 
                    type="text" 
                    value={serviceForm.title} 
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} 
                    className="admin-input" 
                    placeholder="e.g. Skin Cancer Screening"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea 
                    rows="3" 
                    value={serviceForm.description} 
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} 
                    className="admin-textarea"
                    placeholder="Provide a brief explanation of what the service entails..."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="admin-form-group">
                    <label>Duration</label>
                    <input 
                      type="text" 
                      value={serviceForm.duration} 
                      onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })} 
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Cost</label>
                    <input 
                      type="text" 
                      value={serviceForm.cost} 
                      onChange={(e) => setServiceForm({ ...serviceForm, cost: e.target.value })} 
                      className="admin-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="btn btn-filled" onClick={saveService} style={{ flex: 1 }}>Save</button>
                  <button className="btn btn-tonal" onClick={() => { setIsAddingService(false); setEditingServiceId(null); }} style={{ flex: 1 }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Reviews Editor */}
        {activeTab === 'testimonials' && (
          <div className="fade-in">
            {!isAddingTestimonial ? (
              <>
                <button className="btn btn-filled" style={{ width: '100%', marginBottom: '20px' }} onClick={() => setIsAddingTestimonial(true)}>
                  + Add Patient Review
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {config.testimonials.map((test, index) => (
                    <div key={index} className="admin-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{test.author}</strong>
                        <button 
                          className="btn btn-text" 
                          style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--md-sys-color-error)' }} 
                          onClick={() => { if(confirm('Delete this review?')) deleteTestimonial(index); }}
                        >
                          Delete
                        </button>
                      </div>
                      <p style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '0.8rem' }}>{test.text}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="admin-section fade-in">
                <h3>New Patient Review</h3>

                <div className="admin-form-group" style={{ marginTop: '16px' }}>
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    value={testimonialForm.author} 
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })} 
                    className="admin-input" 
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Subtitle / Metadata</label>
                  <input 
                    type="text" 
                    value={testimonialForm.meta} 
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, meta: e.target.value })} 
                    className="admin-input" 
                    placeholder="e.g. Patient since 2023"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Review Comment</label>
                  <textarea 
                    rows="3" 
                    value={testimonialForm.text} 
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })} 
                    className="admin-textarea"
                    placeholder="Enter the patient's statement..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="btn btn-filled" onClick={addTestimonial} style={{ flex: 1 }}>Add</button>
                  <button className="btn btn-tonal" onClick={() => setIsAddingTestimonial(false)} style={{ flex: 1 }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Exporter Action Buttons in Footer */}
      <div className="admin-panel-footer">
        <button className="btn btn-filled" onClick={exportConfig} style={{ flex: 1, fontSize: '0.85rem', padding: '10px' }}>
          💾 Download Config
        </button>
        <button className="btn btn-tonal" onClick={copyConfig} style={{ flex: 1, fontSize: '0.85rem', padding: '10px' }}>
          📋 Copy JSON
        </button>
        <button className="btn btn-text" onClick={onReset} style={{ fontSize: '0.85rem', padding: '10px', color: 'var(--md-sys-color-error)' }}>
          Reset
        </button>
      </div>
    </div>
  );
}
