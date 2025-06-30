import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';
import DeleteAccountModal from '../../components/Modals/DeleteAccountModal';
import NameChangeModal from '../../components/Modals/NameChangeModal';
import PasswordChangeModal from '../../components/Modals/PasswordChangeModal';
import PhoneChangeModal from '../../components/Modals/PhoneChangeModal';
import { api } from '../../lib/api';
import type { EndpointResponseMap } from '../../types/api/EndpointResponseMap.type';
import type { User } from '../../types/api/User.type';

import styles from './UserEdit.module.scss';

const UserEditPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // 모달 상태
  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // fetchUser를 useCallback으로 분리
  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get<EndpointResponseMap['/users/me']>('/users/me');
      setUser(res.data.data);
    } catch {
      navigate('/error');
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
                <Button type="button" variant="account" onClick={() => setNameModalOpen(true)}>
                  이름 변경
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>전화번호</label>
              <div className={styles.inputInline}>
                <Input type="text" value={user?.phoneNumber ?? ''} variant="short" disabled />
                <Button type="button" variant="account" onClick={() => setPhoneModalOpen(true)}>
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
                <Button type="button" variant="account" onClick={() => setPasswordModalOpen(true)}>
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
      <NameChangeModal
        open={isNameModalOpen}
        onClose={() => setNameModalOpen(false)}
        onSuccess={() => {
          setNameModalOpen(false);
          fetchUser();
        }}
        currentName={user?.name ?? ''}
      />
      <PhoneChangeModal
        open={isPhoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        onSuccess={() => {
          setPhoneModalOpen(false);
          fetchUser();
        }}
        currentPhone={user?.phoneNumber ?? ''}
      />
      <PasswordChangeModal
        open={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={() => {
          setPasswordModalOpen(false);
          fetchUser();
        }}
      />
      <DeleteAccountModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={() => {
          setDeleteModalOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
};

export default UserEditPage;
