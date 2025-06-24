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

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
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
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
