import React, { forwardRef } from 'react';

import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'short' | 'default' | 'long';
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', className = '', ...props }, ref) => {
    const variantClass = variant === undefined || variant === 'default' ? 'default' : variant;
    return (
      <input
        ref={ref}
        className={[styles['atom-input'], styles[variantClass], className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
