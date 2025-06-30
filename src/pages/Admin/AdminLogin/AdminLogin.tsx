import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
      // 로딩 토스트 제거
      toast.dismiss('admin-login-loading');

      if (data.success && data.data?.accessToken) {
        const { accessToken, name, userId, roleCode } = data.data;

        if (roleCode === 1 || roleCode === 2) {
          login(accessToken, name, userId, roleCode);
          toast.success('관리자 로그인 성공!');
          navigate('/admin/products', { replace: true });
        } else {
          toast.error('관리자 권한이 없습니다.');
          navigate(
            `/error/403?message=${encodeURIComponent(data.error?.message ?? '접근 권한이 없습니다.')}&code=${encodeURIComponent(data.error?.code ?? 'FORBIDDEN')}&redirect=${encodeURIComponent(location.pathname)}`
          );
        }
      } else {
        toast.error('로그인에 실패했습니다.');
        navigate(
          `/error/500?message=${encodeURIComponent(data.error?.message ?? '로그인 실패')}&code=${encodeURIComponent(data.error?.code ?? 'UNKNOWN_ERROR')}&redirect=${encodeURIComponent(location.pathname)}`
        );
      }
    },
    onError: (error: Error) => {
      // 로딩 토스트 제거
      toast.dismiss('admin-login-loading');

      handleApiError(error, navigate, location.pathname, {
        useToast: true,
        defaultMessage: '관리자 로그인에 실패했습니다.'
      });
    }
  });

  const onSubmit = ({ email, password }: UserInformation) => {
    setLoginError('');

    // 로딩 토스트 표시
    toast.loading('로그인 중...', {
      id: 'admin-login-loading'
    });

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
