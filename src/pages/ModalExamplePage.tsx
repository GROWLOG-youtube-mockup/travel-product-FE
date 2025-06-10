import React, { useState } from 'react';

import Modal from '../components/Modal/Modal';

const LoginForm = () => <div>로그인 폼</div>;
const UserEditForm = () => <div>회원정보 수정 폼</div>;
const DeleteAccount = () => <div>계정 탈퇴 폼</div>;
const SignupForm = () => <div>회원가입 폼</div>;
const SignupAccountView = () => <div>계정 조회 결과</div>;

type ModalType = null | 'login' | 'edit' | 'delete' | 'signup' | 'signupView';

const ModalExamplePage: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const openModal = (type: ModalType) => setModalType(type);
  const handleCloseModal = () => setModalType(null);

  return (
    <div>
      <h1>Modal Example Page</h1>
      <button onClick={() => openModal('login')}>로그인 모달</button>
      <button onClick={() => openModal('edit')}>회원정보 수정 모달</button>
      <button onClick={() => openModal('delete')}>계정 탈퇴 모달</button>
      <button onClick={() => openModal('signup')}>회원가입 모달</button>
      <button onClick={() => openModal('signupView')}>회원가입 조회 모달</button>

      {modalType === 'login' && (
        <Modal
          onClose={handleCloseModal}
          title="로그인"
          subtitle="서비스 이용을 위해 로그인 해주세요."
        >
          <LoginForm />
        </Modal>
      )}
      {modalType === 'edit' && (
        <Modal
          onClose={handleCloseModal}
          title="회원정보 수정"
          subtitle="회원정보를 수정할 수 있습니다."
        >
          <UserEditForm />
        </Modal>
      )}
      {modalType === 'delete' && (
        <Modal
          onClose={handleCloseModal}
          title="계정 탈퇴"
          subtitle="계정 탈퇴 시 모든 정보가 삭제됩니다."
        >
          <DeleteAccount />
        </Modal>
      )}
      {modalType === 'signup' && (
        <Modal onClose={handleCloseModal} title="회원가입" subtitle="회원가입을 진행해 주세요.">
          <SignupForm />
        </Modal>
      )}
      {modalType === 'signupView' && (
        <Modal
          onClose={handleCloseModal}
          title="계정 조회 결과"
          subtitle="가입된 계정 정보를 확인하세요."
        >
          <SignupAccountView />
        </Modal>
      )}
    </div>
  );
};

export default ModalExamplePage;
