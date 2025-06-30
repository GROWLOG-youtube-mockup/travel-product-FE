import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AdminHeader from '@/components/Header/AdminHeader/AdminHeader';
import LoginForm from '@/components/LoginForm/LoginForm';
import { usePostApi } from '@/hooks/usePostAPI';
import { handleApiError } from '@/lib/handleApiError';
import { useAuthStore } from '@/store/AuthStore';
import type { UserInformation } from '@/types/login';

import styles from './AdminLogin.module.scss';

const AdminLoginPage = () => {
  const [loginError, setLoginError] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout } = useAuthStore();

  useEffect(() => {
    // 로그인 상태로 로그인 페이지 접근 시 기존 인증 정보 제거
    logout(); // store에 정의된 함수
  }, [logout]);

  const loginMutation = usePostApi('/auth/login', {
    onSuccess: (data) => {
      if (data.success && data.data?.accessToken) {
        const { accessToken, name, userId, roleCode } = data.data;

        if (roleCode === 1 || roleCode === 2) {
          login(accessToken, name, userId, roleCode);
          navigate('/admin/products', { replace: true });
        } else {
          navigate(
            `/error/403?message=${encodeURIComponent(data.error?.message ?? '접근 권한이 없습니다.')}&code=${encodeURIComponent(data.error?.code ?? 'FORBIDDEN')}&redirect=${encodeURIComponent(location.pathname)}`
          );
        }
      } else {
        navigate(
          `/error/500?message=${encodeURIComponent(data.error?.message ?? '로그인 실패')}&code=${encodeURIComponent(data.error?.code ?? 'UNKNOWN_ERROR')}&redirect=${encodeURIComponent(location.pathname)}`
        );
      }
    },
    onError: (error: Error) => {
      handleApiError(error, navigate, location.pathname);
    }
  });

  const onSubmit = ({ email, password }: UserInformation) => {
    setLoginError('');
    loginMutation.mutate({ email, password });
  };

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>관리자 로그인</h1>
        </div>
        <div className={styles.subtitle}>
          <span>정보를 입력해주세요</span>
        </div>

        {loginMutation.isPending && <div className={styles.loading}>로그인 처리 중...</div>}

        <LoginForm onSubmit={onSubmit} authError={loginError} />

        <div className={styles.homeLink}>
          <button type="button" onClick={handleGoHome} className={styles.homeLinkButton}>
            여행 상품 홈으로
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
