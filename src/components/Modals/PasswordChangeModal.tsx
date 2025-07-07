import React, { useEffect, useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import PasswordInput from '@/components/atoms/Input/PasswordInput';
import { usePatchApi } from '@/hooks/usePatchAPI';
import { usePostApi } from '@/hooks/usePostAPI';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

import GenericModal from './GenericModal';

import styles from './ModalCommon.module.scss';

interface PasswordChangeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordChangeModal = ({ open, onClose, onSuccess }: PasswordChangeModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'verify' | 'change'>('verify');
  const [isVerified, setIsVerified] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const verifyPasswordMutation = usePostApi('/users/verify-password');
  const changePasswordMutation = usePatchApi('/users/me/password');

  // 새 비밀번호가 비워지면 확인란도 자동 초기화
  useEffect(() => {
    if (!newPassword) {
      setNewPasswordCheck('');
    }
  }, [newPassword]);

  const handleVerifyPassword = async () => {
    setError('');
    setIsPending(true);
    try {
      const data = (await verifyPasswordMutation.mutateAsync({
        password: currentPassword
      })) as EndpointResponseMap['/users/verify-password'];
      if (data.success && data.data.verified) {
        setStep('change');
        setIsVerified(true);
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (e) {
      let errorMsg = '서버 오류로 실패하였습니다.';
      if (typeof e === 'object' && e && 'response' in e) {
        const err = e as { response?: { data?: { error?: { message?: string } } } };
        if (typeof err.response?.data?.error?.message === 'string') {
          errorMsg = err.response.data.error.message;
        }
      }
      setError(errorMsg);
    } finally {
      setIsPending(false);
    }
  };

  const handleChangePassword = async () => {
    if (!isVerified) {
      setError('본인 인증이 필요합니다.');
      return;
    }
    setError('');
    setIsPending(true);
    try {
      const data = (await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword
      })) as EndpointResponseMap['/users/me/password'];
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          setSuccess(false);
          setStep('verify');
          setCurrentPassword('');
          setNewPassword('');
          setNewPasswordCheck('');
          setIsVerified(false);
        }, 5000);
      } else {
        const errorMsg =
          typeof data.error?.message === 'string'
            ? data.error.message
            : '서버 오류로 실패하였습니다.';
        setError(errorMsg);
      }
    } catch (e) {
      let errorMsg = '서버 오류로 실패하였습니다.';
      if (typeof e === 'object' && e && 'response' in e) {
        const err = e as { response?: { data?: { error?: { message?: string } } } };
        if (typeof err.response?.data?.error?.message === 'string') {
          errorMsg = err.response.data.error.message;
        }
      }
      setError(errorMsg);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <GenericModal
      open={open}
      onClose={() => {
        onClose();
        setStep('verify');
        setCurrentPassword('');
        setNewPassword('');
        setNewPasswordCheck('');
        setError('');
        setSuccess(false);
        setIsVerified(false);
      }}
      title="비밀번호 변경"
      subtitle="비밀번호를 변경합니다."
    >
      {success ? (
        <div className={styles.success}>
          정보 변경이 완료되었습니다.
          <br />
          5초 후 창이 닫힙니다.
        </div>
      ) : step === 'verify' ? (
        <div className={styles.modalWrapper}>
          <div className={styles.input}>
            <label htmlFor="current-password">현재 비밀번호</label>
            <PasswordInput
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
              style={{ width: '520px' }}
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>

          <Button
            type="button"
            variant="xl"
            onClick={handleVerifyPassword}
            className={styles.button}
            style={{ width: '520px' }}
            disabled={!currentPassword || isPending}
          >
            {isPending ? '인증 중...' : '인증하기'}
          </Button>
        </div>
      ) : (
        <div className={styles.modalWrapper}>
          <div className={styles.input}>
            <label htmlFor="new-password">새 비밀번호</label>
            <PasswordInput
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="new-password-check">새 비밀번호 확인</label>
            <Input
              id="new-password-check"
              type="password"
              value={newPasswordCheck}
              onChange={(e) => setNewPasswordCheck(e.target.value)}
              placeholder="새 비밀번호를 다시 입력하세요"
              disabled={!newPassword}
            />
            {newPassword && newPasswordCheck && newPassword !== newPasswordCheck && (
              <div className={styles.error}>비밀번호가 일치하지 않습니다.</div>
            )}
            {error && <div className={styles.error}>{error}</div>}
          </div>
          <Button
            type="button"
            variant="xl"
            onClick={handleChangePassword}
            className={styles.button}
            style={{ width: '520px' }}
            disabled={
              isPending ||
              !isVerified ||
              !newPassword ||
              !newPasswordCheck ||
              newPassword !== newPasswordCheck
            }
          >
            {isPending ? '변경 중...' : '비밀번호 변경'}
          </Button>
        </div>
      )}
    </GenericModal>
  );
};

export default PasswordChangeModal;
