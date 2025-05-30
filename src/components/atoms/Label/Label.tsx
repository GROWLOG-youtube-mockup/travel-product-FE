import React from 'react';

import styles from './Label.module.scss';

type LabelVariant =
  | 'default'
  | 'gray'
  | 'darkgray'
  | 'accent'
  | 'pageTitle'
  | 'sectionTitle'
  | 'title'
  | 'subTitle'
  | 'inputLabel'
  | 'bodyText'
  | 'tab'
  | 'buttonWhite'
  | 'grayRgba'
  | 'inputText'
  | 'inputTextCenter';

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: LabelVariant;
};

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className = '',
  style = {},
  variant = 'default'
}) => {
  const variantClass = variant && styles[variant] ? styles[variant] : '';
  const composedClassName = [styles['atom-label'], variantClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={htmlFor} className={composedClassName} style={style}>
      {children}
    </label>
  );
};

export default Label;
