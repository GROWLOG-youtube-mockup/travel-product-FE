import { useState } from 'react';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

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

  const handleChange = async () => {
    setError('');
    try {
      const res = await fetch('/users/me/phone', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone })
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
            <Input id="current-phone" type="text" value={currentPhone} disabled variant="long" />
          </div>
          <div className={styles.input}>
            <label htmlFor="phone-change">새 전화번호</label>
            <Input
              id="phone-change"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="새 전화번호를 입력하세요"
              variant="long"
              className={styles.input}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <Button
            type="button"
            variant="xl"
            onClick={handleChange}
            className={styles.button}
            style={{ width: '520px' }}
          >
            전화번호 변경
          </Button>
        </div>
      )}
    </GenericModal>
  );
};

export default PhoneChangeModal;
