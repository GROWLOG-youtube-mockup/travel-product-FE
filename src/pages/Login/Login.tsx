import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/AuthStore';

import LoginForm from '../../components/LoginForm/LoginForm';
import { useLogin } from '../../hooks/useLogin';
import type { UserInformation } from '../../types/login';

import styles from './Login.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const loginMutation = useLogin({
    onSuccess: (res) => {
      // zustand 전역 상태 갱신
      const { accessToken, name, userId, roleCode } = res.data;
      login(accessToken ?? '', name ?? '', userId ?? 0, roleCode ?? 0);
      setAuthError(null);
      navigate('/');
    },
    onError: (error) => {
      const apiError = (error as { response?: { data?: { error?: { message?: string } } } })
        ?.response?.data?.error?.message;
      alert(apiError || '아이디 또는 비밀번호가 올바르지 않습니다.');
      setAuthError(null);
    }
  });
  const { mutate: loginMutate, isPending } = loginMutation;

  // ⑤ 폼 제출 핸들러
  const onSubmit = (payload: UserInformation) => {
    if (isPending) return; // 중복 클릭 방지
    setAuthError(null);
    loginMutate(payload);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentInner}>
        <div className={styles.title}>
          <h1>로그인</h1>
        </div>
        <div className={styles.subtitle}>
          <span>정보를 입력해주세요</span>
        </div>
        <LoginForm onSubmit={onSubmit} authError={authError ?? undefined} />
      </div>
      <div className={styles.footer}>
        <span>
          <Link to="/join" className={styles.link}>
            회원가입
          </Link>
          {' | '}
          <Link to="/find-account" className={styles.link}>
            아이디/비밀번호 찾기
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
