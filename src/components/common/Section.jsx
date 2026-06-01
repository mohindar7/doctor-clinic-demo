import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * Reusable Section wrapper component.
 * Standardizes section layout structures and handles container embedding
 * and scroll reveal animations automatically.
 *
 * @param {Object} props
 * @param {string} props.id - Element ID for navigation anchors
 * @param {boolean} [props.alt=false] - Use alternate section background and card wrapper style
 * @param {boolean} [props.animate=true] - Apply scroll reveal animation
 * @param {React.ReactNode} props.children - Section contents
 * @param {string} [props.className=''] - Custom styling classes
 * @param {number} [props.delay=0] - Delay for scroll animations in ms
 */
export default function Section({
  id,
  alt = false,
  animate = true,
  children,
  className = '',
  delay = 0,
  ...rest
}) {
  // Use scroll animation hook conditionally
  const animationRef = animate ? useScrollAnimation() : null;

  const sectionClass = alt ? 'section-alt' : 'section';
  const combinedClasses = `${sectionClass} ${className}`.trim();

  return (
    <section
      id={id}
      className={combinedClasses}
      ref={animationRef}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}
