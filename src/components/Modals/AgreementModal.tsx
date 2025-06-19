import { useEffect, useState } from 'react';

import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalHeader from '../Modal/ModalHeader';

import styles from '../Modal/Modal.module.scss';

interface AgreementModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fileUrl: string; // md 또는 txt 파일 경로
  boxWidth?: number;
}

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
      <div className={`${styles.headerWrapper} ${styles.agreementHeaderWrapper}`}>
        <ModalHeader title={title} subtitle={subtitle} />
      </div>
      <ModalCloseButton onClick={onClose} />
      <div className={styles.agreementContentWrapper}>
        <div className={styles.agreementContent}>{content}</div>
      </div>
    </Modal>
  );
};

export default AgreementModal;
