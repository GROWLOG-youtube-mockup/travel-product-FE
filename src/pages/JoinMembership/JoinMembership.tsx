import { Link } from 'react-router-dom';

import SignupForm from '../../components/SignupForm/SignupForm';
import type { JoinMembershipFormValues } from '../../type/joinMembership';

import styles from './JoinMembership.module.scss';

const JoinMembershipPage = () => {
  // 회원가입 폼 제출 핸들러
  const handleSubmit = (form: JoinMembershipFormValues) => {
    // 서버에 제출할 데이터만 추출
    const payload = {
      name: form.name,
      phoneNumber: form.phone,
      email: form.email,
      password: form.password
    };
    // TODO: 회원가입 API 연동
    console.log('회원가입 제출 payload:', payload);
    // 예시: fetch('/users/signup', { method: 'POST', body: JSON.stringify(payload) })
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentInner}>
        <div className={styles.title}>
          <h1>회원가입</h1>
        </div>
        <div className={styles.subtitle}>
          <span>새로운 계정을 생성합니다</span>
        </div>
        <SignupForm onSubmit={handleSubmit} />
        <div className={styles.footer}>
          <span>
            <Link to="/login" className={styles.link}>
              로그인
            </Link>
            {' | '}
            <Link to="/find-account" className={styles.link}>
              아이디/비밀번호 찾기
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default JoinMembershipPage;
