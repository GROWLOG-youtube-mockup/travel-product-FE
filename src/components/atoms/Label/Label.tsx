import React from 'react';

import styles from './Label.module.scss';

type LabelVariant =
  | 'default'
  | 'pageTitle'
  | 'sectionTitle'
  | 'title'
  | 'inputLabel'
  | 'bodyText'
  | string;

type LabelColor = 'gray' | 'darkgray' | 'accent' | 'buttonWhite' | 'lightgray';

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: LabelVariant;
  color?: LabelColor;
};

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className = '',
  style = {},
  variant = 'default',
  color
}) => {
  const variantKey = variant && variant !== 'default' ? `label-${variant}` : 'label';
  const colorKey = color ? `label-color-${color}` : '';
  const variantClass = styles[variantKey] || '';
  const colorClass = colorKey ? styles[colorKey] : '';
  const composedClassName = [variantClass, colorClass, className].filter(Boolean).join(' ');

  return (
    <label htmlFor={htmlFor} className={composedClassName} style={style}>
      {children}
    </label>
  );
};

export default Label;
