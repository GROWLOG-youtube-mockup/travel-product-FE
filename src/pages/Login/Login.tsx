import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

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
      login(res.data?.accessToken ?? '');
      setAuthError(null);
      navigate('/');
    },
    onError: () => {
      alert('잘못된 이메일 또는 비밀번호입니다');
      setAuthError('아이디 또는 비밀번호가 올바르지 않습니다.');
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
        <LoginForm onSubmit={onSubmit} authError={authError} />
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
