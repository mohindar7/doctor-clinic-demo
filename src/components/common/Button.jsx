import React from 'react';

/**
 * Material 3 Expressive Button component.
 * Supports all 5 M3 types: filled, tonal, elevated, outlined, and text.
 * Implement shape morphing on press and bounce scaling on hover/active states.
 *
 * @param {Object} props
 * @param {'filled' | 'tonal' | 'elevated' | 'outlined' | 'text'} [props.variant='filled'] - The M3 button type
 * @param {'medium' | 'large' | 'extra-large'} [props.size='medium'] - Visual size weighting
 * @param {React.ReactNode} props.children - Button label or contents
 * @param {Function} props.onClick - Click event handler
 * @param {string} [props.className=''] - Extra classes
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {Object} [props.style={}] - Inline overrides
 * @param {string} [props.type='button'] - Button HTML element type
 * @param {string} [props.ariaLabel] - Accessibility label
 */
export default function Button({
  variant = 'filled',
  size = 'medium',
  children,
  onClick,
  className = '',
  disabled = false,
  style = {},
  type = 'button',
  ariaLabel,
  ...rest
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'medium' ? `btn-${size}` : '';
  const combinedClasses = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      style={style}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
}
