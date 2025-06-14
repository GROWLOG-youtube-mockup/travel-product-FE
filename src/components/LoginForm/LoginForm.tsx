import { useState } from 'react';

import type { LoginFormProps } from '../../type/login';
import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

import styles from './LoginForm.module.scss';

const LoginForm = ({ onSubmit, authError }: LoginFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // TODO: 추후 로그인 에러 처리 수정해야 함
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    onSubmit({ username, password });
    e.preventDefault();
    setError('');
  };

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <label className={styles['login-form__email-label']} htmlFor="username">
        Email
      </label>
      <Input
        type="email"
        id="username"
        value={username}
        placeholder="이메일을 입력해주세요"
        onChange={(e) => setUsername(e.target.value)}
        className={styles['login-form__email']}
        required
      />
      <label className={styles['login-form__password-label']} htmlFor="password">
        Password
      </label>
      <Input
        type="password"
        id="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => setPassword(e.target.value)}
        className={styles['login-form__password']}
        required
      />
      {error && <p className="error">{error}</p>}
      <Button className={styles['login-form__login-button']} variant="xl" type="submit">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
