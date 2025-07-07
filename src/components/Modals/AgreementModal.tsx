import { useEffect, useState } from 'react';

import type { AgreementModalProps } from '@/types/modal';

import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalHeader from '../Modal/ModalHeader';

import styles from '../Modal/Modal.module.scss';

const AgreementModal = ({
  open,
  onClose,
  title,
  subtitle,
  fileUrl,
  boxWidth
}: AgreementModalProps) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (open) {
      fetch(fileUrl)
        .then((res) => res.text())
        .then(setContent);
    }
  }, [open, fileUrl]);

  if (!open) return null;

  return (
    <Modal
      onClose={onClose}
      boxStyle={boxWidth ? { width: boxWidth, maxWidth: boxWidth } : undefined}
    >
      <div className={styles.headerWrapper}>
        <ModalHeader title={title} subtitle={subtitle} />
      </div>
      <ModalCloseButton onClick={onClose} />
      <div className={styles.agreementContent}>{content}</div>
    </Modal>
  );
};

export default AgreementModal;
