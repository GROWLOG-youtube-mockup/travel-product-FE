import React from 'react';

import styles from './Modal.module.scss';

interface ModalCloseButtonProps {
  onClick: () => void;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClick }) => (
  <button className={styles['modal__close']} onClick={onClick} aria-label="닫기">
    ×
  </button>
);

export default ModalCloseButton;
