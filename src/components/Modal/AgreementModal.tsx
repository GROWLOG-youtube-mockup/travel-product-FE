import { useEffect, useState } from 'react';

import Modal from './Modal';
import ModalHeader from './ModalHeader';

interface AgreementModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fileUrl: string; // md 또는 txt 파일 경로
}

const AgreementModal = ({ open, onClose, title, subtitle, fileUrl }: AgreementModalProps) => {
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
    <Modal onClose={onClose}>
      <ModalHeader title={title} subtitle={subtitle} />
      <div style={{ maxHeight: 400, overflowY: 'auto', whiteSpace: 'pre-line' }}>{content}</div>
    </Modal>
  );
};

export default AgreementModal;
