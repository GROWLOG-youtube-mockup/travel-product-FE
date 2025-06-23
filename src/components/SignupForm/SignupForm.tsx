import type { SignupValues } from '../../type/signupForm';
import { signupInitialForm, useSignupForm } from '../../type/signupForm';
import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';
import PasswordInputField from '../atoms/Input/PasswordInputField';
import Label from '../atoms/Label/Label';

import styles from './SignupForm.module.scss';

interface SignupFormProps {
  onSubmit: (values: SignupValues) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const {
    form,
    error,
    info,
    emailSent,
    emailVerified,
    handleChange,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleSubmit
  } = useSignupForm(signupInitialForm, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">이름</Label>
      <Input
        id="name"
        name="name"
        placeholder="본 서비스에 사용하실 이름을 입력해주세요 (계정 찾기시 사용됩니다)"
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
          disabled={emailVerified}
          className={emailVerified ? styles.disabledInput : ''}
        />
        <Button
          type="button"
          variant="account"
          onClick={handleSendEmailCode}
          disabled={emailVerified || !form.email}
        >
          {emailSent ? '재전송' : '인증번호 받기'}
        </Button>
      </div>
      {error.email && <div className={styles.errorMessage}>{error.email}</div>}
      {info && <div className={styles.infoMessage}>{info}</div>}
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
