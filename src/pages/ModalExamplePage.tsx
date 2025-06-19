import React, { useState } from 'react';

import AgreementModal from '../components/Modal/AgreementModal';
import Modal from '../components/Modal/Modal';
import ModalCloseButton from '../components/Modal/ModalCloseButton';
import ModalHeader from '../components/Modal/ModalHeader';

import styles from '../components/Modal/Modal.module.scss';

const DeleteAccount = () => <div>계정 탈퇴 폼</div>;
const SignupAccountView = () => <div>계정 조회 결과</div>;

type ModalType = null | 'delete' | 'signupView';

const ModalExamplePage: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isRefundOpen, setRefundOpen] = useState(false);
  const openModal = (type: ModalType) => setModalType(type);
  const handleCloseModal = () => setModalType(null);

  return (
    <div>
      <h1>Modal Example Page</h1>
      <button onClick={() => openModal('delete')}>계정 탈퇴 모달</button>
      <button onClick={() => openModal('signupView')}>회원가입 조회 모달</button>
      <button onClick={() => setTermsOpen(true)}>이용약관 보기</button>
      <button onClick={() => setRefundOpen(true)}>취소/환불 규정 보기</button>

      {modalType === 'delete' && (
        <Modal onClose={handleCloseModal}>
          <ModalHeader title="계정 탈퇴" subtitle="계정 탈퇴 시 모든 정보가 삭제됩니다.">
            <ModalCloseButton onClick={handleCloseModal} />
          </ModalHeader>
          <div className={styles.contentInner}>
            <DeleteAccount />
          </div>
        </Modal>
      )}
      {modalType === 'signupView' && (
        <Modal onClose={handleCloseModal}>
          <ModalHeader title="계정 조회 결과" subtitle="가입된 계정 정보를 확인하세요.">
            <ModalCloseButton onClick={handleCloseModal} />
          </ModalHeader>
          <div className={styles.contentInner}>
            <SignupAccountView />
          </div>
        </Modal>
      )}
      <AgreementModal
        open={isTermsOpen}
        onClose={() => setTermsOpen(false)}
        title="이용약관"
        subtitle="2025년 6월 기준"
        fileUrl="/terms.md"
      />
      <AgreementModal
        open={isRefundOpen}
        onClose={() => setRefundOpen(false)}
        title="취소/환불 규정"
        subtitle="2025년 6월 기준"
        fileUrl="/refund-policy.md"
      />
    </div>
  );
};

export default ModalExamplePage;
