import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Common Components
import ScrollProgressBar from './components/common/ScrollProgressBar';
import WhatsAppIcon from './components/common/WhatsAppIcon';

// Layout Sections
import Header from './components/layout/Header';
import MobileDrawer from './components/layout/MobileDrawer';
import Hero from './components/layout/Hero';
import ServicesSection from './components/layout/ServicesSection';
import DoctorProfile from './components/layout/DoctorProfile';
import GallerySection from './components/layout/GallerySection';
import ReviewsSection from './components/layout/ReviewsSection';
import FAQSection from './components/layout/FAQSection';
import ContactSection from './components/layout/ContactSection';
import Footer from './components/layout/Footer';

// Modals & Sheets
import BookingModal from './components/BookingModal';
import SpecialtyDetailDrawer from './components/layout/SpecialtyDetailDrawer';

/**
 * AppContent Component
 * Renders the application markup, sections, and overlays.
 * Resides inside the AppProvider to consume shared states.
 */
function AppContent() {
  const { openBooking, config } = useApp();
  const cleanPhone = config.contact.phone.replace(/\D/g, '');

  return (
    <>
      {/* Scroll Progress Indicator Bar */}
      <ScrollProgressBar />

      {/* Navigation Header */}
      <Header />

      {/* Main Page Layout */}
      <main style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        {/* Ambient Decorative Blur Blobs */}
        <div className="ambient-blob-1"></div>
        <div className="ambient-blob-2"></div>

        {/* Sections */}
        <Hero />
        <ServicesSection />
        <DoctorProfile />
        <GallerySection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Unified Dynamic Booking Modal */}
      <BookingModal />

      {/* Specialty Bottom-Sheet Detail Drawer */}
      <SpecialtyDetailDrawer />

      {/* Mobile Sidebar Navigation Drawer */}
      <MobileDrawer />

      {/* Floating Action Buttons (FABs) for Quick Actions */}
      <div className="floating-actions-container">
        <a
          href={`tel:+${cleanPhone}`}
          className="call-fab"
          title="Call Clinic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
          </svg>
        </a>
        <button
          className="booking-fab"
          onClick={() => openBooking('general')}
          title="Schedule Appointment"
        >
          <WhatsAppIcon size={18} className="booking-fab-icon" style={{ marginRight: '6px' }} />
          <span className="booking-fab-text">Book Visit</span>
        </button>
      </div>
    </>
  );
}

/**
 * App Root Component
 * Wraps Content inside global Provider.
 */
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
