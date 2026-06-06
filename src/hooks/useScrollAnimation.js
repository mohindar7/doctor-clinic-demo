import { useEffect, useRef } from 'react';

/**
 * Custom hook to trigger scroll-entrance animations on a component.
 * Attaches an IntersectionObserver to the returned ref and adds the 'visible' class.
 *
 * Performance: will-change is set only during the animation window, then cleared
 * to free GPU memory. This avoids the common anti-pattern of setting will-change
 * permanently, which creates unnecessary compositing layers and wastes GPU RAM.
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
        const el = entry.target;
        // Set will-change just before the animation starts
        el.style.willChange = 'opacity, transform';
        el.classList.add('visible');
        // Clean up will-change after animation completes to free compositing layer
        const cleanup = () => {
          el.style.willChange = 'auto';
          el.removeEventListener('transitionend', cleanup);
        };
        el.addEventListener('transitionend', cleanup, { once: true });
        // Stop observing once animated into view to conserve resources
        observer.unobserve(el);
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
