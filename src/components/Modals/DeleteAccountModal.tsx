import { useState } from 'react';

import { api } from '../../lib/api';
import type { EndpointResponseMap } from '../../types/api/EndpointResponseMap.type';
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
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    setError('');
    try {
      const res = await api.delete<EndpointResponseMap['/users/me']>('/users/me', {
        data: { password }
      });
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          setSuccess(false);
        }, 5000);
      } else {
        setError(res.data.error?.message || '서버 오류로 실패하였습니다.');
      }
    } catch {
      setError('서버 오류로 실패하였습니다.');
    }
  };

  const handlePasswordCheck = async () => {
    setError('');
    try {
      const res = await api.post<EndpointResponseMap['/users/verify-password']>(
        '/users/verify-password',
        { password }
      );
      if (res.data.data.verified) {
        setConfirm(true);
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setError('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title="계정 탈퇴"
      subtitle="계정을 탈퇴하면 다시 되돌릴 수 없습니다."
    >
      {success ? (
        <div className={styles.success}>
          회원 탈퇴가 완료되었습니다.
          <br />
          5초 후 창이 닫힙니다.
        </div>
      ) : confirm ? (
        <div className={styles.modalWrapper}>
          <div className={styles.error} style={{ marginBottom: 24, textAlign: 'center' }}>
            정말로 회원 탈퇴를 진행하시겠습니까?
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Button
              type="button"
              variant="xl"
              color="white"
              onClick={onClose}
              className={styles.button}
              style={{ width: '220px' }}
            >
              취소하기
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleDelete}
              className={styles.button}
              color="gray"
            >
              탈퇴하기
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.modalWrapper}>
          <div className={styles.input}>
            <label htmlFor="delete-password">비밀번호 확인</label>
            <Input
              id="delete-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              variant="long"
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>

          <Button
            type="button"
            variant="xl"
            color="white"
            onClick={handlePasswordCheck}
            className={styles.button}
            style={{ width: '520px' }}
            disabled={!password}
          >
            회원 탈퇴
          </Button>
        </div>
      )}
    </GenericModal>
  );
};

export default DeleteAccountModal;
