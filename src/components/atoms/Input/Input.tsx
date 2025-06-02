import React from 'react';

import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'short' | 'default' | 'long';
};

const Input: React.FC<InputProps> = ({ variant = 'default', className = '', ...props }) => {
  const variantClass = variant === undefined || variant === 'default' ? 'default' : variant;
  return (
    <input
      className={[styles['atom-input'], styles[variantClass], className].filter(Boolean).join(' ')}
      {...props}
    />
  );
};

export default Input;
