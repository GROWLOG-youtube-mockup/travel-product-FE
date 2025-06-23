import type { GenericModalProps } from '../../type/modal';
import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalHeader from '../Modal/ModalHeader';

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
