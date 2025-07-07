import React from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  overlayClassName?: string;
  modalClassName?: string;
  boxStyle?: React.CSSProperties;
}

const DEFAULT_BOX_WIDTH = 700;

const Modal: React.FC<ModalProps> = ({
  children,
  overlayClassName = '',
  modalClassName = '',
  boxStyle = {}
}) => {
  const mergedBoxStyle = {
    width: DEFAULT_BOX_WIDTH,
    maxWidth: DEFAULT_BOX_WIDTH,
    ...boxStyle
  };
  return (
    <div className={`${styles.overlay} ${overlayClassName}`}>
      <div className={`${styles.box} ${modalClassName}`} style={mergedBoxStyle}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
