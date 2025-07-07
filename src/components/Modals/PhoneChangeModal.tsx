import { useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import { usePatchApi } from '@/hooks/usePatchAPI';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';
import { normalizePhoneNumber } from '@/utils/phone';

import GenericModal from './GenericModal';

import styles from './ModalCommon.module.scss';

interface PhoneChangeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentPhone: string;
}

const PhoneChangeModal = ({ open, onClose, onSuccess, currentPhone }: PhoneChangeModalProps) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // PATCH 훅 사용
  const { mutateAsync: patchPhone } = usePatchApi('/users/me/phone');

  const handleChange = async () => {
    setError('');
    setIsPending(true);
    try {
      // 입력값 유효성 검사
      try {
        normalizePhoneNumber(phone.replace(/-/g, ''));
      } catch (e) {
        setError(e instanceof Error ? e.message : '유효하지 않은 전화번호입니다.');
        setIsPending(false);
        return;
      }
      // PATCH 요청
      const res = (await patchPhone({
        phoneNumber: phone
      })) as EndpointResponseMap['/users/me/phone'];
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          setSuccess(false);
        }, 5000);
      } else {
        // 타입 가드로 에러 메시지 안전하게 처리
        const errorMsg =
          typeof res.error?.message === 'string' ? res.error.message : '서버 오류로 실패했습니다.';
        setError(errorMsg);
      }
    } catch (e) {
      // 네트워크/서버 에러 처리
      let errorMsg = '서버 오류로 실패했습니다.';
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
      onClose={onClose}
      title="전화번호 변경"
      subtitle="전화번호를 변경합니다."
    >
      {success ? (
        <div className={styles.success}>
          정보 변경이 완료되었습니다.
          <br />
          5초 후 창이 닫힙니다.
        </div>
      ) : (
        <div className={styles.modalWrapper}>
          <div className={styles.input}>
            <label htmlFor="current-phone">이전 전화번호</label>
            <Input id="current-phone" type="text" value={currentPhone} disabled />
          </div>
          <div className={styles.input}>
            <label htmlFor="phone-change">새 전화번호</label>
            <Input
              id="phone-change"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="새 전화번호를 입력하세요"
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>

          <Button
            type="button"
            variant="xl"
            onClick={handleChange}
            className={styles.button}
            style={{ width: '520px' }}
            disabled={isPending}
          >
            {isPending ? '변경 중...' : '전화번호 변경'}
          </Button>
        </div>
      )}
    </GenericModal>
  );
};

export default PhoneChangeModal;
