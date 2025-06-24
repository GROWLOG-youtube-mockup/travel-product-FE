import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';
import DeleteAccountForm from '../../components/Modals/DeleteAccountForm';
import GenericModal from '../../components/Modals/GenericModal';
import NameChangeForm from '../../components/Modals/NameChangeForm';
import PasswordChangeForm from '../../components/Modals/PasswordChangeForm';
import PhoneChangeForm from '../../components/Modals/PhoneChangeForm';
import type { User } from '../../type/user';

import styles from './UserEdit.module.scss';

const UserEditPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // 모달 상태
  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/users/me');
        if (!res.ok) throw new Error('네트워크 오류');
        const data = await res.json();
        setUser(data);
      } catch {
        navigate('/error');
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className={styles.container}>
      {/* 계정 정보 변경 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2 className={styles.sectionLeftH2}>계정 정보 변경</h2>
          <p>계정 정보를 변경합니다.</p>
        </div>
        <form className={styles.sectionRight}>
          <div className={styles.inputGroup}>
            <label>이메일</label>
            <Input type="email" value={user?.email ?? ''} variant="long" disabled />
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>이름</label>
              <div className={styles.inputInline}>
                <Input type="text" value={user?.name ?? ''} variant="short" disabled />
                <Button variant="account" onClick={() => setNameModalOpen(true)}>
                  이름 변경
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>전화번호</label>
              <div className={styles.inputInline}>
                <Input type="text" value={user?.phone_number ?? ''} variant="short" disabled />
                <Button variant="account" onClick={() => setPhoneModalOpen(true)}>
                  전화번호 변경
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>비밀번호</label>
              <div className={styles.inputInline}>
                <Input type="password" value="" variant="short" disabled />
                <Button variant="account" onClick={() => setPasswordModalOpen(true)}>
                  비밀번호 변경
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* 계정 탈퇴 */}
      <section className={styles.section}>
        <div className={styles.sectionLeft}>
          <h2 className={styles.sectionLeftH2}>계정 탈퇴</h2>
          <p>계정 및 개인정보를 삭제합니다.</p>
        </div>
        <div className={styles.sectionRight}>
          <Button className={styles.danger} color="white" onClick={() => setDeleteModalOpen(true)}>
            계정 탈퇴하기
          </Button>
        </div>
      </section>

      {/* 모달들 */}
      <GenericModal
        open={isNameModalOpen}
        onClose={() => setNameModalOpen(false)}
        title="이름 변경"
      >
        <NameChangeForm onSuccess={() => setNameModalOpen(false)} />
      </GenericModal>
      <GenericModal
        open={isPhoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        title="전화번호 변경"
      >
        <PhoneChangeForm onSuccess={() => setPhoneModalOpen(false)} />
      </GenericModal>
      <GenericModal
        open={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="비밀번호 변경"
      >
        <PasswordChangeForm onSuccess={() => setPasswordModalOpen(false)} />
      </GenericModal>
      <GenericModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="계정 탈퇴"
      >
        <DeleteAccountForm onSuccess={() => setDeleteModalOpen(false)} />
      </GenericModal>
    </div>
  );
};

export default UserEditPage;
