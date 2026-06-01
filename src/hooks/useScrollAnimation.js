import { useEffect, useRef } from 'react';

/**
 * Custom hook to trigger scroll-entrance animations on a component.
 * Attaches an IntersectionObserver to the returned ref and adds the 'visible' class.
 *
 * @param {Object} options IntersectionObserver configuration options.
 * @returns {React.RefObject} The ref to attach to the target element.
 */
export default function useScrollAnimation(options = {}) {
  const elementRef = useRef(null);
  const { threshold = 0.05, rootMargin = '0px 0px -40px 0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once animated into view to conserve resources
        observer.unobserve(entry.target);
      }
    }, { threshold, rootMargin });

    const currentElement = elementRef.current;
    if (currentElement) {
      currentElement.classList.add('animate-on-scroll');
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin]);

  return elementRef;
}
