import React from 'react';

import styles from './Modal.module.scss';

interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, children }) => (
  <div className={styles['modal__header']}>
    {title && <div className={styles['modal__title']}>{title}</div>}
    {subtitle && <div className={styles['modal__subtitle']}>{subtitle}</div>}
    {children}
  </div>
);

export default ModalHeader;
