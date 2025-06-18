import React from 'react';

import styles from './Button.module.scss';

export type ButtonVariant =
  | 'account'
  | 'cartdel'
  | 'xs'
  | 'sm'
  | 'default'
  | 'rounded'
  | 'lg'
  | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: 'default' | 'white' | 'none' | 'gray';
  children: React.ReactNode;
}

export default function Button({
  variant = 'default',
  color = 'default',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[styles.button, styles[variant], color !== 'default' && styles[color], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
