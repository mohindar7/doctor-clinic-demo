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
  const { openBooking } = useApp();

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

      {/* Floating Action Button (FAB) for Quick Booking */}
      <button
        className="booking-fab"
        onClick={() => openBooking('general')}
        title="Schedule Appointment"
      >
        <WhatsAppIcon size={24} className="booking-fab-icon" style={{ marginRight: '6px' }} />
        <span className="booking-fab-text">Book Visit</span>
      </button>
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
