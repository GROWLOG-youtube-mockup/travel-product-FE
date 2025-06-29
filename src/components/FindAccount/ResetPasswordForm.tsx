import { useState } from 'react';

import { usePostApi } from '@/hooks/usePostAPI';
import type { EndpointRequestMap } from '@/types/api/EndpointRequestMap.type';
import { normalizePhoneNumber } from '@/utils/phone';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

interface ResetPasswordFormProps {
  onResult: (title: string, message: string, guide?: string) => void;
  styles: { [key: string]: string };
}

const ResetPasswordForm = ({ onResult, styles }: ResetPasswordFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);
  const { mutateAsync } = usePostApi('/auth/reset-password');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: { name?: string; phone?: string; email?: string } = {};
    if (!name) err.name = '이름을 입력하세요.';
    if (!phone) err.phone = '전화번호를 입력하세요.';
    else {
      try {
        normalizePhoneNumber(phone);
      } catch {
        err.phone = '올바른 전화번호를 입력하세요.';
      }
    }
    if (!email) err.email = '이메일을 입력하세요.';
    setError(err);
    if (Object.keys(err).length > 0) return;
    setLoading(true);
    try {
      await mutateAsync({
        name,
        phoneNumber: phone,
        email
      } as EndpointRequestMap['/auth/reset-password']);
      onResult(
        '임시 비밀번호 발급 완료',
        '임시 비밀번호가 이메일로 발송되었습니다.',
        '로그인 이후, “마이페이지 → 회원 정보 수정 → 비밀번호 변경” 을 통해 비밀번호를 변경해주시길 바랍니다.'
      );
    } catch (error: any) {
      onResult(
        '임시 비밀번호 발급 실패',
        error?.response?.data?.error?.message || '임시 비밀번호 발급에 실패했습니다.'
      );
    } finally {
      setLoading(false);
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
      <Button type="submit" variant="lg" className={styles.rightAlignButton} disabled={loading}>
        임시 비밀번호 발급받기
      </Button>
      {loading && (
        <div style={{ marginTop: '16px', textAlign: 'right', color: '#888' }}>
          잠시만 기다려주세요...
        </div>
      )}
    </form>
  );
};

export default ResetPasswordForm;
