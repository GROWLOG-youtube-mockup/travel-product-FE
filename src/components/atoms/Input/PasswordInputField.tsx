import React, { useState } from 'react';

import PasswordInput from './PasswordInput';

import styles from './PasswordInput.module.scss';

const defaultValidate = (pw: string) => {
  if (pw.length < 8) return '8자 이상 입력하세요.';
  if (!/[A-Za-z]/.test(pw)) return '영문자를 포함하세요.';
  if (!/\d/.test(pw)) return '숫자를 포함하세요.';
  if (!/[!@#$%^&*]/.test(pw)) return '특수문자를 포함하세요.';
  return undefined;
};

interface PasswordInputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({ value, onChange, ...rest }) => {
  const [touched, setTouched] = useState(false);
  const validationError = touched ? defaultValidate(value) : undefined;

  const handleBlur = () => setTouched(true);

  return (
    <>
      <PasswordInput value={value} onChange={onChange} onBlur={handleBlur} {...rest} />
      {touched && validationError && <div className={styles.errors}>{validationError}</div>}
    </>
  );
};

export default PasswordInputField;
