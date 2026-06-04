import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Common Components
import ScrollProgressBar from './components/common/ScrollProgressBar';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="booking-fab-icon"
          style={{ marginRight: '6px' }}
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.594ZM7.994 14.52a6.57 6.57 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.294c-.202-.102-1.202-.594-1.387-.662-.186-.068-.322-.102-.457.102-.136.2-.524.662-.643.797-.12.134-.238.153-.44.05-.202-.1-.851-.313-1.62-.999-.597-.533-1-1.192-1.118-1.394-.118-.2-.013-.308.088-.408.09-.09.2-.234.3-.35.1-.117.133-.198.2-.33.067-.133.034-.25-.018-.35-.052-.102-.458-1.102-.626-1.507-.164-.399-.333-.344-.457-.35-.119-.005-.255-.005-.39-.005-.136 0-.356.05-.542.253-.186.2-.712.696-.712 1.698 0 1.002.729 1.97 1.23 2.983 6.133 5.4 10.843 8.358 13.064 9.176.52.193 1.025.184 1.41.127.43-.064 1.32-.54 1.507-1.061.186-.52.186-1.002.131-1.102-.056-.1-.202-.15-.403-.25Z"/>
        </svg>
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
