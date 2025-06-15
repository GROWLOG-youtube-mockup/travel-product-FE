import React from 'react';

import styles from './Modal.module.scss';

interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, children }) => (
  <div className={styles.header}>
    {title && <div className={styles.title}>{title}</div>}
    {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    {children}
  </div>
);

export default ModalHeader;
