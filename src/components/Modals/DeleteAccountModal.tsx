import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalHeader from '../Modal/ModalHeader';

const DeleteAccount = () => <div>계정 탈퇴 폼</div>;

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ open, onClose }: DeleteAccountModalProps) => {
  if (!open) return null;
  return (
    <Modal onClose={onClose}>
      <ModalHeader title="계정 탈퇴" subtitle="계정 탈퇴 시 모든 정보가 삭제됩니다.">
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <div style={{ padding: 24 }}>
        <DeleteAccount />
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
