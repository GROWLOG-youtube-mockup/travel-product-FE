import { useState } from 'react';

import type { LoginFormProps } from '../../type/login';
import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';
import PasswordInput from '../atoms/Input/PasswordInput';

import styles from './LoginForm.module.scss';

const LoginForm = ({ onSubmit, authError }: LoginFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // TODO: 추후 로그인 에러 처리 수정해야 함
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    onSubmit({ email: username, password });
    e.preventDefault();
    setError('');
  };

  return (
    <form className={styles['loginForm']} onSubmit={handleSubmit}>
      <label className={styles['emailLabel']} htmlFor="username">
        이메일
      </label>
      <Input
        type="email"
        id="username"
        value={username}
        placeholder="이메일을 입력해주세요"
        onChange={(e) => setUsername(e.target.value)}
        className={styles['emailInput']}
        required
      />
      <label className={styles['passwordLabel']} htmlFor="password">
        비밀번호
      </label>
      <PasswordInput
        id="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <Button className={styles['loginButton']} variant="xl" type="submit">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
