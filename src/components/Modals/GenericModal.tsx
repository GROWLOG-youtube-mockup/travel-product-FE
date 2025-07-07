import Modal from '@/components/Modal/Modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton';
import ModalHeader from '@/components/Modal/ModalHeader';
import type { GenericModalProps } from '@/types/modal';

const GenericModal = ({ open, onClose, title, subtitle, children }: GenericModalProps) => {
  if (!open) return null;
  return (
    <Modal onClose={onClose}>
      <ModalHeader title={title} subtitle={subtitle}>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <div style={{ padding: 12 }}>{children}</div>
    </Modal>
  );
};

export default GenericModal;
