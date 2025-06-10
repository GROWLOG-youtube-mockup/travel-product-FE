import React from 'react';

import Label from '../atoms/Label/Label';

import styles from './Modal.module.scss';

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, subtitle, onClose, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <button className={styles.close} onClick={onClose} aria-label="닫기">
            ×
          </button>
          <div className={styles.contentInner}>
            {title && (
              <div className={styles.title}>
                <Label variant="pageTitle">{title}</Label>
              </div>
            )}
            {subtitle && (
              <Label variant="subtitle" color="gray">
                {subtitle}
              </Label>
            )}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
