import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import SignupForm from '@/components/SignupForm/SignupForm';
import { usePostApi } from '@/hooks/usePostAPI';
import { handleApiError } from '@/lib/handleApiError';
import { useAuthStore } from '@/store/AuthStore';

import type { SignupValues } from '../../types/signupForm.types';

import styles from './JoinMembership.module.scss';

const JoinMembershipPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { mutateAsync } = usePostApi('/users/signup');
  const { mutateAsync: loginMutateAsync } = usePostApi('/auth/login');

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (form: SignupValues) => {
    // 서버에 제출할 데이터만 추출
    const payload = {
      username: form.name, // name → username으로 변경
      phoneNumber: form.phone,
      email: form.email,
      password: form.password
    };
    try {
      await mutateAsync(payload); // 회원가입만 진행
      // 회원가입 성공 시 무조건 /auth/login 호출
      const loginRes = await loginMutateAsync({
        email: form.email,
        password: form.password
      });

      const { accessToken, name, userId, roleCode } = loginRes.data ?? {};

      if (!accessToken || !name || userId == null || roleCode == null) {
        throw new Error('로그인에 실패했습니다.');
      }

      login(accessToken, name, userId, roleCode);
      toast.success('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (error: unknown) {
      handleApiError(error, navigate, location.pathname, {
        useToast: true,
        defaultMessage: '회원가입에 실패했습니다.'
      });
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
