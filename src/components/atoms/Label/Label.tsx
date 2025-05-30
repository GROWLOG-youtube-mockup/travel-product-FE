import React from 'react';

import './Label.scss';

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
  | 'lightgray'
  | 'inputTextLeft'
  | string; // 여러 조합을 허용하기 위해 string 추가

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
  // 여러 variant 조합 지원 (예: "title gray")
  const variantClasses = variant ? variant.split(' ').join(' ') : '';
  const composedClassName = ['atom-label', variantClasses, className].filter(Boolean).join(' ');

  return (
    <label htmlFor={htmlFor} className={composedClassName} style={style}>
      {children}
    </label>
  );
};

export default Label;
