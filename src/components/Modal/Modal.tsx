import React from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  overlayClassName?: string;
  modalClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  overlayClassName = '',
  modalClassName = ''
}) => {
  return (
    <div className={`${styles.overlay} ${overlayClassName}`}>
      <div className={`${styles.box} ${modalClassName}`}>{children}</div>
    </div>
  );
};

export default Modal;
