import { useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import { usePatchApi } from '@/hooks/usePatchAPI';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

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
  const [isPending, setIsPending] = useState(false);

  const nameChangeMutation = usePatchApi('/users/me/name');

  const handleChange = async () => {
    setError('');
    setIsPending(true);
    try {
      const data = (await nameChangeMutation.mutateAsync({
        name
      })) as EndpointResponseMap['/users/me/name'];
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          setSuccess(false);
        }, 5000);
      } else {
        setError(data.error?.message || '서버 오류로 실패하였습니다.');
      }
    } catch {
      setError('서버 오류로 실패하였습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <GenericModal open={open} onClose={onClose} title="이름 변경" subtitle="이름을 변경합니다.">
      {success ? (
        <div className={styles.success}>
          정보 변경이 완료되었습니다.
          <br />
          5초 후 창이 닫힙니다.
        </div>
      ) : (
        <div className={styles.modalWrapper}>
          <div className={styles.input}>
            <label htmlFor="current-name">이전 이름</label>
            <Input id="current-name" type="text" value={currentName} disabled />
          </div>
          <div className={styles.input}>
            <label htmlFor="name-change">새 이름</label>
            <Input
              id="name-change"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="새 이름을 입력하세요"
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <Button
            type="button"
            variant="xl"
            onClick={handleChange}
            className={styles.button}
            style={{ width: '520px' }}
            disabled={isPending}
          >
            {isPending ? '변경 중...' : '이름 변경'}
          </Button>
        </div>
      )}
    </GenericModal>
  );
};

export default NameChangeModal;
