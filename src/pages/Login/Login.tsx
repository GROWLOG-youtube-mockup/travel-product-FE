import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import LoginForm from '../../components/LoginForm/LoginForm';
import { useLogin } from '../../hooks/useLogin';
import type { UserInformation } from '../../type/login';

import styles from './Login.module.scss';
const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: useLogin,
    onSuccess: (res) => {
      localStorage.setItem('accessToken', res.data?.accessToken);
      // localStorage.setItem('refreshToken', res.refreshToken);

      navigate('/');
    },
    onError: (err) => {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  });

  // ⑤ 폼 제출 핸들러
  const onSubmit = (payload: UserInformation) => {
    if (isPending) return; // 중복 클릭 방지
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
        <LoginForm onSubmit={onSubmit} />
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
