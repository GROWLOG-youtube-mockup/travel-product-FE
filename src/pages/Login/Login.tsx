import { Link } from 'react-router-dom';

import LoginForm from '../../components/LoginForm/LoginForm';
import type { UserInformation } from '../../type/login';

import styles from './Login.module.scss';
const LoginPage = () => {
  const onSubmit = ({ username, password }: UserInformation) => {
    // TODO: 로그인 API 연동 시 수정해야 함.
    console.log('로그인 시도:', { username, password });
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
