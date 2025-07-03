import { Link, useNavigate } from 'react-router-dom';

import { usePostApi } from '@/hooks/usePostAPI';
import { useAuthStore } from '@/store/AuthStore';
import type { UserRes } from '@/types/api/EndpointResponseMap.type';

import SignupForm from '../../components/SignupForm/SignupForm';
import type { SignupValues } from '../../types/signupForm.types';

import styles from './JoinMembership.module.scss';

const JoinMembershipPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { mutateAsync } = usePostApi('/users/signup');
  const { mutateAsync: loginMutateAsync } = usePostApi('/auth/login');

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (form: SignupValues) => {
    const payload = {
      username: form.name, // name → username으로 변경
      phoneNumber: form.phone,
      email: form.email,
      password: form.password
    };
    try {
      // UserRes 타입 적용
      const signupRes: UserRes = await mutateAsync(payload);
      if (!signupRes.success) {
        alert(`** 오류 : ${signupRes.error?.message || '회원가입에 실패했습니다.'} **`);
        return;
      }
      // 회원가입 성공 시에만 로그인 시도
      const loginRes = await loginMutateAsync({
        email: form.email,
        password: form.password
      });
      if ('data' in loginRes && loginRes.data) {
        const { accessToken, name, userId, roleCode } = loginRes.data as {
          accessToken?: string;
          name?: string;
          userId?: number;
          roleCode?: number;
        };
        if (accessToken && name && userId != null && roleCode != null) {
          login(accessToken, name, userId, roleCode);
        }
      }
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (e) {
      let message = '회원가입에 실패했습니다.';
      if (typeof e === 'object' && e !== null) {
        const err = e as { response?: { data?: { error?: { message?: string } } } };
        if (err.response?.data?.error?.message) {
          message = err.response.data.error.message;
        }
      }
      alert(`** 오류 : ${message} **`);
    }
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
