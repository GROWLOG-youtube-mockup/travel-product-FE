import { useState } from 'react';

import { usePostApi } from '@/hooks/usePostAPI';
import { maskEmail } from '@/utils/email';

import { normalizePhoneNumber } from '../../utils/phone';
import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

interface FindEmailFormProps {
  onResult: (title: string, message: string) => void;
  styles: { [key: string]: string };
}

const FindEmailForm = ({ onResult, styles }: FindEmailFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<{ name?: string; phone?: string }>({});
  const findEmailMutation = usePostApi('/auth/find-email');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: { name?: string; phone?: string } = {};
    if (!name) err.name = '이름을 입력하세요.';
    if (!phone) err.phone = '전화번호를 입력하세요.';
    else {
      try {
        normalizePhoneNumber(phone);
      } catch {
        err.phone = '올바른 전화번호를 입력하세요.';
      }
    }
    setError(err);
    if (Object.keys(err).length > 0) return;

    const requestData = {
      name,
      phoneNumber: phone
    };

    // mutation을 실행하고 결과를 기다림
    findEmailMutation.mutate(requestData, {
      onSuccess: (data) => {
        if (data?.success) {
          onResult('이메일 찾기 결과', `가입된 이메일: ${maskEmail(data.data)}`);
        } else {
          onResult('이메일 찾기 실패', data?.error?.message || '이메일을 찾을 수 없습니다.');
        }
      },
      onError: (error) => {
        // 에러 메시지 추출 (서버에서 보낸 구체적인 메시지 우선)
        const message = error instanceof Error ? error.message : '잠시 후 다시 시도해 주세요.';
        onResult('이메일 찾기 실패', message);
      }
    });
  };

  return (
    <form className={styles.sectionRight} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="find-name">이름</label>
        <Input
          id="find-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          variant="long"
        />
        {error.name && <div className={styles.errorMessage}>{error.name}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="find-phone">전화번호</label>
        <Input
          id="find-phone"
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="휴대폰 번호를 입력하세요"
          variant="long"
        />
        {error.phone && <div className={styles.errorMessage}>{error.phone}</div>}
      </div>
      <Button type="submit" variant="lg" className={styles.rightAlignButton}>
        계정 이메일 찾기
      </Button>
    </form>
  );
};

export default FindEmailForm;
