import { useState } from 'react';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

import GenericModal from './GenericModal';

import styles from './ModalCommon.module.scss';

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteAccountModal = ({ open, onClose, onSuccess }: DeleteAccountModalProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setError('');
    try {
      const res = await fetch('/users/me', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          setSuccess(false);
        }, 5000);
      } else {
        setError(data.error || '서버 오류로 실패하였습니다.');
      }
    } catch {
      setError('서버 오류로 실패하였습니다.');
    }
  };

  return (
    <GenericModal open={open} onClose={onClose} title="계정 탈퇴">
      {success ? (
        <div className={styles.modalFormSuccess}>
          정보 변경이 완료되었습니다.
          <br />
          5초 후 창이 닫힙니다.
        </div>
      ) : (
        <div className={styles.modalFormWrapper}>
          <label htmlFor="delete-password" className={styles.modalFormTitle}>
            비밀번호 확인
          </label>
          <Input
            id="delete-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            variant="long"
            className={styles.modalFormInput}
          />
          <Button
            type="button"
            variant="account"
            onClick={handleDelete}
            className={styles.modalFormButton}
          >
            회원 탈퇴
          </Button>
          {error && <div className={styles.modalFormError}>{error}</div>}
        </div>
      )}
    </GenericModal>
  );
};

export default DeleteAccountModal;
