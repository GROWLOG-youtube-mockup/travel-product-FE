import { useState } from 'react';

import type { SignupValues } from '../../type/joinMembership';
import { signupInitialForm } from '../../type/signupInitialForm';
import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';
import PasswordInputField from '../atoms/Input/PasswordInputField';
import Label from '../atoms/Label/Label';

import styles from './SignupForm.module.scss';

interface SignupFormProps {
  onSubmit: (values: SignupValues) => void;
}

type SignupFormError = Partial<
  Record<'name' | 'phone' | 'email' | 'emailCode' | 'password' | 'passwordCheck', string>
> & {
  emailAuth?: string;
};

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [form, setForm] = useState<SignupValues>(signupInitialForm);
  const [error, setError] = useState<SignupFormError>({});
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // 전화번호 유효성 검사
  const isValidPhone = (phone: string) => /^\d{3}-\d{3,4}-\d{4}$/.test(phone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };

  // 이메일 인증코드 전송
  const handleSendEmailCode = async () => {
    setError((prev) => ({ ...prev, emailAuth: undefined }));
    if (!form.email) {
      setError((prev) => ({ ...prev, emailAuth: '이메일을 입력하세요.' }));
      return;
    }
    try {
      const res = await fetch('/auth/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
      } else {
        setError((prev) => ({
          ...prev,
          emailAuth: data.error?.message || '이메일 인증코드 전송 실패'
        }));
      }
    } catch {
      setError((prev) => ({ ...prev, emailAuth: '네트워크 오류' }));
    }
  };

  // 이메일 인증코드 확인
  const handleVerifyEmailCode = async () => {
    setError((prev) => ({ ...prev, emailAuth: undefined }));
    try {
      const res = await fetch('/auth/email/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, code: form.emailCode })
      });
      const data = await res.json();
      if (data.success && data.data.verified) {
        setEmailVerified(true);
      } else {
        setError((prev) => ({
          ...prev,
          emailAuth: data.error?.message || '인증코드가 올바르지 않습니다'
        }));
      }
    } catch {
      setError((prev) => ({ ...prev, emailAuth: '네트워크 오류' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newError: SignupFormError = {};
    if (!form.name) {
      newError.name = '이름을 입력하세요.';
      hasError = true;
    }
    if (!form.email) {
      newError.email = '이메일을 입력하세요.';
      hasError = true;
    }
    if (!isValidPhone(form.phone)) {
      newError.phone = '전화번호는 000-0000-0000 형식이어야 합니다.';
      hasError = true;
    }
    if (!form.password) {
      newError.password = '비밀번호를 입력하세요.';
      hasError = true;
    } else if (form.password !== form.passwordCheck) {
      newError.password = '비밀번호가 일치하지 않습니다.';
      hasError = true;
    }
    setError((prev) => ({ ...prev, ...newError }));
    if (hasError) return;
    onSubmit({ ...form });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">이름</Label>
      <Input
        id="name"
        name="name"
        placeholder="본 서비스에 사용하실 이름을 입력해주세요 (건별 찾기시 사용됩니다)"
        variant="long"
        value={form.name}
        onChange={handleChange}
      />
      {error.name && <div className={styles.errorMessage}>{error.name}</div>}
      <Label htmlFor="phone">전화번호</Label>
      <div className={styles.flexRow}>
        <Input
          id="phone"
          name="phone"
          placeholder="000-0000-0000 형식으로 입력하세요"
          variant="long"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      {error.phone && <div className={styles.errorMessage}>{error.phone}</div>}
      <Label htmlFor="email">이메일</Label>
      <div className={styles.flexRow}>
        <Input
          id="email"
          name="email"
          placeholder="본 서비스에 사용하실 이메일을 입력해주세요"
          variant="short"
          value={form.email}
          onChange={handleChange}
          disabled={emailSent || emailVerified}
          className={emailSent || emailVerified ? styles.disabledInput : ''}
        />
        <Button
          type="button"
          variant="account"
          onClick={handleSendEmailCode}
          disabled={emailSent || emailVerified}
        >
          {emailSent ? '전송됨' : '인증번호 받기'}
        </Button>
      </div>
      {error.email && <div className={styles.errorMessage}>{error.email}</div>}
      <div className={styles.flexRow}>
        <Input
          name="emailCode"
          placeholder="인증번호를 입력하세요"
          variant="short"
          value={form.emailCode}
          onChange={handleChange}
          disabled={!emailSent || emailVerified}
          className={!emailSent || emailVerified ? styles.disabledInput : ''}
        />
        <Button
          type="button"
          variant="account"
          onClick={handleVerifyEmailCode}
          disabled={!emailSent || emailVerified}
        >
          {emailVerified ? '인증완료' : '인증번호 확인'}
        </Button>
      </div>
      {error.emailAuth && <div className={styles.errorMessage}>{error.emailAuth}</div>}
      {emailVerified && <div style={{ color: 'green', marginBottom: 8 }}>이메일 인증 완료</div>}
      <Label htmlFor="password">비밀번호</Label>
      <PasswordInputField
        value={form.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        id="password"
        name="password"
        placeholder="본 서비스에 사용하실 비밀번호를 입력해주세요"
        disabled={emailVerified}
        variant="long"
      />
      <div className={styles.spacer} />
      <Input
        name="passwordCheck"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        variant="long"
        value={form.passwordCheck}
        onChange={handleChange}
        disabled={!form.password || emailVerified}
        className={!form.password || emailVerified ? styles.disabledInput : ''}
      />
      {error.password && <div className={styles.errorMessage}>{error.password}</div>}
      <Button type="submit" className={styles.submitBtn}>
        계정 생성하기
      </Button>
    </form>
  );
};

export default SignupForm;
