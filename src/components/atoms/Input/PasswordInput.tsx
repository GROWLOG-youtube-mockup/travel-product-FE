import type { InputHTMLAttributes } from 'react';
import React, { forwardRef, useState } from 'react';

import Input from '../Input/Input';

import styles from './PasswordInput.module.scss';

const PasswordToggleIcon = ({ visible, onClick }: { visible: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={styles.toggleBtn}
    tabIndex={-1}
    aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보이기'}
  >
    {visible ? '🔓' : '🔒'}
  </button>
);

const defaultRules = [
  { test: (pw: string) => pw.length >= 8, message: '8자 이상 입력하세요.' },
  { test: (pw: string) => /[A-Za-z]/.test(pw), message: '영문자를 포함하세요.' },
  { test: (pw: string) => /\d/.test(pw), message: '숫자를 포함하세요.' },
  { test: (pw: string) => /[!@#$%^&*]/.test(pw), message: '특수문자를 포함하세요.' }
];

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: typeof defaultRules;
  errorMessages?: string[];
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, onChange, rules = defaultRules, errorMessages, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    // 서버 에러가 있으면 우선, 없으면 내부 자동 검증(첫 번째 위반만)
    const autoError =
      errorMessages && errorMessages.length > 0
        ? errorMessages[0]
        : rules.find((rule) => !rule.test(value))?.message;
    return (
      <div className={styles.form}>
        <div className={styles.wrapper}>
          <Input
            {...props}
            ref={ref}
            type={visible ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            className={styles.input}
            autoComplete="new-password"
          />
          <span className={styles.toggleIcon}>
            <PasswordToggleIcon visible={visible} onClick={() => setVisible((v) => !v)} />
          </span>
        </div>
        {autoError && <div className={styles.errors}>{autoError}</div>}
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
