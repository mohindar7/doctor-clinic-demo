import React, { useRef, useEffect } from 'react';

/**
 * ScrollProgressBar Component
 * Renders a thin progress indicator bar at the top of the viewport.
 *
 * Performance: Uses a direct DOM ref mutation instead of setState to avoid
 * triggering a React re-render on every scroll event. This prevents the
 * component from entering React's reconciliation cycle 60 times/second,
 * while still achieving a perfectly smooth visual update via CSS transform.
 */
export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScroll = docHeight - winHeight;
      const progress = totalScroll > 0
        ? (window.scrollY / totalScroll) * 100
        : 0;
      // Directly mutate the DOM — no React re-render triggered
      bar.style.transform = `scaleX(${progress / 100})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: 'var(--md-sys-color-primary)',
        zIndex: 1000,
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        transition: 'transform 80ms ease-out',
        willChange: 'transform',
      }}
    />
  );
}
