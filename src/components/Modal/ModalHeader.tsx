import React from 'react';

import styles from './Modal.module.scss';

interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, children }) => (
  <div className={styles.Header}>
    {title && <div className={styles.Title}>{title}</div>}
    {subtitle && <div className={styles.Subtitle}>{subtitle}</div>}
    {children}
  </div>
);

export default ModalHeader;
