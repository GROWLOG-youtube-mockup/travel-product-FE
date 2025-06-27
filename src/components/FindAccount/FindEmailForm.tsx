import { useState } from 'react';

import { validatePhoneNumber } from '../../utils/phone';
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: { name?: string; phone?: string } = {};
    if (!name) err.name = '이름을 입력하세요.';
    if (!phone) err.phone = '전화번호를 입력하세요.';
    else if (!validatePhoneNumber(phone)) err.phone = '올바른 전화번호를 입력하세요.';
    setError(err);
    if (Object.keys(err).length > 0) return;
    try {
      const res = await fetch('/auth/find-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phoneNumber: phone })
      });
      const data = await res.json();
      if (data.success) {
        onResult('이메일 찾기 결과', `가입된 이메일: ${data.data}`);
      } else {
        onResult('이메일 찾기 실패', data.error?.message || '이메일을 찾을 수 없습니다.');
      }
    } catch {
      onResult('네트워크 오류', '잠시 후 다시 시도해 주세요.');
    }
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
