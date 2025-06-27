import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import AdminHeader from '@/components/Header/AdminHeader/AdminHeader';
import LoginForm from '@/components/LoginForm/LoginForm';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/AuthStore';
import type { AdminLoginResponse } from '@/types/api/Auth.type';
import type { UserInformation } from '@/types/login';

import styles from './AdminLogin.module.scss';

const AdminLoginPage = () => {
  const [loginError, setLoginError] = useState<string>('');
  const { login, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/admin/products';
    }
  }, [isLoggedIn]);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: UserInformation): Promise<AdminLoginResponse> => {
      const response = await api.post<AdminLoginResponse>('/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data?.accessToken) {
        login(data.data.accessToken, data.data.name, data.data.userId);
        window.location.href = '/admin/products';
      } else {
        const errorMsg = data.error?.message || data.message || '로그인에 실패했습니다.';
        setLoginError(errorMsg);
      }
    }
    // 에러는 전역 인터셉터에서 처리하므로 여기선 생략
  });

  const onSubmit = ({ email, password }: UserInformation) => {
    setLoginError('');
    loginMutation.mutate({ email, password });
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
      </div>
    </>
  );
};

export default AdminLoginPage;
