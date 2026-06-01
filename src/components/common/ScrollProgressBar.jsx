import React, { useState, useEffect } from 'react';

/**
 * ScrollProgressBar Component
 * Renders a thin progress indicator bar at the top of the viewport
 * monitoring scroll depth percentage.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScroll = docHeight - winHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setProgress(scrolled);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial run to capture scroll state on mount/refresh
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{
        width: `${progress}%`,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        backgroundColor: 'var(--md-sys-color-primary)',
        zIndex: 1000,
        transition: 'width 80ms ease-out',
      }}
    />
  );
}
