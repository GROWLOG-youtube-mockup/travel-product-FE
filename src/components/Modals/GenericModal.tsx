import React from 'react';

import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalHeader from '../Modal/ModalHeader';

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const GenericModal = ({ open, onClose, title, subtitle, children }: GenericModalProps) => {
  if (!open) return null;
  return (
    <Modal onClose={onClose}>
      <ModalHeader title={title} subtitle={subtitle}>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <div style={{ padding: 24 }}>{children}</div>
    </Modal>
  );
};

export default GenericModal;
