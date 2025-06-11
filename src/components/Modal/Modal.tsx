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
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <div className={styles['modal__container']}>
          <button className={styles['modal__close']} onClick={onClose} aria-label="닫기">
            ×
          </button>
          <div className={styles['modal__content-inner']}>
            {title && (
              <div className={styles['modal__title']}>
                <Label variant="pageTitle">{title}</Label>
              </div>
            )}
            {subtitle && (
              <Label variant="subtitle" color="gray">
                {subtitle}
              </Label>
            )}
            <div className={styles['modal__content']}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
