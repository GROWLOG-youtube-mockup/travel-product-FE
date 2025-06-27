import { useState } from 'react';

import { validatePhoneNumber } from '../../utils/phone';
import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

interface ResetPasswordFormProps {
  onResult: (title: string, message: string) => void;
  styles: { [key: string]: string };
}

const ResetPasswordForm = ({ onResult, styles }: ResetPasswordFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<{ name?: string; phone?: string; email?: string }>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: { name?: string; phone?: string; email?: string } = {};
    if (!name) err.name = '이름을 입력하세요.';
    if (!phone) err.phone = '전화번호를 입력하세요.';
    else if (!validatePhoneNumber(phone)) err.phone = '올바른 전화번호를 입력하세요.';
    if (!email) err.email = '이메일을 입력하세요.';
    setError(err);
    if (Object.keys(err).length > 0) return;
    try {
      const res = await fetch('/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phoneNumber: phone, email })
      });
      const data = await res.json();
      if (data.success) {
        onResult('임시 비밀번호 발급 완료', '임시 비밀번호가 이메일로 발송되었습니다.');
      } else {
        onResult(
          '임시 비밀번호 발급 실패',
          data.error?.message || '임시 비밀번호 발급에 실패했습니다.'
        );
      }
    } catch {
      onResult('네트워크 오류', '잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <form className={styles.sectionRight} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="reset-name">이름</label>
        <Input
          id="reset-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          variant="long"
        />
        {error.name && <div className={styles.errorMessage}>{error.name}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="reset-phone">전화번호</label>
        <Input
          id="reset-phone"
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="휴대폰 번호를 입력하세요"
          variant="long"
        />
        {error.phone && <div className={styles.errorMessage}>{error.phone}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="reset-email">이메일</label>
        <Input
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          variant="long"
        />
        {error.email && <div className={styles.errorMessage}>{error.email}</div>}
      </div>
      <Button type="submit" variant="lg" className={styles.rightAlignButton}>
        임시 비밀번호 발급받기
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
