import React, { useState } from 'react';

import type { ModalType } from '../components/Modal/Modal';
import Modal from '../components/Modal/Modal';

const ModalExamplePage: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: Exclude<ModalType, null>) => setModalType(type);
  const handleCloseModal = () => setModalType(null);

  return (
    <div>
      <h1>Modal Example Page</h1>
      <button onClick={() => openModal('login')}>로그인 모달</button>
      <button onClick={() => openModal('edit')}>회원정보 수정 모달</button>
      <button onClick={() => openModal('delete')}>계정 탈퇴 모달</button>
      <button onClick={() => openModal('signup')}>회원가입 모달</button>
      <button onClick={() => openModal('signupView')}>회원가입 조회 모달</button>

      <Modal show={!!modalType} type={modalType} onClose={handleCloseModal} />
    </div>
  );
};

export default ModalExamplePage;
