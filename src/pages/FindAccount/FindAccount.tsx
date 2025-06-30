import { useState } from 'react';

import FindEmailForm from '@/components/FindAccount/FindEmailForm';
import ResetPasswordForm from '@/components/FindAccount/ResetPasswordForm';
import GenericModal from '@/components/Modals/GenericModal';

import styles from './FindAccount.module.scss';

const FindAccountPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalGuide, setModalGuide] = useState('');

  const handleResult = (title: string, message: string, guide?: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalGuide(guide || '');
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      {/* 가입 계정 찾기 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2 className={styles.sectionLeftH2}>가입 계정 찾기</h2>
          <p>가입한 계정의 이메일을 찾습니다.</p>
        </div>
        <FindEmailForm onResult={handleResult} styles={styles} />
      </section>

      {/* 임시 비밀번호 발급받기 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2 className={styles.sectionLeftH2}>임시 비밀번호 발급받기</h2>
          <p>가입하신 이메일로 임시 비밀번호를 보내드립니다.</p>
        </div>
        <ResetPasswordForm onResult={handleResult} styles={styles} />
      </section>

      <GenericModal open={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        <div>{modalMessage}</div>
        {modalGuide && (
          <div style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>{modalGuide}</div>
        )}
      </GenericModal>
    </div>
  );
};

export default FindAccountPage;
