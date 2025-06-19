import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalHeader from '../Modal/ModalHeader';

const SignupAccountView = () => <div>계정 조회 결과</div>;

interface SignupAccountModalProps {
  open: boolean;
  onClose: () => void;
}

const SignupAccountModal = ({ open, onClose }: SignupAccountModalProps) => {
  if (!open) return null;
  return (
    <Modal onClose={onClose}>
      <ModalHeader title="계정 조회 결과" subtitle="가입된 계정 정보를 확인하세요.">
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <div style={{ padding: 24 }}>
        <SignupAccountView />
      </div>
    </Modal>
  );
};

export default SignupAccountModal;
