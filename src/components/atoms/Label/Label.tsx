import React from 'react';

import styles from './Label.module.scss';

type LabelVariant = 'default' | 'bold' | 'small';

// 색상 클래스명도 접두어 없이 camelCase로 사용
// gray, darkgray, accent, buttonWhite, lightgray

type LabelColor = 'gray' | 'darkgray' | 'accent' | 'white' | 'lightgray' | 'red' | 'blue';

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
  const variantClass = styles[variant] || '';
  const colorClass = color ? styles[color] : '';
  const composedClassName = [variantClass, colorClass, className].filter(Boolean).join(' ');

  return (
    <label htmlFor={htmlFor} className={composedClassName} style={style}>
      {children}
    </label>
  );
};

export default Label;
