import React from 'react';

import styles from './AdminModalHeader.module.scss';

interface AdminModalHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const AdminModalHeader: React.FC<AdminModalHeaderProps> = ({ title, subtitle, children }) => (
  <div className={styles.headerWrapper}>
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {children}
    </div>
  </div>
);

export default AdminModalHeader;
