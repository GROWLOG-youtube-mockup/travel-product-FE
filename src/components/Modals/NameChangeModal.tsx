import { useState } from 'react';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

import GenericModal from './GenericModal';

import styles from './ModalCommon.module.scss';

interface NameChangeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentName: string;
}

const NameChangeModal = ({ open, onClose, onSuccess, currentName }: NameChangeModalProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = async () => {
    setError('');
    try {
      const res = await fetch('/users/me/name', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
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
    <GenericModal open={open} onClose={onClose} title="이름 변경">
      {success ? (
        <div className={styles.modalFormSuccess}>
          정보 변경이 완료되었습니다.
          <br />
          5초 후 창이 닫힙니다.
        </div>
      ) : (
        <div className={styles.modalFormContainer}>
          <div className={styles.modalFormInput}>
            <label htmlFor="current-name" className={styles.modalFormTitle}>
              이전 이름
            </label>
            <Input id="current-name" type="text" value={currentName} readOnly variant="long" />
          </div>
          <label htmlFor="name-change">새 이름</label>
          <Input
            id="name-change"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="새 이름을 입력하세요"
            variant="long"
          />
          {error && <div className={styles.modalFormError}>{error}</div>}
          <Button
            type="button"
            variant="account"
            onClick={handleChange}
            className={styles.modalFormButton}
          >
            이름 변경
          </Button>
        </div>
      )}
    </GenericModal>
  );
};

export default NameChangeModal;
